(self["webpackChunksell_manage"]=self["webpackChunksell_manage"]||[]).push([[520],{91520:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return l}});var r=function(){var t=this,e=t._self._c;return e("el-card",[e("div",[t._l(t.list,(function(n){return e("div",{staticStyle:{"margin-bottom":"15px"}},[e("el-card",[e("div",[e("span",[t._v(t._s(n.voucherWord))]),t._v(" - "),e("span",[t._v(t._s(n.voucherNumber))])]),e("el-table",{staticStyle:{"margin-top":"15px"},attrs:{data:n.voucherContent}},[e("el-table-column",{attrs:{label:"摘要",prop:"summary"}}),e("el-table-column",{attrs:{label:"会计科目",prop:"accountingSubject"}}),e("el-table-column",{attrs:{label:"借方金额",prop:"debitAmount"}}),e("el-table-column",{attrs:{label:"贷方金额",prop:"creditAmount"}}),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function({row:r}){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.cheak(n)}}},[t._v("查看")])]}}],null,!0)})],1)],1)],1)})),e("el-pagination",{staticStyle:{"text-align":"center","margin-top":"10px"},attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.pagesize},on:{"current-change":t.pagechange}})],2)])},s=[],a=(n(70560),n(91076)),i=(n(55743),{data(){return{list:[],pageno:1,pagesize:2,total:0}},created(){this.list=this.list.filter((t=>(t.voucherContent=t.voucherContent.filter((t=>t.summary)),t.voucherContent.length>0))),this.getlist()},methods:{cheak(t){localStorage.setItem("voucherID",t.voucherId),this.$router.push("/voucher/CheckVoucher")},async getlist(){const t=await(0,a.Z)({url:"http://localhost:8081/voucher/page",method:"get",params:{page:this.pageno,limit:this.pagesize,bookId:localStorage.getItem("bookID")}});this.list=t.data.data,this.total=t.data.count},pagechange(t){console.log("00000000"),this.pageno=t,this.getlist()}}}),u=i,o=n(1001),c=(0,o.Z)(u,r,s,!1,null,"07faab2c",null),l=c.exports},55743:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",s="second",a="minute",i="hour",u="day",o="week",c="month",l="quarter",h="year",f="date",d="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,c),a=n-s<0,i=e.clone().add(r+(a?-1:1),c);return+(-(r+(n-s)/(a?s-i:i-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:u,D:f,h:i,m:a,s:s,ms:r,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=p;var b="$isDayjsObject",D=function(t){return t instanceof k||!(!t||!t[b])},S=function t(e,n,r){var s;if(!e)return y;if("string"==typeof e){var a=e.toLowerCase();M[a]&&(s=a),n&&(M[a]=n,s=a);var i=e.split("-");if(!s&&i.length>1)return t(i[0])}else{var u=e.name;M[u]=e,s=u}return!r&&s&&(y=s),s||!r&&y},w=function(t,e){if(D(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new k(n)},_=v;_.l=S,_.i=D,_.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function p(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[b]=!0}var m=p.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(_.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var s=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return _},m.isValid=function(){return!(this.$d.toString()===d)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return _.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!_.u(e)||e,l=_.p(t),d=function(t,e){var s=_.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?s:s.endOf(u)},$=function(t,e){return _.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},g=this.$W,p=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(l){case h:return r?d(1,0):d(31,11);case c:return r?d(1,p):d(0,p+1);case o:var y=this.$locale().weekStart||0,M=(g<y?g+7:g)-y;return d(r?m-M:m+(6-M),p);case u:case f:return $(v+"Hours",0);case i:return $(v+"Minutes",1);case a:return $(v+"Seconds",2);case s:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=_.p(t),l="set"+(this.$u?"UTC":""),d=(n={},n[u]=l+"Date",n[f]=l+"Date",n[c]=l+"Month",n[h]=l+"FullYear",n[i]=l+"Hours",n[a]=l+"Minutes",n[s]=l+"Seconds",n[r]=l+"Milliseconds",n)[o],$=o===u?this.$D+(e-this.$W):e;if(o===c||o===h){var g=this.clone().set(f,1);g.$d[d]($),g.init(),this.$d=g.set(f,Math.min(this.$D,g.daysInMonth())).$d}else d&&this.$d[d]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[_.p(t)]()},m.add=function(r,l){var f,d=this;r=Number(r);var $=_.p(l),g=function(t){var e=w(d);return _.w(e.date(e.date()+Math.round(t*r)),d)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===u)return g(1);if($===o)return g(7);var p=(f={},f[a]=e,f[i]=n,f[s]=t,f)[$]||1,m=this.$d.getTime()+r*p;return _.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=_.z(this),a=this.$H,i=this.$m,u=this.$M,o=n.weekdays,c=n.months,l=n.meridiem,h=function(t,n,s,a){return t&&(t[n]||t(e,r))||s[n].slice(0,a)},f=function(t){return _.s(a%12||12,t,"0")},$=l||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(g,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return _.s(e.$y,4,"0");case"M":return u+1;case"MM":return _.s(u+1,2,"0");case"MMM":return h(n.monthsShort,u,c,3);case"MMMM":return h(c,u);case"D":return e.$D;case"DD":return _.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(a);case"HH":return _.s(a,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return $(a,i,!0);case"A":return $(a,i,!1);case"m":return String(i);case"mm":return _.s(i,2,"0");case"s":return String(e.$s);case"ss":return _.s(e.$s,2,"0");case"SSS":return _.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,f,d){var $,g=this,p=_.p(f),m=w(r),v=(m.utcOffset()-this.utcOffset())*e,y=this-m,M=function(){return _.m(g,m)};switch(p){case h:$=M()/12;break;case c:$=M();break;case l:$=M()/3;break;case o:$=(y-v)/6048e5;break;case u:$=(y-v)/864e5;break;case i:$=y/n;break;case a:$=y/e;break;case s:$=y/t;break;default:$=y}return d?$:_.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return M[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return _.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},p}(),O=k.prototype;return w.prototype=O,[["$ms",r],["$s",s],["$m",a],["$H",i],["$W",u],["$M",c],["$y",h],["$D",f]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,k,w),t.$i=!0),w},w.locale=S,w.isDayjs=D,w.unix=function(t){return w(1e3*t)},w.en=M[y],w.Ls=M,w.p={},w}))}}]);
//# sourceMappingURL=520.74b9ff45.js.map