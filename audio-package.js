/* Optional SCORM packaging adapter. No model loading while typing. */
(function(global){
 'use strict';
 const base=new URL('.',document.currentScript.src),cache=new Map();
 async function read(path){if(!cache.has(path))cache.set(path,fetch(new URL(path,base)).then(async r=>{if(!r.ok)throw Error('Audio asset unavailable: '+path);return new Uint8Array(await r.arrayBuffer())}).catch(e=>{cache.delete(path);throw e}));return cache.get(path)}
 async function add(zip,project){
  if(project.narration?.enabled===false)return zip;
  const manifest=JSON.parse(new TextDecoder().decode(await read('audio/asset-manifest.json')));
  const paths=['audio/asset-manifest.json',...manifest.files.map(f=>f.path)];
  await Promise.all(paths.map(async path=>zip.file(path,await read(path))));
  const player=await zip.file('player.html').async('string');
  zip.file('player.html',player.replace('</head>','<link rel="stylesheet" href="audio/audio-player.css"></head>').replace('<script src="runtime.js"','<script src="audio/audio-player.js"></script><script src="runtime.js"'));
  const xml=await zip.file('imsmanifest.xml').async('string');
  zip.file('imsmanifest.xml',xml.replace('</resource>',paths.map(path=>'<file href="'+path+'"/>').join('\n')+'</resource>'));
  return zip;
 }
 global.AudioPackage={add};
})(window);
