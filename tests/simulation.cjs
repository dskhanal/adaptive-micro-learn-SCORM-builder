process.chdir(require('path').resolve(__dirname,'..'));
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={console,Blob,TextEncoder,TextDecoder,Uint8Array,ArrayBuffer,setTimeout,clearTimeout,setImmediate,URL,performance,window:{},localStorage:{getItem(){return null}},document:{createElement(){return {relList:{supports(){return true}}}}}};context.globalThis=context;vm.createContext(context);
for(const file of ['preview-bridge.js','studio-formatting.js','learner-simulation.js','studio-evolution.js'])vm.runInContext(fs.readFileSync(''+file,'utf8'),context);
let s=fs.readFileSync('assets/index-Dm74_Rbp.js','utf8');s=s.slice(0,s.lastIndexOf('(0,y.createRoot)'));vm.runInContext(s,context);
vm.runInContext('window.__course=L();window.__checks=Je(window.__course,{status:"idle",items:[]});window.__normalize=H;window.__blank=it;window.__deps={ContentEditor:Ct,QuestionEditor:jt,LearnerCard:Yt,steps:qe,levels:b,label:z,runtimeSource:xe,runtimeCSS:Se+Ce+we+Te+Ee};window.__react=v',context);

vm.runInContext('window.__types=x;window.__interaction=ae;',context);
const {Node,document}=require('./dom-double.cjs');context.document=document;
const R={createElement(){},useState(){},useRef(){},useEffect(){},useMemo(){}};
const ext=context.window.createStudioEvolution(R,context.window.__deps);
const course=context.window.__course;
for(const kind of context.window.__types){
 const host=new Node('host'),q={...course.final[0],id:'test-'+kind,prompt:'**Question** '+kind,type:kind,interaction:context.window.__interaction(kind,{})};let result;
 ext.mountSimulation(host,course,q,false,(answer,correct,confidence,score)=>{result={correct,score}});
 const root=host.shadowRoot;
 const inputs=()=>root.querySelectorAll('input'),selects=()=>root.querySelectorAll('select');
 const click=text=>{const button=root.querySelectorAll('button').find(b=>b.textContent===text);assert(button,'button '+text+' for '+kind);button.onclick()};
 if(['multipleChoice','multiSelect','trueFalse'].includes(kind))inputs()[0].checked=true;
 if(['sequencing','swapArrange','arrangeAnswer'].includes(kind))for(const item of q.interaction.items)click(item.text);
 if(kind==='sorting')selects().forEach((select,i)=>{select.value=q.interaction.items[i].groupId;select.onchange()});
 if(['dropdownBlanks','swapArrange'].includes(kind))selects().forEach((select,i)=>select.value=q.interaction.blanks[i].correctOptionId);
 if(kind==='branchingSelector'){selects()[0].value=q.interaction.correctBranchId;selects()[0].onchange();selects()[1].value=q.interaction.branches[0].correctChildId}
 if(kind==='twoTierJustification'){inputs()[0].checked=true;click('Lock Tier 1 and continue');inputs()[3].checked=true}
 if(kind==='exactSyntax')inputs()[0].value=q.interaction.acceptedAnswers[0];
 if(kind==='arrangeAnswer')inputs()[0].value=q.interaction.acceptableAnswers[0];
 click('Submit answer');assert(root.textContent.includes('Correct.'),'immediate feedback for '+kind);click('Continue');assert.equal(result.correct,true,kind);assert.equal(result.score,1,kind);
 console.log('PASS simulation: '+kind+' correct answer graded at 100%');
}
// Incorrect/partial answers must preserve the real learner feedback and scoring.
for(const [kind,expected] of [['multipleChoice',0],['sorting',0.5],['sequencing',1/3]]){
 const host=new Node('host'),q={...course.final[0],id:'wrong-'+kind,prompt:'Check feedback',type:kind,interaction:context.window.__interaction(kind,{})};let result;
 ext.mountSimulation(host,course,q,false,(answer,correct,confidence,score)=>{result={correct,score}});
 const root=host.shadowRoot;
 const click=text=>root.querySelectorAll('button').find(b=>b.textContent===text).onclick();
 if(kind==='multipleChoice')root.querySelectorAll('input')[1].checked=true;
 if(kind==='sorting')root.querySelectorAll('select').forEach(select=>{select.value='group-1';select.onchange()});
 if(kind==='sequencing')for(const item of [...q.interaction.items].reverse())click(item.text);
 click('Submit answer');assert(root.querySelectorAll('.micro-review').length===1,'remediation shown');click('Continue');assert.equal(result.correct,false);assert(Math.abs(result.score-expected)<0.0001);
 console.log('PASS simulation: '+kind+' incorrect/partial score and remediation');
}
