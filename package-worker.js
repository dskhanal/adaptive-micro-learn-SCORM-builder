importScripts('./package-store.js');
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
const types={html:'text/html',js:'application/javascript',css:'text/css',json:'application/json',xml:'application/xml',svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',mp4:'video/mp4',woff2:'font/woff2'};
self.addEventListener('fetch',event=>{
 const root=new URL('./__finalised/',self.registration.scope),url=new URL(event.request.url);
 if(url.origin!==root.origin||!url.pathname.startsWith(root.pathname))return;
 event.respondWith((async()=>{
  const parts=url.pathname.slice(root.pathname.length).split('/'),id=parts.shift();
  const name=decodeURIComponent(parts.join('/')),pkg=await ScormFiles.get(id);
  const bytes=pkg?.files[name];
  if(!bytes)return new Response('Finalised file not found',{status:404});
  return new Response(bytes,{headers:{'Content-Type':types[name.split('.').pop()]||'application/octet-stream','Cache-Control':'no-store'}});
 })());
});
