"use strict";(self["webpackChunksell_manage"]=self["webpackChunksell_manage"]||[]).push([[234],{55234:function(e,t,n){n.r(t),n.d(t,{default:function(){return W}});var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"layout-wrapper"},[t("app-aside"),t("div",{staticClass:"layout-content"},[t("app-nav"),t("app-main")],1)],1)},a=[],s=function(){var e=this,t=e._self._c;return t("aside",{style:{width:"200px"}},[t("el-menu",{attrs:{"default-active":e.comCurIndex,router:"","background-color":"#304156",collapse:!e.isopen}},[e._l(e.activeMenuRoutes,(function(n){return[1===n.children.length?t("el-menu-item",{key:n.path,attrs:{index:n.path}},[t("i",{class:n.meta.icon||"el-icon-menu"}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.meta.title))])]):t("el-submenu",{key:n.path,attrs:{index:n.path}},[t("template",{slot:"title"},[t("i",{class:n.meta.icon||"el-icon-location"}),t("span",[e._v(e._s(n.meta.title))])]),e._l(n.children,(function(n){return t("el-menu-item",{key:n.path,attrs:{index:n.path}},[e._v(e._s(n.meta.title))])}))],2)]}))],2)],1)},l=[],r=(n(70560),n(1120)),i=n(8499),u={data(){return{res:!0,isopen:!0,curIndex:"",menuRoutes:r.q,role:localStorage.getItem("role"),bookID:localStorage.getItem("bookID"),bookName:localStorage.getItem("bookName")}},methods:{handelWindowResize(){let e=document.body.offsetWidth;this.isopen=!(e<800)},switchAccount(){this.$router.push("/FinanceAccountBooks")}},created(){},mounted(){this.handelWindowResize(),window.addEventListener("resize",this.handelWindowResize)},beforeDestroy(){window.removeEventListener("resize",this.handelWindowResize)},computed:{activeMenuRoutes(){let e=localStorage.getItem("role");return e?this.menuRoutes.filter((t=>(t.meta.role||[]).includes(e))):this.menuRoutes},comCurIndex(){return this.$route.path}},watch:{$route:{handler:function(e){this.curIndex=e.path},deep:!0,immediate:!0}},components:{Icon:i.Icon}},c=u,d=n(1001),m=(0,d.Z)(c,s,l,!1,null,"02e26a89",null),p=m.exports,h=function(){var e=this,t=e._self._c;return t("nav",[t("div",{staticClass:"nav-left"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._l(e.list,(function(n){return t("el-breadcrumb-item",{key:n.path,attrs:{to:{path:n.path}}},[e._v(e._s(n.meta.title))])}))],2)],1),t("div",{staticClass:"nav-right"},[t("el-dropdown",{on:{command:e.handleCommand}},[t("i",{staticClass:"el-icon-user-solid icon-avatar"}),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"out"}},[e._v("退出登录")])],1)],1)],1)])},v=[];const f="http://1.15.179.44:3001";var _={data(){return{BASE_URL:f,user:{}}},methods:{handleCommand(e){console.log(e),"out"===e&&(localStorage.clear(),this.$router.push("/login"))}},computed:{list(){return this.$route.matched.filter((e=>e.meta.title))}}},w=_,b=(0,d.Z)(w,h,v,!1,null,"114810cd",null),g=b.exports,k=function(){var e=this,t=e._self._c;return t("main",[t("router-view")],1)},x=[],I={},C=I,R=(0,d.Z)(C,k,x,!1,null,"6ba0a499",null),y=R.exports,A={components:{AppAside:p,AppNav:g,AppMain:y}},z=A,S=(0,d.Z)(z,o,a,!1,null,"4650d8ee",null),W=S.exports}}]);
//# sourceMappingURL=234.2da1d9c1.js.map