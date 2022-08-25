import{r as g,d as c,w as a}from"./index-a5e82436.js";function w(t,n,e){t=+t,n=+n,e=(r=arguments.length)<2?(n=t,t=0,1):r<3?1:+e;for(var s=-1,r=Math.max(0,Math.ceil((n-t)/e))|0,i=new Array(r);++s<r;)i[s]=t+s*e;return i}function l(t,n){let e=0;if(n===void 0)for(let s of t)(s=+s)&&(e+=s);else{let s=-1;for(let r of t)(r=+n(r,++s,t))&&(e+=r)}return e}function o(t,n,e){this.k=t,this.x=n,this.y=e}o.prototype={constructor:o,scale:function(t){return t===1?this:new o(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new o(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};new o(1,0,0);o.prototype;const f=4,h=()=>w(f).map(()=>[]),d=t=>l(t.filter(n=>n.valid),n=>n.points),I=a(),y=a(!1),M=a(!1),m=a(-1),N=g(1e3),q=c([m,y],([t,n],e)=>{t>=f-1&&n?e("post"):e(t===-1?"pre":"mid")}),p=a({user:h(),wod:h()}),C=a([]),b=c(p,(t,n)=>{const e=t.user.map(d),s=t.wod.map(d);n({user:e,wod:s})}),D=c(b,(t,n)=>{const e=l(t.user),s=l(t.wod);n({user:e,wod:s})}),k=t=>[].concat(...t),u=t=>{const n=t.filter(e=>e.valid).map(e=>e.lemmas.split("|"));return k(n)},L=c([p,m],([t,n],e)=>{if(n<0)return;const s=u(t.user[n]),r=u(t.wod[n]),i=[...s,...r];e(i)}),O=a(void 0),P=a(void 0),T=a(void 0),j=a(void 0),v="words against strangers",x="one random person a day gets the chance to play against the internet in a game of words.",_="https://pudding.cool/games/words-against-strangers",A="word, game, stranger, lottery, wordle",R="created by <a href=https://pudding.cool target=_blank>The Pudding</a>. more specifically, by <a href=https://pudding.cool/author/russell-goldenberg target=_blank>russell goldenberg</a> and <a href=https://pudding.cool/author/michelle-mcghee target=_blank>michelle mcghee</a>, with design from <a href=https://pudding.cool/author/shannon-lin target=_blank>shannon lin</a>.",S="data from the <a href=https://www.wordfrequency.info/intro.asp target=_blank>COCA corpus</a>, <a href=https://raw.githubusercontent.com/scrabblewords/scrabblewords/main/words/North-American/NWL2020.txt target=_blank>nwl 2020 scrabble dictionary</a>, and <a href=https://www.datamuse.com/api/ target=_blank>datamuse</a>.",X="inquiries about purchasing ownership of the game for $1 million may be sent to wordsagainststrangers@pudding.cool (serious offers only please).",E={title:v,description:x,url:_,keywords:A,byline:R,source:S,other:X};export{f as R,p as a,N as b,E as c,j as d,M as e,q as f,I as g,T as h,y as i,L as l,O as o,C as p,m as r,D as t,P as w};