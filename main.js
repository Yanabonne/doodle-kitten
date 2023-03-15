(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,o){for(var r=0;r<o.length;r++){var n=o[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,c=function(e,o){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===t(c)?c:String(c)),n)}var c}function o(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var r,n,c,l,a,i=document.querySelector(".game"),u=document.createElement("div"),s=50,f=!1,p=[],m=!0,v=!1,d=!1,y=0,b=0,S=Number(getComputedStyle(i).height.replace("px","")),h=Number(getComputedStyle(i).width.replace("px","")),g=85/450*h,I=25/85*g,_=60/450*h,x=1/3*h,w=x,E=S/6,L=document.querySelector("#popup_start"),k=L.querySelector("#popup-button_start"),q=L.querySelector("#popup_link-to-rules"),C=document.querySelector("#popup_game-over"),j=C.querySelector("#popup-button_game-over"),P=document.querySelector("#popup_rules"),A=P.querySelector(".popup__link"),N=o((function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.bottom=e,this.left=Math.random()*(h-g),this.visual=document.createElement("div");var o=this.visual;o.classList.add("game__platform"),o.style.left="".concat(this.left,"px"),o.style.bottom="".concat(this.bottom,"px"),i.appendChild(o)}));function O(t){t.classList.add("popup_inactive")}function T(t){t.classList.remove("popup_inactive")}function M(){w>1/3*S&&p.forEach((function(t){if(t.bottom-=4,t.visual.style.bottom="".concat(t.bottom,"px"),t.bottom<1/60*S){p[0].visual.classList.remove("game__platform"),p.shift(),y+=1;var e=new N(S);p.push(e)}}))}function R(){clearInterval(n),m=!0,r=setInterval((function(){w+=1/30*S,u.style.bottom="".concat(w,"px"),w>x+1/3*S&&(clearInterval(r),m=!1,n=setInterval((function(){w-=1/120*S,u.style.bottom="".concat(w,"px"),w<=0&&function(){for(f=!0;i.firstChild;)i.removeChild(i.firstChild);clearInterval(r),clearInterval(n),clearInterval(l),clearInterval(c),clearInterval(a),localStorage.getItem("bestSavedScore")?y>localStorage.getItem("bestSavedScore")?(localStorage.setItem("bestSavedScore",y),b=y):b=localStorage.getItem("bestSavedScore"):y>b&&(localStorage.setItem("bestSavedScore",y),b=y),C.querySelector("#score").textContent="Ваш счёт: ".concat(y),C.querySelector("#best-score").textContent="Ваш лучший счёт: ".concat(b),T(C),p=[],y=0}(),p.forEach((function(t){w>=t.bottom&&w<=t.bottom+I&&s+_>=t.left&&s<=t.left+g&&!m&&(x=w,R())}))}),30))}),30)}function z(t){"ArrowLeft"===t.key?function(){if(d)clearInterval(c),d=!1;else{if(v)return;v=!0,l=setInterval((function(){s>=0?(s-=5,u.style.left="".concat(s,"px")):(v=!1,clearInterval(l))}),30)}}():"ArrowRight"===t.key&&function(){if(v)clearInterval(l),v=!1;else{if(d)return;d=!0,c=setInterval((function(){s<=h-_?(s+=5,u.style.left="".concat(s,"px")):(d=!1,clearInterval(c))}),30)}}()}k.addEventListener("click",(function(){f||(O(L),function(){for(var t=0;t<6;t++){var e=new N(1/6*S+t*E);p.push(e)}}(),i.appendChild(u),u.classList.add("game__doodler"),s=p[0].left,u.style.left="".concat(s,"px"),u.style.bottom="".concat(w,"px"),a=setInterval(M,30),R(),document.addEventListener("keyup",z))})),j.addEventListener("click",(function(){O(C),T(L),f=!1})),q.addEventListener("click",(function(){O(L),T(P)})),A.addEventListener("click",(function(){O(P),T(L)}))})();