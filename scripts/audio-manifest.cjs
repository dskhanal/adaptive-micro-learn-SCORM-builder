/* Run after changing any file under audio/. */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'audio');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)])}
const files=walk(dir).filter(p=>!p.endsWith('/asset-manifest.json')).sort().map(p=>({path:path.relative(root,p).split(path.sep).join('/'),bytes:fs.statSync(p).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}));
fs.writeFileSync(path.join(dir,'asset-manifest.json'),JSON.stringify({provider:'Kitten TTS',model:'nano-int8-0.8',files},null,2)+'\n');
console.log('Indexed '+files.length+' audio files.');
