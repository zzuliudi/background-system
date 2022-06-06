(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8b0a2840"],{6925:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("el-form",{attrs:{inline:""}},[s("el-form-item",[s("el-input",{attrs:{placeholder:"用户名"},model:{value:e.tempSearchObj.username,callback:function(t){e.$set(e.tempSearchObj,"username",t)},expression:"tempSearchObj.username"}})],1),s("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查询")]),s("el-button",{attrs:{type:"default"},on:{click:e.resetSearch}},[e._v("清空")])],1),s("div",{staticStyle:{"margin-bottom":"20px"}},[s("el-button",{attrs:{type:"primary"},on:{click:e.showAddUser}},[e._v("添 加")]),s("el-button",{attrs:{type:"danger",disabled:0===e.selectedIds.length},on:{click:e.revomveUsers}},[e._v("批量删除")])],1),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{border:"",stripe:"",data:e.users},on:{"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),s("el-table-column",{attrs:{type:"index",label:"序号",width:"80",align:"center"}}),s("el-table-column",{attrs:{prop:"username",label:"用户名",width:"150"}}),s("el-table-column",{attrs:{prop:"nickName",label:"用户昵称"}}),s("el-table-column",{attrs:{prop:"roleName",label:"权限列表"}}),s("el-table-column",{attrs:{prop:"gmtCreate",label:"创建时间",width:"180"}}),s("el-table-column",{attrs:{prop:"gmtModified",label:"更新时间",width:"180"}}),s("el-table-column",{attrs:{label:"操作",width:"230",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[s("HintButton",{attrs:{type:"info",size:"mini",icon:"el-icon-user-solid",title:"分配角色"},on:{click:function(t){return e.showAssignRole(r)}}}),s("HintButton",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit",title:"修改用户"},on:{click:function(t){return e.showUpdateUser(r)}}}),s("el-popconfirm",{attrs:{title:"确定删除 "+r.username+" 吗?"},on:{onConfirm:function(t){return e.removeUser(r.id)}}},[s("HintButton",{staticStyle:{"margin-left":"10px"},attrs:{slot:"reference",type:"danger",size:"mini",icon:"el-icon-delete",title:"删除用户"},slot:"reference"})],1)]}}])})],1),s("el-pagination",{staticStyle:{padding:"20px 0"},attrs:{"current-page":e.page,total:e.total,"page-size":e.limit,"page-sizes":[3,10,20,30,40,50,100],layout:"prev, pager, next, jumper, ->, sizes, total"},on:{"current-change":e.getUsers,"size-change":e.handleSizeChange}}),s("el-dialog",{attrs:{title:e.user.id?"修改用户":"添加用户",visible:e.dialogUserVisible},on:{"update:visible":function(t){e.dialogUserVisible=t}}},[s("el-form",{ref:"userForm",attrs:{model:e.user,rules:e.userRules,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{model:{value:e.user.username,callback:function(t){e.$set(e.user,"username",t)},expression:"user.username"}})],1),s("el-form-item",{attrs:{label:"用户昵称"}},[s("el-input",{model:{value:e.user.nickName,callback:function(t){e.$set(e.user,"nickName",t)},expression:"user.nickName"}})],1),e.user.id?e._e():s("el-form-item",{attrs:{label:"用户密码",prop:"password"}},[s("el-input",{model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.cancel}},[e._v("取 消")]),s("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.addOrUpdate}},[e._v("确 定")])],1)],1),s("el-dialog",{attrs:{title:"设置角色",visible:e.dialogRoleVisible,"before-close":e.resetRoleData},on:{"update:visible":function(t){e.dialogRoleVisible=t}}},[s("el-form",{attrs:{"label-width":"80px"}},[s("el-form-item",{attrs:{label:"用户名"}},[s("el-input",{attrs:{disabled:"",value:e.user.username}})],1),s("el-form-item",{attrs:{label:"角色列表"}},[s("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),s("div",{staticStyle:{margin:"15px 0"}}),s("el-checkbox-group",{on:{change:e.handleCheckedChange},model:{value:e.userRoleIds,callback:function(t){e.userRoleIds=t},expression:"userRoleIds"}},e._l(e.allRoles,(function(t){return s("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.roleName))])})),1)],1)],1),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.assignRole}},[e._v("保存")]),s("el-button",{on:{click:e.resetRoleData}},[e._v("取消")])],1)],1)],1)},n=[],a=s("5530"),i=s("1da1"),l=(s("96cf"),s("d81d"),s("a15b"),s("b0c0"),s("4de4"),s("d3b7"),s("0644")),o=s.n(l),c={name:"AclUserList",data:function(){return{listLoading:!1,searchObj:{username:""},tempSearchObj:{username:""},selectedIds:[],users:[],page:1,limit:3,total:0,user:{},dialogUserVisible:!1,userRules:{username:[{required:!0,message:"用户名必须输入"},{min:4,message:"用户名不能小于4位"}],password:[{required:!0,validator:this.validatePassword}]},loading:!1,dialogRoleVisible:!1,allRoles:[],userRoleIds:[],isIndeterminate:!1,checkAll:!1}},created:function(){this.getUsers()},methods:{showAssignRole:function(e){this.user=e,this.dialogRoleVisible=!0,this.getRoles()},handleCheckAllChange:function(e){this.userRoleIds=e?this.allRoles.map((function(e){return e.id})):[],this.isIndeterminate=!1},getRoles:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$API.user.getRoles(e.user.id);case 2:s=t.sent,r=s.data,n=r.allRolesList,a=r.assignRoles,e.allRoles=n,e.userRoleIds=a.map((function(e){return e.id})),e.checkAll=n.length===a.length,e.isIndeterminate=a.length>0&&a.length<n.length;case 8:case"end":return t.stop()}}),t)})))()},handleCheckedChange:function(e){var t=this.userRoleIds,s=this.allRoles;this.checkAll=t.length===s.length&&s.length>0,this.isIndeterminate=t.length>0&&t.length<s.length},assignRole:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e.user.id,r=e.userRoleIds.join(","),e.loading=!0,t.next=5,e.$API.user.assignRoles(s,r);case 5:n=t.sent,e.loading=!1,e.$message.success(n.message||"分配角色成功"),e.resetRoleData(),e.$store.getters.name===e.user.username&&window.location.reload();case 10:case"end":return t.stop()}}),t)})))()},resetRoleData:function(){this.dialogRoleVisible=!1,this.allRoles=[],this.userRoleIds=[],this.isIndeterminate=!1,this.checkAll=!1},validatePassword:function(e,t,s){t?!t||t.length<6?s("密码不能小于6位"):s():s("密码必须输入")},search:function(){this.searchObj=Object(a["a"])({},this.tempSearchObj),this.getUsers()},resetSearch:function(){this.searchObj={username:""},this.tempSearchObj={username:""},this.getUsers()},showAddUser:function(){var e=this;this.user={},this.dialogUserVisible=!0,this.$nextTick((function(){return e.$refs.userForm.clearValidate()}))},revomveUsers:function(){var e=this;this.$confirm("确定删除吗?").then(Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$API.user.removeUsers(e.selectedIds);case 2:e.$message.success("删除成功"),e.getUsers();case 4:case"end":return t.stop()}}),t)})))).catch((function(){e.$message.info("取消删除")}))},handleSelectionChange:function(e){this.selectedIds=e.map((function(e){return e.id}))},showUpdateUser:function(e){this.user=o()(e),this.dialogUserVisible=!0},removeUser:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,t.$API.user.removeById(e);case 2:t.$message.success("删除成功"),t.getUsers(1===t.users.length?t.page-1:t.page);case 4:case"end":return s.stop()}}),s)})))()},getUsers:function(){var e=arguments,t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var r,n,a,i,l,o,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:1,t.page=r,n=t.limit,a=t.searchObj,t.listLoading=!0,s.next=6,t.$API.user.getPageList(r,n,a);case 6:i=s.sent,t.listLoading=!1,l=i.data,o=l.items,c=l.total,t.users=o.filter((function(e){return"admin"!==e.username})),t.total=c-1,t.selectedIds=[];case 12:case"end":return s.stop()}}),s)})))()},handleSizeChange:function(e){this.limit=e,this.getUsers()},cancel:function(){this.dialogUserVisible=!1,this.user={}},addOrUpdate:function(){var e=this;this.$refs.userForm.validate((function(t){if(t){var s=e.user;e.loading=!0,e.$API.user[s.id?"update":"add"](s).then((function(t){e.loading=!1,e.$message.success("保存成功!"),e.getUsers(s.id?e.page:1),e.user={},e.dialogUserVisible=!1}))}}))}}},u=c,d=s("2877"),h=Object(d["a"])(u,r,n,!1,null,null,null);t["default"]=h.exports},a15b:function(e,t,s){"use strict";var r=s("23e7"),n=s("44ad"),a=s("fc6a"),i=s("a640"),l=[].join,o=n!=Object,c=i("join",",");r({target:"Array",proto:!0,forced:o||!c},{join:function(e){return l.call(a(this),void 0===e?",":e)}})}}]);