/* Injected by the test worker only. Never written into saved course files or ZIPs. */
function installScormTestControls(C,S,levels,render,save,target,diagnosticComplete,finishFinal) {
  let skip=false;
  const notify=message=>{try{window.parent.testNotice(message)}catch{}};
  function refresh(){save();render()}
  window.__SCORM_TEST_CONTROL={
    setSkip(value){skip=!!value;notify(skip?'Restrictions bypassed for author navigation. No answers or scores are awarded.':'Restrictions enabled. Use New attempt to test the normal path from the beginning.');},
    jump(roleId,moduleId,level){
      if(!C.roles.some(r=>r.id===roleId))throw Error('Select a valid role.');
      if(!levels.includes(level))throw Error('Select a valid level.');
      const index=C.modules.findIndex(m=>m.id===moduleId);
      if(index<0)throw Error('Select a valid module.');
      const m=C.modules[index],role=C.roles.find(r=>r.id===roleId);
      const goal=(role.targets||{})[m.domain]||role.defaultTarget||'upperIntermediate';
      const current=S.moduleLevel[m.id]||S.placements[m.domain]||'beginner';
      if(!skip&&(!diagnosticComplete()||index>S.moduleIndex||levels.indexOf(level)>Math.min(levels.indexOf(current),levels.indexOf(goal))))throw Error('This section is restricted by the learner pathway. Turn on Skip restrictions to inspect it.');
      S.roleId=roleId;S.moduleIndex=index;S.moduleLevel[m.id]=level;S.screen='modules';S.reviewMode=true;
      // reviewMode permits inspection of already completed modules without deleting completion.
      refresh();notify('Testing '+role.label+' · '+m.title+' · '+level+(skip?' (restrictions skipped)':''));
    },
    next(){
      if(!skip)throw Error('Turn on Skip restrictions to skip a step.');
      if(S.screen==='welcome'){S.screen='diagnostic';refresh();return;}
      if(S.screen==='diagnostic'){S.screen='diagnosticSummary';refresh();return;}
      if(S.screen==='diagnosticSummary'){S.screen='modules';S.moduleIndex=0;S.reviewMode=false;refresh();return;}
      if(S.screen==='modules') {
        const m=C.modules[S.moduleIndex],index=levels.indexOf(S.moduleLevel[m.id]||'beginner');
        if(index<levels.length-1)S.moduleLevel[m.id]=levels[index+1];
        else if(S.moduleIndex<C.modules.length-1){S.moduleIndex++;S.moduleLevel[C.modules[S.moduleIndex].id]='beginner';}
        else {S.screen='final';S.finalIndex=0;}
        S.reviewMode=true;refresh();return;
      }
      if(S.screen==='final'){S.finalIndex++;if(S.finalIndex>=C.final.length)finishFinal();else refresh();return;}
      if(S.screen==='result'){S.screen='welcome';refresh();return;}
      S.screen='modules';S.reviewMode=true;refresh();
    }
  };
  try{window.parent.testControlsReady()}catch{}
}
