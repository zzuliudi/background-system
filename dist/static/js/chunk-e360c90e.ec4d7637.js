(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e360c90e"],{"0f48":function(e,t,a){},"288b":function(e,t,a){"use strict";a("0f48")},"742b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticStyle:{margin:"20px 0px"}},[a("CategorySelect",{attrs:{show:0!=e.scene},on:{getCategoryId:e.getCategoryId}})],1),a("el-card",{staticStyle:{margin:"20px 0px"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.scene,expression:"scene == 0"}]},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",disabled:!e.category3Id},on:{click:e.addSup}},[e._v("添加SPU")]),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.records}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),a("el-table-column",{attrs:{prop:"spuName",label:"SPU名称",width:"width"}}),a("el-table-column",{attrs:{prop:"description",label:"SPU描述",width:"width"}}),a("el-table-column",{attrs:{prop:"prop",label:"操作",width:"width"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;t.$index;return[a("hint-button",{attrs:{type:"success",icon:"el-icon-plus",size:"mini",title:"添加spu"},on:{click:function(t){return e.addSku(r)}}}),a("hint-button",{attrs:{type:"warning",icon:"el-icon-edit",size:"mini",title:"修改spu"},on:{click:function(t){return e.updateSpu(r)}}}),a("hint-button",{attrs:{type:"info",icon:"el-icon-info",size:"mini",title:"查看当前spu全部的实例"},on:{click:function(t){return e.handler(r)}}}),a("el-popconfirm",{attrs:{title:"这是一段内容确定删除吗？"},on:{onConfirm:function(t){return e.deleteSpu(r)}}},[a("hint-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete",size:"mini",title:"删除spu"},slot:"reference"})],1)]}}])})],1),a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"current-page":e.page,"page-size":e.limit,"page-sizes":[3,5,10],total:e.total,layout:"prev,pager,next,jumper,->,total,sizes"},on:{"current-change":e.getSpuList,"size-change":e.handleSizeChange}})],1),a("SpuForm",{directives:[{name:"show",rawName:"v-show",value:1==e.scene,expression:"scene == 1"}],ref:"spu",on:{changeScene:e.changeScene}}),a("SkuForm",{directives:[{name:"show",rawName:"v-show",value:2==e.scene,expression:"scene == 2"}],ref:"sku",on:{changeScene:e.changeScene}})],1),a("el-dialog",{attrs:{title:e.spu.spuName+"的sku列表",visible:e.dialogTableVisible,"before-close":e.close},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.skuList,border:""}},[a("el-table-column",{attrs:{prop:"skuName",label:"名称",width:"width"}}),a("el-table-column",{attrs:{prop:"price",label:"价格",width:"width"}}),a("el-table-column",{attrs:{prop:"weight",label:"重量",width:"width"}}),a("el-table-column",{attrs:{property:"name",label:"默认图片",width:"width"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;e.$index;return[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.skuDefaultImg}})]}}])})],1)],1)],1)},n=[],s=a("1da1"),i=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"SPU名称"}},[a("el-input",{attrs:{placeholder:"SPU名称"},model:{value:e.spu.spuName,callback:function(t){e.$set(e.spu,"spuName",t)},expression:"spu.spuName"}})],1),a("el-form-item",{attrs:{label:"品牌"}},[a("el-select",{attrs:{placeholder:"请选择品牌"},model:{value:e.spu.tmId,callback:function(t){e.$set(e.spu,"tmId",t)},expression:"spu.tmId"}},e._l(e.TradeMarkList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.tmName,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"SPU描述"}},[a("el-input",{attrs:{type:"textarea",rows:"4",placeholder:"描述"},model:{value:e.spu.description,callback:function(t){e.$set(e.spu,"description",t)},expression:"spu.description"}})],1),a("el-form-item",{attrs:{label:"SPU图片"}},[a("el-upload",{attrs:{action:"/dev-api/admin/product/fileUpload","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"file-list":e.SpuImageList,"on-success":e.handleSuccess}},[a("i",{staticClass:"el-icon-plus"})]),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),a("el-form-item",{attrs:{label:"销售属性"}},[a("el-select",{attrs:{placeholder:"还剩"+e.unSelectSaleAttr.length+"个未选"},model:{value:e.attrIdAndAttrName,callback:function(t){e.attrIdAndAttrName=t},expression:"attrIdAndAttrName"}},e._l(e.unSelectSaleAttr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id+":"+e.name}})})),1),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",disabled:!e.attrIdAndAttrName},on:{click:e.addSaleAttr}},[e._v("添加销售属性")]),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.spu.spuSaleAttrList}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"80px"}}),a("el-table-column",{attrs:{prop:"saleAttrName",label:"属性名",width:"width"}}),a("el-table-column",{attrs:{prop:"prop",label:"属性值名称列表",width:"width"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[e._l(r.spuSaleAttrValueList,(function(t,n){return a("el-tag",{key:t.id,attrs:{closable:"","disable-transitions":!1},on:{close:function(t){return e.handleClose(r,n)}}},[e._v(" "+e._s(t.saleAttrValueName)+" ")])})),r.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(t){return e.handleInputConfirm(r)}},model:{value:r.inputValue,callback:function(t){e.$set(r,"inputValue",t)},expression:"row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(t){return e.addSaleAttrValue(r)}}},[e._v("添加")])]}}])}),a("el-table-column",{attrs:{prop:"prop",label:"操作",width:"width"},scopedSlots:e._u([{key:"default",fn:function(t){t.row;var r=t.$index;return[a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.spu.spuSaleAttrList.splice(r,1)}}})]}}])})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.addOrUpdateSpu}},[e._v("保存")]),a("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)],1)}),l=[];function u(e){if(Array.isArray(e))return e}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function o(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,s=[],i=!0,l=!1;try{for(a=a.call(e);!(i=(r=a.next()).done);i=!0)if(s.push(r.value),t&&s.length===t)break}catch(u){l=!0,n=u}finally{try{i||null==a["return"]||a["return"]()}finally{if(l)throw n}}return s}}a("fb6a"),a("b0c0"),a("a630"),a("ac1f"),a("00b4");function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function d(e,t){if(e){if("string"===typeof e)return c(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?c(e,t):void 0}}function p(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){return u(e)||o(e,t)||d(e,t)||p()}a("159b"),a("1276"),a("498a"),a("a434"),a("d81d"),a("4de4");var f={name:"SpuForm",data:function(){return{dialogImageUrl:"",dialogVisible:!1,spu:{category3Id:"",tmId:"",description:"",spuImageList:[],spuName:"",spuSaleAttrList:[]},TradeMarkList:{},SpuImageList:[],SaleAttrList:[],attrIdAndAttrName:""}},methods:{handleRemove:function(e,t){this.SpuImageList=t},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},initSpuData:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s,i,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$API.spu.reqSpu(e.id);case 2:return r=a.sent,200==r.code&&(t.spu=r.data),a.next=6,t.$API.spu.reqTradeMarkList();case 6:return n=a.sent,200==n.code&&(t.TradeMarkList=n.data),a.next=10,t.$API.spu.reqSpuImageList(e.id);case 10:return s=a.sent,200==s.code&&(i=s.data,i.forEach((function(e){e.name=e.imgName,e.url=e.imgUrl})),t.SpuImageList=i),a.next=14,t.$API.spu.reqBaseSaleAttrList();case 14:l=a.sent,200==l.code&&(t.SaleAttrList=l.data);case 16:case"end":return a.stop()}}),a)})))()},handleSuccess:function(e,t,a){this.SpuImageList=a},addSaleAttr:function(){var e=this.attrIdAndAttrName.split(":"),t=m(e,2),a=t[0],r=t[1],n={baseSaleAttrId:a,saleAttrName:r,spuSaleAttrValueList:[]};this.spu.spuSaleAttrList.push(n),this.attrIdAndAttrName=""},addSaleAttrValue:function(e){this.$set(e,"inputVisible",!0),this.$set(e,"inputValue","")},handleInputConfirm:function(e){var t=e.inputValue,a=e.baseSaleAttrId;if(""!=t.trim()){var r=e.spuSaleAttrValueList.every((function(e){return e.saleAttrValueName!=t}));if(r){console.log(r);var n={saleAttrValueName:t,baseSaleAttrId:a};e.spuSaleAttrValueList.push(n),e.inputVisible=!1}}else this.$message("不能为空")},handleClose:function(e,t){e.spuSaleAttrValueList.splice(t,1)},addOrUpdateSpu:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.spu.spuImageList=e.SpuImageList.map((function(e){return{imgName:e.name,imgUrl:e.response&&e.response.data||e.url}})),t.next=3,e.$API.spu.reqAddOrUpdateSpu(e.spu);case 3:a=t.sent,console.log(a),200==a.code&&(e.$message({type:"success",message:"保存成功"}),e.$emit("changeScene",{scene:0,flag:e.id?"修改":"添加"})),Object.assign(e._data,e.$options.data());case 7:case"end":return t.stop()}}),t)})))()},addSpuData:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.spu.category3Id=e,a.next=3,t.$API.spu.reqTradeMarkList();case 3:return r=a.sent,200==r.code&&(t.TradeMarkList=r.data),a.next=7,t.$API.spu.reqBaseSaleAttrList();case 7:n=a.sent,200==n.code&&(t.SaleAttrList=n.data);case 9:case"end":return a.stop()}}),a)})))()},cancel:function(){this.$emit("changeScene",{scene:0,flag:""}),Object.assign(this._data,this.$options.data())}},computed:{unSelectSaleAttr:function(){var e=this,t=this.SaleAttrList.filter((function(t){return e.spu.spuSaleAttrList.every((function(e){return t.name!=e.saleAttrName}))}));return t}}},h=f,g=(a("288b"),a("2877")),b=Object(g["a"])(h,i,l,!1,null,null,null),I=b.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"SPU名称"}},[e._v(e._s(e.spu.spuName))]),a("el-form-item",{attrs:{label:"SKU名称"}},[a("el-input",{attrs:{placeholder:"SKU名称"},model:{value:e.skuInfo.skuName,callback:function(t){e.$set(e.skuInfo,"skuName",t)},expression:"skuInfo.skuName"}})],1),a("el-form-item",{attrs:{label:"价格（元）"}},[a("el-input",{attrs:{placeholder:"价格（元素）",type:"number"},model:{value:e.skuInfo.price,callback:function(t){e.$set(e.skuInfo,"price",t)},expression:"skuInfo.price"}})],1),a("el-form-item",{attrs:{label:"重量（千克）"}},[a("el-input",{attrs:{placeholder:"重量（千克）"},model:{value:e.skuInfo.weight,callback:function(t){e.$set(e.skuInfo,"weight",t)},expression:"skuInfo.weight"}})],1),a("el-form-item",{attrs:{label:"规格描述（千克）"}},[a("el-input",{attrs:{type:"textarea",rows:"4"},model:{value:e.skuInfo.skuDesc,callback:function(t){e.$set(e.skuInfo,"skuDesc",t)},expression:"skuInfo.skuDesc"}})],1),a("el-form-item",{attrs:{label:"平台属性"}},[a("el-checkbox-group",[a("el-form",{ref:"form",attrs:{inline:!0,"label-width":"80px"}},e._l(e.attrInfoList,(function(t){return a("el-form-item",{key:t.id,attrs:{label:t.attrName}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.attrIdAndValueId,callback:function(a){e.$set(t,"attrIdAndValueId",a)},expression:"attr.attrIdAndValueId"}},e._l(t.attrValueList,(function(e){return a("el-option",{key:e.id,attrs:{value:t.id+":"+e.id,label:e.valueName}})})),1)],1)})),1)],1)],1),a("el-form-item",{attrs:{label:"销售属性"}},[a("el-checkbox-group",[a("el-form",{ref:"form",attrs:{inline:!0,"label-width":"80px"}},e._l(e.spuSaleAttrList,(function(t){return a("el-form-item",{key:t.id,attrs:{label:t.saleAttrName}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.saleIdAndValueId,callback:function(a){e.$set(t,"saleIdAndValueId",a)},expression:"sale.saleIdAndValueId"}},e._l(t.spuSaleAttrValueList,(function(e){return a("el-option",{key:e.id,attrs:{value:t.id+":"+e.id,label:e.saleAttrValueName}})})),1)],1)})),1)],1)],1),a("el-form-item",{attrs:{label:"图片列表"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.spuImageList},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"80"}}),a("el-table-column",{attrs:{label:"图片",prop:"prop",width:"width"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;e.$index;return[a("img",{staticStyle:{width:"100px"},attrs:{src:t.imgUrl}})]}}])}),a("el-table-column",{attrs:{label:"名称",prop:"imgName",width:"width"}}),a("el-table-column",{attrs:{label:"操作",prop:"index",width:"width"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;t.$index;return[0==r.isDefault?a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeDefault(r)}}},[e._v("设为默认")]):a("el-button",[e._v("默认")])]}}])})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")]),a("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)],1)},v=[],k={name:"SkuForm",data:function(){return{spuImageList:[],spuSaleAttrList:[],attrInfoList:[],skuInfo:{category3Id:"",spuId:"",tmId:"",skuName:"",price:"",weight:"",skuDesc:"",skuDefaultImg:"",skuImageList:[],skuAttrValueList:[{}],skuSaleAttrValueList:[]},spu:{},imageList:[]}},methods:{getData:function(e,t,a){var r=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var s,i,l,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r.skuInfo.category3Id=a.category3Id,r.skuInfo.spuId=a.id,r.skuInfo.tmId=a.tmId,r.spu=a,n.next=6,r.$API.spu.reqSpuImageList(a.id);case 6:return s=n.sent,200==s.code&&(i=s.data,i.forEach((function(e){e.isDefault=0})),r.spuImageList=i),n.next=10,r.$API.spu.reqSpuSaleAttrList(a.id);case 10:return l=n.sent,200==l.code&&(r.spuSaleAttrList=l.data),n.next=14,r.$API.spu.reqAttrInfoList(e,t,a.category3Id);case 14:u=n.sent,200==u.code&&(r.attrInfoList=u.data);case 16:case"end":return n.stop()}}),n)})))()},handleSelectionChange:function(e){this.imageList=e},changeDefault:function(e){this.spuImageList.forEach((function(e){e.isDefault=0})),e.isDefault=1,this.skuInfo.skuDefaultImg=e.imgUrl},cancel:function(){this.$emit("changeScene",{scene:0,flag:""}),Object.assign(this._data,this.$options.data())},save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.attrInfoList,r=e.skuInfo,n=e.spuSaleAttrList,s=e.imageList,r.skuAttrValueList=a.reduce((function(e,t){if(t.attrIdAndValueId){var a=t.attrIdAndValueId.split(":"),r=m(a,2),n=r[0],s=r[1];e.push({attrId:n,valueId:s})}return e}),[]),r.skuSaleAttrValueList=n.reduce((function(e,t){if(t.saleIdAndValueId){var a=t.saleIdAndValueId.split(":"),r=m(a,2),n=r[0],s=r[1];e.push({saleAttrId:n,saleAttrValueId:s})}return e}),[]),r.skuImageList=s.map((function(e){return{imgName:e.imgName,imgUrl:e.imgUrl,isDefault:e.isDefault,spuImgId:e.id}})),t.next=6,e.$API.spu.reqAddSku(e.skuInfo);case 6:i=t.sent,200==i.code&&(e.$message({type:"success",message:"添加SKU成功"}),e.$emit("changeScene",{scene:0,flag:""})),Object.assign(e._data,e.$options.data());case 9:case"end":return t.stop()}}),t)})))()}}},w=k,A=Object(g["a"])(w,S,v,!1,null,null,null),y=A.exports,L={name:"Spu",data:function(){return{category1Id:"",category2Id:"",category3Id:"",page:1,limit:3,records:[],total:0,scene:0,dialogTableVisible:!1,spu:{},skuList:[],loading:!0}},components:{SpuForm:I,SkuForm:y},methods:{getCategoryId:function(e){var t=e.categoryId,a=e.level;1==a?(this.category2Id="",this.category3Id="",this.category1Id=t):2==a?(this.category2Id=t,this.category3Id=""):(this.category3Id=t,this.getSpuList())},getSpuList:function(){var e=arguments,t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s,i,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:1,t.page=r,n=t.page,s=t.limit,i=t.category3Id,a.next=5,t.$API.spu.reqSpuList(n,s,i);case 5:l=a.sent,200==l.code&&(t.records=l.data.records,t.total=l.data.total),t.$API.spu.reqSpuList(n,s,i);case 8:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(e){this.limit=e,this.getSpuList()},addSup:function(){this.scene=1,this.$refs.spu.addSpuData(this.category3Id)},updateSpu:function(e){this.scene=1,this.$refs.spu.initSpuData(e)},changeScene:function(e){var t=e.scene,a=e.flag;this.scene=t,"修改"==a?this.getSpuList(this.page):this.getSpuList()},deleteSpu:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$API.spu.reqDeleteSpu(e.id);case 2:r=a.sent,200==r.code&&(t.$message({type:"success",message:"删除成功"}),t.getSpuList(t.records.length>1?t.page:t.page-1));case 4:case"end":return a.stop()}}),a)})))()},addSku:function(e){this.scene=2,this.$refs.sku.getData(this.category1Id,this.category2Id,e)},handler:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.dialogTableVisible=!0,t.spu=e,a.next=4,t.$API.spu.reqSkuList(e.id);case 4:r=a.sent,200==r.code&&(t.skuList=r.data,t.loading=!1);case 6:case"end":return a.stop()}}),a)})))()},close:function(e){this.loading=!0,this.skuList=[],e()}}},x=L,$=Object(g["a"])(x,r,n,!1,null,null,null);t["default"]=$.exports},a434:function(e,t,a){"use strict";var r=a("23e7"),n=a("23cb"),s=a("a691"),i=a("50c4"),l=a("7b0b"),u=a("65f0"),o=a("8418"),c=a("1dde"),d=a("ae40"),p=c("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,h=Math.min,g=9007199254740991,b="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!p||!m},{splice:function(e,t){var a,r,c,d,p,m,I=l(this),S=i(I.length),v=n(e,S),k=arguments.length;if(0===k?a=r=0:1===k?(a=0,r=S-v):(a=k-2,r=h(f(s(t),0),S-v)),S+a-r>g)throw TypeError(b);for(c=u(I,r),d=0;d<r;d++)p=v+d,p in I&&o(c,d,I[p]);if(c.length=r,a<r){for(d=v;d<S-r;d++)p=d+r,m=d+a,p in I?I[m]=I[p]:delete I[m];for(d=S;d>S-r+a;d--)delete I[d-1]}else if(a>r)for(d=S-r;d>v;d--)p=d+r-1,m=d+a-1,p in I?I[m]=I[p]:delete I[m];for(d=0;d<a;d++)I[d+v]=arguments[d+2];return I.length=S-r+a,c}})}}]);