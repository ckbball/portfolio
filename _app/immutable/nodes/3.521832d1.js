import{s as me,f as C,a as M,l as le,g as E,h as I,c as P,d as h,m as se,j as k,i as q,I as p,p as de,K as he,n as Z,e as ae,W as _e}from"../chunks/scheduler.bdaa4df1.js";import{S as ue,i as pe,b as D,d as V,m as y,a as _,t as w,e as L,g as ne,c as re}from"../chunks/index.49b0a900.js";import{e as J,U as W,u as ve,o as we}from"../chunks/UIcon.62d4f51d.js";import{c as xe,g as oe}from"../chunks/MainTitle.35b6599d.js";import{C as be}from"../chunks/Card.8d0c7541.js";import{C as ke}from"../chunks/CardLogo.4aa36c7b.js";import{C as Ce,a as G}from"../chunks/ChipIcon.b02bc5c1.js";import{g as O,E as Ee}from"../chunks/params.a53d9d6c.js";import{b as Q}from"../chunks/paths.0be2e02b.js";import{S as Ie}from"../chunks/SearchPage.27263b9f.js";import{i as De}from"../chunks/index.97b3c5e0.js";function ie(a,t,n){const e=a.slice();return e[5]=t[n],e}function Ve(a){let t,n;return t=new W({props:{icon:"i-carbon-building"}}),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p:Z,i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function ye(a){let t,n;return t=new W({props:{icon:"i-carbon-location"}}),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p:Z,i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function Le(a){let t,n;return t=new W({props:{icon:"i-carbon-hourglass"}}),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p:Z,i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function ce(a){let t,n;return t=new G({props:{logo:O(a[5].logo),name:a[5].name,href:`${Q}/skills/${a[5].slug}`}}),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p(e,r){const o={};r&1&&(o.logo=O(e[5].logo)),r&1&&(o.name=e[5].name),r&1&&(o.href=`${Q}/skills/${e[5].slug}`),t.$set(o)},i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function Se(a){let t,n,e,r,o,c,$,s,l,f,d,B,g,b,S,F,ee,R,H=a[0].description+"",X,te,N,K;n=new ke({props:{src:O(a[0].logo),alt:a[0].company,size:75}}),c=new Ce({props:{title:a[0].name}}),l=new G({props:{name:`Company: ${a[0].company}`,$$slots:{default:[Ve]},$$scope:{ctx:a}}}),d=new G({props:{name:`Location: ${a[0].location}`,$$slots:{default:[ye]},$$scope:{ctx:a}}}),g=new G({props:{name:`Contract: ${a[0].contract}`,$$slots:{default:[Le]},$$scope:{ctx:a}}});let U=J(a[0].skills),u=[];for(let i=0;i<U.length;i+=1)u[i]=ce(ie(a,U,i));const ge=i=>w(u[i],1,1,()=>{u[i]=null});return{c(){t=C("div"),D(n.$$.fragment),e=M(),r=C("div"),o=C("h3"),D(c.$$.fragment),$=M(),s=C("div"),D(l.$$.fragment),f=M(),D(d.$$.fragment),B=M(),D(g.$$.fragment),b=M(),S=C("div"),F=le(a[1]),ee=M(),R=C("div"),X=le(H),te=M(),N=C("div");for(let i=0;i<u.length;i+=1)u[i].c();this.h()},l(i){t=E(i,"DIV",{class:!0});var m=I(t);V(n.$$.fragment,m),e=P(m),r=E(m,"DIV",{class:!0});var v=I(r);o=E(v,"H3",{class:!0});var T=I(o);V(c.$$.fragment,T),T.forEach(h),$=P(v),s=E(v,"DIV",{class:!0});var j=I(s);V(l.$$.fragment,j),f=P(j),V(d.$$.fragment,j),B=P(j),V(g.$$.fragment,j),j.forEach(h),b=P(v),S=E(v,"DIV",{class:!0});var Y=I(S);F=se(Y,a[1]),Y.forEach(h),ee=P(v),R=E(v,"DIV",{class:!0});var z=I(R);X=se(z,H),z.forEach(h),te=P(v),N=E(v,"DIV",{class:!0});var x=I(N);for(let A=0;A<u.length;A+=1)u[A].l(x);x.forEach(h),v.forEach(h),m.forEach(h),this.h()},h(){k(o,"class","flex text-[0.9em] flex-col items-start sm:flex-row sm:items-center justify-between sm:gap-5 md:flex-col md:items-start md:gap-0 lg:flex-row lg:items-center"),k(s,"class","row flex-wrap m-b-2 gap-1 text-0.9em font-300"),k(S,"class","text-[var(--accent-text)] text-[0.9em] font-200"),k(R,"class","experience-description"),k(N,"class","flex flex-row flex-wrap mt-5"),k(r,"class","col ml-0 md:ml-[20px] gap-3 w-full"),k(t,"class","col md:flex-row items-start gap-5 md:gap-1")},m(i,m){q(i,t,m),y(n,t,null),p(t,e),p(t,r),p(r,o),y(c,o,null),p(r,$),p(r,s),y(l,s,null),p(s,f),y(d,s,null),p(s,B),y(g,s,null),p(r,b),p(r,S),p(S,F),p(r,ee),p(r,R),p(R,X),p(r,te),p(r,N);for(let v=0;v<u.length;v+=1)u[v]&&u[v].m(N,null);K=!0},p(i,m){const v={};m&1&&(v.src=O(i[0].logo)),m&1&&(v.alt=i[0].company),n.$set(v);const T={};m&1&&(T.title=i[0].name),c.$set(T);const j={};m&1&&(j.name=`Company: ${i[0].company}`),m&256&&(j.$$scope={dirty:m,ctx:i}),l.$set(j);const Y={};m&1&&(Y.name=`Location: ${i[0].location}`),m&256&&(Y.$$scope={dirty:m,ctx:i}),d.$set(Y);const z={};if(m&1&&(z.name=`Contract: ${i[0].contract}`),m&256&&(z.$$scope={dirty:m,ctx:i}),g.$set(z),(!K||m&1)&&H!==(H=i[0].description+"")&&de(X,H),m&1){U=J(i[0].skills);let x;for(x=0;x<U.length;x+=1){const A=ie(i,U,x);u[x]?(u[x].p(A,m),_(u[x],1)):(u[x]=ce(A),u[x].c(),_(u[x],1),u[x].m(N,null))}for(ne(),x=U.length;x<u.length;x+=1)ge(x);re()}},i(i){if(!K){_(n.$$.fragment,i),_(c.$$.fragment,i),_(l.$$.fragment,i),_(d.$$.fragment,i),_(g.$$.fragment,i);for(let m=0;m<U.length;m+=1)_(u[m]);K=!0}},o(i){w(n.$$.fragment,i),w(c.$$.fragment,i),w(l.$$.fragment,i),w(d.$$.fragment,i),w(g.$$.fragment,i),u=u.filter(Boolean);for(let m=0;m<u.length;m+=1)w(u[m]);K=!1},d(i){i&&h(t),L(n),L(c),L(l),L(d),L(g),he(u,i)}}}function Me(a){let t,n;return t=new be({props:{margin:"0px 0px 20px 0px",tiltDegree:2,href:`${Q}/experience/${a[0].slug}`,$$slots:{default:[Se]},$$scope:{ctx:a}}}),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p(e,[r]){const o={};r&1&&(o.href=`${Q}/experience/${e[0].slug}`),r&257&&(o.$$scope={dirty:r,ctx:e}),t.$set(o)},i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function Pe(a,t,n){let{experience:e}=t;const r=xe(e.period.from,e.period.to),o=`${oe(e.period.from.getMonth())} ${e.period.from.getFullYear()}`,c=e.period.to?`${oe(e.period.to.getMonth())} ${e.period.to.getFullYear()}`:"Present",$=`${o} - ${c} · ${r} month${r>1?"s":""}`;return a.$$set=s=>{"experience"in s&&n(0,e=s.experience)},[e,$]}class je extends ue{constructor(t){super(),pe(this,t,Pe,Me,me,{experience:0})}}function fe(a,t,n){const e=a.slice();return e[4]=t[n],e[6]=n,e}function Be(a){let t,n,e=[],r=new Map,o,c,$=J(a[0]);const s=l=>l[4].slug;for(let l=0;l<$.length;l+=1){let f=fe(a,$,l),d=s(f);r.set(d,e[l]=$e(d,f))}return{c(){t=C("div"),n=M();for(let l=0;l<e.length;l+=1)e[l].c();o=ae(),this.h()},l(l){t=E(l,"DIV",{class:!0}),I(t).forEach(h),n=P(l);for(let f=0;f<e.length;f+=1)e[f].l(l);o=ae(),this.h()},h(){k(t,"class","w-[0.5px] hidden lg:flex top-0 bottom-0 py-50px bg-[var(--border)] absolute rounded")},m(l,f){q(l,t,f),q(l,n,f);for(let d=0;d<e.length;d+=1)e[d]&&e[d].m(l,f);q(l,o,f),c=!0},p(l,f){f&1&&($=J(l[0]),ne(),e=ve(e,f,s,1,l,$,r,o.parentNode,we,$e,o,fe),re())},i(l){if(!c){for(let f=0;f<$.length;f+=1)_(e[f]);c=!0}},o(l){for(let f=0;f<e.length;f+=1)w(e[f]);c=!1},d(l){l&&(h(t),h(n),h(o));for(let f=0;f<e.length;f+=1)e[f].d(l)}}}function Ne(a){let t,n,e,r,o="Could not find anything...",c;return n=new W({props:{icon:"i-carbon-development",classes:"text-3.5em"}}),{c(){t=C("div"),D(n.$$.fragment),e=M(),r=C("p"),r.textContent=o,this.h()},l($){t=E($,"DIV",{class:!0});var s=I(t);V(n.$$.fragment,s),e=P(s),r=E(s,"P",{class:!0,["data-svelte-h"]:!0}),_e(r)!=="svelte-1jyyf6v"&&(r.textContent=o),s.forEach(h),this.h()},h(){k(r,"class","font-300"),k(t,"class","p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1")},m($,s){q($,t,s),y(n,t,null),p(t,e),p(t,r),c=!0},p:Z,i($){c||(_(n.$$.fragment,$),c=!0)},o($){w(n.$$.fragment,$),c=!1},d($){$&&h(t),L(n)}}}function $e(a,t){let n,e,r,o,c,$,s,l,f,d,B;return c=new W({props:{icon:"i-carbon-condition-point",classes:""}}),l=new je({props:{experience:t[4]}}),{key:a,first:null,c(){n=C("div"),e=C("div"),r=M(),o=C("div"),D(c.$$.fragment),$=M(),s=C("div"),D(l.$$.fragment),f=M(),this.h()},l(g){n=E(g,"DIV",{class:!0});var b=I(n);e=E(b,"DIV",{class:!0}),I(e).forEach(h),r=P(b),o=E(b,"DIV",{class:!0});var S=I(o);V(c.$$.fragment,S),S.forEach(h),$=P(b),s=E(b,"DIV",{class:!0});var F=I(s);V(l.$$.fragment,F),F.forEach(h),f=P(b),b.forEach(h),this.h()},h(){k(e,"class","flex-1 hidden lg:flex"),k(o,"class","hidden lg:inline p-15px bg-[var(--main)] rounded"),k(s,"class","flex-1 col items-stretch"),k(n,"class",d=`flex ${t[6]%2!==0?"flex-row":"flex-row-reverse"} relative items-center w-full my-[10px]`),this.first=n},m(g,b){q(g,n,b),p(n,e),p(n,r),p(n,o),y(c,o,null),p(n,$),p(n,s),y(l,s,null),p(n,f),B=!0},p(g,b){t=g;const S={};b&1&&(S.experience=t[4]),l.$set(S),(!B||b&1&&d!==(d=`flex ${t[6]%2!==0?"flex-row":"flex-row-reverse"} relative items-center w-full my-[10px]`))&&k(n,"class",d)},i(g){B||(_(c.$$.fragment,g),_(l.$$.fragment,g),B=!0)},o(g){w(c.$$.fragment,g),w(l.$$.fragment,g),B=!1},d(g){g&&h(n),L(c),L(l)}}}function Ue(a){let t,n,e,r;const o=[Ne,Be],c=[];function $(s,l){return s[0].length===0?0:1}return n=$(a),e=c[n]=o[n](a),{c(){t=C("div"),e.c(),this.h()},l(s){t=E(s,"DIV",{class:!0});var l=I(t);e.l(l),l.forEach(h),this.h()},h(){k(t,"class","col items-center relative mt-10 flex-1")},m(s,l){q(s,t,l),c[n].m(t,null),r=!0},p(s,l){let f=n;n=$(s),n===f?c[n].p(s,l):(ne(),w(c[f],1,1,()=>{c[f]=null}),re(),e=c[n],e?e.p(s,l):(e=c[n]=o[n](s),e.c()),_(e,1),e.m(t,null))},i(s){r||(_(e),r=!0)},o(s){w(e),r=!1},d(s){s&&h(t),c[n].d()}}}function qe(a){let t,n;return t=new Ie({props:{title:a[1],$$slots:{default:[Ue]},$$scope:{ctx:a}}}),t.$on("search",a[2]),{c(){D(t.$$.fragment)},l(e){V(t.$$.fragment,e)},m(e,r){y(t,e,r),n=!0},p(e,[r]){const o={};r&129&&(o.$$scope={dirty:r,ctx:e}),t.$set(o)},i(e){n||(_(t.$$.fragment,e),n=!0)},o(e){w(t.$$.fragment,e),n=!1},d(e){L(t,e)}}}function Fe(a,t,n){const{items:e,title:r}=Ee;let o=[...e];return[o,r,$=>{const s=$.detail.search;De(s)&&n(0,o=e),n(0,o=e.filter(l=>l.name.toLowerCase().includes(s)||l.company.toLowerCase().includes(s)||l.description.toLowerCase().includes(s)))}]}class Oe extends ue{constructor(t){super(),pe(this,t,Fe,qe,me,{})}}export{Oe as component};
