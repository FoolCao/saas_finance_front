(self["webpackChunksell_manage"]=self["webpackChunksell_manage"]||[]).push([[495],{90495:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return d}});var i=function(){var t=this,e=t._self._c;return e("div",[e("el-card",{staticStyle:{"margin-right":"30px"}},[e("div",[e("span",{staticStyle:{"font-size":"16px","font-family":"'Times New Roman', Times, serif","font-weight":"bold"}},[t._v("财务指标")])]),e("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:20}},[e("el-col",{attrs:{span:8}},[e("div",{staticClass:"grid-content bg-purple",staticStyle:{display:"flex","text-align":"center","justify-content":"center"}},[e("img",{staticStyle:{"margin-left":"20px",flex:"3"},attrs:{src:n(11392),width:"25%",height:"25%"}}),e("div",{staticStyle:{display:"flex","flex-direction":"column","text-align":"center","justify-content":"center",flex:"7"}},[e("span",{staticStyle:{"font-size":"36px"}},[t._v(t._s(t.collection))]),e("span",{staticStyle:{"font-size":"16px","margin-top":"10px"}},[t._v("应收账款")])])])]),e("el-col",{attrs:{span:8}},[e("div",{staticClass:"grid-content bg-purple",staticStyle:{display:"flex","text-align":"center","justify-content":"center"}},[e("img",{staticStyle:{"margin-left":"20px",flex:"3"},attrs:{src:n(9746),width:"25%",height:"25%"}}),e("div",{staticStyle:{display:"flex","flex-direction":"column","text-align":"center","justify-content":"center",flex:"7"}},[e("span",{staticStyle:{"font-size":"36px"}},[t._v(t._s(t.payment))]),e("span",{staticStyle:{"font-size":"16px","margin-top":"10px"}},[t._v("应付账款")])])])]),e("el-col",{attrs:{span:8}},[e("div",{staticClass:"grid-content bg-purple",staticStyle:{display:"flex","text-align":"center","justify-content":"center"}},[e("img",{staticStyle:{"margin-left":"20px",flex:"3"},attrs:{src:n(62364),width:"113px",height:"99px"}}),e("div",{staticStyle:{display:"flex","flex-direction":"column","text-align":"center","justify-content":"center",flex:"7"}},[e("span",{staticStyle:{"font-size":"36px"}},[t._v(t._s(t.collection-t.payment))]),e("span",{staticStyle:{"font-size":"16px","margin-top":"10px"}},[t._v("利润总额")])])])])],1),e("div",{staticStyle:{width:"1200px",height:"400px","margin-top":"30px"},attrs:{id:"line"}}),t._v(" "+t._s(t.currentTime)+" ")],1)],1)},a=[],r=(n(70560),n(91767)),s=n(91076),o=n(55743),c=n.n(o),u={data(){return{paymentList:[],payment:0,collectionList:[],collection:0,currentTime:"",myChart:{},series:[],payData:[],collectionData:[],profitData:[]}},mounted(){this.myChart=r.S1(document.getElementById("line"))},created(){this.getPaymentList(),this.getCollectionList(),Promise.all([this.getCollectionDataList(),this.getPayDataList()]).then((t=>{console.log(this.collectionData,this.payData),this.getProfitData()})),setTimeout((()=>{this.series=[{name:"每月收入",type:"line",data:this.collectionData},{name:"每月费用",type:"line",data:this.payData},{name:"每月利润",type:"line",data:this.profitData}]}),2e3)},watch:{series:{handler(){this.myChart.setOption({title:{text:"财务分析（近一年）"},legend:{data:["每月收入","每月费用","每月利润"]},tooltip:{},xAxis:{type:"category",boundaryGap:!1,data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},yAxis:{},series:this.series})},deep:!0}},methods:{async getProfitData(){for(let t=0;t<12;t++){console.log(this.collectionData[t]);const e=this.collectionData[t]||0,n=this.payData[t]||0,i=e-n;this.profitData.push(i)}},async getCollectionDataList(){const t=await(0,s.Z)({url:"http://localhost:8081/voucher/voucher",method:"get",params:{pageno:this.pageno,pagesize:this.pagesize,voucherWord:"收",bookID:localStorage.getItem("bookID")}}),e=t.data.data,n={};e.forEach((t=>{const e=c()(t.cime).format("YYYY-MM");n[e]||(n[e]=0),n[e]+=parseFloat(t.totalAmount)}));const i=Object.entries(n).sort((([t],[e])=>t.localeCompare(e))).map((([t,e])=>e));this.collectionData=i},async getPayDataList(){const t=await(0,s.Z)({url:"http://localhost:8081/voucher/voucher",method:"get",params:{pageno:this.pageno,pagesize:this.pagesize,voucherWord:"付",bookID:localStorage.getItem("bookID")}}),e=t.data.data,n={};e.forEach((t=>{const e=c()(t.cime).format("YYYY-MM");n[e]||(n[e]=0),n[e]+=parseFloat(t.totalAmount)}));const i=Object.entries(n).sort((([t],[e])=>t.localeCompare(e))).map((([t,e])=>e));this.payData=i},async getPaymentList(){const t=c()().format("YYYY-MM"),e=await(0,s.Z)({url:"http://localhost:8081/voucher/voucher",method:"get",params:{pageno:this.pageno,pagesize:this.pagesize,voucherWord:"付",bookID:localStorage.getItem("bookID")}});this.paymentList=e.data.data.map((t=>({...t,cime:c()(t.cime).format("YYYY-MM")}))),this.paymentList=this.paymentList.filter((e=>e.cime===t));let n=0;this.paymentList.forEach((t=>{n+=parseFloat(t.totalAmount)})),this.payment=n},async getCollectionList(){const t=c()().format("YYYY-MM"),e=await(0,s.Z)({url:"http://localhost:8081/voucher/voucher",method:"get",params:{pageno:this.pageno,pagesize:this.pagesize,voucherWord:"收",bookID:localStorage.getItem("bookID")}});this.collectionList=e.data.data.map((t=>({...t,cime:c()(t.cime).format("YYYY-MM")}))),this.collectionList=this.collectionList.filter((e=>e.cime===t));let n=0;this.collectionList.forEach((t=>{n+=parseFloat(t.totalAmount)})),this.collection=n}}},l=u,h=n(1001),f=(0,h.Z)(l,i,a,!1,null,"11a7fb2e",null),d=f.exports},55743:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t=1e3,e=6e4,n=36e5,i="millisecond",a="second",r="minute",s="hour",o="day",c="week",u="month",l="quarter",h="year",f="date",d="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},y=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:y,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),a=n%60;return(e<=0?"+":"-")+y(i,2,"0")+":"+y(a,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),a=e.clone().add(i,u),r=n-a<0,s=e.clone().add(i+(r?-1:1),u);return+(-(i+(n-a)/(r?a-s:s-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:h,w:c,d:o,D:f,h:s,m:r,s:a,ms:i,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=g;var x="$isDayjsObject",S=function(t){return t instanceof Y||!(!t||!t[x])},M=function t(e,n,i){var a;if(!e)return v;if("string"==typeof e){var r=e.toLowerCase();D[r]&&(a=r),n&&(D[r]=n,a=r);var s=e.split("-");if(!a&&s.length>1)return t(s[0])}else{var o=e.name;D[o]=e,a=o}return!i&&a&&(v=a),a||!i&&v},w=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new Y(n)},b=$;b.l=M,b.i=S,b.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var Y=function(){function g(t){this.$L=M(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[x]=!0}var y=g.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var a=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return b},y.isValid=function(){return!(this.$d.toString()===d)},y.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},y.isAfter=function(t,e){return w(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<w(t)},y.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var n=this,i=!!b.u(e)||e,l=b.p(t),d=function(t,e){var a=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return i?a:a.endOf(o)},p=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,g=this.$M,y=this.$D,$="set"+(this.$u?"UTC":"");switch(l){case h:return i?d(1,0):d(31,11);case u:return i?d(1,g):d(0,g+1);case c:var v=this.$locale().weekStart||0,D=(m<v?m+7:m)-v;return d(i?y-D:y+(6-D),g);case o:case f:return p($+"Hours",0);case s:return p($+"Minutes",1);case r:return p($+"Seconds",2);case a:return p($+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var n,c=b.p(t),l="set"+(this.$u?"UTC":""),d=(n={},n[o]=l+"Date",n[f]=l+"Date",n[u]=l+"Month",n[h]=l+"FullYear",n[s]=l+"Hours",n[r]=l+"Minutes",n[a]=l+"Seconds",n[i]=l+"Milliseconds",n)[c],p=c===o?this.$D+(e-this.$W):e;if(c===u||c===h){var m=this.clone().set(f,1);m.$d[d](p),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d](p);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[b.p(t)]()},y.add=function(i,l){var f,d=this;i=Number(i);var p=b.p(l),m=function(t){var e=w(d);return b.w(e.date(e.date()+Math.round(t*i)),d)};if(p===u)return this.set(u,this.$M+i);if(p===h)return this.set(h,this.$y+i);if(p===o)return m(1);if(p===c)return m(7);var g=(f={},f[r]=e,f[s]=n,f[a]=t,f)[p]||1,y=this.$d.getTime()+i*g;return b.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=b.z(this),r=this.$H,s=this.$m,o=this.$M,c=n.weekdays,u=n.months,l=n.meridiem,h=function(t,n,a,r){return t&&(t[n]||t(e,i))||a[n].slice(0,r)},f=function(t){return b.s(r%12||12,t,"0")},p=l||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(m,(function(t,i){return i||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return o+1;case"MM":return b.s(o+1,2,"0");case"MMM":return h(n.monthsShort,o,u,3);case"MMMM":return h(u,o);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,c,2);case"ddd":return h(n.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(r);case"HH":return b.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return p(r,s,!0);case"A":return p(r,s,!1);case"m":return String(s);case"mm":return b.s(s,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return a}return null}(t)||a.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(i,f,d){var p,m=this,g=b.p(f),y=w(i),$=(y.utcOffset()-this.utcOffset())*e,v=this-y,D=function(){return b.m(m,y)};switch(g){case h:p=D()/12;break;case u:p=D();break;case l:p=D()/3;break;case c:p=(v-$)/6048e5;break;case o:p=(v-$)/864e5;break;case s:p=v/n;break;case r:p=v/e;break;case a:p=v/t;break;default:p=v}return d?p:b.a(p)},y.daysInMonth=function(){return this.endOf(u).$D},y.$locale=function(){return D[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=M(t,e,!0);return i&&(n.$L=i),n},y.clone=function(){return b.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},g}(),_=Y.prototype;return w.prototype=_,[["$ms",i],["$s",a],["$m",r],["$H",s],["$W",o],["$M",u],["$y",h],["$D",f]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,Y,w),t.$i=!0),w},w.locale=M,w.isDayjs=S,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}))},9746:function(t,e,n){"use strict";t.exports=n.p+"img/付款进度.c02440fd.svg"},62364:function(t,e,n){"use strict";t.exports=n.p+"img/利润分析.ede4b68e.svg"},11392:function(t,e,n){"use strict";t.exports=n.p+"img/收款进度.fd48ccec.svg"}}]);
//# sourceMappingURL=495.c2921502.js.map