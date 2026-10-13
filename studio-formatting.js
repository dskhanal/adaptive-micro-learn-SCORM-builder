/* Small portable formatting subset. Raw HTML is escaped, never interpreted. */
(function(root){
 function html(text){return String(text??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>').replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\n/g,'<br>')}
 root.StudioFormatting={html,runtimeSource:'window.StudioFormatting={html:'+html.toString()+'};\n'};
})(window);
