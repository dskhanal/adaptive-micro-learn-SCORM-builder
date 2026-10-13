/* Run after learner-runtime changes: node scripts/sync-simulator.cjs /path/to/runtime.js */
const fs=require('node:fs'),path=require('node:path');
const input=process.argv[2];if(!input){console.error('Pass the runtime.js from a newly finalised course.');process.exit(1)}
const source=fs.readFileSync(input,'utf8'),end=source.lastIndexOf('window.addEventListener("beforeunload"');
if(end<0||!source.includes('var C=window.COURSE,LEVELS='))throw Error('Unrecognised course runtime');
const body=source.slice(0,end)+'window.studioQuestion=function(q,confidence,onResult){normaliseState();applyTheme();question(q,onResult,confidence,true)};})();';
fs.writeFileSync(path.resolve(__dirname,'../learner-simulation.js'),'/* Generated from the packaged learner runtime: storage/startup disabled for author simulation. */\nwindow.createLearnerSimulation=function(window,document){\n'+body+'\n};\n');
console.log('Updated learner-simulation.js. Run node tests/run.cjs.');
