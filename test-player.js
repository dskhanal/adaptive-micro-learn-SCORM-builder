/* Local author test harness. This is not a SCORM certification engine. */
const $=id=>document.getElementById(id);
let id=new URLSearchParams(location.search).get('id'),pkg,project={},run=null,busy=false,skipUsed=false;
const notice=message=>{$('notice').textContent=message};
window.testNotice=notice;
function showTracking(){
 const d=run?.data||{};
 $('status').textContent='Completion: '+(d['cmi.completion_status']||d['cmi.core.lesson_status']||'incomplete')+' · Success: '+(d['cmi.success_status']||'unknown')+' · Score: '+(d['cmi.score.raw']??d['cmi.core.score.raw']??'—');
 $('log').textContent=run?.calls.length?JSON.stringify(run.calls.slice(-150),null,2):'No calls yet.';
}
function record(attempt,method,key,value){attempt.calls.push({time:new Date().toISOString(),method,key,value});if(run===attempt)showTracking()}
function persist(attempt){localStorage.setItem('scorm-attempt:'+attempt.id,JSON.stringify({data:attempt.data,calls:attempt.calls,skipUsed:attempt.skipUsed}))}
function api(attempt,v12=false){
 const names=v12?['LMSInitialize','LMSFinish','LMSGetValue','LMSSetValue','LMSCommit','LMSGetLastError','LMSGetErrorString','LMSGetDiagnostic']:['Initialize','Terminate','GetValue','SetValue','Commit','GetLastError','GetErrorString','GetDiagnostic'];
 const valid=()=>{if(attempt.active&&!attempt.ended)return true;attempt.error=v12?'301':attempt.ended?'133':'132';return false};
 const f=[
 ()=>{if(attempt.active||attempt.ended){attempt.error='101';return 'false'}attempt.active=true;attempt.error='0';record(attempt,names[0]);return 'true'},
 ()=>{if(!valid())return 'false';record(attempt,names[1]);try{persist(attempt)}catch{attempt.error='101';return 'false'}attempt.ended=true;attempt.active=false;return 'true'},
 key=>{if(!valid())return '';attempt.error='0';let value=attempt.data[key]??'';if(key.endsWith('._count')){const prefix=key.slice(0,-6);value=String(new Set(Object.keys(attempt.data).filter(k=>k.startsWith(prefix)).map(k=>k.slice(prefix.length).split('.')[0]).filter(k=>/^\d+$/.test(k))).size)}record(attempt,names[2],key,value);return value},
 (key,value)=>{if(!valid())return 'false';attempt.data[key]=String(value);attempt.error='0';record(attempt,names[3],key,String(value));return 'true'},
 ()=>{if(!valid())return 'false';try{record(attempt,names[4]);persist(attempt);attempt.error='0';return 'true'}catch{attempt.error='101';return 'false'}},
 ()=>attempt.error,code=>code==='0'?'No error':'Test runtime error '+code,()=>attempt.error
 ];return Object.fromEntries(names.map((n,i)=>[n,f[i]]));
}
const controls=()=>{try{return $('course').contentWindow.__SCORM_TEST_CONTROL}catch{return null}};
window.testControlsReady=()=>{
 for(const key of ['role','module','level','jump'])$(key).disabled=false;
 controls()?.setSkip($('skip').checked);$('next').disabled=!$('skip').checked;
};
function populate(){
 for(const [key,items] of [['role',project.roles||[]],['module',project.modules||[]]]){
  $(key).replaceChildren();for(const item of items){const option=document.createElement('option');option.value=item.id;option.textContent=item.label||item.title||item.id;$(key).append(option)}
 }
 if(project.defaultRoleId)$('role').value=project.defaultRoleId;
}
async function launch(resume){
 if(busy)return;busy=true;
 for(const key of ['restart','resume','role','module','level','jump','next'])$(key).disabled=true;
 try{
  // Retire the old iframe before exposing a new API. Its unload cannot corrupt the next attempt.
  const old=$('course'),frame=old.cloneNode(false);
  old.remove();frame.src='about:blank';document.querySelector('main').append(frame);
  if(run?.active){try{persist(run)}catch{}run.active=false;run.ended=true;}
  run={id,data:{'cmi.learner_id':'local-tester','cmi.learner_name':'Local Tester','cmi.core.student_id':'local-tester','cmi.core.student_name':'Local Tester','cmi.completion_status':'incomplete','cmi.success_status':'unknown','cmi.entry':'ab-initio','cmi.core.entry':'ab-initio','cmi.mode':'normal','cmi.core.lesson_mode':'normal','cmi.credit':'credit','cmi.core.credit':'credit','cmi.suspend_data':'','cmi.location':''},calls:[],active:false,ended:false,error:'0',skipUsed:false};
  if(resume){let saved;try{saved=JSON.parse(localStorage.getItem('scorm-attempt:'+id)||'null')}catch{notice('Saved attempt was unreadable; starting fresh.')}
   if(saved){run.data=saved.data;run.calls=saved.calls||[];run.skipUsed=!!saved.skipUsed;run.data['cmi.entry']='resume';run.data['cmi.core.entry']='resume';}
  }
  $('skip').checked=false;$('skip-label').textContent='Off';
  window.API_1484_11=api(run);window.API=api(run,true);showTracking();
  // Our exported launcher remains unchanged; author testing goes straight to its content page.
  const builtIn=pkg.files['player.html']&&pkg.files['runtime.js']&&new TextDecoder().decode(pkg.files['runtime.js']).includes('var C=window.COURSE,LEVELS=');
  frame.src='./__finalised/'+id+'/'+(builtIn?'player.html':pkg.entry);
  notice('Course loaded directly in the right frame. Draft placeholders may appear where content is unfinished.');
 }catch(error){notice(error.message)}finally{busy=false;$('restart').disabled=false;$('resume').disabled=false;}
}
async function load(){
 try{pkg=await ScormFiles.get(id);if(!pkg)throw Error('Course files unavailable. Use Test in the builder or load a SCORM folder.');
 project=JSON.parse(new TextDecoder().decode(pkg.files['course.json']||new TextEncoder().encode('{}')));
 await ScormFiles.ready();$('title').textContent=pkg.title;$('save').disabled=false;populate();await launch(false);
 }catch(error){notice(error.message)}
}
$('folder').onchange=async event=>{
 try{const files={};for(const f of event.target.files){const name=f.webkitRelativePath.split('/').slice(1).join('/');files[name]=new Uint8Array(await f.arrayBuffer())}id=await ScormFiles.save(files);history.replaceState(null,'','?id='+id);await load()}catch(error){notice(error.message)}
};
$('save').onclick=async()=>{
 try{
 if(!window.showDirectoryPicker)throw Error('Folder saving requires Chrome or Edge on localhost/HTTPS.');
 const parent=await showDirectoryPicker({mode:'readwrite'}),folderName=ProjectFiles.name(project,'SCORM','folder').replace(/\.folder$/,'');
 const folder=await parent.getDirectoryHandle(folderName,{create:true});
 for(const [name,bytes] of Object.entries(pkg.files)){const parts=name.split('/'),filename=parts.pop();let dir=folder;for(const part of parts)dir=await dir.getDirectoryHandle(part,{create:true});const handle=await dir.getFileHandle(filename,{create:true}),writer=await handle.createWritable();await writer.write(bytes);await writer.close()}
 notice('Saved '+folderName+'. Test controls are not included. Check draft placeholders before LMS use.');
 }catch(error){notice(error.name==='AbortError'?'Folder save cancelled.':error.message)}
};
$('restart').onclick=()=>launch(false);$('resume').onclick=()=>launch(true);
$('skip').onchange=()=>{
 const enabled=$('skip').checked;$('skip-label').textContent=enabled?'On':'Off';if(run&&enabled){run.skipUsed=true;record(run,'Test.SkipRestrictions','enabled','true')}
 controls()?.setSkip(enabled);$('next').disabled=!enabled||!controls();
};
$('jump').onclick=()=>{try{if(!controls())throw Error('Jump controls are unavailable for this course.');controls().jump($('role').value,$('module').value,$('level').value);record(run,'Test.Jump',$('module').value,JSON.stringify({role:$('role').value,level:$('level').value,skip:$('skip').checked}))}catch(error){notice(error.message)}};
$('next').onclick=()=>{try{controls()?.next();record(run,'Test.SkipStep')}catch(error){notice(error.message)}};
$('report').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({id,restrictionsSkipped:run?.skipUsed||false,data:run?.data||{},calls:run?.calls||[]},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=ProjectFiles.name(project,'Test-data','json');a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
window.addEventListener('pagehide',()=>{if(run?.active)try{persist(run)}catch{}});
if(id)load();else notice('Use Test in the builder or load a SCORM folder.');
