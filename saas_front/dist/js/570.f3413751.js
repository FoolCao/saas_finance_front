(self["webpackChunksell_manage"]=self["webpackChunksell_manage"]||[]).push([[570],{82570:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return c}});var r=function(){var t=this,e=t._self._c;return e("div",{staticStyle:{height:"auto",width:"auto"}},[e("el-card",[e("div",{staticStyle:{display:"flex","flex-direction":"row"}},[e("div",{staticStyle:{flex:"8"}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("el-input",{attrs:{placeholder:"请输入资产类别名称"},model:{value:t.params.name,callback:function(e){t.$set(t.params,"name",e)},expression:"params.name"}})],1),e("el-form-item",[e("el-input",{attrs:{placeholder:"请输入资产类别编码"},model:{value:t.params.number,callback:function(e){t.$set(t.params,"number",e)},expression:"params.number"}})],1),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.params.statue,callback:function(e){t.$set(t.params,"statue",e)},expression:"params.statue"}},[e("el-option",{attrs:{value:""}}),e("el-option",{attrs:{label:"启用",value:"启用"}}),e("el-option",{attrs:{label:"禁用",value:"禁用"}})],1)],1),e("el-form-item",{attrs:{label:"折旧方法"}},[e("el-select",{attrs:{placeholder:"请选择折旧方法",size:"medium"},model:{value:t.params.methodId,callback:function(e){t.$set(t.params,"methodId",e)},expression:"params.methodId"}},[e("el-option",{attrs:{value:""}}),t._l(t.methodList,(function(t){return e("el-option",{key:t.id,attrs:{label:t.depreciationName,value:t.id}})}))],2)],1),e("el-form-item",[e("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)],1)],1)])]),e("el-card",{staticStyle:{"margin-top":"20px"}},[e("el-card",[e("span",{staticStyle:{"font-size":"16px","font-weight":"bold","font-family":"'Times New Roman', Times, serif"}},[t._v("资产类别")]),e("div",{staticStyle:{border:"2px","margin-top":"20px"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.addopen}},[t._v("新增")]),e("el-button",{attrs:{type:"info",plain:""},on:{click:t.batchdelete}},[t._v("批量删除")]),e("el-button",{attrs:{type:"warning",plain:""}},[t._v("启用")]),e("el-button",{attrs:{type:"danger",plain:""}},[t._v("禁用")])],1)]),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.AssetCategoryMethodList},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),e("el-table-column",{attrs:{prop:"id",label:"序号",align:"center"}}),e("el-table-column",{attrs:{prop:"number",label:"资产类别编码",align:"center"}}),e("el-table-column",{attrs:{prop:"name",label:"资产类别名称",align:"center"}}),e("el-table-column",{attrs:{prop:"depreciationMethod.depreciationName",label:"折旧方法",align:"center"}}),e("el-table-column",{attrs:{prop:"depreciationMethod.year",label:"预计使用年限",align:"center"}}),e("el-table-column",{attrs:{prop:"depreciationMethod.term",label:"使用月份",align:"center"}}),e("el-table-column",{attrs:{prop:"depreciationMethod.yearRate",label:"年折旧率",align:"center"}}),e("el-table-column",{attrs:{prop:"depreciationMethod.monthRate",label:"每期折旧率",align:"center"}}),e("el-table-column",{attrs:{prop:"statue",label:"状态",align:"center"}}),e("el-table-column",{attrs:{prop:"note",label:"备注",align:"center"}}),e("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.remove(a)}}},[t._v("删除")]),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.edit(a)}}},[t._v("修改")])]}}])})],1),e("el-pagination",{staticStyle:{"text-align":"center","margin-top":"10px"},attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.limit},on:{"current-change":t.pagechange}})],1),e("el-dialog",{attrs:{title:"新增资产类别",visible:t.addshow,width:"600px"},on:{"update:visible":function(e){t.addshow=e}}},[e("el-form",{staticClass:"demo-form-inline",attrs:{model:t.formData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"资产类别编码","label-width":"120px",rules:[{required:!0,message:"请输入资产类别编码",trigger:"blur"}]}},[e("el-input",{attrs:{type:"text",placeholder:"资产类别编码"},model:{value:t.formData.number,callback:function(e){t.$set(t.formData,"number",e)},expression:"formData.number"}})],1),e("el-form-item",{attrs:{label:"资产类别名称","label-width":"120px",rules:[{required:!0,message:"请输入资产类别名称",trigger:"blur"}]}},[e("el-input",{attrs:{type:"text",placeholder:"资产类别名称"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),e("el-form-item",{attrs:{label:"折旧方法"}},[e("el-select",{attrs:{placeholder:"选择折旧方法",size:"medium"},model:{value:t.formData.methodId,callback:function(e){t.$set(t.formData,"methodId",e)},expression:"formData.methodId"}},t._l(t.methodList,(function(t){return e("el-option",{key:t.id,attrs:{label:t.depreciationName,value:t.id}})})),1)],1),e("el-form-item",{attrs:{label:"状态","label-width":"100px"}},[e("el-radio-group",{model:{value:t.formData.statue,callback:function(e){t.$set(t.formData,"statue",e)},expression:"formData.statue"}},[e("el-radio",{attrs:{label:"启用"}}),e("el-radio",{attrs:{label:"禁用"}})],1)],1),e("el-form-item",{attrs:{label:"备注","label-width":"100px"}},[e("el-input",{attrs:{type:"textarea",placeholder:"备注",autosize:{minRows:4,maxRows:6}},model:{value:t.formData.note,callback:function(e){t.$set(t.formData,"note",e)},expression:"formData.note"}})],1),e("el-form-item",{staticClass:"button-group"},[e("el-button",{attrs:{type:"primary"},on:{click:t.addsubmit}},[t._v("提交")]),e("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1),e("el-dialog",{attrs:{title:"修改折旧方法",visible:t.updateshow,width:"600px"},on:{"update:visible":function(e){t.updateshow=e}}},[e("el-form",{staticClass:"demo-form-inline",attrs:{model:t.formData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"资产类别编码","label-width":"120px",rules:[{required:!0,message:"请输入资产类别编码",trigger:"blur"}]}},[e("el-input",{attrs:{type:"text",placeholder:"资产类别编码"},model:{value:t.formData.number,callback:function(e){t.$set(t.formData,"number",e)},expression:"formData.number"}})],1),e("el-form-item",{attrs:{label:"资产类别名称","label-width":"120px",rules:[{required:!0,message:"请输入资产类别名称",trigger:"blur"}]}},[e("el-input",{attrs:{type:"text",placeholder:"资产类别名称"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),e("el-form-item",{attrs:{label:"折旧方法"}},[e("el-select",{attrs:{placeholder:"选择折旧方法",size:"medium"},model:{value:t.formData.methodId,callback:function(e){t.$set(t.formData,"methodId",e)},expression:"formData.methodId"}},[e("el-option",{attrs:{value:""}}),t._l(t.methodList,(function(t){return e("el-option",{key:t.id,attrs:{label:t.depreciationName,value:t.id}})}))],2)],1),e("el-form-item",{attrs:{label:"状态","label-width":"100px"}},[e("el-radio-group",{model:{value:t.formData.statue,callback:function(e){t.$set(t.formData,"statue",e)},expression:"formData.statue"}},[e("el-radio",{attrs:{label:"启用"}}),e("el-radio",{attrs:{label:"禁用"}})],1)],1),e("el-form-item",{attrs:{label:"备注","label-width":"100px"}},[e("el-input",{attrs:{type:"textarea",placeholder:"备注",autosize:{minRows:4,maxRows:6}},model:{value:t.formData.note,callback:function(e){t.$set(t.formData,"note",e)},expression:"formData.note"}})],1),e("el-form-item",{staticClass:"button-group"},[e("el-button",{attrs:{type:"primary"},on:{click:t.updatesubmit}},[t._v("提交")]),e("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)],1)},n=[],i=(a(70560),a(91076)),s=(a(55743),a(8499),{data(){return{id:0,formData:{number:"",name:"",methodId:"",statue:"",note:""},params:{name:"",number:"",statue:"",methodId:""},AssetCategoryMethodList:[],depreciationName:"",multipleSelection:[],methodList:[],page:1,limit:5,total:0,addshow:!1,updateshow:!1}},created(){this.DepreciationMethodgetList(),this.getMethod()},methods:{async DepreciationMethodgetList(){const t=await(0,i.Z)({method:"get",url:"http://localhost:8081/depreciationType/page",params:{page:this.page,limit:this.limit,...this.params}});this.AssetCategoryMethodList=t.data.data,this.total=t.data.count,console.log(t.data.data)},async getMethod(){const t=await(0,i.Z)({method:"get",url:"http://localhost:8081/depreciationMethod/findAll"});this.methodList=t.data.data,console.log(this.methodList)},search(){this.DepreciationMethodgetList()},cancel(){this.updateshow=!1,this.addshow=!1},pagechange(t){this.page=t,this.DepreciationMethodgetList()},async addsubmit(){const t={...this.formData};await(0,i.Z)({url:"http://localhost:8081/depreciationType/add",method:"post",data:t});this.DepreciationMethodgetList(),this.addshow=!1},addopen(){this.addshow=!0},async remove(t){"启用"===t.statue?this.$message.warning("不能删除启用项，请先设置为禁用"):this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,i.Z)({url:"http://localhost:8081/depreciationType/delete/?id="+t.id,method:"delete"}),this.DepreciationMethodgetList(),this.$message({type:"success",message:"删除成功!"})})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))},edit(t){this.updateshow=!0,this.formData.number=t.number,this.formData.name=t.name,this.formData.methodId=t.methodId,this.formData.statue=t.statue,this.formData.note=t.note,this.id=t.id},async updatesubmit(){const t={id:this.id,...this.formData};await(0,i.Z)({url:"http://localhost:8081/depreciationType/update",method:"put",data:t});this.DepreciationMethodgetList(),this.updateshow=!1},handleSelectionChange(t){this.multipleSelection=[],t.forEach((t=>{this.multipleSelection.push(t.id)})),console.log(this.multipleSelection)},batchdelete(){const t={ids:this.multipleSelection};console.log(t),this.$confirm("此操作将永久删除这些方法(不论方法是否启用!), 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,i.Z)({url:"http://localhost:8081/depreciationType/delete/batch",method:"delete",data:t}),this.DepreciationMethodgetList(),this.$message({type:"success",message:"删除成功!"})})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))}}}),o=s,l=a(1001),u=(0,l.Z)(o,r,n,!1,null,"0c2c71c1",null),c=u.exports},55743:function(t){!function(e,a){t.exports=a()}(0,(function(){"use strict";var t=1e3,e=6e4,a=36e5,r="millisecond",n="second",i="minute",s="hour",o="day",l="week",u="month",c="quarter",d="year",m="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,b={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],a=t%100;return"["+t+(e[(a-20)%10]||e[a]||e[0])+"]"}},g=function(t,e,a){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(a)+t},$={s:g,z:function(t){var e=-t.utcOffset(),a=Math.abs(e),r=Math.floor(a/60),n=a%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(n,2,"0")},m:function t(e,a){if(e.date()<a.date())return-t(a,e);var r=12*(a.year()-e.year())+(a.month()-e.month()),n=e.clone().add(r,u),i=a-n<0,s=e.clone().add(r+(i?-1:1),u);return+(-(r+(a-n)/(i?n-s:s-n))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:d,w:l,d:o,D:m,h:s,m:i,s:n,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",v={};v[y]=b;var D="$isDayjsObject",w=function(t){return t instanceof k||!(!t||!t[D])},M=function t(e,a,r){var n;if(!e)return y;if("string"==typeof e){var i=e.toLowerCase();v[i]&&(n=i),a&&(v[i]=a,n=i);var s=e.split("-");if(!n&&s.length>1)return t(s[0])}else{var o=e.name;v[o]=e,n=o}return!r&&n&&(y=n),n||!r&&y},x=function(t,e){if(w(t))return t.clone();var a="object"==typeof e?e:{};return a.date=t,a.args=arguments,new k(a)},S=$;S.l=M,S.i=w,S.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function b(t){this.$L=M(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[D]=!0}var g=b.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,a=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(p);if(r){var n=r[2]-1||0,i=(r[7]||"0").substring(0,3);return a?new Date(Date.UTC(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],n,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return S},g.isValid=function(){return!(this.$d.toString()===h)},g.isSame=function(t,e){var a=x(t);return this.startOf(e)<=a&&a<=this.endOf(e)},g.isAfter=function(t,e){return x(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<x(t)},g.$g=function(t,e,a){return S.u(t)?this[e]:this.set(a,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var a=this,r=!!S.u(e)||e,c=S.p(t),h=function(t,e){var n=S.w(a.$u?Date.UTC(a.$y,e,t):new Date(a.$y,e,t),a);return r?n:n.endOf(o)},p=function(t,e){return S.w(a.toDate()[t].apply(a.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),a)},f=this.$W,b=this.$M,g=this.$D,$="set"+(this.$u?"UTC":"");switch(c){case d:return r?h(1,0):h(31,11);case u:return r?h(1,b):h(0,b+1);case l:var y=this.$locale().weekStart||0,v=(f<y?f+7:f)-y;return h(r?g-v:g+(6-v),b);case o:case m:return p($+"Hours",0);case s:return p($+"Minutes",1);case i:return p($+"Seconds",2);case n:return p($+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var a,l=S.p(t),c="set"+(this.$u?"UTC":""),h=(a={},a[o]=c+"Date",a[m]=c+"Date",a[u]=c+"Month",a[d]=c+"FullYear",a[s]=c+"Hours",a[i]=c+"Minutes",a[n]=c+"Seconds",a[r]=c+"Milliseconds",a)[l],p=l===o?this.$D+(e-this.$W):e;if(l===u||l===d){var f=this.clone().set(m,1);f.$d[h](p),f.init(),this.$d=f.set(m,Math.min(this.$D,f.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[S.p(t)]()},g.add=function(r,c){var m,h=this;r=Number(r);var p=S.p(c),f=function(t){var e=x(h);return S.w(e.date(e.date()+Math.round(t*r)),h)};if(p===u)return this.set(u,this.$M+r);if(p===d)return this.set(d,this.$y+r);if(p===o)return f(1);if(p===l)return f(7);var b=(m={},m[i]=e,m[s]=a,m[n]=t,m)[p]||1,g=this.$d.getTime()+r*b;return S.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,a=this.$locale();if(!this.isValid())return a.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",n=S.z(this),i=this.$H,s=this.$m,o=this.$M,l=a.weekdays,u=a.months,c=a.meridiem,d=function(t,a,n,i){return t&&(t[a]||t(e,r))||n[a].slice(0,i)},m=function(t){return S.s(i%12||12,t,"0")},p=c||function(t,e,a){var r=t<12?"AM":"PM";return a?r.toLowerCase():r};return r.replace(f,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return S.s(e.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return d(a.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return e.$D;case"DD":return S.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(a.weekdaysMin,e.$W,l,2);case"ddd":return d(a.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(i);case"HH":return S.s(i,2,"0");case"h":return m(1);case"hh":return m(2);case"a":return p(i,s,!0);case"A":return p(i,s,!1);case"m":return String(s);case"mm":return S.s(s,2,"0");case"s":return String(e.$s);case"ss":return S.s(e.$s,2,"0");case"SSS":return S.s(e.$ms,3,"0");case"Z":return n}return null}(t)||n.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,m,h){var p,f=this,b=S.p(m),g=x(r),$=(g.utcOffset()-this.utcOffset())*e,y=this-g,v=function(){return S.m(f,g)};switch(b){case d:p=v()/12;break;case u:p=v();break;case c:p=v()/3;break;case l:p=(y-$)/6048e5;break;case o:p=(y-$)/864e5;break;case s:p=y/a;break;case i:p=y/e;break;case n:p=y/t;break;default:p=y}return h?p:S.a(p)},g.daysInMonth=function(){return this.endOf(u).$D},g.$locale=function(){return v[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var a=this.clone(),r=M(t,e,!0);return r&&(a.$L=r),a},g.clone=function(){return S.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},b}(),_=k.prototype;return x.prototype=_,[["$ms",r],["$s",n],["$m",i],["$H",s],["$W",o],["$M",u],["$y",d],["$D",m]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,k,x),t.$i=!0),x},x.locale=M,x.isDayjs=w,x.unix=function(t){return x(1e3*t)},x.en=v[y],x.Ls=v,x.p={},x}))}}]);
//# sourceMappingURL=570.f3413751.js.map