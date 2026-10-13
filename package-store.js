/* Finalised bytes are shared by the folder writer and static test player. */
globalThis.ScormFiles = (() => {
  const open = () => new Promise((resolve, reject) => {
    const r = indexedDB.open('scorm-final-files', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('packages');
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
  async function get(id) {
    const db = await open();
    return new Promise((resolve,reject) => {
      const tx=db.transaction('packages'),r=tx.objectStore('packages').get(id);
      r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
      tx.oncomplete=()=>db.close();
    });
  }
  function manifest(files) {
    if (!files['imsmanifest.xml']) throw Error('Select a folder with imsmanifest.xml at its root.');
    const xml=new DOMParser().parseFromString(new TextDecoder().decode(files['imsmanifest.xml']),'application/xml');
    if(xml.querySelector('parsererror')) throw Error('Invalid manifest XML.');
    const nodes=tag=>Array.from(xml.getElementsByTagNameNS('*',tag));
    const resources=nodes('resource');
    const ref=nodes('item')[0]?.getAttribute('identifierref');
    const resource=resources.find(r=>r.getAttribute('identifier')===ref)||resources[0];
    const href=resource?.getAttribute('href');
    if(!href) throw Error('Manifest has no launch resource.');
    const url=new URL(href,'https://package.invalid/');
    const path=decodeURIComponent(url.pathname.slice(1));
    if(url.origin!=='https://package.invalid'||!files[path]) throw Error('Manifest launch file is missing or external.');
    for(const name of Object.keys(files)) {
      if(name.startsWith('/')||name.split('/').some(p=>p==='..'||p==='.')||name.includes('\\')) throw Error('Unsafe package path.');
    }
    return {entry:path+url.search+url.hash,title:nodes('title')[0]?.textContent||'SCORM course'};
  }
  async function save(files) {
    const info=manifest(files),id=crypto.randomUUID(),db=await open();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction('packages','readwrite');
      tx.objectStore('packages').put({files,...info},id);
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
    });db.close();return id;
  }
  async function ready() {
    if(!('serviceWorker' in navigator)) throw Error('Use localhost or HTTPS to test finalised folders.');
    await navigator.serviceWorker.register('./package-worker.js');
    await navigator.serviceWorker.ready;
    if(!navigator.serviceWorker.controller) await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  }
  return {get,save,manifest,ready};
})();
