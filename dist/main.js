!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},,function(e,t,n){"use strict";let o;function r(e){let t=null,n=e.split("\n");document.getElementById("inputForm").addEventListener("keydown",function(e){e.key;let o=document.getElementById("inputForm").value,r=document.createTextNode(n[o]);t||setTimeout(()=>{"undefined"==r.nodeValue&&(r=document.createTextNode("No line found. Choose another number.")),function(e){document.getElementById("inputForm").addEventListener("keyup",function(t){let n=t.key,o=(document.getElementsByClassName("container")[0],document.getElementById("previousdiv"));if("Enter"===n){let t=document.createElement("div");for(t.setAttribute("class","textfield");o.childElementCount>=2;)o.removeChild(o.firstChild);t.appendChild(e),o.appendChild(t)}})}(r),t=null},50),t=e})}function u(e,t){o=new Array(arguments.length);for(let e=0;arguments.length-1>=e;e++)o[e]=new XMLHttpRequest,o[e].open("GET","texts/"+arguments[e]),o[e].onreadystatechange=function(){o[e].readyState===XMLHttpRequest.DONE&&200===o[e].status&&r(o[e].responseText)},o[e].send()}n.r(t),n(0),function(){let e,t,n=document.getElementsByClassName("dropbtn");for(let o=0;n.length-1>=o;o++){let r=document.getElementsByClassName("dropdown-content")[o].children;for(let i=0;r.length-1>=i;i++)r[i].addEventListener("mouseup",function(){n[o].innerHTML=r[i].innerHTML,e=0===o?this.innerHTML+".txt":n[0].innerHTML+".txt",t=1===o?this.innerHTML+".txt":n[1].innerHTML+".txt",u(e,t)})}}()}]);
//# sourceMappingURL=main.js.map