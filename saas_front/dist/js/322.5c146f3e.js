"use strict";(self["webpackChunksell_manage"]=self["webpackChunksell_manage"]||[]).push([[322],{56322:function(t,e,a){a.r(e),a.d(e,{default:function(){return c}});var s=function(){var t=this,e=t._self._c;return e("div",[e("el-card",[e("el-card",[e("span",{staticStyle:{"font-size":"18px","font-weight":"bold","font-family":"'Times New Roman', Times, serif"}},[t._v("常用摘要")]),e("el-popover",{attrs:{placement:"top-start",title:"常用摘要功能介绍",width:"600",trigger:"hover"}},[e("el-card",[e("span",[t._v("摘要通过简要的文字描述,迅速明确交易内容，记录与该笔交易相关的业务事项")]),e("br"),e("span",[t._v("在后续的财务核对和审计中，摘要是查找和理解交易内容的重要依据之一。")]),e("br"),e("span",[t._v("清晰的摘要有助于提高财务数据的可读性和准确性。")]),e("br")]),e("i",{staticClass:"el-icon-info",staticStyle:{"font-size":"16px","margin-left":"10px","margin-top":"5px"},attrs:{slot:"reference"},slot:"reference"})],1)],1),e("el-card",[e("div",[e("el-row",{attrs:{type:"flex",justify:"space-between",align:"middle"}},[e("el-col",{attrs:{span:6}},[e("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:t.addopen}},[t._v("新增摘要")])],1),e("el-col",{attrs:{span:9,offset:14}},[e("el-input",{attrs:{placeholder:"请输入查询内容","prefix-icon":"el-icon-search"},model:{value:t.params.summaryContent,callback:function(e){t.$set(t.params,"summaryContent",e)},expression:"params.summaryContent"}})],1),e("el-col",{attrs:{span:3,offset:.5}},[e("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")])],1)],1)],1),e("el-table",{staticStyle:{width:"100%","margin-top":"15px"},attrs:{data:t.list,"header-row-class-name":t.tableHeaderClassName}},[e("el-table-column",{attrs:{prop:"summaryId",label:"序号",align:"center",width:"100"}}),e("el-table-column",{attrs:{prop:"summaryContent",label:"摘要内容",align:"center"}}),e("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"200px"},scopedSlots:t._u([{key:"default",fn:function({row:a}){return[e("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(e){return t.update(a)}}}),e("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.out(a)}}})]}}])})],1),e("el-pagination",{staticStyle:{"text-align":"center","margin-top":"10px"},attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":t.pagesize},on:{"current-change":t.pagechange}})],1),e("el-dialog",{attrs:{title:"修改摘要内容",visible:t.show,width:"600px"},on:{"update:visible":function(e){t.show=e}}},[e("el-form",{staticClass:"demo-form-inline",attrs:{model:t.userFormData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"摘要"}},[e("el-input",{attrs:{type:"textarea",placeholder:"摘要",autosize:{minRows:4,maxRows:6}},model:{value:t.userFormData.summaryContent,callback:function(e){t.$set(t.userFormData,"summaryContent",e)},expression:"userFormData.summaryContent"}})],1),e("el-form-item",{staticClass:"button-group"},[e("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")]),e("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1),e("el-dialog",{attrs:{title:"新增摘要内容",visible:t.addshow,width:"600px"},on:{"update:visible":function(e){t.addshow=e}}},[e("el-form",{staticClass:"demo-form-inline",attrs:{model:t.userFormData,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"摘要"}},[e("el-input",{attrs:{type:"textarea",placeholder:"摘要",autosize:{minRows:4,maxRows:6}},model:{value:t.userFormData.summaryContent,callback:function(e){t.$set(t.userFormData,"summaryContent",e)},expression:"userFormData.summaryContent"}})],1),e("el-form-item",{staticClass:"button-group"},[e("el-button",{attrs:{type:"primary"},on:{click:t.addsubmit}},[t._v("提交")]),e("el-button",{attrs:{type:"info"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)],1)],1)},r=[],o=a(91076),l=(a(91767),{data(){return{tableHeaderClassName:"custom-table-header",list:[],summaryId:"",userFormData:{summaryContent:""},pageno:1,pagesize:4,total:0,params:{summaryContent:""},show:!1,addshow:!1}},created(){this.getList()},methods:{async getList(){const t=await(0,o.Z)({url:"http://localhost:8081/summary/page",method:"get",params:{...this.params,page:this.pageno,limit:this.pagesize}});this.list=t.data.data,this.total=t.data.count},search(){this.getList()},pagechange(t){this.pageno=t,this.getList()},update(t){console.log(t),this.show=!0,this.userFormData.summaryContent=t.summaryContent,this.summaryId=t.summaryId},async out(t){if("是"===t.isDefault)this.$message.warning("不能删除默认项");else{const e={id:t.summaryId};await(0,o.Z)({url:"http://localhost:8081/summary/delete",method:"delete",data:e});this.getList()}},async submit(){const t={summaryId:this.summaryId,...this.userFormData};await(0,o.Z)({url:"http://localhost:8081/summary/update",method:"put",data:t});this.getList(),this.show=!1},cancel(){this.show=!1,this.addshow=!1},async addsubmit(){const t={...this.userFormData};await(0,o.Z)({url:"http://localhost:8081/summary/add",method:"post",data:t});this.getList(),this.addshow=!1},addopen(){this.addshow=!0,this.userFormData.summaryContent=""}}}),n=l,i=a(1001),m=(0,i.Z)(n,s,r,!1,null,"8f3f5462",null),c=m.exports}}]);
//# sourceMappingURL=322.5c146f3e.js.map