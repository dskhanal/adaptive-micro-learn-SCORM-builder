/* Shared local-time filenames: project-name_TYPE_YYYYMMDDHHmmssSSS.ext. */
window.ProjectFiles = (() => {
  let lastStamp=0;
  function stamp(){const now=Math.max(Date.now(),lastStamp+1);lastStamp=now;const d=new Date(now),pad=(n,w=2)=>String(n).padStart(w,'0');return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+pad(d.getHours())+pad(d.getMinutes())+pad(d.getSeconds())+pad(d.getMilliseconds(),3)}
  function name(project,kind,extension){const title=String(project?.title||project?.code||'Untitled-project').normalize('NFKC').replace(/[<>:"/\\|?*\x00-\x1f]/g,'').trim().replace(/\s+/g,'-').slice(0,100)||'Untitled-project';return title+'_'+kind+'_'+stamp()+'.'+extension}
  return {stamp,name};
})();
