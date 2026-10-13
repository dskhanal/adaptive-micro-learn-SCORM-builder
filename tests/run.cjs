const {spawnSync}=require('node:child_process');
const path=require('node:path');
for(const test of ['components.cjs','simulation.cjs']){
 const result=spawnSync(process.execPath,[path.join(__dirname,test)],{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status||1);
}
