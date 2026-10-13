/* Readable authoring layer over the existing course model and learner renderer. */
window.createStudioEvolution=function(React,deps){
 const {createElement:h,useState,useRef,useEffect,useMemo}=React;
 const {ContentEditor,QuestionEditor,LearnerCard,steps,levels,label,runtimeSource,runtimeCSS}=deps;
 const rich=text=>({__html:window.StudioFormatting.html(text)});
 const nonblank=value=>typeof value==='string'&&!!value.trim();
 const placeholder=value=>!nonblank(value)||/^(add |new question|first learning module|untitled |replace with|beginner treatment|intermediate treatment|upper intermediate treatment|advanced treatment)/i.test(value.trim());
 function move(items,from,to){if(from<0||to<0||from>=items.length||to>=items.length)return items;const result=items.slice(),[item]=result.splice(from,1);result.splice(to,0,item);return result}
 function fingerprint(project){const {authoringChecks,...rest}=project;let hash=2166136261;for(const char of JSON.stringify(rest)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}return (hash>>>0).toString(16)}
 function interactionReady(c){
  const options=(values,correct)=>Array.isArray(values)&&values.length>=2&&values.every(o=>nonblank(o.id)&&nonblank(o.text))&&new Set(values.map(o=>o.id)).size===values.length&&Array.isArray(correct)&&correct.length>0&&correct.every(id=>values.some(o=>o.id===id));
  const ordered=()=>Array.isArray(c.items)&&c.items.length>0&&c.items.every(i=>nonblank(i.text))&&Array.isArray(c.correctOrder)&&c.correctOrder.length>0&&c.correctOrder.every(id=>c.items.some(i=>i.id===id));
  const blanks=()=>Array.isArray(c.blanks)&&c.blanks.length>0&&c.blanks.every(b=>String(c.template||'').includes('{{'+b.id+'}}')&&options(b.options,[b.correctOptionId]));
  switch(c.kind){
   case 'multipleChoice':case 'multiSelect':case 'trueFalse':return options(c.options,c.correctOptionIds);
   case 'sequencing':return ordered();
   case 'sorting':return c.groups?.length>0&&c.items?.length>0&&c.items.every(i=>nonblank(i.text)&&c.groups.some(g=>g.id===i.groupId));
   case 'dropdownBlanks':return blanks();
   case 'swapArrange':return blanks()&&ordered();
   case 'twoTierJustification':return options(c.tier1?.options,c.tier1?.correctOptionIds)&&options(c.tier2?.options,c.tier2?.correctOptionIds);
   case 'branchingSelector':return c.branches?.length>=2&&c.branches.every(b=>options(b.children,[b.correctChildId]))&&c.branches.some(b=>b.id===c.correctBranchId);
   case 'exactSyntax':return c.acceptedAnswers?.some(nonblank);
   case 'arrangeAnswer':return ordered()&&(c.answerMode==='oneWord'?c.acceptableAnswers?.some(nonblank):c.answerMode==='numberExact'?Number.isFinite(Number(c.numericAnswer)):Number(c.rangeMin)<=Number(c.rangeMax));
   default:return false;
  }
 }
 function questionReady(q){const c=q?.interaction||{};return !placeholder(q?.prompt)&&nonblank(q?.domain)&&nonblank(q?.id)&&nonblank(q?.remediation?.moduleId)&&nonblank(q?.feedback?.correct)&&nonblank(q?.feedback?.incorrect)&&interactionReady(c)}
 function metrics(project,checks){
  const checkpointCount=project.modules.reduce((n,m)=>n+levels.filter(l=>questionReady(m.checkpoints[l])).length,0);
  const modules=project.modules.filter(m=>!placeholder(m.title)&&!placeholder(m.outcome)&&!placeholder(m.mapping)&&!placeholder(m.essential)&&levels.every(l=>!placeholder(m.routes[l])&&questionReady(m.checkpoints[l]))).length;
  const questions=[...project.diagnostic,...project.final],items=questions.filter(questionReady).length;
  const categories=checks.map(c=>({...c,stage:/Theme|contrast|Motion|font|Cover/i.test(c.title)?'theme':/Course identity|Pass mark/i.test(c.title)?'settings':/module|mapping|sequence|essential/i.test(c.title)?'modules':/question|item|diagnostic|assessment|distractor|Domain coverage|remediation|interaction|CAT/i.test(c.title)?'questions':'validate'}));
  const categoryReady=stage=>!categories.some(c=>c.stage===stage&&c.level==='error');
  const preview=project.authoringChecks?.previewFingerprint===fingerprint(project);
  const ready={overview:nonblank(project.title)&&nonblank(project.code),settings:categoryReady('settings')&&nonblank(project.title)&&nonblank(project.code),theme:categoryReady('theme'),modules:project.modules.length>0&&modules===project.modules.length&&categoryReady('modules'),questions:questions.length>0&&project.diagnostic.length>0&&project.final.length>0&&items===questions.length&&categoryReady('questions'),preview,validate:checks.every(c=>c.level==='pass')&&modules===project.modules.length&&items===questions.length&&preview};
  return {modules,checkpointCount,items,questions:questions.length,ready,categories,passed:checks.filter(c=>c.level==='pass').length,total:checks.length};
 }
 function Wizard({project,checks,current,navigate,setProject}){
  const m=useMemo(()=>metrics(project,checks),[project,checks]);
  return h('section',{className:'wizard', 'aria-label':'Authoring progress'},
   h('nav',{className:'wizard-steps'},steps.map(step=>h('button',{key:step.id,onClick:()=>navigate(step.id),'aria-current':current===step.id?'step':undefined,className:current===step.id?'current':m.ready[step.id]?'complete':'draft',title:m.ready[step.id]?'Ready':current===step.id?'In progress':'Needs review'},h('span',{className:'step-ring','aria-hidden':true},m.ready[step.id]?'✓':step.step),h('span',null,step.label,h('small',null,m.ready[step.id]?'Complete':current===step.id?'In progress':'Incomplete'))))),
   h('div',{className:'readiness-line'},`Modules: ${m.modules}/${project.modules.length} ready · ${m.checkpointCount}/${project.modules.length*4} checkpoints structurally ready · Questions: ${m.items}/${m.questions} · ${m.passed}/${m.total} validation checks passed`),
   h('details',{className:'readiness-details'},h('summary',null,'Readiness checklist — select an item to edit'),h('p',{className:'ev-muted'},'Structural checks do not replace subject review. Placeholder content remains a draft.'),h('div',{className:'readiness-grid'},m.categories.map((c,i)=>h('button',{key:i,onClick:()=>navigate(c.stage),className:'check-'+c.level},h('strong',null,(c.level==='pass'?'✓ ':c.level==='error'?'! ':'· ')+c.title),h('small',null,c.detail))))));
 }
 function Footer({current,navigate,project,setProject}){
  const index=steps.findIndex(s=>s.id===current);
  return h('footer',{className:'wizard-footer'},h('button',{disabled:index===0,onClick:()=>navigate(steps[index-1].id)},'← Previous step'),h('span',null,`Step ${index+1} of ${steps.length}`),current==='preview'?h('button',{onClick:()=>setProject(p=>({...p,authoringChecks:{...p.authoringChecks,previewFingerprint:fingerprint(p)}}))},'Mark design preview reviewed'):null,h('button',{disabled:index===steps.length-1,onClick:()=>navigate(steps[index+1].id),className:'ev-primary'},'Next step →'));
 }
 function RichTextEditor({value='',onChange,rows=5,...props}){
  const ref=useRef(null);
  function insert(before,after=''){
   const input=ref.current,a=input?.selectionStart??value.length,b=input?.selectionEnd??a,selected=value.slice(a,b);
   const insertedSelection=after?selected:'';const text=value.slice(0,a)+before+insertedSelection+after+value.slice(b);onChange({target:{value:text}});
   requestAnimationFrame(()=>{input.focus();input.setSelectionRange(a+before.length,a+before.length+insertedSelection.length)})
  }
  function script(sup){const chars='0123456789+-=()',map=sup?'⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾':'₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎',input=ref.current,a=input.selectionStart,b=input.selectionEnd;if(a===b){insert(sup?'²':'₂');return}const text=value.slice(a,b).split('').map(c=>chars.includes(c)?map[chars.indexOf(c)]:c).join('');onChange({target:{value:value.slice(0,a)+text+value.slice(b)}});requestAnimationFrame(()=>{input.focus();input.setSelectionRange(a,a+text.length)})}
  const tool=(text,action,title)=>h('button',{type:'button',key:text,onMouseDown:e=>e.preventDefault(),onClick:action,title,'aria-label':title},text);
  return h('div',{className:'rich-editor'},h('div',{className:'format-bar','aria-label':'Formatting tools'},tool('B',()=>insert('**','**'),'Bold selected text'),tool('I',()=>insert('*','*'),'Italic selected text'),tool('Code',()=>insert('`','`'),'Inline code'),tool('x²',()=>script(true),'Convert selected digits to superscript'),tool('x₂',()=>script(false),'Convert selected digits to subscript'),h('details',null,h('summary',null,'Math & Greek'),h('div',{className:'symbol-palette'},['μ','σ','χ²','df','H₀','H₁','p-value','x̄','α','β','γ','δ','θ','λ','π','Ω','Δ','∑','∫','√','∞','±','×','÷','≤','≥','≠','≈','→','ⁿ','ₙ'].map(symbol=>tool(symbol,()=>insert(symbol),'Insert '+symbol))))),h('textarea',{...props,ref,value,rows,onChange,onKeyDown:event=>{if((event.ctrlKey||event.metaKey)&&['b','i'].includes(event.key.toLowerCase())){event.preventDefault();const mark=event.key.toLowerCase()==='b'?'**':'*';insert(mark,mark)}}}),h('small',{className:'ev-muted'},'Bold **text**, italic *text*, code `text` · Unicode math travels with the course.'));
 }
 function Deck({items,selected,onSelect,onMove,kind}){
  const drag=useRef(null),[announcement,setAnnouncement]=useState('');
  function reorder(from,to){if(from===to)return;onMove(from,to);setAnnouncement(`Moved ${kind} ${from+1} to position ${to+1}`)}
  return h('section',{className:'sequence-deck','aria-label':kind+' sequence'},h('div',{className:'deck-cards'},items.map((item,index)=>h('div',{key:item.id,className:'sequence-card '+(selected===index?'selected':''),onDragOver:e=>{if(drag.current!==null)e.preventDefault()},onDrop:e=>{e.preventDefault();if(drag.current!==null)reorder(drag.current,index);drag.current=null}},h('span',{className:'drag-handle',draggable:true,role:'img','aria-label':'Drag to reorder '+kind,onDragStart:e=>{drag.current=index;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',item.id)},onDragEnd:()=>{drag.current=null}},'⠿'),h('button',{className:'deck-select',onClick:()=>onSelect(index),'aria-pressed':selected===index},h('strong',null,`${String(index+1).padStart(2,'0')} · ${item.title||item.prompt||'Untitled'}`),h('small',null,item.domain)),h('div',{className:'move-buttons'},h('button',{disabled:index===0,onClick:()=>reorder(index,index-1),'aria-label':'Move '+kind+' '+(index+1)+' up'},'↑'),h('button',{disabled:index===items.length-1,onClick:()=>reorder(index,index+1),'aria-label':'Move '+kind+' '+(index+1)+' down'},'↓'))))),h('p',{className:'sr-only',role:'status'},announcement));
 }
 // Use the actual learner question renderer and grader, mounted in a ShadowRoot.
 // No iframe, ZIP, storage access or SCORM/LRS writes occur during author simulation.
 let simulate=null;
 function mountSimulation(host,course,q,confidence,onResult){
  if(!simulate){simulate=window.createLearnerSimulation;if(!simulate)throw Error('Learner simulation script unavailable. Reload the complete application.')}
  const shadow=host.shadowRoot||host.attachShadow({mode:'open'});shadow.replaceChildren();
  const style=document.createElement('style');style.textContent=runtimeCSS+(course.theme?.customCss||'')+'\n:host{display:block;color:var(--course-text-primary,#0f172a);font:15px/1.6 system-ui}*{box-sizing:border-box}form{margin:0!important}.question-card{max-width:none!important}button{cursor:pointer}';
  const root=document.createElement('div'),mode=document.createElement('small');shadow.append(style,root);
  const doc=new Proxy(document,{get(target,key){if(key==='getElementById')return id=>id==='app'?root:id==='mode'?mode:shadow.querySelector('#'+id);if(key==='documentElement')return host;if(key==='head')return shadow;const v=target[key];return typeof v==='function'?v.bind(target):v}});
  function Bridge(){this.ok=false;this.init=()=>false;this.load=()=>null;this.interaction=(...args)=>{};this.objective=()=>{};this.save=()=>{};this.commit=()=>{};this.end=()=>{};this.complete=()=>{}}
  function Xapi(){this.ok=false;this.statement=()=>{};this.saveState=()=>{}}
  const win={COURSE:{...course,xapiEnabled:false},ScormBridge:Bridge,XapiBridge:Xapi,StudioFormatting:window.StudioFormatting,scrollTo(){},requestAnimationFrame(){},addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}})};
  simulate(win,doc);win.studioQuestion(q,confidence,onResult);
  return ()=>shadow.replaceChildren();
 }
 function Analytics({question:q,project}){
  const choices=q.interaction?.options||[],texts=choices.map(o=>o.text.trim().toLowerCase()),duplicates=texts.length-new Set(texts).size,empty=texts.filter(t=>!t).length;
  const distractors=choices.filter(o=>!(q.interaction.correctOptionIds||[]).includes(o.id)).length;
  return h('div',{className:'item-analytics'},h('span',null,`${q.prompt.trim().split(/\s+/).filter(Boolean).length} words`),h('span',null,`Tier: ${label(q.tier||'intermediate')}`),h('span',null,choices.length?`${distractors} distractors · ${duplicates} duplicates · ${empty} empty`:'Non-choice interaction'),h('small',null,'Distractor plausibility: author review required. Text checks cannot establish educational plausibility.'),h('small',null,`${project.final.filter(x=>x.domain===q.domain).length} final items cover ${q.domain}`));
 }
 function Simulation({project,question,confidence=false}){
  const host=useRef(null),[reset,setReset]=useState(0),[result,setResult]=useState(''),[error,setError]=useState('');
  useEffect(()=>{setResult('');setError('');if(!question)return;try{return mountSimulation(host.current,project,question,confidence,(answer,correct,certainty,score)=>setResult(`Score: ${Math.round(score*100)}% · ${correct?'Correct':'Review needed'}${certainty?' · '+certainty:''}`))}catch(e){setError(e.message)}},[question,project.theme,reset,confidence]);
  const theme=project.theme||{};
  return h('section',{className:'simulation'},h('div',{className:'ev-pane-heading'},h('h3',null,'Learner simulation'),h('button',{onClick:()=>setReset(n=>n+1)},'Reset answer')),question?h(Analytics,{question,project}):null,error?h('p',{role:'alert'},'Complete the interaction fields to simulate: '+error):null,h('div',{ref:host,className:'simulation-host',style:{background:theme.surface,color:theme.textPrimary,fontFamily:theme.fontFamily,'--course-brand-primary':theme.brandPrimary,'--course-brand-secondary':theme.brandSecondary,'--course-text-primary':theme.textPrimary}}),h('p',{role:'status'},result),h('small',{className:'ev-muted'},'The learner renderer supplies feedback immediately. Continue records the simulated result here; it does not change the course.'));
 }
 function Modules(props){
  const {project,selected,setSelected,module:m,patch,add,duplicate,remove,setProject}=props;
  const [tier,setTier]=useState('essential'),[matrix,setMatrix]=useState(false);
  function reorder(from,to){const id=project.modules[selected]?.id;setProject(p=>({...p,modules:move(p.modules,from,to)}));setSelected(move(project.modules,from,to).findIndex(m=>m.id===id))}
  function field(labelText,key,rows){return h('label',{className:'field',key},h('span',null,labelText),h(rows?'textarea':'input',{value:m[key]||'',rows,onChange:e=>patch({[key]:e.target.value})}))}
  return h('section',{className:'evolution-workspace'},h('div',{className:'ev-heading'},h('div',null,h('p',{className:'eyebrow'},'04 · Module authoring'),h('h1',null,'Shape the learning pathway')),h('button',{className:'ev-primary',onClick:add},'Add module')),
   h(Deck,{items:project.modules,selected,onSelect:setSelected,onMove:reorder,kind:'module'}),
   !m?h('p',null,'Add a module to begin.'):h('div',{className:'live-split'},h('section',{className:'editor-deck'},h('div',{className:'ev-pane-heading'},h('h2',null,m.title),h('button',{onClick:duplicate},'Duplicate'),h('button',{onClick:remove},'Delete')),
   h('div',{className:'form-grid'},field('Title','title'),field('Outcome','outcome',2),field('Mapping standard','mapping'),h('label',{className:'field'},h('span',null,'Module icon'),h('select',{value:m.icon,onChange:e=>patch({icon:e.target.value})},['book','shield','chain','hands','ppe','sparkles','alert','checklist'].map(icon=>h('option',{key:icon,value:icon},icon)))),h('label',{className:'field'},h('span',null,'Domain tag'),h('input',{value:m.domain,onChange:event=>{const domain=event.target.value,old=m.domain;setProject(p=>({...p,modules:p.modules.map(x=>x.id===m.id?{...x,domain,checkpoints:Object.fromEntries(levels.map(l=>[l,{...x.checkpoints[l],domain}]))}:x),diagnostic:p.diagnostic.map(q=>q.remediation.moduleId===m.id?{...q,domain}:q),final:p.final.map(q=>q.remediation.moduleId===m.id?{...q,domain}:q),roles:p.roles.map(r=>({...r,targets:{...r.targets,...(r.targets[old]?{[domain]:r.targets[old]}:{})}}))}))}})),h('label',null,h('input',{type:'checkbox',checked:m.required,onChange:e=>patch({required:e.target.checked})}),' Required module'),h('label',null,h('input',{type:'checkbox',checked:m.fastTrack,onChange:e=>patch({fastTrack:e.target.checked})}),' Allow fast-track')),
   h('div',{className:'ev-segments','aria-label':'Content level'},['essential',...levels].map(l=>h('button',{key:l,'aria-pressed':tier===l,className:tier===l?'active':'',onClick:()=>setTier(l)},l==='essential'?'Essential':label(l)))),
   h(ContentEditor,{label:tier==='essential'?'Essential for every learner':label(tier),description:'Edit content and inspect the live learner card.',text:tier==='essential'?m.essential:m.routes[tier],style:m.contentStyles[tier],media:m.contentMedia[tier],onText:value=>patch(tier==='essential'?{essential:value}:{routes:{...m.routes,[tier]:value}}),onStyle:value=>patch({contentStyles:{...m.contentStyles,[tier]:value}}),onMedia:value=>patch({contentMedia:{...m.contentMedia,[tier]:value}})}),
   tier!=='essential'?h('section',{className:'checkpoint-editor'},h('h3',null,label(tier)+' checkpoint'),h(QuestionEditor,{question:m.checkpoints[tier],modules:project.modules,patch:value=>patch({checkpoints:{...m.checkpoints,[tier]:{...m.checkpoints[tier],...value}}}),compact:true})):h('p',{className:'ev-muted'},'Select a mastery tier to edit its checkpoint.')),
   h('aside',{className:'live-stage',style:{background:'#ffffff',fontFamily:project.theme.fontFamily}},h('div',{className:'ev-pane-heading'},h('h2',null,'Live learner view'),h('button',{'aria-pressed':matrix,onClick:()=>setMatrix(v=>!v)},matrix?'Single tier view':'Mastery comparison matrix')),
   h('p',{className:'ev-muted'},`${String(tier==='essential'?m.essential:m.routes[tier]).trim().split(/\s+/).filter(Boolean).length} words in selected content · ${levels.filter(l=>questionReady(m.checkpoints[l])).length}/4 checkpoints structurally ready`),h('div',{className:matrix?'mastery-matrix':''},(matrix?levels:[tier]).map(l=>h(LearnerCard,{key:l,label:l==='essential'?'Essential':label(l),text:l==='essential'?m.essential:m.routes[l],style:m.contentStyles[l],media:m.contentMedia[l]}))),tier!=='essential'?h(Simulation,{project,question:m.checkpoints[tier],confidence:true}):null)));
 }
 function Assessment(props){
  const {project,setName,setSet,questions,selected,setSelected,question,patch,add,duplicate,remove,setProject}=props;
  function reorder(from,to){const id=questions[selected]?.id;const result=move(questions,from,to);setProject(p=>({...p,[setName]:move(p[setName],from,to)}));setSelected(result.findIndex(q=>q.id===id))}
  return h('section',{className:'evolution-workspace'},h('div',{className:'ev-heading'},h('div',null,h('p',{className:'eyebrow'},'05 · Visual assessment builder'),h('h1',null,'Build and try each interaction')),h('button',{className:'ev-primary',onClick:add},'Add question')),h('div',{className:'ev-segments'},['diagnostic','final'].map(pool=>h('button',{key:pool,'aria-pressed':setName===pool,onClick:()=>setSet(pool),className:pool===setName?'active':''},`${pool==='diagnostic'?'Diagnostic':'Final'} · ${project[pool].length}`))),h(Deck,{items:questions,selected,onSelect:setSelected,onMove:reorder,kind:'question'}),!question?h('p',null,'Add a question to begin.'):h('div',{className:'live-split'},h('section',{className:'editor-deck'},h('div',{className:'ev-pane-heading'},h('h2',null,'Question '+(selected+1)),h('button',{onClick:duplicate},'Duplicate'),h('button',{onClick:remove},'Delete')),h(QuestionEditor,{question,modules:project.modules,patch})),h('aside',{className:'live-stage'},h(Simulation,{key:question.id,project,question,confidence:setName==='diagnostic'}))));
 }
 return {Wizard,Footer,Modules,Assessment,RichTextEditor,move,metrics,fingerprint,mountSimulation};
};
