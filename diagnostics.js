(function(){
"use strict";
var KEY="RAWGAME_DIAG_V1", out=document.getElementById("out"), meta=document.getElementById("meta");
function load(){
  var d=null;
  try{d=JSON.parse(sessionStorage.getItem(KEY)||"null")}catch(e){}
  if(!d)try{d=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){}
  if(!d){out.textContent="لا يوجد تقرير محفوظ.";meta.textContent="No diagnostic snapshot";return null}
  meta.textContent="build="+(d.buildVersion||"?")+" · attempt="+(d.attemptId||"?")+" · events="+((d.events||[]).length);
  out.textContent=JSON.stringify(d,null,2);return d;
}
document.getElementById("refresh").onclick=load;
document.getElementById("copy").onclick=function(){try{navigator.clipboard.writeText(out.textContent)}catch(e){}};
document.getElementById("clear").onclick=function(){try{sessionStorage.removeItem(KEY)}catch(e){}try{localStorage.removeItem(KEY)}catch(e){}load()};
document.getElementById("download").onclick=function(){var d=load();if(!d)return;var a=document.createElement("a");a.href="data:text/plain;charset=utf-8,"+encodeURIComponent(out.textContent);a.download="PS4-STABILITY-DIAGNOSTIC.txt";a.click()};
load();
})();
