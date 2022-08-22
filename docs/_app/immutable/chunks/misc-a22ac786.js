import{r as w,d as c,w as o}from"./index-7a7c18f7.js";const g="words against strangers",y="one random person a day gets the chance to play against the internet in a game of words.",b="https://pudding.cool/projects/word-game",k="word, game, wordle",v="Created by <a href=https://pudding.cool/author/russell-goldenberg target=_blank>Russell Goldenberg</a> and <a href=https://pudding.cool/author/michelle-mcghee target=_blank>Michelle McGhee</a>. Designed with <a href=https://pudding.cool/author/shannon-lin target=_blank>Shannon Lin</a>.",x="Data from the <a href=https://www.wordfrequency.info/intro.asp target=_blank>COCA corpus</a>, <a href=https://raw.githubusercontent.com/scrabblewords/scrabblewords/main/words/North-American/NWL2020.txt target=_blank>NWL 2020 Scrabble Dictionary</a>, and <a href=https://www.datamuse.com/api/ target=_blank>Datamuse</a>.",L={title:g,description:y,url:b,keywords:k,byline:v,source:x};function D(t,n,e){t=+t,n=+n,e=(a=arguments.length)<2?(n=t,t=0,1):a<3?1:+e;for(var s=-1,a=Math.max(0,Math.ceil((n-t)/e))|0,i=new Array(a);++s<a;)i[s]=t+s*e;return i}function h(t,n){let e=0;if(n===void 0)for(let s of t)(s=+s)&&(e+=s);else{let s=-1;for(let a of t)(a=+n(a,++s,t))&&(e+=a)}return e}function r(t,n,e){this.k=t,this.x=n,this.y=e}r.prototype={constructor:r,scale:function(t){return t===1?this:new r(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new r(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};new r(1,0,0);r.prototype;const f=4,l=()=>D(f).map(()=>[]),d=t=>h(t.filter(n=>n.valid),n=>n.points),N=o(),S=o(!1),R=o(!1),p=o(-1),X=w(1e3),Y=c([p,S],([t,n],e)=>{t>=f-1&&n?e("post"):e(t===-1?"pre":"mid")}),m=o({user:l(),wod:l()}),C=o([]),_=c(m,(t,n)=>{const e=t.user.map(d),s=t.wod.map(d);n({user:e,wod:s})}),I=c(_,(t,n)=>{const e=h(t.user),s=h(t.wod);n({user:e,wod:s})}),M=t=>[].concat(...t),u=t=>{const n=t.filter(e=>e.valid).map(e=>e.lemmas.split("|"));return M(n)},j=c([m,p],([t,n],e)=>{if(n<0)return;const s=u(t.user[n]),a=u(t.wod[n]),i=[...s,...a];e(i)}),G=o(void 0),O=o(void 0),W=o(void 0),q=o(void 0);export{m as a,X as b,L as c,q as d,R as e,Y as f,N as g,W as h,S as i,j as l,G as o,C as p,p as r,I as t,O as w};