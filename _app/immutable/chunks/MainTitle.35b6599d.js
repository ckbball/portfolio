import{s as m,M as f,f as h,g,h as _,d as c,j as u,k as o,i as d,O as b,P as p,Q as x}from"./scheduler.bdaa4df1.js";import{S as M,i as k,a as v,t as Y}from"./index.49b0a900.js";const $=(s,e=new Date)=>{let n=0,l=0,r=0;return e.getFullYear()!==s.getFullYear()?(r=e.getMonth(),l=(e.getFullYear()-s.getFullYear()-1)*12,n=12-s.getMonth()):n=e.getMonth()-s.getMonth(),n+l+r+1},J=s=>["January","February","March","April","May","June","July","August","September","October","November","December"][s],S=(s,e)=>`${s} | ${e}`;function y(s){let e,n,l;const r=s[2].default,a=f(r,s,s[1],null);return{c(){e=h("h1"),a&&a.c(),this.h()},l(t){e=g(t,"H1",{class:!0,style:!0});var i=_(e);a&&a.l(i),i.forEach(c),this.h()},h(){u(e,"class",n=`font-[var(--title-f)] font-black tracking-[4px] text-center text-2.5em sm:text-[3em] md:text-[3.5em] lg:text-[4em] ${s[0]}`),o(e,"background","linear-gradient(var(--main-text), var(--accent-text-hover))"),o(e,"-webkit-background-clip","text"),o(e,"background-clip","text"),o(e,"-webkit-text-fill-color","transparent")},m(t,i){d(t,e,i),a&&a.m(e,null),l=!0},p(t,[i]){a&&a.p&&(!l||i&2)&&b(a,r,t,t[1],l?x(r,t[1],i,null):p(t[1]),null),(!l||i&1&&n!==(n=`font-[var(--title-f)] font-black tracking-[4px] text-center text-2.5em sm:text-[3em] md:text-[3.5em] lg:text-[4em] ${t[0]}`))&&u(e,"class",n)},i(t){l||(v(a,t),l=!0)},o(t){Y(a,t),l=!1},d(t){t&&c(e),a&&a.d(t)}}}function w(s,e,n){let{$$slots:l={},$$scope:r}=e,{classes:a=""}=e;return s.$$set=t=>{"classes"in t&&n(0,a=t.classes),"$$scope"in t&&n(1,r=t.$$scope)},[a,r,l]}class A extends M{constructor(e){super(),k(this,e,w,y,m,{classes:0})}}export{A as M,$ as c,J as g,S as u};
