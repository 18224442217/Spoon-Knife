var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64padchar="=";function hex2b64(d){var b;var e;var a="";for(b=0;b+3<=d.length;b+=3){e=parseInt(d.substring(b,b+3),16);a+=b64map.charAt(e>>6)+b64map.charAt(e&63)}if(b+1==d.length){e=parseInt(d.substring(b,b+1),16);a+=b64map.charAt(e<<2)}else{if(b+2==d.length){e=parseInt(d.substring(b,b+2),16);a+=b64map.charAt(e>>2)+b64map.charAt((e&3)<<4)}}while((a.length&3)>0){a+=b64padchar}return a}function b64tohex(e){var c="";var d;var a=0;var b;for(d=0;d<e.length;++d){if(e.charAt(d)==b64padchar){break}v=b64map.indexOf(e.charAt(d));if(v<0){continue}if(a==0){c+=int2char(v>>2);b=v&3;a=1}else{if(a==1){c+=int2char((b<<2)|(v>>4));b=v&15;a=2}else{if(a==2){c+=int2char(b);c+=int2char(v>>2);b=v&3;a=3}else{c+=int2char((b<<2)|(v>>4));c+=int2char(v&15);a=0}}}}if(a==1){c+=int2char(b<<2)}return c}function b64toBA(e){var d=b64tohex(e);var c;var b=new Array();for(c=0;2*c<d.length;++c){b[c]=parseInt(d.substring(2*c,2*c+2),16)}return b}var dbits;var canary=244837814094590;var j_lm=((canary&16777215)==15715070);function BigInteger(e,d,f){if(e!=null){if("number"==typeof e){this.fromNumber(e,d,f)}else{if(d==null&&"string"!=typeof e){this.fromString(e,256)}else{this.fromString(e,d)}}}}function nbi(){return new BigInteger(null)}function am1(f,a,b,e,h,g){while(--g>=0){var d=a*this[f++]+b[e]+h;h=Math.floor(d/67108864);b[e++]=d&67108863}return h}function am2(f,q,r,e,o,a){var k=q&32767,p=q>>15;while(--a>=0){var d=this[f]&32767;var g=this[f++]>>15;var b=p*d+g*k;d=k*d+((b&32767)<<15)+r[e]+(o&1073741823);o=(d>>>30)+(b>>>15)+p*g+(o>>>30);r[e++]=d&1073741823}return o}function am3(f,q,r,e,o,a){var k=q&16383,p=q>>14;while(--a>=0){var d=this[f]&16383;var g=this[f++]>>14;var b=p*d+g*k;d=k*d+((b&16383)<<14)+r[e]+o;o=(d>>28)+(b>>14)+p*g;r[e++]=d&268435455}return o}if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;dbits=30}else{if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;dbits=26}else{BigInteger.prototype.am=am3;dbits=28}}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv){BI_RC[rr++]=vv}rr="a".charCodeAt(0);for(vv=10;vv<36;++vv){BI_RC[rr++]=vv}rr="A".charCodeAt(0);for(vv=10;vv<36;++vv){BI_RC[rr++]=vv}function int2char(a){return BI_RM.charAt(a)}function intAt(b,a){var d=BI_RC[b.charCodeAt(a)];return(d==null)?-1:d}function bnpCopyTo(b){for(var a=this.t-1;a>=0;--a){b[a]=this[a]}b.t=this.t;b.s=this.s}function bnpFromInt(a){this.t=1;this.s=(a<0)?-1:0;if(a>0){this[0]=a}else{if(a<-1){this[0]=a+this.DV}else{this.t=0}}}function nbv(a){var b=nbi();b.fromInt(a);return b}function bnpFromString(h,c){var e;if(c==16){e=4}else{if(c==8){e=3}else{if(c==256){e=8}else{if(c==2){e=1}else{if(c==32){e=5}else{if(c==4){e=2}else{this.fromRadix(h,c);return}}}}}}this.t=0;this.s=0;var g=h.length,d=false,f=0;while(--g>=0){var a=(e==8)?h[g]&255:intAt(h,g);if(a<0){if(h.charAt(g)=="-"){d=true}continue}d=false;if(f==0){this[this.t++]=a}else{if(f+e>this.DB){this[this.t-1]|=(a&((1<<(this.DB-f))-1))<<f;this[this.t++]=(a>>(this.DB-f))}else{this[this.t-1]|=a<<f}}f+=e;if(f>=this.DB){f-=this.DB}}if(e==8&&(h[0]&128)!=0){this.s=-1;if(f>0){this[this.t-1]|=((1<<(this.DB-f))-1)<<f}}this.clamp();if(d){BigInteger.ZERO.subTo(this,this)}}function bnpClamp(){var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a){--this.t}}function bnToString(c){if(this.s<0){return"-"+this.negate().toString(c)}var e;if(c==16){e=4}else{if(c==8){e=3}else{if(c==2){e=1}else{if(c==32){e=5}else{if(c==4){e=2}else{return this.toRadix(c)}}}}}var g=(1<<e)-1,l,a=false,h="",f=this.t;var j=this.DB-(f*this.DB)%e;if(f-->0){if(j<this.DB&&(l=this[f]>>j)>0){a=true;h=int2char(l)}while(f>=0){if(j<e){l=(this[f]&((1<<j)-1))<<(e-j);l|=this[--f]>>(j+=this.DB-e)}else{l=(this[f]>>(j-=e))&g;if(j<=0){j+=this.DB;--f}}if(l>0){a=true}if(a){h+=int2char(l)}}}return a?h:"0"}function bnNegate(){var a=nbi();BigInteger.ZERO.subTo(this,a);return a}function bnAbs(){return(this.s<0)?this.negate():this}function bnCompareTo(b){var d=this.s-b.s;if(d!=0){return d}var c=this.t;d=c-b.t;if(d!=0){return(this.s<0)?-d:d}while(--c>=0){if((d=this[c]-b[c])!=0){return d}}return 0}function nbits(a){var c=1,b;if((b=a>>>16)!=0){a=b;c+=16}if((b=a>>8)!=0){a=b;c+=8}if((b=a>>4)!=0){a=b;c+=4}if((b=a>>2)!=0){a=b;c+=2}if((b=a>>1)!=0){a=b;c+=1}return c}function bnBitLength(){if(this.t<=0){return 0}return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM))}function bnpDLShiftTo(c,b){var a;for(a=this.t-1;a>=0;--a){b[a+c]=this[a]}for(a=c-1;a>=0;--a){b[a]=0}b.t=this.t+c;b.s=this.s}function bnpDRShiftTo(c,b){for(var a=c;a<this.t;++a){b[a-c]=this[a]}b.t=Math.max(this.t-c,0);b.s=this.s}function bnpLShiftTo(j,e){var b=j%this.DB;var a=this.DB-b;var g=(1<<a)-1;var f=Math.floor(j/this.DB),h=(this.s<<b)&this.DM,d;for(d=this.t-1;d>=0;--d){e[d+f+1]=(this[d]>>a)|h;h=(this[d]&g)<<b}for(d=f-1;d>=0;--d){e[d]=0}e[f]=h;e.t=this.t+f+1;e.s=this.s;e.clamp()}function bnpRShiftTo(g,d){d.s=this.s;var e=Math.floor(g/this.DB);if(e>=this.t){d.t=0;return}var b=g%this.DB;var a=this.DB-b;var f=(1<<b)-1;d[0]=this[e]>>b;for(var c=e+1;c<this.t;++c){d[c-e-1]|=(this[c]&f)<<a;d[c-e]=this[c]>>b}if(b>0){d[this.t-e-1]|=(this.s&f)<<a}d.t=this.t-e;d.clamp()}function bnpSubTo(d,f){var e=0,g=0,b=Math.min(d.t,this.t);while(e<b){g+=this[e]-d[e];f[e++]=g&this.DM;g>>=this.DB}if(d.t<this.t){g-=d.s;while(e<this.t){g+=this[e];f[e++]=g&this.DM;g>>=this.DB}g+=this.s}else{g+=this.s;while(e<d.t){g-=d[e];f[e++]=g&this.DM;g>>=this.DB}g-=d.s}f.s=(g<0)?-1:0;if(g<-1){f[e++]=this.DV+g}else{if(g>0){f[e++]=g}}f.t=e;f.clamp()}function bnpMultiplyTo(c,e){var b=this.abs(),f=c.abs();var d=b.t;e.t=d+f.t;while(--d>=0){e[d]=0}for(d=0;d<f.t;++d){e[d+b.t]=b.am(0,f[d],e,d,0,b.t)}e.s=0;e.clamp();if(this.s!=c.s){BigInteger.ZERO.subTo(e,e)}}function bnpSquareTo(d){var a=this.abs();var b=d.t=2*a.t;while(--b>=0){d[b]=0}for(b=0;b<a.t-1;++b){var e=a.am(b,a[b],d,2*b,0,1);if((d[b+a.t]+=a.am(b+1,2*a[b],d,2*b+1,e,a.t-b-1))>=a.DV){d[b+a.t]-=a.DV;d[b+a.t+1]=1}}if(d.t>0){d[d.t-1]+=a.am(b,a[b],d,2*b,0,1)}d.s=0;d.clamp()}function bnpDivRemTo(n,h,g){var x=n.abs();if(x.t<=0){return}var k=this.abs();if(k.t<x.t){if(h!=null){h.fromInt(0)}if(g!=null){this.copyTo(g)}return}if(g==null){g=nbi()}var d=nbi(),a=this.s,l=n.s;var w=this.DB-nbits(x[x.t-1]);if(w>0){x.lShiftTo(w,d);k.lShiftTo(w,g)}else{x.copyTo(d);k.copyTo(g)}var p=d.t;var b=d[p-1];if(b==0){return}var o=b*(1<<this.F1)+((p>1)?d[p-2]>>this.F2:0);var C=this.FV/o,B=(1<<this.F1)/o,A=1<<this.F2;var u=g.t,s=u-p,f=(h==null)?nbi():h;d.dlShiftTo(s,f);if(g.compareTo(f)>=0){g[g.t++]=1;g.subTo(f,g)}BigInteger.ONE.dlShiftTo(p,f);f.subTo(d,d);while(d.t<p){d[d.t++]=0}while(--s>=0){var c=(g[--u]==b)?this.DM:Math.floor(g[u]*C+(g[u-1]+A)*B);if((g[u]+=d.am(0,c,g,s,0,p))<c){d.dlShiftTo(s,f);g.subTo(f,g);while(g[u]<--c){g.subTo(f,g)}}}if(h!=null){g.drShiftTo(p,h);if(a!=l){BigInteger.ZERO.subTo(h,h)}}g.t=p;g.clamp();if(w>0){g.rShiftTo(w,g)}if(a<0){BigInteger.ZERO.subTo(g,g)}}function bnMod(b){var c=nbi();this.abs().divRemTo(b,null,c);if(this.s<0&&c.compareTo(BigInteger.ZERO)>0){b.subTo(c,c)}return c}function Classic(a){this.m=a}function cConvert(a){if(a.s<0||a.compareTo(this.m)>=0){return a.mod(this.m)}else{return a}}function cRevert(a){return a}function cReduce(a){a.divRemTo(this.m,null,a)}function cMulTo(a,c,b){a.multiplyTo(c,b);this.reduce(b)}function cSqrTo(a,b){a.squareTo(b);this.reduce(b)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1){return 0}var a=this[0];if((a&1)==0){return 0}var b=a&3;b=(b*(2-(a&15)*b))&15;b=(b*(2-(a&255)*b))&255;b=(b*(2-(((a&65535)*b)&65535)))&65535;b=(b*(2-a*b%this.DV))%this.DV;return(b>0)?this.DV-b:-b}function Montgomery(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t}function montConvert(a){var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(BigInteger.ZERO)>0){this.m.subTo(b,b)}return b}function montRevert(a){var b=nbi();a.copyTo(b);this.reduce(b);return b}function montReduce(a){while(a.t<=this.mt2){a[a.t++]=0}for(var c=0;c<this.m.t;++c){var b=a[c]&32767;var d=(b*this.mpl+(((b*this.mph+(a[c]>>15)*this.mpl)&this.um)<<15))&a.DM;b=c+this.m.t;a[b]+=this.m.am(0,d,a,c,0,this.m.t);while(a[b]>=a.DV){a[b]-=a.DV;a[++b]++}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0){a.subTo(this.m,a)}}function montSqrTo(a,b){a.squareTo(b);this.reduce(b)}function montMulTo(a,c,b){a.multiplyTo(c,b);this.reduce(b)}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0}function bnpExp(h,j){if(h>4294967295||h<1){return BigInteger.ONE}var f=nbi(),a=nbi(),d=j.convert(this),c=nbits(h)-1;d.copyTo(f);while(--c>=0){j.sqrTo(f,a);if((h&(1<<c))>0){j.mulTo(a,d,f)}else{var b=f;f=a;a=b}}return j.revert(f)}function bnModPowInt(b,a){var c;if(b<256||a.isEven()){c=new Classic(a)}else{c=new Montgomery(a)}return this.exp(b,c)}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function Arcfour(){this.i=0;this.j=0;this.S=new Array()}function ARC4init(d){var c,a,b;for(c=0;c<256;++c){this.S[c]=c}a=0;for(c=0;c<256;++c){a=(a+this.S[c]+d[c%d.length])&255;b=this.S[c];this.S[c]=this.S[a];this.S[a]=b}this.i=0;this.j=0}function ARC4next(){var a;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;a=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=a;return this.S[(a+this.S[this.i])&255]}Arcfour.prototype.init=ARC4init;Arcfour.prototype.next=ARC4next;function prng_newstate(){return new Arcfour()}var rng_psize=256;var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(a){rng_pool[rng_pptr++]^=a&255;rng_pool[rng_pptr++]^=(a>>8)&255;rng_pool[rng_pptr++]^=(a>>16)&255;rng_pool[rng_pptr++]^=(a>>24)&255;if(rng_pptr>=rng_psize){rng_pptr-=rng_psize}}function rng_seed_time(){rng_seed_int(new Date().getTime())}if(rng_pool==null){rng_pool=new Array();rng_pptr=0;var t;if(window.crypto&&window.crypto.getRandomValues){var ua=new Uint8Array(32);window.crypto.getRandomValues(ua);for(t=0;t<32;++t){rng_pool[rng_pptr++]=ua[t]}}if(navigator.appName=="Netscape"&&navigator.appVersion<"5"&&window.crypto){var z=window.crypto.random(32);for(t=0;t<z.length;++t){rng_pool[rng_pptr++]=z.charCodeAt(t)&255}}while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255}rng_pptr=0;rng_seed_time()}function rng_get_byte(){if(rng_state==null){rng_seed_time();rng_state=prng_newstate();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr){rng_pool[rng_pptr]=0}rng_pptr=0}return rng_state.next()}function rng_get_bytes(b){var a;for(a=0;a<b.length;++a){b[a]=rng_get_byte()}}function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;function parseBigInt(b,a){return new BigInteger(b,a)}function linebrk(c,d){var a="";var b=0;while(b+d<c.length){a+=c.substring(b,b+d)+"\n";b+=d}return a+c.substring(b,c.length)}function byte2Hex(a){if(a<16){return"0"+a.toString(16)}else{return a.toString(16)}}function pkcs1pad2(e,h){if(h<e.length+11){return null}var g=new Array();var d=e.length-1;while(d>=0&&h>0){var f=e.charCodeAt(d--);if(f<128){g[--h]=f}else{if((f>127)&&(f<2048)){g[--h]=(f&63)|128;g[--h]=(f>>6)|192}else{g[--h]=(f&63)|128;g[--h]=((f>>6)&63)|128;g[--h]=(f>>12)|224}}}g[--h]=0;var b=new SecureRandom();var a=new Array();while(h>2){a[0]=0;while(a[0]==0){b.nextBytes(a)}g[--h]=a[0]}g[--h]=2;g[--h]=0;return new BigInteger(g)}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function RSASetPublic(b,a){if(b!=null&&a!=null&&b.length>0&&a.length>0){this.n=parseBigInt(b,16);this.e=parseInt(a,16)}else{}}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(d){var a=pkcs1pad2(d,(this.n.bitLength()+7)>>3);if(a==null){return null}var e=this.doPublic(a);if(e==null){return null}var b=e.toString(16);if((b.length&1)==0){return b}else{return"0"+b}}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;
/*! JSEncrypt v2.3.1 | https://npmcdn.com/jsencrypt@2.3.1/LICENSE.txt */
(function(a,b){if(typeof define==="function"&&define.amd){define(["exports"],b)}else{if(typeof exports==="object"&&typeof exports.nodeName!=="string"){b(module.exports)}else{b(a)}}})(this,function(ap){var bE;var n=244837814094590;var aV=((n&16777215)==15715070);function bf(z,t,L){if(z!=null){if("number"==typeof z){this.fromNumber(z,t,L)}else{if(t==null&&"string"!=typeof z){this.fromString(z,256)}else{this.fromString(z,t)}}}}function bm(){return new bf(null)}function a7(bX,t,z,bW,bZ,bY){while(--bY>=0){var L=t*this[bX++]+z[bW]+bZ;bZ=Math.floor(L/67108864);z[bW++]=L&67108863}return bZ}function a6(bX,b2,b3,bW,b0,t){var bZ=b2&32767,b1=b2>>15;while(--t>=0){var L=this[bX]&32767;var bY=this[bX++]>>15;var z=b1*L+bY*bZ;L=bZ*L+((z&32767)<<15)+b3[bW]+(b0&1073741823);b0=(L>>>30)+(z>>>15)+b1*bY+(b0>>>30);b3[bW++]=L&1073741823}return b0}function a5(bX,b2,b3,bW,b0,t){var bZ=b2&16383,b1=b2>>14;while(--t>=0){var L=this[bX]&16383;var bY=this[bX++]>>14;var z=b1*L+bY*bZ;L=bZ*L+((z&16383)<<14)+b3[bW]+b0;b0=(L>>28)+(z>>14)+b1*bY;b3[bW++]=L&268435455}return b0}if(aV&&(navigator.appName=="Microsoft Internet Explorer")){bf.prototype.am=a6;bE=30}else{if(aV&&(navigator.appName!="Netscape")){bf.prototype.am=a7;bE=26}else{bf.prototype.am=a5;bE=28}}bf.prototype.DB=bE;bf.prototype.DM=((1<<bE)-1);bf.prototype.DV=(1<<bE);var bQ=52;bf.prototype.FV=Math.pow(2,bQ);bf.prototype.F1=bQ-bE;bf.prototype.F2=2*bE-bQ;var a="0123456789abcdefghijklmnopqrstuvwxyz";var g=new Array();var aH,E;aH="0".charCodeAt(0);for(E=0;E<=9;++E){g[aH++]=E}aH="a".charCodeAt(0);for(E=10;E<36;++E){g[aH++]=E}aH="A".charCodeAt(0);for(E=10;E<36;++E){g[aH++]=E}function Y(t){return a.charAt(t)}function aX(z,t){var L=g[z.charCodeAt(t)];return(L==null)?-1:L}function d(z){for(var t=this.t-1;t>=0;--t){z[t]=this[t]}z.t=this.t;z.s=this.s}function h(t){this.t=1;this.s=(t<0)?-1:0;if(t>0){this[0]=t}else{if(t<-1){this[0]=t+this.DV}else{this.t=0}}}function bi(t){var z=bm();z.fromInt(t);return z}function bI(bZ,z){var bW;if(z==16){bW=4}else{if(z==8){bW=3}else{if(z==256){bW=8}else{if(z==2){bW=1}else{if(z==32){bW=5}else{if(z==4){bW=2}else{this.fromRadix(bZ,z);return}}}}}}this.t=0;this.s=0;var bY=bZ.length,L=false,bX=0;while(--bY>=0){var t=(bW==8)?bZ[bY]&255:aX(bZ,bY);if(t<0){if(bZ.charAt(bY)=="-"){L=true}continue}L=false;if(bX==0){this[this.t++]=t}else{if(bX+bW>this.DB){this[this.t-1]|=(t&((1<<(this.DB-bX))-1))<<bX;this[this.t++]=(t>>(this.DB-bX))}else{this[this.t-1]|=t<<bX}}bX+=bW;if(bX>=this.DB){bX-=this.DB}}if(bW==8&&(bZ[0]&128)!=0){this.s=-1;if(bX>0){this[this.t-1]|=((1<<(this.DB-bX))-1)<<bX}}this.clamp();if(L){bf.ZERO.subTo(this,this)}}function bA(){var t=this.s&this.DM;while(this.t>0&&this[this.t-1]==t){--this.t}}function u(z){if(this.s<0){return"-"+this.negate().toString(z)}var L;if(z==16){L=4}else{if(z==8){L=3}else{if(z==2){L=1}else{if(z==32){L=5}else{if(z==4){L=2}else{return this.toRadix(z)}}}}}var bX=(1<<L)-1,b0,t=false,bY="",bW=this.t;var bZ=this.DB-(bW*this.DB)%L;if(bW-->0){if(bZ<this.DB&&(b0=this[bW]>>bZ)>0){t=true;bY=Y(b0)}while(bW>=0){if(bZ<L){b0=(this[bW]&((1<<bZ)-1))<<(L-bZ);b0|=this[--bW]>>(bZ+=this.DB-L)}else{b0=(this[bW]>>(bZ-=L))&bX;if(bZ<=0){bZ+=this.DB;--bW}}if(b0>0){t=true}if(t){bY+=Y(b0)}}}return t?bY:"0"}function bC(){var t=bm();bf.ZERO.subTo(this,t);return t}function bB(){return(this.s<0)?this.negate():this}function bN(t){var L=this.s-t.s;if(L!=0){return L}var z=this.t;L=z-t.t;if(L!=0){return(this.s<0)?-L:L}while(--z>=0){if((L=this[z]-t[z])!=0){return L}}return 0}function q(z){var bW=1,L;if((L=z>>>16)!=0){z=L;bW+=16}if((L=z>>8)!=0){z=L;bW+=8}if((L=z>>4)!=0){z=L;bW+=4}if((L=z>>2)!=0){z=L;bW+=2}if((L=z>>1)!=0){z=L;bW+=1}return bW}function bt(){if(this.t<=0){return 0}return this.DB*(this.t-1)+q(this[this.t-1]^(this.s&this.DM))}function bv(L,z){var t;for(t=this.t-1;t>=0;--t){z[t+L]=this[t]}for(t=L-1;t>=0;--t){z[t]=0}z.t=this.t+L;z.s=this.s}function a2(L,z){for(var t=L;t<this.t;++t){z[t-L]=this[t]}z.t=Math.max(this.t-L,0);z.s=this.s}function s(b0,bW){var z=b0%this.DB;var t=this.DB-z;var bY=(1<<t)-1;var bX=Math.floor(b0/this.DB),bZ=(this.s<<z)&this.DM,L;for(L=this.t-1;L>=0;--L){bW[L+bX+1]=(this[L]>>t)|bZ;bZ=(this[L]&bY)<<z}for(L=bX-1;L>=0;--L){bW[L]=0}bW[bX]=bZ;bW.t=this.t+bX+1;bW.s=this.s;bW.clamp()}function bT(bZ,bW){bW.s=this.s;var bX=Math.floor(bZ/this.DB);if(bX>=this.t){bW.t=0;return}var z=bZ%this.DB;var t=this.DB-z;var bY=(1<<z)-1;bW[0]=this[bX]>>z;for(var L=bX+1;L<this.t;++L){bW[L-bX-1]|=(this[L]&bY)<<t;bW[L-bX]=this[L]>>z}if(z>0){bW[this.t-bX-1]|=(this.s&bY)<<t}bW.t=this.t-bX;bW.clamp()}function bs(z,bW){var L=0,bX=0,t=Math.min(z.t,this.t);while(L<t){bX+=this[L]-z[L];bW[L++]=bX&this.DM;bX>>=this.DB}if(z.t<this.t){bX-=z.s;while(L<this.t){bX+=this[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=this.s}else{bX+=this.s;while(L<z.t){bX-=z[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX-=z.s}bW.s=(bX<0)?-1:0;if(bX<-1){bW[L++]=this.DV+bX}else{if(bX>0){bW[L++]=bX}}bW.t=L;bW.clamp()}function bJ(z,bW){var t=this.abs(),bX=z.abs();
var L=t.t;bW.t=L+bX.t;while(--L>=0){bW[L]=0}for(L=0;L<bX.t;++L){bW[L+t.t]=t.am(0,bX[L],bW,L,0,t.t)}bW.s=0;bW.clamp();if(this.s!=z.s){bf.ZERO.subTo(bW,bW)}}function au(L){var t=this.abs();var z=L.t=2*t.t;while(--z>=0){L[z]=0}for(z=0;z<t.t-1;++z){var bW=t.am(z,t[z],L,2*z,0,1);if((L[z+t.t]+=t.am(z+1,2*t[z],L,2*z+1,bW,t.t-z-1))>=t.DV){L[z+t.t]-=t.DV;L[z+t.t+1]=1}}if(L.t>0){L[L.t-1]+=t.am(z,t[z],L,2*z,0,1)}L.s=0;L.clamp()}function a9(b3,b0,bZ){var b9=b3.abs();if(b9.t<=0){return}var b1=this.abs();if(b1.t<b9.t){if(b0!=null){b0.fromInt(0)}if(bZ!=null){this.copyTo(bZ)}return}if(bZ==null){bZ=bm()}var bX=bm(),z=this.s,b2=b3.s;var b8=this.DB-q(b9[b9.t-1]);if(b8>0){b9.lShiftTo(b8,bX);b1.lShiftTo(b8,bZ)}else{b9.copyTo(bX);b1.copyTo(bZ)}var b5=bX.t;var L=bX[b5-1];if(L==0){return}var b4=L*(1<<this.F1)+((b5>1)?bX[b5-2]>>this.F2:0);var cc=this.FV/b4,cb=(1<<this.F1)/b4,ca=1<<this.F2;var b7=bZ.t,b6=b7-b5,bY=(b0==null)?bm():b0;bX.dlShiftTo(b6,bY);if(bZ.compareTo(bY)>=0){bZ[bZ.t++]=1;bZ.subTo(bY,bZ)}bf.ONE.dlShiftTo(b5,bY);bY.subTo(bX,bX);while(bX.t<b5){bX[bX.t++]=0}while(--b6>=0){var bW=(bZ[--b7]==L)?this.DM:Math.floor(bZ[b7]*cc+(bZ[b7-1]+ca)*cb);if((bZ[b7]+=bX.am(0,bW,bZ,b6,0,b5))<bW){bX.dlShiftTo(b6,bY);bZ.subTo(bY,bZ);while(bZ[b7]<--bW){bZ.subTo(bY,bZ)}}}if(b0!=null){bZ.drShiftTo(b5,b0);if(z!=b2){bf.ZERO.subTo(b0,b0)}}bZ.t=b5;bZ.clamp();if(b8>0){bZ.rShiftTo(b8,bZ)}if(z<0){bf.ZERO.subTo(bZ,bZ)}}function bh(t){var z=bm();this.abs().divRemTo(t,null,z);if(this.s<0&&z.compareTo(bf.ZERO)>0){t.subTo(z,z)}return z}function aT(t){this.m=t}function aI(t){if(t.s<0||t.compareTo(this.m)>=0){return t.mod(this.m)}else{return t}}function c(t){return t}function V(t){t.divRemTo(this.m,null,t)}function p(t,L,z){t.multiplyTo(L,z);this.reduce(z)}function aF(t,z){t.squareTo(z);this.reduce(z)}aT.prototype.convert=aI;aT.prototype.revert=c;aT.prototype.reduce=V;aT.prototype.mulTo=p;aT.prototype.sqrTo=aF;function ab(){if(this.t<1){return 0}var t=this[0];if((t&1)==0){return 0}var z=t&3;z=(z*(2-(t&15)*z))&15;z=(z*(2-(t&255)*z))&255;z=(z*(2-(((t&65535)*z)&65535)))&65535;z=(z*(2-t*z%this.DV))%this.DV;return(z>0)?this.DV-z:-z}function K(t){this.m=t;this.mp=t.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(t.DB-15))-1;this.mt2=2*t.t}function by(t){var z=bm();t.abs().dlShiftTo(this.m.t,z);z.divRemTo(this.m,null,z);if(t.s<0&&z.compareTo(bf.ZERO)>0){this.m.subTo(z,z)}return z}function bl(t){var z=bm();t.copyTo(z);this.reduce(z);return z}function bV(t){while(t.t<=this.mt2){t[t.t++]=0}for(var L=0;L<this.m.t;++L){var z=t[L]&32767;var bW=(z*this.mpl+(((z*this.mph+(t[L]>>15)*this.mpl)&this.um)<<15))&t.DM;z=L+this.m.t;t[z]+=this.m.am(0,bW,t,L,0,this.m.t);while(t[z]>=t.DV){t[z]-=t.DV;t[++z]++}}t.clamp();t.drShiftTo(this.m.t,t);if(t.compareTo(this.m)>=0){t.subTo(this.m,t)}}function ac(t,z){t.squareTo(z);this.reduce(z)}function bz(t,L,z){t.multiplyTo(L,z);this.reduce(z)}K.prototype.convert=by;K.prototype.revert=bl;K.prototype.reduce=bV;K.prototype.mulTo=bz;K.prototype.sqrTo=ac;function ad(){return((this.t>0)?(this[0]&1):this.s)==0}function am(b0,b1){if(b0>4294967295||b0<1){return bf.ONE}var bZ=bm(),L=bm(),bY=b1.convert(this),bX=q(b0)-1;bY.copyTo(bZ);while(--bX>=0){b1.sqrTo(bZ,L);if((b0&(1<<bX))>0){b1.mulTo(L,bY,bZ)}else{var bW=bZ;bZ=L;L=bW}}return b1.revert(bZ)}function aG(L,t){var bW;if(L<256||t.isEven()){bW=new aT(t)}else{bW=new K(t)}return this.exp(L,bW)}bf.prototype.copyTo=d;bf.prototype.fromInt=h;bf.prototype.fromString=bI;bf.prototype.clamp=bA;bf.prototype.dlShiftTo=bv;bf.prototype.drShiftTo=a2;bf.prototype.lShiftTo=s;bf.prototype.rShiftTo=bT;bf.prototype.subTo=bs;bf.prototype.multiplyTo=bJ;bf.prototype.squareTo=au;bf.prototype.divRemTo=a9;bf.prototype.invDigit=ab;bf.prototype.isEven=ad;bf.prototype.exp=am;bf.prototype.toString=u;bf.prototype.negate=bC;bf.prototype.abs=bB;bf.prototype.compareTo=bN;bf.prototype.bitLength=bt;bf.prototype.mod=bh;bf.prototype.modPowInt=aG;bf.ZERO=bi(0);bf.ONE=bi(1);function f(){var t=bm();this.copyTo(t);return t}function b(){if(this.s<0){if(this.t==1){return this[0]-this.DV}else{if(this.t==0){return -1}}}else{if(this.t==1){return this[0]}else{if(this.t==0){return 0}}}return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]}function bF(){return(this.t==0)?this.s:(this[0]<<24)>>24}function ag(){return(this.t==0)?this.s:(this[0]<<16)>>16}function aU(t){return Math.floor(Math.LN2*this.DB/Math.log(t))}function aZ(){if(this.s<0){return -1}else{if(this.t<=0||(this.t==1&&this[0]<=0)){return 0}else{return 1}}}function I(t){if(t==null){t=10}if(this.signum()==0||t<2||t>36){return"0"}var bW=this.chunkSize(t);var L=Math.pow(t,bW);var bZ=bi(L),b0=bm(),bY=bm(),bX="";this.divRemTo(bZ,b0,bY);while(b0.signum()>0){bX=(L+bY.intValue()).toString(t).substr(1)+bX;b0.divRemTo(bZ,b0,bY)}return bY.intValue().toString(t)+bX}function av(b1,bY){this.fromInt(0);if(bY==null){bY=10}var bW=this.chunkSize(bY);var bX=Math.pow(bY,bW),L=false,t=0,b0=0;for(var z=0;z<b1.length;++z){var bZ=aX(b1,z);if(bZ<0){if(b1.charAt(z)=="-"&&this.signum()==0){L=true
}continue}b0=bY*b0+bZ;if(++t>=bW){this.dMultiply(bX);this.dAddOffset(b0,0);t=0;b0=0}}if(t>0){this.dMultiply(Math.pow(bY,t));this.dAddOffset(b0,0)}if(L){bf.ZERO.subTo(this,this)}}function aP(bW,L,bY){if("number"==typeof L){if(bW<2){this.fromInt(1)}else{this.fromNumber(bW,bY);if(!this.testBit(bW-1)){this.bitwiseTo(bf.ONE.shiftLeft(bW-1),ak,this)}if(this.isEven()){this.dAddOffset(1,0)}while(!this.isProbablePrime(L)){this.dAddOffset(2,0);if(this.bitLength()>bW){this.subTo(bf.ONE.shiftLeft(bW-1),this)}}}}else{var z=new Array(),bX=bW&7;z.length=(bW>>3)+1;L.nextBytes(z);if(bX>0){z[0]&=((1<<bX)-1)}else{z[0]=0}this.fromString(z,256)}}function aK(){var z=this.t,L=new Array();L[0]=this.s;var bW=this.DB-(z*this.DB)%8,bX,t=0;if(z-->0){if(bW<this.DB&&(bX=this[z]>>bW)!=(this.s&this.DM)>>bW){L[t++]=bX|(this.s<<(this.DB-bW))}while(z>=0){if(bW<8){bX=(this[z]&((1<<bW)-1))<<(8-bW);bX|=this[--z]>>(bW+=this.DB-8)}else{bX=(this[z]>>(bW-=8))&255;if(bW<=0){bW+=this.DB;--z}}if((bX&128)!=0){bX|=-256}if(t==0&&(this.s&128)!=(bX&128)){++t}if(t>0||bX!=this.s){L[t++]=bX}}}return L}function bG(t){return(this.compareTo(t)==0)}function W(t){return(this.compareTo(t)<0)?this:t}function bu(t){return(this.compareTo(t)>0)?this:t}function aJ(z,bY,bW){var L,bX,t=Math.min(z.t,this.t);for(L=0;L<t;++L){bW[L]=bY(this[L],z[L])}if(z.t<this.t){bX=z.s&this.DM;for(L=t;L<this.t;++L){bW[L]=bY(this[L],bX)}bW.t=this.t}else{bX=this.s&this.DM;for(L=t;L<z.t;++L){bW[L]=bY(bX,z[L])}bW.t=z.t}bW.s=bY(this.s,z.s);bW.clamp()}function o(t,z){return t&z}function bO(t){var z=bm();this.bitwiseTo(t,o,z);return z}function ak(t,z){return t|z}function aS(t){var z=bm();this.bitwiseTo(t,ak,z);return z}function aa(t,z){return t^z}function B(t){var z=bm();this.bitwiseTo(t,aa,z);return z}function i(t,z){return t&~z}function aD(t){var z=bm();this.bitwiseTo(t,i,z);return z}function T(){var z=bm();for(var t=0;t<this.t;++t){z[t]=this.DM&~this[t]}z.t=this.t;z.s=~this.s;return z}function aN(z){var t=bm();if(z<0){this.rShiftTo(-z,t)}else{this.lShiftTo(z,t)}return t}function R(z){var t=bm();if(z<0){this.lShiftTo(-z,t)}else{this.rShiftTo(z,t)}return t}function bc(t){if(t==0){return -1}var z=0;if((t&65535)==0){t>>=16;z+=16}if((t&255)==0){t>>=8;z+=8}if((t&15)==0){t>>=4;z+=4}if((t&3)==0){t>>=2;z+=2}if((t&1)==0){++z}return z}function aq(){for(var t=0;t<this.t;++t){if(this[t]!=0){return t*this.DB+bc(this[t])}}if(this.s<0){return this.t*this.DB}return -1}function bj(t){var z=0;while(t!=0){t&=t-1;++z}return z}function ao(){var L=0,t=this.s&this.DM;for(var z=0;z<this.t;++z){L+=bj(this[z]^t)}return L}function aL(z){var t=Math.floor(z/this.DB);if(t>=this.t){return(this.s!=0)}return((this[t]&(1<<(z%this.DB)))!=0)}function U(L,z){var t=bf.ONE.shiftLeft(L);this.bitwiseTo(t,z,t);return t}function a1(t){return this.changeBit(t,ak)}function ah(t){return this.changeBit(t,i)}function aO(t){return this.changeBit(t,aa)}function S(z,bW){var L=0,bX=0,t=Math.min(z.t,this.t);while(L<t){bX+=this[L]+z[L];bW[L++]=bX&this.DM;bX>>=this.DB}if(z.t<this.t){bX+=z.s;while(L<this.t){bX+=this[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=this.s}else{bX+=this.s;while(L<z.t){bX+=z[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=z.s}bW.s=(bX<0)?-1:0;if(bX>0){bW[L++]=bX}else{if(bX<-1){bW[L++]=this.DV+bX}}bW.t=L;bW.clamp()}function bg(t){var z=bm();this.addTo(t,z);return z}function aA(t){var z=bm();this.subTo(t,z);return z}function bH(t){var z=bm();this.multiplyTo(t,z);return z}function bU(){var t=bm();this.squareTo(t);return t}function bd(t){var z=bm();this.divRemTo(t,z,null);return z}function bP(t){var z=bm();this.divRemTo(t,null,z);return z}function bk(t){var L=bm(),z=bm();this.divRemTo(t,L,z);return new Array(L,z)}function e(t){this[this.t]=this.am(0,t-1,this,0,0,this.t);++this.t;this.clamp()}function aR(z,t){if(z==0){return}while(this.t<=t){this[this.t++]=0}this[t]+=z;while(this[t]>=this.DV){this[t]-=this.DV;if(++t>=this.t){this[this.t++]=0}++this[t]}}function Z(){}function bw(t){return t}function bK(t,L,z){t.multiplyTo(L,z)}function ai(t,z){t.squareTo(z)}Z.prototype.convert=bw;Z.prototype.revert=bw;Z.prototype.mulTo=bK;Z.prototype.sqrTo=ai;function Q(t){return this.exp(t,new Z())}function aQ(t,bX,bW){var L=Math.min(this.t+t.t,bX);bW.s=0;bW.t=L;while(L>0){bW[--L]=0}var z;for(z=bW.t-this.t;L<z;++L){bW[L+this.t]=this.am(0,t[L],bW,L,0,this.t)}for(z=Math.min(t.t,bX);L<z;++L){this.am(0,t[L],bW,L,0,bX-L)}bW.clamp()}function a0(t,bW,L){--bW;var z=L.t=this.t+t.t-bW;L.s=0;while(--z>=0){L[z]=0}for(z=Math.max(bW-this.t,0);z<t.t;++z){L[this.t+z-bW]=this.am(bW-z,t[z],L,0,0,this.t+z-bW)}L.clamp();L.drShiftTo(1,L)}function bR(t){this.r2=bm();this.q3=bm();bf.ONE.dlShiftTo(2*t.t,this.r2);this.mu=this.r2.divide(t);this.m=t}function H(t){if(t.s<0||t.t>2*this.m.t){return t.mod(this.m)}else{if(t.compareTo(this.m)<0){return t}else{var z=bm();t.copyTo(z);this.reduce(z);return z}}}function bM(t){return t}function D(t){t.drShiftTo(this.m.t-1,this.r2);if(t.t>this.m.t+1){t.t=this.m.t+1;t.clamp()}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
while(t.compareTo(this.r2)<0){t.dAddOffset(1,this.m.t+1)}t.subTo(this.r2,t);while(t.compareTo(this.m)>=0){t.subTo(this.m,t)}}function aM(t,z){t.squareTo(z);this.reduce(z)}function x(t,L,z){t.multiplyTo(L,z);this.reduce(z)}bR.prototype.convert=H;bR.prototype.revert=bM;bR.prototype.reduce=D;bR.prototype.mulTo=x;bR.prototype.sqrTo=aM;function N(b4,bZ){var b2=b4.bitLength(),b0,bW=bi(1),b7;if(b2<=0){return bW}else{if(b2<18){b0=1}else{if(b2<48){b0=3}else{if(b2<144){b0=4}else{if(b2<768){b0=5}else{b0=6}}}}}if(b2<8){b7=new aT(bZ)}else{if(bZ.isEven()){b7=new bR(bZ)}else{b7=new K(bZ)}}var b3=new Array(),bY=3,b5=b0-1,L=(1<<b0)-1;b3[1]=b7.convert(this);if(b0>1){var ca=bm();b7.sqrTo(b3[1],ca);while(bY<=L){b3[bY]=bm();b7.mulTo(ca,b3[bY-2],b3[bY]);bY+=2}}var b1=b4.t-1,b8,b6=true,bX=bm(),b9;b2=q(b4[b1])-1;while(b1>=0){if(b2>=b5){b8=(b4[b1]>>(b2-b5))&L}else{b8=(b4[b1]&((1<<(b2+1))-1))<<(b5-b2);if(b1>0){b8|=b4[b1-1]>>(this.DB+b2-b5)}}bY=b0;while((b8&1)==0){b8>>=1;--bY}if((b2-=bY)<0){b2+=this.DB;--b1}if(b6){b3[b8].copyTo(bW);b6=false}else{while(bY>1){b7.sqrTo(bW,bX);b7.sqrTo(bX,bW);bY-=2}if(bY>0){b7.sqrTo(bW,bX)}else{b9=bW;bW=bX;bX=b9}b7.mulTo(bX,b3[b8],bW)}while(b1>=0&&(b4[b1]&(1<<b2))==0){b7.sqrTo(bW,bX);b9=bW;bW=bX;bX=b9;if(--b2<0){b2=this.DB-1;--b1}}}return b7.revert(bW)}function aB(L){var z=(this.s<0)?this.negate():this.clone();var bZ=(L.s<0)?L.negate():L.clone();if(z.compareTo(bZ)<0){var bX=z;z=bZ;bZ=bX}var bW=z.getLowestSetBit(),bY=bZ.getLowestSetBit();if(bY<0){return z}if(bW<bY){bY=bW}if(bY>0){z.rShiftTo(bY,z);bZ.rShiftTo(bY,bZ)}while(z.signum()>0){if((bW=z.getLowestSetBit())>0){z.rShiftTo(bW,z)}if((bW=bZ.getLowestSetBit())>0){bZ.rShiftTo(bW,bZ)}if(z.compareTo(bZ)>=0){z.subTo(bZ,z);z.rShiftTo(1,z)}else{bZ.subTo(z,bZ);bZ.rShiftTo(1,bZ)}}if(bY>0){bZ.lShiftTo(bY,bZ)}return bZ}function aj(bW){if(bW<=0){return 0}var L=this.DV%bW,z=(this.s<0)?bW-1:0;if(this.t>0){if(L==0){z=this[0]%bW}else{for(var t=this.t-1;t>=0;--t){z=(L*z+this[t])%bW}}}return z}function bS(z){var bY=z.isEven();if((this.isEven()&&bY)||z.signum()==0){return bf.ZERO}var bX=z.clone(),bW=this.clone();var L=bi(1),t=bi(0),b0=bi(0),bZ=bi(1);while(bX.signum()!=0){while(bX.isEven()){bX.rShiftTo(1,bX);if(bY){if(!L.isEven()||!t.isEven()){L.addTo(this,L);t.subTo(z,t)}L.rShiftTo(1,L)}else{if(!t.isEven()){t.subTo(z,t)}}t.rShiftTo(1,t)}while(bW.isEven()){bW.rShiftTo(1,bW);if(bY){if(!b0.isEven()||!bZ.isEven()){b0.addTo(this,b0);bZ.subTo(z,bZ)}b0.rShiftTo(1,b0)}else{if(!bZ.isEven()){bZ.subTo(z,bZ)}}bZ.rShiftTo(1,bZ)}if(bX.compareTo(bW)>=0){bX.subTo(bW,bX);if(bY){L.subTo(b0,L)}t.subTo(bZ,t)}else{bW.subTo(bX,bW);if(bY){b0.subTo(L,b0)}bZ.subTo(t,bZ)}}if(bW.compareTo(bf.ONE)!=0){return bf.ZERO}if(bZ.compareTo(z)>=0){return bZ.subtract(z)}if(bZ.signum()<0){bZ.addTo(z,bZ)}else{return bZ}if(bZ.signum()<0){return bZ.add(z)}else{return bZ}}var az=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var k=(1<<26)/az[az.length-1];function bL(bY){var bX,L=this.abs();if(L.t==1&&L[0]<=az[az.length-1]){for(bX=0;bX<az.length;++bX){if(L[0]==az[bX]){return true}}return false}if(L.isEven()){return false}bX=1;while(bX<az.length){var z=az[bX],bW=bX+1;while(bW<az.length&&z<k){z*=az[bW++]}z=L.modInt(z);while(bX<bW){if(z%az[bX++]==0){return false}}}return L.millerRabin(bY)}function aE(bY){var bZ=this.subtract(bf.ONE);var L=bZ.getLowestSetBit();if(L<=0){return false}var b0=bZ.shiftRight(L);bY=(bY+1)>>1;if(bY>az.length){bY=az.length}var z=bm();for(var bX=0;bX<bY;++bX){z.fromInt(az[Math.floor(Math.random()*az.length)]);var b1=z.modPow(b0,this);if(b1.compareTo(bf.ONE)!=0&&b1.compareTo(bZ)!=0){var bW=1;while(bW++<L&&b1.compareTo(bZ)!=0){b1=b1.modPowInt(2,this);if(b1.compareTo(bf.ONE)==0){return false}}if(b1.compareTo(bZ)!=0){return false}}}return true}bf.prototype.chunkSize=aU;bf.prototype.toRadix=I;bf.prototype.fromRadix=av;bf.prototype.fromNumber=aP;bf.prototype.bitwiseTo=aJ;bf.prototype.changeBit=U;bf.prototype.addTo=S;bf.prototype.dMultiply=e;bf.prototype.dAddOffset=aR;bf.prototype.multiplyLowerTo=aQ;bf.prototype.multiplyUpperTo=a0;bf.prototype.modInt=aj;bf.prototype.millerRabin=aE;bf.prototype.clone=f;bf.prototype.intValue=b;bf.prototype.byteValue=bF;bf.prototype.shortValue=ag;bf.prototype.signum=aZ;bf.prototype.toByteArray=aK;bf.prototype.equals=bG;bf.prototype.min=W;bf.prototype.max=bu;bf.prototype.and=bO;bf.prototype.or=aS;bf.prototype.xor=B;bf.prototype.andNot=aD;bf.prototype.not=T;bf.prototype.shiftLeft=aN;bf.prototype.shiftRight=R;
bf.prototype.getLowestSetBit=aq;bf.prototype.bitCount=ao;bf.prototype.testBit=aL;bf.prototype.setBit=a1;bf.prototype.clearBit=ah;bf.prototype.flipBit=aO;bf.prototype.add=bg;bf.prototype.subtract=aA;bf.prototype.multiply=bH;bf.prototype.divide=bd;bf.prototype.remainder=bP;bf.prototype.divideAndRemainder=bk;bf.prototype.modPow=N;bf.prototype.modInverse=bS;bf.prototype.pow=Q;bf.prototype.gcd=aB;bf.prototype.isProbablePrime=bL;bf.prototype.square=bU;function bp(){this.i=0;this.j=0;this.S=new Array()}function af(bX){var bW,z,L;for(bW=0;bW<256;++bW){this.S[bW]=bW}z=0;for(bW=0;bW<256;++bW){z=(z+this.S[bW]+bX[bW%bX.length])&255;L=this.S[bW];this.S[bW]=this.S[z];this.S[z]=L}this.i=0;this.j=0}function be(){var z;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;z=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=z;return this.S[(z+this.S[this.i])&255]}bp.prototype.init=af;bp.prototype.next=be;function P(){return new bp()}var y=256;var j;var l;var C;if(l==null){l=new Array();C=0;var ba;if(window.crypto&&window.crypto.getRandomValues){var a8=new Uint32Array(256);window.crypto.getRandomValues(a8);for(ba=0;ba<a8.length;++ba){l[C++]=a8[ba]&255}}var F=function(z){this.count=this.count||0;if(this.count>=256||C>=y){if(window.removeEventListener){window.removeEventListener("mousemove",F,false)}else{if(window.detachEvent){window.detachEvent("onmousemove",F)}}return}try{var t=z.x+z.y;l[C++]=t&255;this.count+=1}catch(L){}};if(window.addEventListener){window.addEventListener("mousemove",F,false)}else{if(window.attachEvent){window.attachEvent("onmousemove",F)}}}function bb(){if(j==null){j=P();while(C<y){var t=Math.floor(65536*Math.random());l[C++]=t&255}j.init(l);for(C=0;C<l.length;++C){l[C]=0}C=0}return j.next()}function aY(z){var t;for(t=0;t<z.length;++t){z[t]=bb()}}function G(){}G.prototype.nextBytes=aY;function w(z,t){return new bf(z,t)}function m(L,bW){var t="";var z=0;while(z+bW<L.length){t+=L.substring(z,z+bW)+"\n";z+=bW}return t+L.substring(z,L.length)}function br(t){if(t<16){return"0"+t.toString(16)}else{return t.toString(16)}}function bD(bW,bZ){if(bZ<bW.length+11){console.error("Message too long for RSA");return null}var bY=new Array();var L=bW.length-1;while(L>=0&&bZ>0){var bX=bW.charCodeAt(L--);if(bX<128){bY[--bZ]=bX}else{if((bX>127)&&(bX<2048)){bY[--bZ]=(bX&63)|128;bY[--bZ]=(bX>>6)|192}else{bY[--bZ]=(bX&63)|128;bY[--bZ]=((bX>>6)&63)|128;bY[--bZ]=(bX>>12)|224}}}bY[--bZ]=0;var z=new G();var t=new Array();while(bZ>2){t[0]=0;while(t[0]==0){z.nextBytes(t)}bY[--bZ]=t[0]}bY[--bZ]=2;bY[--bZ]=0;return new bf(bY)}function A(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function an(z,t){if(z!=null&&t!=null&&z.length>0&&t.length>0){this.n=w(z,16);this.e=parseInt(t,16)}else{console.error("Invalid RSA public key")}}function bq(t){return t.modPowInt(this.e,this.n)}function al(L){var t=bD(L,(this.n.bitLength()+7)>>3);if(t==null){return null}var bW=this.doPublic(t);if(bW==null){return null}var z=bW.toString(16);if((z.length&1)==0){return z}else{return"0"+z}}A.prototype.doPublic=bq;A.prototype.setPublic=an;A.prototype.encrypt=al;function bo(bW,bY){var t=bW.toByteArray();var L=0;while(L<t.length&&t[L]==0){++L}if(t.length-L!=bY-1||t[L]!=2){return null}++L;while(t[L]!=0){if(++L>=t.length){return null}}var z="";while(++L<t.length){var bX=t[L]&255;if(bX<128){z+=String.fromCharCode(bX)}else{if((bX>191)&&(bX<224)){z+=String.fromCharCode(((bX&31)<<6)|(t[L+1]&63));++L}else{z+=String.fromCharCode(((bX&15)<<12)|((t[L+1]&63)<<6)|(t[L+2]&63));L+=2}}}return z}function aC(L,t,z){if(L!=null&&t!=null&&L.length>0&&t.length>0){this.n=w(L,16);this.e=parseInt(t,16);this.d=w(z,16)}else{console.error("Invalid RSA private key")}}function O(bZ,bW,bX,L,z,t,b0,bY){if(bZ!=null&&bW!=null&&bZ.length>0&&bW.length>0){this.n=w(bZ,16);this.e=parseInt(bW,16);this.d=w(bX,16);this.p=w(L,16);this.q=w(z,16);this.dmp1=w(t,16);this.dmq1=w(b0,16);this.coeff=w(bY,16)}else{console.error("Invalid RSA private key")}}function ax(L,b2){var z=new G();var bZ=L>>1;this.e=parseInt(b2,16);var bW=new bf(b2,16);for(;;){for(;;){this.p=new bf(L-bZ,1,z);if(this.p.subtract(bf.ONE).gcd(bW).compareTo(bf.ONE)==0&&this.p.isProbablePrime(10)){break}}for(;;){this.q=new bf(bZ,1,z);if(this.q.subtract(bf.ONE).gcd(bW).compareTo(bf.ONE)==0&&this.q.isProbablePrime(10)){break}}if(this.p.compareTo(this.q)<=0){var b1=this.p;this.p=this.q;this.q=b1}var b0=this.p.subtract(bf.ONE);var bX=this.q.subtract(bf.ONE);var bY=b0.multiply(bX);if(bY.gcd(bW).compareTo(bf.ONE)==0){this.n=this.p.multiply(this.q);this.d=bW.modInverse(bY);this.dmp1=this.d.mod(b0);this.dmq1=this.d.mod(bX);this.coeff=this.q.modInverse(this.p);break}}}function ay(t){if(this.p==null||this.q==null){return t.modPow(this.d,this.n)}var L=t.mod(this.p).modPow(this.dmp1,this.p);var z=t.mod(this.q).modPow(this.dmq1,this.q);while(L.compareTo(z)<0){L=L.add(this.p)}return L.subtract(z).multiply(this.coeff).mod(this.p).multiply(this.q).add(z)}function r(z){var L=w(z,16);var t=this.doPrivate(L);
if(t==null){return null}return bo(t,(this.n.bitLength()+7)>>3)}A.prototype.doPrivate=ay;A.prototype.setPrivate=aC;A.prototype.setPrivateEx=O;A.prototype.generate=ax;A.prototype.decrypt=r;(function(){var z=function(b3,b1,b2){var bZ=new G();var bW=b3>>1;this.e=parseInt(b1,16);var bY=new bf(b1,16);var b0=this;var bX=function(){var b5=function(){if(b0.p.compareTo(b0.q)<=0){var b8=b0.p;b0.p=b0.q;b0.q=b8}var ca=b0.p.subtract(bf.ONE);var b7=b0.q.subtract(bf.ONE);var b9=ca.multiply(b7);if(b9.gcd(bY).compareTo(bf.ONE)==0){b0.n=b0.p.multiply(b0.q);b0.d=bY.modInverse(b9);b0.dmp1=b0.d.mod(ca);b0.dmq1=b0.d.mod(b7);b0.coeff=b0.q.modInverse(b0.p);setTimeout(function(){b2()},0)}else{setTimeout(bX,0)}};var b6=function(){b0.q=bm();b0.q.fromNumberAsync(bW,1,bZ,function(){b0.q.subtract(bf.ONE).gcda(bY,function(b7){if(b7.compareTo(bf.ONE)==0&&b0.q.isProbablePrime(10)){setTimeout(b5,0)}else{setTimeout(b6,0)}})})};var b4=function(){b0.p=bm();b0.p.fromNumberAsync(b3-bW,1,bZ,function(){b0.p.subtract(bf.ONE).gcda(bY,function(b7){if(b7.compareTo(bf.ONE)==0&&b0.p.isProbablePrime(10)){setTimeout(b6,0)}else{setTimeout(b4,0)}})})};setTimeout(b4,0)};setTimeout(bX,0)};A.prototype.generateAsync=z;var t=function(bX,b3){var bW=(this.s<0)?this.negate():this.clone();var b2=(bX.s<0)?bX.negate():bX.clone();if(bW.compareTo(b2)<0){var bZ=bW;bW=b2;b2=bZ}var bY=bW.getLowestSetBit(),b0=b2.getLowestSetBit();if(b0<0){b3(bW);return}if(bY<b0){b0=bY}if(b0>0){bW.rShiftTo(b0,bW);b2.rShiftTo(b0,b2)}var b1=function(){if((bY=bW.getLowestSetBit())>0){bW.rShiftTo(bY,bW)}if((bY=b2.getLowestSetBit())>0){b2.rShiftTo(bY,b2)}if(bW.compareTo(b2)>=0){bW.subTo(b2,bW);bW.rShiftTo(1,bW)}else{b2.subTo(bW,b2);b2.rShiftTo(1,b2)}if(!(bW.signum()>0)){if(b0>0){b2.lShiftTo(b0,b2)}setTimeout(function(){b3(b2)},0)}else{setTimeout(b1,0)}};setTimeout(b1,10)};bf.prototype.gcda=t;var L=function(b0,bX,b3,b2){if("number"==typeof bX){if(b0<2){this.fromInt(1)}else{this.fromNumber(b0,b3);if(!this.testBit(b0-1)){this.bitwiseTo(bf.ONE.shiftLeft(b0-1),ak,this)}if(this.isEven()){this.dAddOffset(1,0)}var bZ=this;var bY=function(){bZ.dAddOffset(2,0);if(bZ.bitLength()>b0){bZ.subTo(bf.ONE.shiftLeft(b0-1),bZ)}if(bZ.isProbablePrime(bX)){setTimeout(function(){b2()},0)}else{setTimeout(bY,0)}};setTimeout(bY,0)}}else{var bW=new Array(),b1=b0&7;bW.length=(b0>>3)+1;bX.nextBytes(bW);if(b1>0){bW[0]&=((1<<b1)-1)}else{bW[0]=0}this.fromString(bW,256)}};bf.prototype.fromNumberAsync=L})();var a4="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var J="=";function ae(L){var z;var bW;var t="";for(z=0;z+3<=L.length;z+=3){bW=parseInt(L.substring(z,z+3),16);t+=a4.charAt(bW>>6)+a4.charAt(bW&63)}if(z+1==L.length){bW=parseInt(L.substring(z,z+1),16);t+=a4.charAt(bW<<2)}else{if(z+2==L.length){bW=parseInt(L.substring(z,z+2),16);t+=a4.charAt(bW>>2)+a4.charAt((bW&3)<<4)}}while((t.length&3)>0){t+=J}return t}function aW(bX){var L="";var bW;var t=0;var z;for(bW=0;bW<bX.length;++bW){if(bX.charAt(bW)==J){break}v=a4.indexOf(bX.charAt(bW));if(v<0){continue}if(t==0){L+=Y(v>>2);z=v&3;t=1}else{if(t==1){L+=Y((z<<2)|(v>>4));z=v&15;t=2}else{if(t==2){L+=Y(z);L+=Y(v>>2);z=v&3;t=3}else{L+=Y((z<<2)|(v>>4));L+=Y(v&15);t=0}}}}if(t==1){L+=Y(z<<2)}return L}function M(bW){var L=aW(bW);var z;var t=new Array();for(z=0;2*z<L.length;++z){t[z]=parseInt(L.substring(2*z,2*z+2),16)}return t}
/*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */

var at=at||{};at.env=at.env||{};var bn=at,aw=Object.prototype,ar="[object Function]",X=["toString","valueOf"];at.env.parseUA=function(bW){var bX=function(b1){var b2=0;return parseFloat(b1.replace(/\./g,function(){return(b2++==1)?"":"."}))},b0=navigator,bZ={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:b0&&b0.cajaVersion,secure:false,os:null},L=bW||(navigator&&navigator.userAgent),bY=window&&window.location,z=bY&&bY.href,t;bZ.secure=z&&(z.toLowerCase().indexOf("https")===0);if(L){if((/windows|win32/i).test(L)){bZ.os="windows"}else{if((/macintosh/i).test(L)){bZ.os="macintosh"}else{if((/rhino/i).test(L)){bZ.os="rhino"}}}if((/KHTML/).test(L)){bZ.webkit=1}t=L.match(/AppleWebKit\/([^\s]*)/);if(t&&t[1]){bZ.webkit=bX(t[1]);if(/ Mobile\//.test(L)){bZ.mobile="Apple";t=L.match(/OS ([^\s]*)/);if(t&&t[1]){t=bX(t[1].replace("_","."))}bZ.ios=t;bZ.ipad=bZ.ipod=bZ.iphone=0;t=L.match(/iPad|iPod|iPhone/);if(t&&t[0]){bZ[t[0].toLowerCase()]=bZ.ios}}else{t=L.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(t){bZ.mobile=t[0]}if(/webOS/.test(L)){bZ.mobile="WebOS";t=L.match(/webOS\/([^\s]*);/);if(t&&t[1]){bZ.webos=bX(t[1])}}if(/ Android/.test(L)){bZ.mobile="Android";t=L.match(/Android ([^\s]*);/);if(t&&t[1]){bZ.android=bX(t[1])}}}t=L.match(/Chrome\/([^\s]*)/);if(t&&t[1]){bZ.chrome=bX(t[1])}else{t=L.match(/AdobeAIR\/([^\s]*)/);if(t){bZ.air=t[0]}}}if(!bZ.webkit){t=L.match(/Opera[\s\/]([^\s]*)/);if(t&&t[1]){bZ.opera=bX(t[1]);t=L.match(/Version\/([^\s]*)/);if(t&&t[1]){bZ.opera=bX(t[1])}t=L.match(/Opera Mini[^;]*/);if(t){bZ.mobile=t[0]
}}else{t=L.match(/MSIE\s([^;]*)/);if(t&&t[1]){bZ.ie=bX(t[1])}else{t=L.match(/Gecko\/([^\s]*)/);if(t){bZ.gecko=1;t=L.match(/rv:([^\s\)]*)/);if(t&&t[1]){bZ.gecko=bX(t[1])}}}}}}return bZ};at.env.ua=at.env.parseUA();at.isFunction=function(t){return(typeof t==="function")||aw.toString.apply(t)===ar};at._IEEnumFix=(at.env.ua.ie)?function(L,z){var t,bX,bW;for(t=0;t<X.length;t=t+1){bX=X[t];bW=z[bX];if(bn.isFunction(bW)&&bW!=aw[bX]){L[bX]=bW}}}:function(){};at.extend=function(bW,bX,L){if(!bX||!bW){throw new Error("extend failed, please check that "+"all dependencies are included.")}var z=function(){},t;z.prototype=bX.prototype;bW.prototype=new z();bW.prototype.constructor=bW;bW.superclass=bX.prototype;if(bX.prototype.constructor==aw.constructor){bX.prototype.constructor=bX}if(L){for(t in L){if(bn.hasOwnProperty(L,t)){bW.prototype[t]=L[t]}}bn._IEEnumFix(bW.prototype,L)}};if(typeof KJUR=="undefined"||!KJUR){KJUR={}}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={}}KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var z=t.toString(16);if((z.length%2)==1){z="0"+z}return z};this.bigIntToMinTwosComplementsHex=function(b0){var bY=b0.toString(16);if(bY.substr(0,1)!="-"){if(bY.length%2==1){bY="0"+bY}else{if(!bY.match(/^[0-7]/)){bY="00"+bY}}}else{var t=bY.substr(1);var bX=t.length;if(bX%2==1){bX+=1}else{if(!bY.match(/^[0-7]/)){bX+=2}}var bZ="";for(var bW=0;bW<bX;bW++){bZ+="f"}var L=new bf(bZ,16);var z=L.xor(b0).add(bf.ONE);bY=z.toString(16).replace(/^-/,"")}return bY};this.getPEMStringFromHex=function(t,z){var bX=CryptoJS.enc.Hex.parse(t);var L=CryptoJS.enc.Base64.stringify(bX);var bW=L.replace(/(.{64})/g,"$1\r\n");bW=bW.replace(/\r\n$/,"");return"-----BEGIN "+z+"-----\r\n"+bW+"\r\n-----END "+z+"-----\r\n"}};KJUR.asn1.ASN1Object=function(){var L=true;var z=null;var bW="00";var bX="00";var t="";this.getLengthHexFromValue=function(){if(typeof this.hV=="undefined"||this.hV==null){throw"this.hV is null or undefined."}if(this.hV.length%2==1){throw"value hex must be even length: n="+t.length+",v="+this.hV}var b1=this.hV.length/2;var b0=b1.toString(16);if(b0.length%2==1){b0="0"+b0}if(b1<128){return b0}else{var bZ=b0.length/2;if(bZ>15){throw"ASN.1 length too long to represent by 8x: n = "+b1.toString(16)}var bY=128+bZ;return bY.toString(16)+b0}};this.getEncodedHex=function(){if(this.hTLV==null||this.isModified){this.hV=this.getFreshValueHex();this.hL=this.getLengthHexFromValue();this.hTLV=this.hT+this.hL+this.hV;this.isModified=false}return this.hTLV};this.getValueHex=function(){this.getEncodedHex();return this.hV};this.getFreshValueHex=function(){return""}};KJUR.asn1.DERAbstractString=function(L){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var z=null;var t=null;this.getString=function(){return this.s};this.setString=function(bW){this.hTLV=null;this.isModified=true;this.s=bW;this.hV=stohex(this.s)};this.setStringHex=function(bW){this.hTLV=null;this.isModified=true;this.s=null;this.hV=bW};this.getFreshValueHex=function(){return this.hV};if(typeof L!="undefined"){if(typeof L["str"]!="undefined"){this.setString(L["str"])}else{if(typeof L["hex"]!="undefined"){this.setStringHex(L["hex"])}}}};at.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime=function(L){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);var z=null;var t=null;this.localDateToUTC=function(bX){utc=bX.getTime()+(bX.getTimezoneOffset()*60000);var bW=new Date(utc);return bW};this.formatDate=function(b1,b3){var bW=this.zeroPadding;var b2=this.localDateToUTC(b1);var b4=String(b2.getFullYear());if(b3=="utc"){b4=b4.substr(2,2)}var b0=bW(String(b2.getMonth()+1),2);var b5=bW(String(b2.getDate()),2);var bX=bW(String(b2.getHours()),2);var bY=bW(String(b2.getMinutes()),2);var bZ=bW(String(b2.getSeconds()),2);return b4+b0+b5+bX+bY+bZ+"Z"};this.zeroPadding=function(bX,bW){if(bX.length>=bW){return bX}return new Array(bW-bX.length+1).join("0")+bX};this.getString=function(){return this.s};this.setString=function(bW){this.hTLV=null;this.isModified=true;this.s=bW;this.hV=stohex(this.s)};this.setByDateValue=function(b0,b2,bX,bW,bY,bZ){var b1=new Date(Date.UTC(b0,b2-1,bX,bW,bY,bZ,0));this.setByDate(b1)};this.getFreshValueHex=function(){return this.hV}};at.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured=function(z){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var t=null;this.setByASN1ObjectArray=function(L){this.hTLV=null;this.isModified=true;this.asn1Array=L};this.appendASN1Object=function(L){this.hTLV=null;this.isModified=true;this.asn1Array.push(L)};this.asn1Array=new Array();if(typeof z!="undefined"){if(typeof z["array"]!="undefined"){this.asn1Array=z["array"]}}};at.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean=function(){KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT="01";this.hTLV="0101ff"};at.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger=function(t){KJUR.asn1.DERInteger.superclass.constructor.call(this);
this.hT="02";this.setByBigInteger=function(z){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(z)};this.setByInteger=function(L){var z=new bf(String(L),10);this.setByBigInteger(z)};this.setValueHex=function(z){this.hV=z};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t["bigint"]!="undefined"){this.setByBigInteger(t["bigint"])}else{if(typeof t["int"]!="undefined"){this.setByInteger(t["int"])}else{if(typeof t["hex"]!="undefined"){this.setValueHex(t["hex"])}}}}};at.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString=function(t){KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT="03";this.setHexValueIncludingUnusedBits=function(z){this.hTLV=null;this.isModified=true;this.hV=z};this.setUnusedBitsAndHexValue=function(z,bW){if(z<0||7<z){throw"unused bits shall be from 0 to 7: u = "+z}var L="0"+z;this.hTLV=null;this.isModified=true;this.hV=L+bW};this.setByBinaryString=function(bW){bW=bW.replace(/0+$/,"");var bX=8-bW.length%8;if(bX==8){bX=0}for(var bY=0;bY<=bX;bY++){bW+="0"}var bZ="";for(var bY=0;bY<bW.length-1;bY+=8){var L=bW.substr(bY,8);var z=parseInt(L,2).toString(16);if(z.length==1){z="0"+z}bZ+=z}this.hTLV=null;this.isModified=true;this.hV="0"+bX+bZ};this.setByBooleanArray=function(bW){var L="";for(var z=0;z<bW.length;z++){if(bW[z]==true){L+="1"}else{L+="0"}}this.setByBinaryString(L)};this.newFalseArray=function(bW){var z=new Array(bW);for(var L=0;L<bW;L++){z[L]=false}return z};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t["hex"]!="undefined"){this.setHexValueIncludingUnusedBits(t["hex"])}else{if(typeof t["bin"]!="undefined"){this.setByBinaryString(t["bin"])}else{if(typeof t["array"]!="undefined"){this.setByBooleanArray(t["array"])}}}}};at.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString=function(t){KJUR.asn1.DEROctetString.superclass.constructor.call(this,t);this.hT="04"};at.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT="05";this.hTLV="0500"};at.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier=function(L){var z=function(bW){var bX=bW.toString(16);if(bX.length==1){bX="0"+bX}return bX};var t=function(b1){var b0="";var bX=new bf(b1,10);var bW=bX.toString(2);var bY=7-bW.length%7;if(bY==7){bY=0}var b3="";for(var bZ=0;bZ<bY;bZ++){b3+="0"}bW=b3+bW;for(var bZ=0;bZ<bW.length-1;bZ+=7){var b2=bW.substr(bZ,7);if(bZ!=bW.length-7){b2="1"+b2}b0+=z(parseInt(b2,2))}return b0};KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT="06";this.setValueHex=function(bW){this.hTLV=null;this.isModified=true;this.s=null;this.hV=bW};this.setValueOidString=function(bY){if(!bY.match(/^[0-9.]+$/)){throw"malformed oid string: "+bY}var bZ="";var bW=bY.split(".");var b0=parseInt(bW[0])*40+parseInt(bW[1]);bZ+=z(b0);bW.splice(0,2);for(var bX=0;bX<bW.length;bX++){bZ+=t(bW[bX])}this.hTLV=null;this.isModified=true;this.s=null;this.hV=bZ};this.setValueName=function(bX){if(typeof KJUR.asn1.x509.OID.name2oidList[bX]!="undefined"){var bW=KJUR.asn1.x509.OID.name2oidList[bX];this.setValueOidString(bW)}else{throw"DERObjectIdentifier oidName undefined: "+bX}};this.getFreshValueHex=function(){return this.hV};if(typeof L!="undefined"){if(typeof L["oid"]!="undefined"){this.setValueOidString(L["oid"])}else{if(typeof L["hex"]!="undefined"){this.setValueHex(L["hex"])}else{if(typeof L["name"]!="undefined"){this.setValueName(L["name"])}}}}};at.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String=function(t){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,t);this.hT="0c"};at.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString=function(t){KJUR.asn1.DERNumericString.superclass.constructor.call(this,t);this.hT="12"};at.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString=function(t){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,t);this.hT="13"};at.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString=function(t){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,t);this.hT="14"};at.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String=function(t){KJUR.asn1.DERIA5String.superclass.constructor.call(this,t);this.hT="16"};at.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime=function(t){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,t);this.hT="17";this.setByDate=function(z){this.hTLV=null;this.isModified=true;this.date=z;this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s)};if(typeof t!="undefined"){if(typeof t["str"]!="undefined"){this.setString(t["str"])}else{if(typeof t["hex"]!="undefined"){this.setStringHex(t["hex"])}else{if(typeof t["date"]!="undefined"){this.setByDate(t["date"])}}}}};at.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime=function(t){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,t);this.hT="18";this.setByDate=function(z){this.hTLV=null;this.isModified=true;this.date=z;this.s=this.formatDate(this.date,"gen");this.hV=stohex(this.s)};if(typeof t!="undefined"){if(typeof t["str"]!="undefined"){this.setString(t["str"])}else{if(typeof t["hex"]!="undefined"){this.setStringHex(t["hex"])}else{if(typeof t["date"]!="undefined"){this.setByDate(t["date"])}}}}};at.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence=function(t){KJUR.asn1.DERSequence.superclass.constructor.call(this,t);this.hT="30";this.getFreshValueHex=function(){var L="";for(var z=0;z<this.asn1Array.length;z++){var bW=this.asn1Array[z];L+=bW.getEncodedHex()}this.hV=L;return this.hV}};at.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet=function(t){KJUR.asn1.DERSet.superclass.constructor.call(this,t);this.hT="31";this.getFreshValueHex=function(){var z=new Array();for(var L=0;L<this.asn1Array.length;L++){var bW=this.asn1Array[L];z.push(bW.getEncodedHex())}z.sort();this.hV=z.join("");return this.hV}};at.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject=function(t){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);this.hT="a0";this.hV="";this.isExplicit=true;this.asn1Object=null;this.setASN1Object=function(z,L,bW){this.hT=L;this.isExplicit=z;this.asn1Object=bW;if(this.isExplicit){this.hV=this.asn1Object.getEncodedHex();this.hTLV=null;this.isModified=true}else{this.hV=null;this.hTLV=bW.getEncodedHex();this.hTLV=this.hTLV.replace(/^../,L);this.isModified=false}};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t["tag"]!="undefined"){this.hT=t["tag"]}if(typeof t["explicit"]!="undefined"){this.isExplicit=t["explicit"]}if(typeof t["obj"]!="undefined"){this.asn1Object=t["obj"];this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)}}};at.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object);(function(z){var t={},L;t.decode=function(bW){var bY;if(L===z){var bZ="0123456789ABCDEF",b3=" \f\n\r\t\u00A0\u2028\u2029";L=[];for(bY=0;bY<16;++bY){L[bZ.charAt(bY)]=bY}bZ=bZ.toLowerCase();for(bY=10;bY<16;++bY){L[bZ.charAt(bY)]=bY}for(bY=0;bY<b3.length;++bY){L[b3.charAt(bY)]=-1}}var bX=[],b0=0,b2=0;for(bY=0;bY<bW.length;++bY){var b1=bW.charAt(bY);if(b1=="="){break}b1=L[b1];if(b1==-1){continue}if(b1===z){throw"Illegal character at offset "+bY}b0|=b1;if(++b2>=2){bX[bX.length]=b0;b0=0;b2=0}else{b0<<=4}}if(b2){throw"Hex encoding incomplete: 4 bits missing"}return bX};window.Hex=t})();(function(z){var t={},L;t.decode=function(bW){var bZ;if(L===z){var bY="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b3="= \f\n\r\t\u00A0\u2028\u2029";L=[];for(bZ=0;bZ<64;++bZ){L[bY.charAt(bZ)]=bZ}for(bZ=0;bZ<b3.length;++bZ){L[b3.charAt(bZ)]=-1}}var bX=[];var b0=0,b2=0;for(bZ=0;bZ<bW.length;++bZ){var b1=bW.charAt(bZ);if(b1=="="){break}b1=L[b1];if(b1==-1){continue}if(b1===z){throw"Illegal character at offset "+bZ}b0|=b1;if(++b2>=4){bX[bX.length]=(b0>>16);bX[bX.length]=(b0>>8)&255;bX[bX.length]=b0&255;b0=0;b2=0}else{b0<<=6}}switch(b2){case 1:throw"Base64 encoding incomplete: at least 2 bits missing";case 2:bX[bX.length]=(b0>>10);break;case 3:bX[bX.length]=(b0>>16);bX[bX.length]=(b0>>8)&255;break}return bX};t.re=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;t.unarmor=function(bX){var bW=t.re.exec(bX);if(bW){if(bW[1]){bX=bW[1]}else{if(bW[2]){bX=bW[2]}else{throw"RegExp out of sync"}}}return t.decode(bX)};window.Base64=t})();(function(bY){var z=100,t="\u2026",L={tag:function(b0,b1){var bZ=document.createElement(b0);bZ.className=b1;return bZ},text:function(bZ){return document.createTextNode(bZ)}};function bX(bZ,b0){if(bZ instanceof bX){this.enc=bZ.enc;this.pos=bZ.pos}else{this.enc=bZ;this.pos=b0}}bX.prototype.get=function(bZ){if(bZ===bY){bZ=this.pos++}if(bZ>=this.enc.length){throw"Requesting byte offset "+bZ+" on a stream of length "+this.enc.length}return this.enc[bZ]};bX.prototype.hexDigits="0123456789ABCDEF";bX.prototype.hexByte=function(bZ){return this.hexDigits.charAt((bZ>>4)&15)+this.hexDigits.charAt(bZ&15)};bX.prototype.hexDump=function(b3,bZ,b0){var b2="";for(var b1=b3;b1<bZ;++b1){b2+=this.hexByte(this.get(b1));if(b0!==true){switch(b1&15){case 7:b2+="  ";break;case 15:b2+="\n";break;default:b2+=" "}}}return b2};bX.prototype.parseStringISO=function(b2,bZ){var b1="";for(var b0=b2;b0<bZ;++b0){b1+=String.fromCharCode(this.get(b0))}return b1};bX.prototype.parseStringUTF=function(b3,bZ){var b1="";for(var b0=b3;b0<bZ;){var b2=this.get(b0++);if(b2<128){b1+=String.fromCharCode(b2)}else{if((b2>191)&&(b2<224)){b1+=String.fromCharCode(((b2&31)<<6)|(this.get(b0++)&63))}else{b1+=String.fromCharCode(((b2&15)<<12)|((this.get(b0++)&63)<<6)|(this.get(b0++)&63))}}}return b1};bX.prototype.parseStringBMP=function(b4,b0){var b3="";for(var b2=b4;b2<b0;b2+=2){var bZ=this.get(b2);
var b1=this.get(b2+1);b3+=String.fromCharCode((bZ<<8)+b1)}return b3};bX.prototype.reTime=/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;bX.prototype.parseTime=function(b2,b0){var b1=this.parseStringISO(b2,b0),bZ=this.reTime.exec(b1);if(!bZ){return"Unrecognized time: "+b1}b1=bZ[1]+"-"+bZ[2]+"-"+bZ[3]+" "+bZ[4];if(bZ[5]){b1+=":"+bZ[5];if(bZ[6]){b1+=":"+bZ[6];if(bZ[7]){b1+="."+bZ[7]}}}if(bZ[8]){b1+=" UTC";if(bZ[8]!="Z"){b1+=bZ[8];if(bZ[9]){b1+=":"+bZ[9]}}}return b1};bX.prototype.parseInteger=function(b4,b0){var bZ=b0-b4;if(bZ>4){bZ<<=3;var b2=this.get(b4);if(b2===0){bZ-=8}else{while(b2<128){b2<<=1;--bZ}}return"("+bZ+" bit)"}var b3=0;for(var b1=b4;b1<b0;++b1){b3=(b3<<8)|this.get(b1)}return b3};bX.prototype.parseBitString=function(bZ,b0){var b4=this.get(bZ),b2=((b0-bZ-1)<<3)-b4,b7="("+b2+" bit)";if(b2<=20){var b6=b4;b7+=" ";for(var b3=b0-1;b3>bZ;--b3){var b5=this.get(b3);for(var b1=b6;b1<8;++b1){b7+=(b5>>b1)&1?"1":"0"}b6=0}}return b7};bX.prototype.parseOctetString=function(b3,b0){var bZ=b0-b3,b2="("+bZ+" byte) ";if(bZ>z){b0=b3+z}for(var b1=b3;b1<b0;++b1){b2+=this.hexByte(this.get(b1))}if(bZ>z){b2+=t}return b2};bX.prototype.parseOID=function(b6,b0){var b3="",b5=0,b4=0;for(var b2=b6;b2<b0;++b2){var b1=this.get(b2);b5=(b5<<7)|(b1&127);b4+=7;if(!(b1&128)){if(b3===""){var bZ=b5<80?b5<40?0:1:2;b3=bZ+"."+(b5-bZ*40)}else{b3+="."+((b4>=31)?"bigint":b5)}b5=b4=0}}return b3};function bW(b2,b3,b1,bZ,b0){this.stream=b2;this.header=b3;this.length=b1;this.tag=bZ;this.sub=b0}bW.prototype.typeName=function(){if(this.tag===bY){return"unknown"}var b1=this.tag>>6,bZ=(this.tag>>5)&1,b0=this.tag&31;switch(b1){case 0:switch(b0){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString";default:return"Universal_"+b0.toString(16)}case 1:return"Application_"+b0.toString(16);case 2:return"["+b0+"]";case 3:return"Private_"+b0.toString(16)}};bW.prototype.reSeemsASCII=/^[ -~]+$/;bW.prototype.content=function(){if(this.tag===bY){return null}var b3=this.tag>>6,b0=this.tag&31,b2=this.posContent(),bZ=Math.abs(this.length);if(b3!==0){if(this.sub!==null){return"("+this.sub.length+" elem)"}var b1=this.stream.parseStringISO(b2,b2+Math.min(bZ,z));if(this.reSeemsASCII.test(b1)){return b1.substring(0,2*z)+((b1.length>2*z)?t:"")}else{return this.stream.parseOctetString(b2,b2+bZ)}}switch(b0){case 1:return(this.stream.get(b2)===0)?"false":"true";case 2:return this.stream.parseInteger(b2,b2+bZ);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(b2,b2+bZ);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(b2,b2+bZ);case 6:return this.stream.parseOID(b2,b2+bZ);case 16:case 17:return"("+this.sub.length+" elem)";case 12:return this.stream.parseStringUTF(b2,b2+bZ);case 18:case 19:case 20:case 21:case 22:case 26:return this.stream.parseStringISO(b2,b2+bZ);case 30:return this.stream.parseStringBMP(b2,b2+bZ);case 23:case 24:return this.stream.parseTime(b2,b2+bZ)}return null};bW.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+((this.sub===null)?"null":this.sub.length)+"]"};bW.prototype.print=function(b0){if(b0===bY){b0=""}document.writeln(b0+this);if(this.sub!==null){b0+="  ";for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){this.sub[b1].print(b0)}}};bW.prototype.toPrettyString=function(b0){if(b0===bY){b0=""}var b2=b0+this.typeName()+" @"+this.stream.pos;if(this.length>=0){b2+="+"}b2+=this.length;if(this.tag&32){b2+=" (constructed)"}else{if(((this.tag==3)||(this.tag==4))&&(this.sub!==null)){b2+=" (encapsulates)"}}b2+="\n";if(this.sub!==null){b0+="  ";for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){b2+=this.sub[b1].toPrettyString(b0)}}return b2};bW.prototype.toDOM=function(){var b0=L.tag("div","node");b0.asn1=this;var b6=L.tag("div","head");var b8=this.typeName().replace(/_/g," ");b6.innerHTML=b8;var b4=this.content();if(b4!==null){b4=String(b4).replace(/</g,"&lt;");var b3=L.tag("span","preview");b3.appendChild(L.text(b4));b6.appendChild(b3)}b0.appendChild(b6);this.node=b0;this.head=b6;var b7=L.tag("div","value");b8="Offset: "+this.stream.pos+"<br/>";b8+="Length: "+this.header+"+";if(this.length>=0){b8+=this.length}else{b8+=(-this.length)+" (undefined)"}if(this.tag&32){b8+="<br/>(constructed)"
}else{if(((this.tag==3)||(this.tag==4))&&(this.sub!==null)){b8+="<br/>(encapsulates)"}}if(b4!==null){b8+="<br/>Value:<br/><b>"+b4+"</b>";if((typeof oids==="object")&&(this.tag==6)){var b1=oids[b4];if(b1){if(b1.d){b8+="<br/>"+b1.d}if(b1.c){b8+="<br/>"+b1.c}if(b1.w){b8+="<br/>(warning!)"}}}}b7.innerHTML=b8;b0.appendChild(b7);var bZ=L.tag("div","sub");if(this.sub!==null){for(var b2=0,b5=this.sub.length;b2<b5;++b2){bZ.appendChild(this.sub[b2].toDOM())}}b0.appendChild(bZ);b6.onclick=function(){b0.className=(b0.className=="node collapsed")?"node":"node collapsed"};return b0};bW.prototype.posStart=function(){return this.stream.pos};bW.prototype.posContent=function(){return this.stream.pos+this.header};bW.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)};bW.prototype.fakeHover=function(bZ){this.node.className+=" hover";if(bZ){this.head.className+=" hover"}};bW.prototype.fakeOut=function(b0){var bZ=/ ?hover/;this.node.className=this.node.className.replace(bZ,"");if(b0){this.head.className=this.head.className.replace(bZ,"")}};bW.prototype.toHexDOM_sub=function(b2,b1,b3,b4,bZ){if(b4>=bZ){return}var b0=L.tag("span",b1);b0.appendChild(L.text(b3.hexDump(b4,bZ)));b2.appendChild(b0)};bW.prototype.toHexDOM=function(b0){var b3=L.tag("span","hex");if(b0===bY){b0=b3}this.head.hexNode=b3;this.head.onmouseover=function(){this.hexNode.className="hexCurrent"};this.head.onmouseout=function(){this.hexNode.className="hex"};b3.asn1=this;b3.onmouseover=function(){var b5=!b0.selected;if(b5){b0.selected=this.asn1;this.className="hexCurrent"}this.asn1.fakeHover(b5)};b3.onmouseout=function(){var b5=(b0.selected==this.asn1);this.asn1.fakeOut(b5);if(b5){b0.selected=null;this.className="hex"}};this.toHexDOM_sub(b3,"tag",this.stream,this.posStart(),this.posStart()+1);this.toHexDOM_sub(b3,(this.length>=0)?"dlen":"ulen",this.stream,this.posStart()+1,this.posContent());if(this.sub===null){b3.appendChild(L.text(this.stream.hexDump(this.posContent(),this.posEnd())))}else{if(this.sub.length>0){var b4=this.sub[0];var b2=this.sub[this.sub.length-1];this.toHexDOM_sub(b3,"intro",this.stream,this.posContent(),b4.posStart());for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){b3.appendChild(this.sub[b1].toHexDOM(b0))}this.toHexDOM_sub(b3,"outro",this.stream,b2.posEnd(),this.posEnd())}}return b3};bW.prototype.toHexString=function(bZ){return this.stream.hexDump(this.posStart(),this.posEnd(),true)};bW.decodeLength=function(b2){var b0=b2.get(),bZ=b0&127;if(bZ==b0){return bZ}if(bZ>3){throw"Length over 24 bits not supported at position "+(b2.pos-1)}if(bZ===0){return -1}b0=0;for(var b1=0;b1<bZ;++b1){b0=(b0<<8)|b2.get()}return b0};bW.hasContent=function(b0,bZ,b5){if(b0&32){return true}if((b0<3)||(b0>4)){return false}var b4=new bX(b5);if(b0==3){b4.get()}var b3=b4.get();if((b3>>6)&1){return false}try{var b2=bW.decodeLength(b4);return((b4.pos-b5.pos)+b2==bZ)}catch(b1){return false}};bW.decode=function(b6){if(!(b6 instanceof bX)){b6=new bX(b6,0)}var b5=new bX(b6),b8=b6.get(),b3=bW.decodeLength(b6),b2=b6.pos-b5.pos,bZ=null;if(bW.hasContent(b8,b3,b6)){var b0=b6.pos;if(b8==3){b6.get()}bZ=[];if(b3>=0){var b1=b0+b3;while(b6.pos<b1){bZ[bZ.length]=bW.decode(b6)}if(b6.pos!=b1){throw"Content size is not correct for container starting at offset "+b0}}else{try{for(;;){var b7=bW.decode(b6);if(b7.tag===0){break}bZ[bZ.length]=b7}b3=b0-b6.pos}catch(b4){throw"Exception while decoding undefined length content: "+b4}}}else{b6.pos+=b3}return new bW(b5,b2,b3,b8,bZ)};bW.test=function(){var b4=[{value:[39],expected:39},{value:[129,201],expected:201},{value:[131,254,220,186],expected:16702650}];for(var b1=0,bZ=b4.length;b1<bZ;++b1){var b3=0,b2=new bX(b4[b1].value,0),b0=bW.decodeLength(b2);if(b0!=b4[b1].expected){document.write("In test["+b1+"] expected "+b4[b1].expected+" got "+b0+"\n")}}};window.ASN1=bW})();ASN1.prototype.getHexStringValue=function(){var t=this.toHexString();var L=this.header*2;var z=this.length*2;return t.substr(L,z)};A.prototype.parseKey=function(b1){try{var b6=0;var bW=0;var t=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;var b5=t.test(b1)?Hex.decode(b1):Base64.unarmor(b1);var bX=ASN1.decode(b5);if(bX.sub.length===3){bX=bX.sub[2].sub[0]}if(bX.sub.length===9){b6=bX.sub[1].getHexStringValue();this.n=w(b6,16);bW=bX.sub[2].getHexStringValue();this.e=parseInt(bW,16);var z=bX.sub[3].getHexStringValue();this.d=w(z,16);var b0=bX.sub[4].getHexStringValue();this.p=w(b0,16);var bZ=bX.sub[5].getHexStringValue();this.q=w(bZ,16);var b3=bX.sub[6].getHexStringValue();this.dmp1=w(b3,16);var b2=bX.sub[7].getHexStringValue();this.dmq1=w(b2,16);var L=bX.sub[8].getHexStringValue();this.coeff=w(L,16)}else{if(bX.sub.length===2){var b7=bX.sub[1];var bY=b7.sub[0];b6=bY.sub[0].getHexStringValue();this.n=w(b6,16);bW=bY.sub[1].getHexStringValue();this.e=parseInt(bW,16)}else{return false}}return true}catch(b4){return false}};A.prototype.getPrivateBaseKey=function(){var z={"array":[new KJUR.asn1.DERInteger({"int":0}),new KJUR.asn1.DERInteger({"bigint":this.n}),new KJUR.asn1.DERInteger({"int":this.e}),new KJUR.asn1.DERInteger({"bigint":this.d}),new KJUR.asn1.DERInteger({"bigint":this.p}),new KJUR.asn1.DERInteger({"bigint":this.q}),new KJUR.asn1.DERInteger({"bigint":this.dmp1}),new KJUR.asn1.DERInteger({"bigint":this.dmq1}),new KJUR.asn1.DERInteger({"bigint":this.coeff})]};
var t=new KJUR.asn1.DERSequence(z);return t.getEncodedHex()};A.prototype.getPrivateBaseKeyB64=function(){return ae(this.getPrivateBaseKey())};A.prototype.getPublicBaseKey=function(){var L={"array":[new KJUR.asn1.DERObjectIdentifier({"oid":"1.2.840.113549.1.1.1"}),new KJUR.asn1.DERNull()]};var t=new KJUR.asn1.DERSequence(L);L={"array":[new KJUR.asn1.DERInteger({"bigint":this.n}),new KJUR.asn1.DERInteger({"int":this.e})]};var bX=new KJUR.asn1.DERSequence(L);L={"hex":"00"+bX.getEncodedHex()};var bW=new KJUR.asn1.DERBitString(L);L={"array":[t,bW]};var z=new KJUR.asn1.DERSequence(L);return z.getEncodedHex()};A.prototype.getPublicBaseKeyB64=function(){return ae(this.getPublicBaseKey())};A.prototype.wordwrap=function(L,t){t=t||64;if(!L){return L}var z="(.{1,"+t+"})( +|$\n?)|(.{1,"+t+"})";return L.match(RegExp(z,"g")).join("\n")};A.prototype.getPrivateKey=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";t+=this.wordwrap(this.getPrivateBaseKeyB64())+"\n";t+="-----END RSA PRIVATE KEY-----";return t};A.prototype.getPublicKey=function(){var t="-----BEGIN PUBLIC KEY-----\n";t+=this.wordwrap(this.getPublicBaseKeyB64())+"\n";t+="-----END PUBLIC KEY-----";return t};A.prototype.hasPublicKeyProperty=function(t){t=t||{};return(t.hasOwnProperty("n")&&t.hasOwnProperty("e"))};A.prototype.hasPrivateKeyProperty=function(t){t=t||{};return(t.hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff"))};A.prototype.parsePropertiesFrom=function(t){this.n=t.n;this.e=t.e;if(t.hasOwnProperty("d")){this.d=t.d;this.p=t.p;this.q=t.q;this.dmp1=t.dmp1;this.dmq1=t.dmq1;this.coeff=t.coeff}};var bx=function(t){A.call(this);if(t){if(typeof t==="string"){this.parseKey(t)}else{if(this.hasPrivateKeyProperty(t)||this.hasPublicKeyProperty(t)){this.parsePropertiesFrom(t)}}}};bx.prototype=new A();bx.prototype.constructor=bx;var a3=function(t){t=t||{};this.default_key_size=parseInt(t.default_key_size)||1024;this.default_public_exponent=t.default_public_exponent||"010001";this.log=t.log||false;this.key=null};a3.prototype.setKey=function(t){if(this.log&&this.key){console.warn("A key was already set, overriding existing.")}this.key=new bx(t)};a3.prototype.setPrivateKey=function(t){this.setKey(t)};a3.prototype.setPublicKey=function(t){this.setKey(t)};a3.prototype.decrypt=function(t){try{return this.getKey().decrypt(aW(t))}catch(z){return false}};a3.prototype.encrypt=function(t){try{return ae(this.getKey().encrypt(t))}catch(z){return false}};a3.prototype.getKey=function(t){if(!this.key){this.key=new bx();if(t&&{}.toString.call(t)==="[object Function]"){this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);return}this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key};a3.prototype.getPrivateKey=function(){return this.getKey().getPrivateKey()};a3.prototype.getPrivateKeyB64=function(){return this.getKey().getPrivateBaseKeyB64()};a3.prototype.getPublicKey=function(){return this.getKey().getPublicKey()};a3.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64()};a3.version="2.3.1";ap.JSEncrypt=a3});
var sha256={hexcase:0,b64pad:0,hex_sha256:function(s){return this.rstr2hex(this.rstr_sha256(this.str2rstr_utf8(s)))},b64_sha256:function(s){return this.rstr2b64(this.rstr_sha256(this.str2rstr_utf8(s)))},any_sha256:function(s,e){return this.rstr2any(this.rstr_sha256(this.str2rstr_utf8(s)),e)},hex_hmac_sha256:function(k,d){return this.rstr2hex(this.rstr_hmac_sha256(this.str2rstr_utf8(k),this.str2rstr_utf8(d)))},b64_hmac_sha256:function(k,d){return this.rstr2b64(this.rstr_hmac_sha256(this.str2rstr_utf8(k),this.str2rstr_utf8(d)))},any_hmac_sha256:function(k,d,e){return this.rstr2any(this.rstr_hmac_sha256(this.str2rstr_utf8(k),this.str2rstr_utf8(d)),e)},rstr_sha256:function(s){return this.binb2rstr(this.binb_sha256(this.rstr2binb(s),s.length*8))},rstr_hmac_sha256:function(key,data){var bkey=this.rstr2binb(key);if(bkey.length>16){bkey=this.binb_sha256(bkey,key.length*8)}var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^909522486;opad[i]=bkey[i]^1549556828}var hash=this.binb_sha256(ipad.concat(this.rstr2binb(data)),512+data.length*8);return this.binb2rstr(this.binb_sha256(opad.concat(hash),512+256))},rstr2hex:function(input){try{this.hexcase}catch(e){this.hexcase=0}var hex_tab=this.hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&15)+hex_tab.charAt(x&15)}return output},rstr2b64:function(input){try{this.b64pad}catch(e){this.b64pad=""}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8){output+=this.b64pad}else{output+=tab.charAt((triplet>>>6*(3-j))&63)}}}return output},rstr2any:function(input,encoding){var divisor=encoding.length;var remainders=Array();var i,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1)}while(dividend.length>0){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0){quotient[quotient.length]=q}}remainders[remainders.length]=x;dividend=quotient}var output="";for(i=remainders.length-1;i>=0;i--){output+=encoding.charAt(remainders[i])}var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));for(i=output.length;i<full_length;i++){output=encoding[0]+output}return output},str2rstr_utf8:function(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(55296<=x&&x<=56319&&56320<=y&&y<=57343){x=65536+((x&1023)<<10)+(y&1023);i++}if(x<=127){output+=String.fromCharCode(x)}else{if(x<=2047){output+=String.fromCharCode(192|((x>>>6)&31),128|(x&63))}else{if(x<=65535){output+=String.fromCharCode(224|((x>>>12)&15),128|((x>>>6)&63),128|(x&63))}else{if(x<=2097151){output+=String.fromCharCode(240|((x>>>18)&7),128|((x>>>12)&63),128|((x>>>6)&63),128|(x&63))}}}}}return output},str2rstr_utf16le:function(input){var output="";for(var i=0;i<input.length;i++){output+=String.fromCharCode(input.charCodeAt(i)&255,(input.charCodeAt(i)>>>8)&255)}return output},str2rstr_utf16be:function(input){var output="";for(var i=0;i<input.length;i++){output+=String.fromCharCode((input.charCodeAt(i)>>>8)&255,input.charCodeAt(i)&255)}return output},rstr2binb:function(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++){output[i]=0}for(var i=0;i<input.length*8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&255)<<(24-i%32)}return output},binb2rstr:function(input){var output="";for(var i=0;i<input.length*32;i+=8){output+=String.fromCharCode((input[i>>5]>>>(24-i%32))&255)}return output},sha256_S:function(X,n){return(X>>>n)|(X<<(32-n))},sha256_R:function(X,n){return(X>>>n)},sha256_Ch:function(x,y,z){return((x&y)^((~x)&z))},sha256_Maj:function(x,y,z){return((x&y)^(x&z)^(y&z))},sha256_Sigma0256:function(x){return(this.sha256_S(x,2)^this.sha256_S(x,13)^this.sha256_S(x,22))},sha256_Sigma1256:function(x){return(this.sha256_S(x,6)^this.sha256_S(x,11)^this.sha256_S(x,25))},sha256_Gamma0256:function(x){return(this.sha256_S(x,7)^this.sha256_S(x,18)^this.sha256_R(x,3))},sha256_Gamma1256:function(x){return(this.sha256_S(x,17)^this.sha256_S(x,19)^this.sha256_R(x,10))},sha256_Sigma0512:function(x){return(this.sha256_S(x,28)^this.sha256_S(x,34)^this.sha256_S(x,39))},sha256_Sigma1512:function(x){return(this.sha256_S(x,14)^this.sha256_S(x,18)^this.sha256_S(x,41))},sha256_Gamma0512:function(x){return(this.sha256_S(x,1)^this.sha256_S(x,8)^this.sha256_R(x,7))},sha256_Gamma1512:function(x){return(this.sha256_S(x,19)^this.sha256_S(x,61)^this.sha256_R(x,6))},sha256_K:new Array(1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998),binb_sha256:function(m,l){var HASH=new Array(1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225);
var W=new Array(64);var a,b,c,d,e,f,g,h;var i,j,T1,T2;m[l>>5]|=128<<(24-l%32);m[((l+64>>9)<<4)+15]=l;for(i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(j=0;j<64;j++){if(j<16){W[j]=m[j+i]}else{W[j]=this.safe_add(this.safe_add(this.safe_add(this.sha256_Gamma1256(W[j-2]),W[j-7]),this.sha256_Gamma0256(W[j-15])),W[j-16])}T1=this.safe_add(this.safe_add(this.safe_add(this.safe_add(h,this.sha256_Sigma1256(e)),this.sha256_Ch(e,f,g)),this.sha256_K[j]),W[j]);T2=this.safe_add(this.sha256_Sigma0256(a),this.sha256_Maj(a,b,c));h=g;g=f;f=e;e=this.safe_add(d,T1);d=c;c=b;b=a;a=this.safe_add(T1,T2)}HASH[0]=this.safe_add(a,HASH[0]);HASH[1]=this.safe_add(b,HASH[1]);HASH[2]=this.safe_add(c,HASH[2]);HASH[3]=this.safe_add(d,HASH[3]);HASH[4]=this.safe_add(e,HASH[4]);HASH[5]=this.safe_add(f,HASH[5]);HASH[6]=this.safe_add(g,HASH[6]);HASH[7]=this.safe_add(h,HASH[7])}return HASH},safe_add:function(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&65535)}};

//AES加密
!function(t,n){"object"==typeof exports?module.exports=exports=n():"function"==typeof define&&define.amd?define([],n):t.CryptoJS=n()}(this,function(){var t=t||function(t,n){var i=Object.create||function(){function t(){}return function(n){var i;return t.prototype=n,i=new t,t.prototype=null,i}}(),e={},r=e.lib={},o=r.Base=function(){return{extend:function(t){var n=i(this);return t&&n.mixIn(t),n.hasOwnProperty("init")&&this.init!==n.init||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),s=r.WordArray=o.extend({init:function(t,i){t=this.words=t||[],i!=n?this.sigBytes=i:this.sigBytes=4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var n=this.words,i=t.words,e=this.sigBytes,r=t.sigBytes;if(this.clamp(),e%4)for(var o=0;o<r;o++){var s=i[o>>>2]>>>24-o%4*8&255;n[e+o>>>2]|=s<<24-(e+o)%4*8}else for(var o=0;o<r;o+=4)n[e+o>>>2]=i[o>>>2];return this.sigBytes+=r,this},clamp:function(){var n=this.words,i=this.sigBytes;n[i>>>2]&=4294967295<<32-i%4*8,n.length=t.ceil(i/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(n){for(var i,e=[],r=function(n){var n=n,i=987654321,e=4294967295;return function(){i=36969*(65535&i)+(i>>16)&e,n=18e3*(65535&n)+(n>>16)&e;var r=(i<<16)+n&e;return r/=4294967296,r+=.5,r*(t.random()>.5?1:-1)}},o=0;o<n;o+=4){var a=r(4294967296*(i||t.random()));i=987654071*a(),e.push(4294967296*a()|0)}return new s.init(e,n)}}),a=e.enc={},c=a.Hex={stringify:function(t){for(var n=t.words,i=t.sigBytes,e=[],r=0;r<i;r++){var o=n[r>>>2]>>>24-r%4*8&255;e.push((o>>>4).toString(16)),e.push((15&o).toString(16))}return e.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e+=2)i[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new s.init(i,n/2)}},u=a.Latin1={stringify:function(t){for(var n=t.words,i=t.sigBytes,e=[],r=0;r<i;r++){var o=n[r>>>2]>>>24-r%4*8&255;e.push(String.fromCharCode(o))}return e.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e++)i[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new s.init(i,n)}},f=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},h=r.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(n){var i=this._data,e=i.words,r=i.sigBytes,o=this.blockSize,a=4*o,c=r/a;c=n?t.ceil(c):t.max((0|c)-this._minBufferSize,0);var u=c*o,f=t.min(4*u,r);if(u){for(var h=0;h<u;h+=o)this._doProcessBlock(e,h);var p=e.splice(0,u);i.sigBytes-=f}return new s.init(p,f)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(r.Hasher=h.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var n=this._doFinalize();return n},blockSize:16,_createHelper:function(t){return function(n,i){return new t.init(i).finalize(n)}},_createHmacHelper:function(t){return function(n,i){return new p.HMAC.init(t,i).finalize(n)}}}),e.algo={});return e}(Math);return t});
//# sourceMappingURL=core.min.js.map
!function(e,t,i){"object"==typeof exports?module.exports=exports=t(require("./core.min"),require("./sha1.min"),require("./hmac.min")):"function"==typeof define&&define.amd?define(["./core.min","./sha1.min","./hmac.min"],t):t(e.CryptoJS)}(this,function(e){return function(){var t=e,i=t.lib,r=i.Base,n=i.WordArray,o=t.algo,a=o.MD5,c=o.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:a,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var i=this.cfg,r=i.hasher.create(),o=n.create(),a=o.words,c=i.keySize,f=i.iterations;a.length<c;){s&&r.update(s);var s=r.update(e).finalize(t);r.reset();for(var u=1;u<f;u++)s=r.finalize(s),r.reset();o.concat(s)}return o.sigBytes=4*c,o}});t.EvpKDF=function(e,t,i){return c.create(i).compute(e,t)}}(),e.EvpKDF});
//# sourceMappingURL=evpkdf.min.js.map
!function(r,e){"object"==typeof exports?module.exports=exports=e(require("./core.min")):"function"==typeof define&&define.amd?define(["./core.min"],e):e(r.CryptoJS)}(this,function(r){return function(){function e(r,e,t){for(var n=[],i=0,o=0;o<e;o++)if(o%4){var f=t[r.charCodeAt(o-1)]<<o%4*2,c=t[r.charCodeAt(o)]>>>6-o%4*2;n[i>>>2]|=(f|c)<<24-i%4*8,i++}return a.create(n,i)}var t=r,n=t.lib,a=n.WordArray,i=t.enc;i.Base64={stringify:function(r){var e=r.words,t=r.sigBytes,n=this._map;r.clamp();for(var a=[],i=0;i<t;i+=3)for(var o=e[i>>>2]>>>24-i%4*8&255,f=e[i+1>>>2]>>>24-(i+1)%4*8&255,c=e[i+2>>>2]>>>24-(i+2)%4*8&255,s=o<<16|f<<8|c,h=0;h<4&&i+.75*h<t;h++)a.push(n.charAt(s>>>6*(3-h)&63));var p=n.charAt(64);if(p)for(;a.length%4;)a.push(p);return a.join("")},parse:function(r){var t=r.length,n=this._map,a=this._reverseMap;if(!a){a=this._reverseMap=[];for(var i=0;i<n.length;i++)a[n.charCodeAt(i)]=i}var o=n.charAt(64);if(o){var f=r.indexOf(o);f!==-1&&(t=f)}return e(r,t,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),r.enc.Base64});
//# sourceMappingURL=enc-base64.min.js.map
!function(e,t,r){"object"==typeof exports?module.exports=exports=t(require("./core.min"),require("./evpkdf.min")):"function"==typeof define&&define.amd?define(["./core.min","./evpkdf.min"],t):t(e.CryptoJS)}(this,function(e){e.lib.Cipher||function(t){var r=e,i=r.lib,n=i.Base,c=i.WordArray,o=i.BufferedBlockAlgorithm,s=r.enc,a=(s.Utf8,s.Base64),f=r.algo,p=f.EvpKDF,d=i.Cipher=o.extend({cfg:n.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r),this._xformMode=e,this._key=t,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){e&&this._append(e);var t=this._doFinalize();return t},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return"string"==typeof e?B:x}return function(t){return{encrypt:function(r,i,n){return e(i).encrypt(t,r,i,n)},decrypt:function(r,i,n){return e(i).decrypt(t,r,i,n)}}}}()}),h=(i.StreamCipher=d.extend({_doFinalize:function(){var e=this._process(!0);return e},blockSize:1}),r.mode={}),u=i.BlockCipherMode=n.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),l=h.CBC=function(){function e(e,r,i){var n=this._iv;if(n){var c=n;this._iv=t}else var c=this._prevBlock;for(var o=0;o<i;o++)e[r+o]^=c[o]}var r=u.extend();return r.Encryptor=r.extend({processBlock:function(t,r){var i=this._cipher,n=i.blockSize;e.call(this,t,r,n),i.encryptBlock(t,r),this._prevBlock=t.slice(r,r+n)}}),r.Decryptor=r.extend({processBlock:function(t,r){var i=this._cipher,n=i.blockSize,c=t.slice(r,r+n);i.decryptBlock(t,r),e.call(this,t,r,n),this._prevBlock=c}}),r}(),_=r.pad={},v=_.Pkcs7={pad:function(e,t){for(var r=4*t,i=r-e.sigBytes%r,n=i<<24|i<<16|i<<8|i,o=[],s=0;s<i;s+=4)o.push(n);var a=c.create(o,i);e.concat(a)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2];e.sigBytes-=t}},y=(i.BlockCipher=d.extend({cfg:d.cfg.extend({mode:l,padding:v}),reset:function(){d.reset.call(this);var e=this.cfg,t=e.iv,r=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var i=r.createEncryptor;else{var i=r.createDecryptor;this._minBufferSize=1}this._mode&&this._mode.__creator==i?this._mode.init(this,t&&t.words):(this._mode=i.call(r,this,t&&t.words),this._mode.__creator=i)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else{var t=this._process(!0);e.unpad(t)}return t},blockSize:4}),i.CipherParams=n.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}})),m=r.format={},k=m.OpenSSL={stringify:function(e){var t=e.ciphertext,r=e.salt;if(r)var i=c.create([1398893684,1701076831]).concat(r).concat(t);else var i=t;return i.toString(a)},parse:function(e){var t=a.parse(e),r=t.words;if(1398893684==r[0]&&1701076831==r[1]){var i=c.create(r.slice(2,4));r.splice(0,4),t.sigBytes-=16}return y.create({ciphertext:t,salt:i})}},x=i.SerializableCipher=n.extend({cfg:n.extend({format:k}),encrypt:function(e,t,r,i){i=this.cfg.extend(i);var n=e.createEncryptor(r,i),c=n.finalize(t),o=n.cfg;return y.create({ciphertext:c,key:r,iv:o.iv,algorithm:e,mode:o.mode,padding:o.padding,blockSize:e.blockSize,formatter:i.format})},decrypt:function(e,t,r,i){i=this.cfg.extend(i),t=this._parse(t,i.format);var n=e.createDecryptor(r,i).finalize(t.ciphertext);return n},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),g=r.kdf={},S=g.OpenSSL={execute:function(e,t,r,i){i||(i=c.random(8));var n=p.create({keySize:t+r}).compute(e,i),o=c.create(n.words.slice(t),4*r);return n.sigBytes=4*t,y.create({key:n,iv:o,salt:i})}},B=i.PasswordBasedCipher=x.extend({cfg:x.cfg.extend({kdf:S}),encrypt:function(e,t,r,i){i=this.cfg.extend(i);var n=i.kdf.execute(r,e.keySize,e.ivSize);i.iv=n.iv;var c=x.encrypt.call(this,e,t,n.key,i);return c.mixIn(n),c},decrypt:function(e,t,r,i){i=this.cfg.extend(i),t=this._parse(t,i.format);var n=i.kdf.execute(r,e.keySize,e.ivSize,t.salt);i.iv=n.iv;var c=x.decrypt.call(this,e,t,n.key,i);return c}})}()});
//# sourceMappingURL=cipher-core.min.js.map
!function(e,i){"object"==typeof exports?module.exports=exports=i(require("./core.min")):"function"==typeof define&&define.amd?define(["./core.min"],i):i(e.CryptoJS)}(this,function(e){!function(){var i=e,t=i.lib,n=t.Base,s=i.enc,r=s.Utf8,o=i.algo;o.HMAC=n.extend({init:function(e,i){e=this._hasher=new e.init,"string"==typeof i&&(i=r.parse(i));var t=e.blockSize,n=4*t;i.sigBytes>n&&(i=e.finalize(i)),i.clamp();for(var s=this._oKey=i.clone(),o=this._iKey=i.clone(),a=s.words,f=o.words,c=0;c<t;c++)a[c]^=1549556828,f[c]^=909522486;s.sigBytes=o.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var i=this._hasher,t=i.finalize(e);i.reset();var n=i.finalize(this._oKey.clone().concat(t));return n}})}()});
//# sourceMappingURL=hmac.min.js.map
!function(e,o,r){"object"==typeof exports?module.exports=exports=o(require("./core.min"),require("./cipher-core.min")):"function"==typeof define&&define.amd?define(["./core.min","./cipher-core.min"],o):o(e.CryptoJS)}(this,function(e){return e.mode.ECB=function(){var o=e.lib.BlockCipherMode.extend();return o.Encryptor=o.extend({processBlock:function(e,o){this._cipher.encryptBlock(e,o)}}),o.Decryptor=o.extend({processBlock:function(e,o){this._cipher.decryptBlock(e,o)}}),o}(),e.mode.ECB});
//# sourceMappingURL=mode-ecb.min.js.map
!function(e,r,i){"object"==typeof exports?module.exports=exports=r(require("./core.min"),require("./cipher-core.min")):"function"==typeof define&&define.amd?define(["./core.min","./cipher-core.min"],r):r(e.CryptoJS)}(this,function(e){return e.pad.Pkcs7});
//# sourceMappingURL=pad-pkcs7.min.js.map
!function(e,r,i){"object"==typeof exports?module.exports=exports=r(require("./core.min"),require("./enc-base64.min"),require("./md5.min"),require("./evpkdf.min"),require("./cipher-core.min")):"function"==typeof define&&define.amd?define(["./core.min","./enc-base64.min","./md5.min","./evpkdf.min","./cipher-core.min"],r):r(e.CryptoJS)}(this,function(e){return function(){var r=e,i=r.lib,n=i.BlockCipher,o=r.algo,t=[],c=[],s=[],f=[],a=[],d=[],u=[],v=[],h=[],y=[];!function(){for(var e=[],r=0;r<256;r++)r<128?e[r]=r<<1:e[r]=r<<1^283;for(var i=0,n=0,r=0;r<256;r++){var o=n^n<<1^n<<2^n<<3^n<<4;o=o>>>8^255&o^99,t[i]=o,c[o]=i;var p=e[i],l=e[p],_=e[l],k=257*e[o]^16843008*o;s[i]=k<<24|k>>>8,f[i]=k<<16|k>>>16,a[i]=k<<8|k>>>24,d[i]=k;var k=16843009*_^65537*l^257*p^16843008*i;u[o]=k<<24|k>>>8,v[o]=k<<16|k>>>16,h[o]=k<<8|k>>>24,y[o]=k,i?(i=p^e[e[e[_^p]]],n^=e[e[n]]):i=n=1}}();var p=[0,1,2,4,8,16,32,64,128,27,54],l=o.AES=n.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var e=this._keyPriorReset=this._key,r=e.words,i=e.sigBytes/4,n=this._nRounds=i+6,o=4*(n+1),c=this._keySchedule=[],s=0;s<o;s++)if(s<i)c[s]=r[s];else{var f=c[s-1];s%i?i>6&&s%i==4&&(f=t[f>>>24]<<24|t[f>>>16&255]<<16|t[f>>>8&255]<<8|t[255&f]):(f=f<<8|f>>>24,f=t[f>>>24]<<24|t[f>>>16&255]<<16|t[f>>>8&255]<<8|t[255&f],f^=p[s/i|0]<<24),c[s]=c[s-i]^f}for(var a=this._invKeySchedule=[],d=0;d<o;d++){var s=o-d;if(d%4)var f=c[s];else var f=c[s-4];d<4||s<=4?a[d]=f:a[d]=u[t[f>>>24]]^v[t[f>>>16&255]]^h[t[f>>>8&255]]^y[t[255&f]]}}},encryptBlock:function(e,r){this._doCryptBlock(e,r,this._keySchedule,s,f,a,d,t)},decryptBlock:function(e,r){var i=e[r+1];e[r+1]=e[r+3],e[r+3]=i,this._doCryptBlock(e,r,this._invKeySchedule,u,v,h,y,c);var i=e[r+1];e[r+1]=e[r+3],e[r+3]=i},_doCryptBlock:function(e,r,i,n,o,t,c,s){for(var f=this._nRounds,a=e[r]^i[0],d=e[r+1]^i[1],u=e[r+2]^i[2],v=e[r+3]^i[3],h=4,y=1;y<f;y++){var p=n[a>>>24]^o[d>>>16&255]^t[u>>>8&255]^c[255&v]^i[h++],l=n[d>>>24]^o[u>>>16&255]^t[v>>>8&255]^c[255&a]^i[h++],_=n[u>>>24]^o[v>>>16&255]^t[a>>>8&255]^c[255&d]^i[h++],k=n[v>>>24]^o[a>>>16&255]^t[d>>>8&255]^c[255&u]^i[h++];a=p,d=l,u=_,v=k}var p=(s[a>>>24]<<24|s[d>>>16&255]<<16|s[u>>>8&255]<<8|s[255&v])^i[h++],l=(s[d>>>24]<<24|s[u>>>16&255]<<16|s[v>>>8&255]<<8|s[255&a])^i[h++],_=(s[u>>>24]<<24|s[v>>>16&255]<<16|s[a>>>8&255]<<8|s[255&d])^i[h++],k=(s[v>>>24]<<24|s[a>>>16&255]<<16|s[d>>>8&255]<<8|s[255&u])^i[h++];e[r]=p,e[r+1]=l,e[r+2]=_,e[r+3]=k},keySize:8});r.AES=n._createHelper(l)}(),e.AES});
//# sourceMappingURL=aes.min.js.map
!function(e,n){"object"==typeof exports?module.exports=exports=n(require("./core.min")):"function"==typeof define&&define.amd?define(["./core.min"],n):n(e.CryptoJS)}(this,function(e){return e.enc.Utf8});
//# sourceMappingURL=enc-utf8.min.js.map

 ;(function(win,doc){

	
	
	var opt = {
		//设置rsa加密
		setRsa:function(publicKey){
			//设置公钥
			var encrypt=new JSEncrypt();
			encrypt.setPublicKey(publicKey);
			return encrypt;
		},//用于生成UUID
		guid:function(str){
			var S4 = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			var guid = (S4+S4+"-"+S4+"-"+S4+"-"+S4+"-"+S4+S4+S4);
			return str + guid;
		},
		//短信下发接口
		getsendSms:{
			test:'http://10.153.99.8:8315/NumberAbility/h5/sendSms.htm',
			test01:'http://120.197.235.101:8315/NumberAbility/h5/sendSms.htm',
			pro:'http://www.cmpassport.com/NumberAbility/h5/sendSms.htm'
		},
		//验证码校验
		getvalidateSms:{
			test:'http://10.153.99.8:8315/NumberAbility/h5/validateSms.htm',
			test01:'http://120.197.235.101:8315/NumberAbility/h5/validateSms.htm',
			pro:'http://10.153.99.8:8315/NumberAbility/h5/validateSms.htm'
		}
	}
	
	var msgId = "";
	var uuid = "";
	//获取短信验证码
	win.YDRZ = {
		sendSms:function(options){
			var timestamp = dateFormat(new Date(),"yyyyMMddhhmmssSSS");
			msgId = Math.random();
			uuid = opt.guid("cms-")
			//拼接签名
			var sign = opt.setRsa(options.publicKey).encrypt(options.appId
				+ options.phone
				+ msgId 
				+ timestamp
				+ uuid
				+ options.version);
			var params = {
				header:{
					version:options.version,
					msgId:msgId,
					timestamp:timestamp,
					appId:options.appId
				},
				body:{
					mobileNumber:opt.setRsa(options.publicKey).encrypt(options.phone),
					uuid:uuid,
					expandParams:options.expandParams,
					sign:sign
				}
			}
			try{
				request.ajax({
					request:{
						url:opt.getsendSms.test01,
						method:"post",
						data:JSON.stringify(params)
					},
					success:function(res){
						if (res.result.header.resultCode != "000000") {
							options.error({code:res.result.header.resultCode,message:res.result.body.resultDesc})
						}else{
							options.success({code:res.result.header.resultCode,message:res.result.body.resultDesc})
						}
						
					},
					error:function(res){
						options.error({code:"0",message:"系统异常"})
					}
				});
			}catch(e){
				throw new Error(e);
			}
		},
		//验证码校验
		validateSms:function(options){
			var timestamp = dateFormat(new Date(),"yyyyMMddhhmmssSSS");
			//拼接签名
			var sign = opt.setRsa(options.publicKey).encrypt(
				options.appId
				+ options.phone
				+ msgId
				+ options.smsCode 
				+ timestamp
				+ uuid
				+ options.version);
			var params = {
				header:{
					version:options.version,
					msgId:msgId,
					timestamp:timestamp,
					appId:options.appId
				},
				body:{
					mobileNumber:opt.setRsa(options.publicKey).encrypt(options.phone),
					smsCode:options.smsCode,
					uuid:uuid,
					expandParams:options.expandParams,
					sign:sign
				}
			}
			try{
				request.ajax({
					request:{
						url:opt.getvalidateSms.test01,
						method:"post",
						data:JSON.stringify(params)
					},
					success:function(res){
						if (res.result.rmkey === "") {
							options.error("系统异常")
						}else{
							options.success(res.result.rmkey)
						}
					},
					error:function(res){
						options.error("系统异常")
					}
				});
			}catch(e){
				throw new Error(e);
			}
		}
	}


	// 获取url中对账单号参数
	function GetRequest() {
		   var url = location.search; //获取url中"?"符后的字串,如"?p=1"
		   var theRequest = new Object();
		   if (url.indexOf("?") != -1) {
		   	var str = url.substr(1);
		   	strs = str.split("&");
		   	for(var i = 0; i < strs.length; i ++) {
		   		theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		   	}
		   }
		   return theRequest;
	}
	function dateFormat(obj,fmt){
		var o = {
                "M+": obj.getMonth() + 1, //月份 
                "d+": obj.getDate(), //日 
                "h+": obj.getHours(), //小时 
                "m+": obj.getMinutes(), //分 
                "s+": obj.getSeconds(), //秒 
                "q+": Math.floor((obj.getMonth() + 3) / 3), //季度 
                "S+": obj.getMilliseconds() //毫秒 
            };
            if(/(y+)/.test(fmt)){ 
            	fmt = fmt.replace(RegExp.$1,(obj.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for(var k in o){
            	if(new RegExp("(" + k + ")").test(fmt)){
            		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (( ((RegExp.$1.length == 3 && k == "S+") ? "000" : "00") + o[k]).substr(("" + o[k]).length)));
            	}
            }
            return fmt;
        }



	/**
     * [ajax]
     */
    var request = {
        /**
         * [兼容老版的]
         */
        utilCreateXHR:function(options){
            var win = (options && options.window) || window;
            if (win.XMLHttpRequest) {
                return new win.XMLHttpRequest();
            } else {
                var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];
                for (var n = 0; n < MSXML.length; n++) {
                    try {
                        return new win.ActiveXObject(MSXML[n]);
                        break;
                    }
                    catch (e) {
                    }
                }
            }
        },
        /**
         * [JSON.parse]
         */
        parseJson:function(text){
            var obj = false;
            if (!text) {
                obj = {
                    "code": "ER_NOBODY",
                    "summary": "responseText is empty"
                };
            }

            if (win.JSON && JSON.parse) {
                try {
                    obj = JSON.parse(text);
                } catch (ex) {
                }
            }

            if (!obj) {
                try {
                    obj = eval("(" + text + ")");
                } catch (ex) {
                    obj = {
                        "code": "ER_INVALIDJSON",
                        "summary": "responseText is invalid json"
                    };
                }
            }

            return obj;
        },
        /**
         * [ajax请求]
         */
        ajax:function(args){
            var This = this;
            var args = args || {};
            var request = args.request || {};
            var xhr = this.utilCreateXHR(args);

            var onsuccess = args.success || new Function();
            var onerror = args.error || new Function();

            var timeout = request.timeout;
            var timer = null;
            if(timeout > 0){
                timer = setTimeout(function(){
                    if (xhr.readyState == 3 && xhr.status == 200) return;
                    xhr.abort();
                    onerror({
                        result: { code: "ER_TIMEOUT", summary: "timeout" }
                    });
                },timeout);
            }

            xhr.onreadystatechange = function (data) {
                //abort()后xhr.status为0
                if (xhr.readyState == 4) {
                    clearTimeout(timer);
                    if(xhr.status != 0){
                        if (xhr.status == 304 || (xhr.status >= 200 && xhr.status < 300)) {
                            onsuccess({
                                result: This.parseJson(xhr.responseText),
                                text: xhr.responseText,
                                status: xhr.status
                            });
                        } else {
                            onerror({
                                result: { code: "ER_NETWORK", summary: "network has error" },
                                text: xhr.responseText,
                                status: xhr.status
                            });
                        }
                    }else{
                        onerror({
                            result: { code: "ER_STATUS", summary: "status is 0" }
                        });
                    }
                }
            }
            var method = request.method && request.method.toLowerCase();
            xhr.open(method || "get", request.url, true);

            var data = request.data;

            if (!request.isFormData) {
                //如果到了这里data仍为object类型，则自动转化为urlencoded或JSON.stringify
                if(typeof data == "object"){
                    data = [];
                    for (var p in request.data) {
                        data.push(p + "=" + encodeURIComponent(request.data[p]));
                    }
                    data = data.join("&");
                    //data = JSON.stringify(data);
                }
                // if (!request.headers){
                //     request.headers = {};
                // }
                // if (!request.headers["Content-Type"]) {
                //     request.headers["Content-Type"] = "application/json; charset=utf-8";
                // }
            }
            if(request.headers){
                for(var p in request.headers){
                    console.log(xhr)
                    xhr.setRequestHeader(p,request.headers[p]);
                }
            }
            if(method != 'post' || !data){
                data = null; 
            }
            //xhr.send仅用于method=post请求
            xhr.send(data);
        }   
    }
    /**
     * [Aes加密]
     */
    // var Aes = {
    //     cipher:function(input,w){
    //         var Nb = 4;              
    //         var Nr = w.length/Nb - 1; 

    //         var state = [[],[],[],[]];  
    //         for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

    //         state = this.addRoundKey(state, w, 0, Nb);

    //         for (var round=1; round<Nr; round++) {
    //           state = this.subBytes(state, Nb);
    //           state = this.shiftRows(state, Nb);
    //           state = this.mixColumns(state, Nb);
    //           state = this.addRoundKey(state, w, round, Nb);
    //         }

    //         state = this.subBytes(state, Nb);
    //         state = this.shiftRows(state, Nb);
    //         state = this.addRoundKey(state, w, Nr, Nb);

    //         var output = new Array(4*Nb); 
    //         for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
    //         return output;
    //     },
    //     keyExpansion:function(key){  
    //         var Nb = 4;            
    //         var Nk = key.length/4  
    //         var Nr = Nk + 6;      

    //         var w = new Array(Nb*(Nr+1));
    //         var temp = new Array(4);

    //         for (var i=0; i<Nk; i++) {
    //           var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    //           w[i] = r;
    //         }

    //         for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    //           w[i] = new Array(4);
    //           for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    //           if (i % Nk == 0) {
    //             temp = this.subWord(this.rotWord(temp));
    //             for (var t=0; t<4; t++) temp[t] ^= this.rCon[i/Nk][t];
    //           } else if (Nk > 6 && i%Nk == 4) {
    //             temp = this.subWord(temp);
    //           }
    //           for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
    //         }

    //         return w;
    //     },
    //     subBytes:function(s,Nb){  
    //         for (var r=0; r<4; r++) {
    //             for (var c=0; c<Nb; c++) s[r][c] = this.sBox[s[r][c]];
    //         }
    //         return s;
    //     },
    //     shiftRows:function(s,Nb){   
    //         var t = new Array(4);
    //         for (var r=1; r<4; r++) {
    //             for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb]; 
    //             for (var c=0; c<4; c++) s[r][c] = t[c];       
    //         }          
    //         return s;  
    //     },
    //     mixColumns:function(s,Nb){   
    //         for (var c=0; c<4; c++) {
    //             var a = new Array(4);  
    //             var b = new Array(4);  
    //             for (var i=0; i<4; i++) {
    //               a[i] = s[i][c];
    //               b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;

    //             }

    //             s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; 
    //             s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; 
    //             s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; 
    //             s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; 
    //         }
    //         return s;
    //     },
    //     addRoundKey:function(state,w,rnd,Nb){
    //         for (var r=0; r<4; r++) {
    //             for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
    //         }
    //         return state;
    //     },
    //     subWord:function(w){ 
    //         for (var i=0; i<4; i++) w[i] = this.sBox[w[i]];
    //         return w;
    //     },
    //     rotWord:function(w){  
    //         var tmp = w[0];
    //         for (var i=0; i<3; i++) w[i] = w[i+1];
    //         w[3] = tmp;
    //         return w;
    //     },
    //     sBox:[
    //         0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
    //         0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
    //         0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
    //         0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
    //         0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
    //         0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
    //         0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
    //         0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
    //         0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
    //         0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
    //         0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
    //         0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
    //         0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
    //         0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
    //         0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
    //         0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16
    //     ],
    //     rCon:[ 
    //         [0x00, 0x00, 0x00, 0x00],
    //         [0x01, 0x00, 0x00, 0x00],
    //         [0x02, 0x00, 0x00, 0x00],
    //         [0x04, 0x00, 0x00, 0x00],
    //         [0x08, 0x00, 0x00, 0x00],
    //         [0x10, 0x00, 0x00, 0x00],
    //         [0x20, 0x00, 0x00, 0x00],
    //         [0x40, 0x00, 0x00, 0x00],
    //         [0x80, 0x00, 0x00, 0x00],
    //         [0x1b, 0x00, 0x00, 0x00],
    //         [0x36, 0x00, 0x00, 0x00] 
    //     ]
    // }
    // Aes.Ctr = {
    //     encrypt:function(plaintext,password,nBits){
    //         var blockSize = 16;  
    //         if (!(nBits==128 || nBits==192 || nBits==256)) return '';  
    //         plaintext = Utf8.encode(plaintext);
    //         password = Utf8.encode(password);

    //         var nBytes = nBits/8; 
    //         var pwBytes = new Array(nBytes);
    //         for (var i=0; i<nBytes; i++) {  
    //           pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
    //         }
    //         var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  
    //         key = key.concat(key.slice(0, nBytes-16)); 

    //         var counterBlock = new Array(blockSize);

    //         var nonce = (new Date()).getTime(); 
    //         var nonceMs = nonce%1000;
    //         var nonceSec = Math.floor(nonce/1000);
    //         var nonceRnd = Math.floor(Math.random()*0xffff);

    //         for (var i=0; i<2; i++) counterBlock[i]   = (nonceMs  >>> i*8) & 0xff;
    //         for (var i=0; i<2; i++) counterBlock[i+2] = (nonceRnd >>> i*8) & 0xff;
    //         for (var i=0; i<4; i++) counterBlock[i+4] = (nonceSec >>> i*8) & 0xff;

    //         var ctrTxt = '';
    //         for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

    //         var keySchedule = Aes.keyExpansion(key);

    //         var blockCount = Math.ceil(plaintext.length/blockSize);
    //         var ciphertxt = new Array(blockCount); 

    //         for (var b=0; b<blockCount; b++) {
    //           for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    //           for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    //           var cipherCntr = Aes.cipher(counterBlock, keySchedule); 

    //           var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    //           var cipherChar = new Array(blockLength);

    //           for (var i=0; i<blockLength; i++) {  
    //             cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
    //             cipherChar[i] = String.fromCharCode(cipherChar[i]);
    //           }
    //           ciphertxt[b] = cipherChar.join(''); 
    //         }

    //         var ciphertext = ctrTxt + ciphertxt.join('');
    //         ciphertext = Base64.encode(ciphertext);  

    //         return ciphertext;
    //     },
    //     decrypt:function(ciphertext,password,nBits){
    //         var blockSize = 16;  
    //         if (!(nBits==128 || nBits==192 || nBits==256)) return '';  
    //         ciphertext = Base64.decode(ciphertext);
    //         password = Utf8.encode(password);

    //         var nBytes = nBits/8; 
    //         var pwBytes = new Array(nBytes);
    //         for (var i=0; i<nBytes; i++) {
    //           pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
    //         }
    //         var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
    //         key = key.concat(key.slice(0, nBytes-16));  

    //         var counterBlock = new Array(8);
    //         ctrTxt = ciphertext.slice(0, 8);
    //         for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);

    //         var keySchedule = Aes.keyExpansion(key);

    //         var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
    //         var ct = new Array(nBlocks);
    //         for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
    //         ciphertext = ct;  

    //         var plaintxt = new Array(ciphertext.length);

    //         for (var b=0; b<nBlocks; b++) {
    //           for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    //           for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;

    //           var cipherCntr = Aes.cipher(counterBlock, keySchedule); 

    //           var plaintxtByte = new Array(ciphertext[b].length);
    //           for (var i=0; i<ciphertext[b].length; i++) {

    //             plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
    //             plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    //           }
    //           plaintxt[b] = plaintxtByte.join('');
    //         }

    //         var plaintext = plaintxt.join('');
    //         plaintext = Utf8.decode(plaintext); 

    //         return plaintext;
    //     }
    // }
    /**
     * [Base64]
     */
    // var Base64 = {
    //     code:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //     encode:function(str,utf8encode){
    //         utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
    //         var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
    //         var b64 = this.code;

    //         plain = utf8encode ? str.encodeUTF8() : str;

    //         c = plain.length % 3;  
    //         if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }

    //         for (c=0; c<plain.length; c+=3) { 
    //           o1 = plain.charCodeAt(c);
    //           o2 = plain.charCodeAt(c+1);
    //           o3 = plain.charCodeAt(c+2);

    //           bits = o1<<16 | o2<<8 | o3;

    //           h1 = bits>>18 & 0x3f;
    //           h2 = bits>>12 & 0x3f;
    //           h3 = bits>>6 & 0x3f;
    //           h4 = bits & 0x3f;

    //           e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    //         }
    //         coded = e.join(''); 

    //         coded = coded.slice(0, coded.length-pad.length) + pad;

    //         return coded;
    //     },
    //     decode:function(str,utf8decode){
    //         utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
    //         var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
    //         var b64 = this.code;

    //         coded = utf8decode ? str.decodeUTF8() : str;


    //         for (var c=0; c<coded.length; c+=4) { 
    //           h1 = b64.indexOf(coded.charAt(c));
    //           h2 = b64.indexOf(coded.charAt(c+1));
    //           h3 = b64.indexOf(coded.charAt(c+2));
    //           h4 = b64.indexOf(coded.charAt(c+3));

    //           bits = h1<<18 | h2<<12 | h3<<6 | h4;

    //           o1 = bits>>>16 & 0xff;
    //           o2 = bits>>>8 & 0xff;
    //           o3 = bits & 0xff;

    //           d[c/4] = String.fromCharCode(o1, o2, o3);
    //           // check for padding
    //           if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    //           if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
    //         }
    //         plain = d.join('');  // join() is far faster than repeated string concatenation in IE

    //         return utf8decode ? plain.decodeUTF8() : plain; 
    //     }
    // }
    // /**
    //  * [Utf8]
    //  */
    // var Utf8 = {
    //     encode:function(strUni) {
    //         var strUtf = strUni.replace(
    //             /[\u0080-\u07ff]/g,  
    //             function(c) { 
    //               var cc = c.charCodeAt(0);
    //               return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    //           );
    //         strUtf = strUtf.replace(
    //             /[\u0800-\uffff]/g, 
    //             function(c) { 
    //               var cc = c.charCodeAt(0); 
    //               return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    //           );
    //         return strUtf;
    //     },
    //     decode:function(strUtf){
    //         var strUni = strUtf.replace(
    //             /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, 
    //             function(c) {  
    //               var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
    //               return String.fromCharCode(cc); }
    //           );
    //         strUni = strUni.replace(
    //             /[\u00c0-\u00df][\u0080-\u00bf]/g,             
    //             function(c) {  
    //               var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
    //               return String.fromCharCode(cc); }
    //           );
    //         return strUni;
    //     }
    // }
 })(window,document);

