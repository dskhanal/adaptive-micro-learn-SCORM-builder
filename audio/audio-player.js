/* Provider-independent player UI. Kitten TTS is the default synthesis adapter. */
(function(root){
 const base=new URL('.',document.currentScript?.src||location.href);
 const voices=['bella','jasper','luna','bruno','rosie','hugo','kiki','leo'];
 let worker=null,serial=0,playing=null;
 const pending=new Map(),cache=new Map(),mounted=new Set();let cacheBytes=0;
 function speechText(value){return String(value||'').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\*([^*]+)\*/g,'$1').replace(/`([^`]+)`/g,'$1').replace(/\s+/g,' ').trim()}
 function workerReady(){
  if(worker)return worker;
  worker=new Worker(new URL('./kitten-worker.js',base));
  worker.onmessage=event=>{const msg=event.data,task=pending.get(msg.id);if(!task)return;if(msg.type==='progress')task.progress(msg.message);else{pending.delete(msg.id);msg.type==='audio'?task.resolve(new Blob([msg.buffer],{type:'audio/wav'})):task.reject(Error(msg.message))}};
  worker.onerror=()=>cancelAll('The audio engine could not start. Check that the audio folder and WebAssembly files are available.');
  return worker;
 }
 function cancelAll(message='Generation stopped.'){
  worker?.terminate();worker=null;for(const task of pending.values())task.reject(Error(message));pending.clear();
 }
 function generate(text,voice,onProgress){
  const key=JSON.stringify(['kitten-nano-int8-0.8',voice,text]);
  if(cache.has(key)){const blob=cache.get(key);cache.delete(key);cache.set(key,blob);return Promise.resolve(blob)}
  return new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{progress:onProgress,resolve:blob=>{
   if(blob.size<=48*1024*1024){if(cache.has(key)){cacheBytes-=cache.get(key).size;cache.delete(key)}while(cache.size&&(cacheBytes+blob.size>48*1024*1024||cache.size>=12)){const old=cache.keys().next().value;cacheBytes-=cache.get(old).size;cache.delete(old)}cache.set(key,blob);cacheBytes+=blob.size}
   resolve(blob);
  },reject});try{workerReady().postMessage({id,text,voice})}catch(error){pending.delete(id);reject(error)}});
 }
 function attach(host,{text,label='Micro-learning audio',config={}}={}){
  if(config.enabled===false||!speechText(text))return ()=>{};
  const box=document.createElement('section');box.className='micro-audio';box.setAttribute('aria-label',label);
  const heading=document.createElement('strong');heading.textContent='Listen to this section';
  const tools=document.createElement('div');tools.className='micro-audio-tools';
  const play=document.createElement('button');play.type='button';play.textContent='Generate & play';
  const stop=document.createElement('button');stop.type='button';stop.textContent='Stop';
  const audio=document.createElement('audio');audio.controls=true;audio.preload='none';audio.setAttribute('aria-label',label);audio.style.width='100%';
  const speedLabel=document.createElement('label');speedLabel.textContent='Speed ';
  const speed=document.createElement('select');speed.setAttribute('aria-label','Playback speed');for(const rate of [.75,1,1.25,1.5,2]){const o=document.createElement('option');o.value=String(rate);o.textContent=rate+'×';if(rate===1)o.selected=true;speed.append(o)}speed.onchange=()=>{audio.playbackRate=Number(speed.value)};speedLabel.append(speed);
  const status=document.createElement('small');status.setAttribute('role','status');status.textContent='Kitten TTS · '+(config.voice||'bella')+' · generated on this device';
  tools.append(play,stop,speedLabel);box.append(heading,tools,audio,status);host.append(box);
  let url=null,disposed=false,generating=false,token=0;
  const entry={host:box,dispose};mounted.add(entry);
  audio.onplay=()=>{if(playing&&playing!==audio)playing.pause();playing=audio};
  audio.onended=()=>{play.textContent='Replay';status.textContent='Finished.'};
  audio.onerror=()=>{status.textContent='Audio playback failed. Generate the clip again.';if(url){URL.revokeObjectURL(url);url=null}play.textContent='Generate & play'};
  play.onclick=async()=>{
   const generation=++token;if(playing&&playing!==audio)playing.pause();
   try{
    if(!url){generating=true;play.disabled=true;status.textContent='Preparing narration…';const blob=await generate(speechText(text),voices.includes(config.voice)?config.voice:'bella',message=>{if(!disposed&&generation===token)status.textContent=message});if(disposed||generation!==token)return;url=URL.createObjectURL(blob);audio.src=url;}
    audio.playbackRate=Number(speed.value);await audio.play();if(!disposed&&generation===token){status.textContent='Playing. Use the controls to pause, seek or adjust volume.';play.textContent='Play / resume'}
   }catch(error){if(!disposed&&generation===token)status.textContent=error.name==='NotAllowedError'?'Audio is ready. Press Play in the audio controls.':error.message}
   finally{if(!disposed&&generation===token){generating=false;play.disabled=false}}
  };
  stop.onclick=()=>{++token;audio.pause();if(audio.src)audio.currentTime=0;if(generating)cancelAll();generating=false;play.disabled=false;play.textContent=url?'Play':'Generate & play';status.textContent='Stopped.'};
  function dispose(){if(disposed)return;disposed=true;++token;audio.pause();audio.removeAttribute('src');audio.load?.();if(url)URL.revokeObjectURL(url);if(playing===audio)playing=null;mounted.delete(entry);box.remove();if(generating&&!Array.from(mounted).some(e=>e.host.isConnected))cancelAll()}
  return dispose;
 }
 // Stop detached content during course navigation, including shadow-root previews.
 const observer=new MutationObserver(()=>{for(const entry of mounted)if(!entry.host.isConnected)entry.dispose()});observer.observe(document.documentElement,{childList:true,subtree:true});
 root.addEventListener('pagehide',()=>{for(const entry of [...mounted])entry.dispose();cancelAll();cache.clear();cacheBytes=0});
 root.MicroAudio={attach,speechText,voices,cancel:cancelAll};
})(window);
