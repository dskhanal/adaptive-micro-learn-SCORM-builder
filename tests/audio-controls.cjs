const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.style={};this.value='1';this.src='';this.isConnected=true;this.paused=true;this.currentTime=0}
 append(...nodes){this.children.push(...nodes)}setAttribute(){}removeAttribute(k){this[k]=''}load(){}remove(){this.isConnected=false}pause(){this.paused=true}async play(){this.paused=false;this.onplay?.()}
}
let worker,revoked=0,requests=0;
class Worker{constructor(){worker=this}postMessage(m){requests++;this.message=m}terminate(){this.terminated=true}}
class MockURL extends URL{static createObjectURL(){return 'blob:test'}static revokeObjectURL(){revoked++}}
const context={window:{addEventListener(){}},document:{currentScript:{src:'https://local/audio/audio-player.js'},documentElement:{},createElement:t=>new Element(t)},URL:MockURL,Worker,Blob,MutationObserver:class{observe(){}},console};vm.createContext(context);vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../audio/audio-player.js'),'utf8'),context);
const api=context.window.MicroAudio;
function parts(host){const box=host.children[0];return {play:box.children[1].children[0],stop:box.children[1].children[1],speed:box.children[1].children[2].children[0],audio:box.children[2],status:box.children[3]}}
(async()=>{
 assert.equal(api.speechText('**Mean** *value* `x` < 5'),'Mean value x < 5');
 const disabled=new Element('div');api.attach(disabled,{text:'Hello',config:{enabled:false}});assert.equal(disabled.children.length,0);
 const first=new Element('div'),dispose=api.attach(first,{text:'Hello',config:{voice:'jasper'}}),a=parts(first);
 const ready=a.play.onclick();assert(a.play.disabled);assert.equal(worker.message.voice,'jasper');worker.onmessage({data:{id:worker.message.id,type:'audio',buffer:new ArrayBuffer(44)}});await ready;assert(!a.audio.paused);assert(!a.play.disabled);
 a.speed.value='1.5';a.speed.onchange();assert.equal(a.audio.playbackRate,1.5);
 const second=new Element('div'),dispose2=api.attach(second,{text:'Hello',config:{voice:'jasper'}}),b=parts(second);await b.play.onclick();assert.equal(requests,1);assert(a.audio.paused);assert(!b.audio.paused);
 b.audio.currentTime=2;b.stop.onclick();assert(b.audio.paused);assert.equal(b.audio.currentTime,0);
 dispose();dispose2();assert.equal(revoked,2);
 const third=new Element('div');api.attach(third,{text:'New text'});const c=parts(third),pending=c.play.onclick();c.stop.onclick();await pending;assert(worker.terminated);assert(!c.play.disabled);assert.equal(c.status.textContent,'Stopped.');
 console.log('PASS: disabled sections, voice selection, cached replay, one-at-a-time playback, speed, stop/cancel and URL cleanup');
})().catch(e=>{console.error(e);process.exit(1)});
