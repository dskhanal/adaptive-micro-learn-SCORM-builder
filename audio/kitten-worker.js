/* Dedicated synthesis worker: all model/runtime/phonemizer assets are local. */
importScripts('./vendor/kittentts-web.js');
let engine=null,ready=null,queue=Promise.resolve();
async function bytes(path){const response=await fetch(new URL(path,self.location.href));if(!response.ok)throw Error('Missing audio asset: '+path+' (HTTP '+response.status+')');return new Uint8Array(await response.arrayBuffer())}
async function init(id){
 if(engine)return engine;
 if(!ready)ready=(async()=>{
  postMessage({id,type:'progress',message:'Loading Kitten TTS model…'});
  const [onnxData,voicesData,rulesData,listData]=await Promise.all([bytes('./models/kitten_tts_nano_v0_8.onnx'),bytes('./models/voices.npz'),bytes('./vendor/en_rules'),bytes('./vendor/en_list')]);
  const phonemizer=new KittenTTSWeb.CEPhonemizer({rulesText:new TextDecoder().decode(rulesData),listText:new TextDecoder().decode(listData),dialect:'en-us'});
  engine=await KittenTTSWeb.KittenTTS.create({model:'nano-int8',modelFiles:{onnxData,voicesData},phonemizer,analytics:false,ortNumThreads:1,ortWasmPath:{wasm:new URL('./vendor/ort-wasm-simd-threaded.wasm',self.location.href).href},maxTokensPerChunk:250},progress=>postMessage({id,type:'progress',message:'Preparing voice '+Math.round(progress*100)+'%'}));
  return engine;
 })().catch(error=>{ready=null;throw error});
 return ready;
}
self.onmessage=event=>{
 const {id,text,voice}=event.data||{};
 if(typeof id!=='number'||typeof text!=='string')return;
 queue=queue.catch(()=>{}).then(async()=>{
  try{
   if(!text.trim())throw Error('There is no text to narrate.');
   if(text.length>30000)throw Error('Split this content into shorter micro-learning sections (under 30,000 characters).');
   const tts=await init(id);postMessage({id,type:'progress',message:'Generating speech…'});
   const result=await tts.generate(text,{voice:voice||'bella',speed:1});
   const wav=result.wavData();const buffer=wav.buffer.slice(wav.byteOffset,wav.byteOffset+wav.byteLength);
   postMessage({id,type:'audio',buffer},[buffer]);
  }catch(error){postMessage({id,type:'error',message:error?.message||String(error)})}
 });
};
