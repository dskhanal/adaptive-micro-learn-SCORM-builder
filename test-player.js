/* A local test harness, not a SCORM certification or sequencing engine. */
const $=id=>document.getElementById(id);
let id=new URLSearchParams(location.search).get('id'),pkg,data={},calls=[],active=false,ended=false,error='0';
const status=message=>{$('status').textContent=message};
function record(method,key,value){calls.push({time:new Date().toISOString(),method,key,value});$('log').textContent=JSON.stringify(calls,null,2);status('Completion: '+(data['cmi.completion_status']||data['cmi.core.lesson_status']||'unknown')+' · Success: '+(data['cmi.success_status']||'unknown')+' · Score: '+(data['cmi.score.raw']||data['cmi.core.score.raw']||'—'))}
function persist(){localStorage.setItem('scorm-attempt:'+id,JSON.stringify({data,calls}))}
function api(v12=false){
 const names=v12?['LMSInitialize','LMSFinish','LMSGetValue','LMSSetValue','LMSCommit','LMSGetLastError','LMSGetErrorString','LMSGetDiagnostic']:['Initialize','Terminate','GetValue','SetValue','Commit','GetLastError','GetErrorString','GetDiagnostic'];
 const fail=()=>{error=v12?'301':ended?'133':'132';return false};
 const valid=()=>active&&!ended||fail();
 const f=[
 ()=>{if(active||ended){error='101';return 'false'}active=true;error='0';record(names[0]);return 'true'},
 ()=>{if(!valid())return 'false';record(names[1]);try{persist()}catch{error='101';return 'false'}ended=true;active=false;return 'true'},
 key=>{if(!valid())return '';error='0';let value=data[key]||'';if(key.endsWith('._count')){const prefix=key.slice(0,-6);value=String(new Set(Object.keys(data).filter(k=>k.startsWith(prefix)).map(k=>k.slice(prefix.length).split('.')[0]).filter(k=>/^\d+$/.test(k))).size)}record(names[2],key,value);return value},
 (key,value)=>{if(!valid())return 'false';data[key]=String(value);error='0';record(names[3],key,String(value));return 'true'},
 ()=>{if(!valid())return 'false';try{record(names[4]);persist();error='0';return 'true'}catch{error='101';return 'false'}},
 ()=>error,code=>code==='0'?'No error':'Test runtime error '+code,()=>error
 ];return Object.fromEntries(names.map((n,i)=>[n,f[i]]));
}
function launch(resume){
 $('course').src='about:blank';
 data={'cmi.learner_id':'local-tester','cmi.learner_name':'Local Tester','cmi.core.student_id':'local-tester','cmi.core.student_name':'Local Tester','cmi.completion_status':'unknown','cmi.success_status':'unknown','cmi.entry':'ab-initio','cmi.core.entry':'ab-initio','cmi.mode':'normal','cmi.core.lesson_mode':'normal','cmi.credit':'credit','cmi.core.credit':'credit','cmi.suspend_data':'','cmi.location':''};calls=[];
 if(resume){const saved=JSON.parse(localStorage.getItem('scorm-attempt:'+id)||'null');if(saved){data=saved.data;calls=saved.calls||[];data['cmi.entry']='resume';data['cmi.core.entry']='resume'}}
 active=false;ended=false;error='0';window.API_1484_11=api();window.API=api(true);
 $('course').src='./__finalised/'+id+'/'+pkg.entry;
 status('Testing the finalised files. Select Open Course Window if the course launcher requests it.');
}
async function load(){
 try{pkg=await ScormFiles.get(id);if(!pkg)throw Error('Finalised files unavailable. Return to the builder or load a folder.');
 await ScormFiles.ready();$('title').textContent=pkg.title;for(const key of ['save','restart','resume'])$(key).disabled=false;launch(false);
 }catch(e){status(e.message)}
}
$('folder').onchange=async event=>{
 try{const files={};for(const f of event.target.files){const name=f.webkitRelativePath.split('/').slice(1).join('/');files[name]=new Uint8Array(await f.arrayBuffer())}id=await ScormFiles.save(files);history.replaceState(null,'','?id='+id);await load()}catch(e){status(e.message)}
};
$('save').onclick=async()=>{
 try{
 if(!window.showDirectoryPicker)throw Error('Folder saving requires Chrome or Edge on localhost/HTTPS. Alternatively export the SCORM ZIP in the builder and extract it.');
 const parent=await showDirectoryPicker({mode:'readwrite'});
 const folder=await parent.getDirectoryHandle('scorm-'+id,{create:true});
 for(const [name,bytes] of Object.entries(pkg.files)){const parts=name.split('/');const filename=parts.pop();let dir=folder;for(const part of parts)dir=await dir.getDirectoryHandle(part,{create:true});const handle=await dir.getFileHandle(filename,{create:true});const writer=await handle.createWritable();await writer.write(bytes);await writer.close()}
 status('Saved scorm-'+id+'. These are the same bytes used by this test. ZIP the folder contents with imsmanifest.xml at the ZIP root.');
 }catch(e){status(e.name==='AbortError'?'Folder save cancelled.':e.message)}
};
$('restart').onclick=()=>launch(false);$('resume').onclick=()=>launch(true);
$('report').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({id,data,calls},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='scorm-test-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
window.addEventListener('pagehide',()=>{if(id&&active)try{persist()}catch{}});
if(id)load();
