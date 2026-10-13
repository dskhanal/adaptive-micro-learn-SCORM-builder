process.chdir(require('path').resolve(__dirname,'..'));
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={console,Blob,TextEncoder,TextDecoder,Uint8Array,ArrayBuffer,setTimeout,clearTimeout,setImmediate,URL,performance,window:{},localStorage:{getItem(){return null}},document:{createElement(){return {relList:{supports(){return true}}}}}};context.globalThis=context;vm.createContext(context);
for(const file of ['preview-bridge.js','studio-formatting.js','learner-simulation.js','studio-evolution.js'])vm.runInContext(fs.readFileSync(''+file,'utf8'),context);
let s=fs.readFileSync('assets/index-Dm74_Rbp.js','utf8');s=s.slice(0,s.lastIndexOf('(0,y.createRoot)'));vm.runInContext(s,context);
vm.runInContext('window.__course=L();window.__checks=Je(window.__course,{status:"idle",items:[]});window.__normalize=H;window.__blank=it;window.__deps={ContentEditor:Ct,QuestionEditor:jt,LearnerCard:Yt,steps:qe,levels:b,label:z,runtimeSource:xe,runtimeCSS:Se+Ce+we+Te+Ee};window.__react=v',context);
const el=(type,props,...children)=>({type,props:{...props,children}});const effects=[];let states=[];
const R={createElement:el,useState:x=>{const value=typeof x==='function'?x():x;states.push(value);return [value,()=>{}]},useRef:()=>({current:null}),useEffect:fn=>effects.push(fn),useMemo:fn=>fn()};
const ext=context.window.createStudioEvolution(R,context.window.__deps),p=context.window.__course,checks=context.window.__checks;
const nodes=[];function walk(n){if(Array.isArray(n))return n.forEach(walk);if(n&&typeof n==='object'){nodes.push(n);walk(n.props?.children)}}
walk(ext.Wizard({project:p,checks,current:'modules',navigate(){}}));assert.equal(nodes.filter(n=>n.type==='button'&&n.props['aria-current']==='step').length,1);assert.equal(nodes.filter(n=>n.props?.className?.startsWith('check-')).length,checks.length);
assert.deepEqual(ext.move([{id:'a'},{id:'b'},{id:'c'}],0,2).map(x=>x.id),['b','c','a']);assert.equal(ext.move(p.modules,-1,2),p.modules);
const baseline=ext.fingerprint(p);assert.equal(ext.fingerprint({...p,authoringChecks:{previewFingerprint:baseline}}),baseline);assert.notEqual(ext.fingerprint({...p,title:p.title+' new'}),baseline);
const draft=ext.metrics(context.window.__blank(),[]);assert.equal(draft.ready.modules,false);assert.equal(draft.ready.questions,false);
let moved;const selection=[];const props={project:p,selected:0,setSelected:i=>selection.push(i),module:p.modules[0],patch(){},add(){},duplicate(){},remove(){},setProject:fn=>{moved=fn(p)}};
nodes.length=0;walk(ext.Modules(props));const deck=nodes.find(n=>n.props?.kind==='module');deck.props.onMove(0,1);assert.equal(moved.modules[1].id,p.modules[0].id);assert.equal(selection[0],1);assert.equal(moved.final,p.final);
nodes.length=0;walk(ext.Assessment({project:p,setName:'final',setSet(){},questions:p.final,selected:0,setSelected:i=>selection.push(i),question:p.final[0],patch(){},add(){},duplicate(){},remove(){},setProject:fn=>{moved=fn(p)}}));nodes.find(n=>n.props?.kind==='question').props.onMove(0,1);assert.equal(moved.final[1].id,p.final[0].id);assert.equal(moved.modules,p.modules);
assert.equal(context.window.StudioFormatting.html('**mean** *sample* `x` <img src=x onerror=alert(1)>'),' <strong>mean</strong>'.trim()+' <em>sample</em> <code>x</code> &lt;img src=x onerror=alert(1)&gt;');
console.log('PASS: seven-stage navigation, '+checks.length+' live checks, placeholder readiness, review invalidation, stable-ID module/question moves, safe formatting');
