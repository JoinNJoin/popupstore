import{S as d,i as p,s as b,l as g,g as u,E as f,d as m,v as k,e as _,c as h,K as a,b as n}from"../../chunks/index-ddd9bbee.js";function y(l){let e,s;return{c(){e=_("img"),this.h()},l(t){e=h(t,"IMG",{src:!0,alt:!0}),this.h()},h(){a(e.src,s="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif")||n(e,"src",s),n(e,"alt","Loading...")},m(t,r){u(t,e,r)},p:f,d(t){t&&m(e)}}}function I(l){let e,s;return{c(){e=_("img"),this.h()},l(t){e=h(t,"IMG",{src:!0,alt:!0}),this.h()},h(){a(e.src,s="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg")||n(e,"src",s),n(e,"alt","Not Found")},m(t,r){u(t,e,r)},p:f,d(t){t&&m(e)}}}function A(l){let e,s;return{c(){e=_("img"),this.h()},l(t){e=h(t,"IMG",{src:!0,alt:!0}),this.h()},h(){a(e.src,s=l[0])||n(e,"src",s),n(e,"alt","Document")},m(t,r){u(t,e,r)},p(t,r){r&1&&!a(e.src,s=t[0])&&n(e,"src",s)},d(t){t&&m(e)}}}function M(l){let e;function s(i,c){if(i[1])return A;if(i[2])return I;if(i[3])return y}let t=s(l),r=t&&t(l);return{c(){r&&r.c(),e=g()},l(i){r&&r.l(i),e=g()},m(i,c){r&&r.m(i,c),u(i,e,c)},p(i,[c]){t===(t=s(i))&&r?r.p(i,c):(r&&r.d(1),r=t&&t(i),r&&(r.c(),r.m(e.parentNode,e)))},i:f,o:f,d(i){r&&r.d(i),i&&m(e)}}}function G(l,e,s){let{src:t}=e,r=!1,i=!1,c=!1;return k(()=>{const o=new Image;o.src=t,s(3,c=!0),o.onload=()=>{s(3,c=!1),s(1,r=!0)},o.onerror=()=>{s(3,c=!1),s(2,i=!0)}}),l.$$set=o=>{"src"in o&&s(0,t=o.src)},[t,r,i,c]}class N extends d{constructor(e){super(),p(this,e,G,M,b,{src:0})}}export{N as default};
