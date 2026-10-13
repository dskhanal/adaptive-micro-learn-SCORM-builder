class Node {
 constructor(tag){this.tagName=tag;this.children=[];this.attributes={};this.style={setProperty(){}};this.dataset={};this.classList={add(){},remove(){},toggle(){}};this.value='';this.checked=false;this._text='';}
 set textContent(v){this._text=String(v);this.children=[]}get textContent(){return this._text+this.children.map(c=>c.textContent||'').join('')}
 set innerHTML(v){this._text=String(v).replace(/<[^>]*>/g,'');this.children=[]}get innerHTML(){return this._text}
 append(...nodes){for(const n of nodes){this.children.push(n);n.parentNode=this}}appendChild(n){this.append(n)}replaceChildren(...nodes){this._text='';this.children=[];this.append(...nodes)}
 get firstChild(){return this.children[0]}get options(){return this.children.filter(c=>c.tagName==='option')}removeChild(n){this.children.splice(this.children.indexOf(n),1)}
 setAttribute(k,v){this.attributes[k]=v}getAttribute(k){return this.attributes[k]}focus(){}setSelectionRange(){}addEventListener(){}
 attachShadow(){this.shadowRoot=new Node('shadow');return this.shadowRoot}
 querySelectorAll(selectors){const rules=selectors.split(',').map(s=>s.trim()),out=[];function walk(n){for(const child of n.children){if(rules.some(s=>s.startsWith('#')?child.attributes.id===s.slice(1):s.startsWith('.')?(child.className||'').split(' ').includes(s.slice(1)):child.tagName===s))out.push(child);walk(child)}}walk(this);return out}
 querySelector(s){return this.querySelectorAll(s)[0]||null}
}
module.exports={Node,document:{createElement:tag=>new Node(tag),createElementNS:(ns,tag)=>new Node(tag),createTextNode:t=>{const n=new Node('#text');n.textContent=t;return n}}};
