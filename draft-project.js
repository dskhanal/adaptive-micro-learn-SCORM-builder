/* Draft-only repairs never change the author's saved project or export validation. */
window.prepareDraftProject = function(project, template) {
  const copy=value=>JSON.parse(JSON.stringify(value));
  function fill(value, fallback) {
    if(value===undefined||value===null||value==='')return copy(fallback);
    if(Array.isArray(fallback))return Array.isArray(value)&&value.length?copy(value):copy(fallback);
    if(fallback&&typeof fallback==='object') {
      const out=value&&typeof value==='object'?copy(value):{};
      for(const [key,defaultValue] of Object.entries(fallback))out[key]=fill(out[key],defaultValue);
      return out;
    }
    return value;
  }
  const draft=fill(project,template),levels=['beginner','intermediate','upperIntermediate','advanced'];
  draft.modules=draft.modules.map((module,index)=>{
    const base=copy(template.modules[0]);base.id='draft-module-'+(index+1);base.domain='draft-domain-'+(index+1);
    const m=fill(module,base);
    for(const level of levels) {
      m.checkpoints[level]=fill(m.checkpoints[level],base.checkpoints[level]);
      m.checkpoints[level].domain=m.domain;
      if(!module.checkpoints?.[level]?.id)m.checkpoints[level].id=m.id+'-checkpoint-'+level;
      m.checkpoints[level].remediation.moduleId=m.id;
    }
    return m;
  });
  for(const kind of ['diagnostic','final']) {
    const authored=Array.isArray(project[kind])?project[kind]:[];
    draft[kind]=authored.map((q,index)=>fill(q,template[kind][0]));
    for(const m of draft.modules) {
      if(!draft[kind].some(q=>q.domain===m.domain)) {
        for(const level of kind==='diagnostic'?levels:['intermediate']) {
          const q=copy(template[kind][0]);q.id=m.id+'-draft-'+kind+'-'+level;q.domain=m.domain;q.tier=level;q.remediation.moduleId=m.id;q.remediation.level=level;draft[kind].push(q);
        }
      }
    }
    draft[kind].forEach((q,index)=>{
      const m=draft.modules.find(m=>m.domain===q.domain)||draft.modules[0];
      q.id=q.id||kind+'-draft-'+index;q.domain=m.domain;
      if(!draft.modules.some(m=>m.id===q.remediation.moduleId))q.remediation.moduleId=m.id;
    });
  }
  draft.roles=draft.roles.map((role,index)=>fill(role,{id:'role-'+index,label:'Placeholder role',description:'Edit this role',defaultTarget:'upperIntermediate',targets:{}}));
  if(!draft.roles.some(r=>r.id===draft.defaultRoleId))draft.defaultRoleId=draft.roles[0].id;
  return draft;
};
