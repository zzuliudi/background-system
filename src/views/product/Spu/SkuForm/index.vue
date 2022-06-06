<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          placeholder="价格（元素）"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input
          placeholder="重量（千克）"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述（千克）">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-checkbox-group>
          <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item
              :label="attr.attrName"
              v-for="attr in attrInfoList"
              :key="attr.id"
            >
              <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                <el-option
                  v-for="attrvalue in attr.attrValueList"
                  :key="attrvalue.id"
                  :value="`${attr.id}:${attrvalue.id}`"
                  :label="attrvalue.valueName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-checkbox-group>
          <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item
              :label="sale.saleAttrName"
              v-for="sale in spuSaleAttrList"
              :key="sale.id"
            >
              <el-select placeholder="请选择" v-model="sale.saleIdAndValueId">
                <el-option
                  v-for="salevalue in sale.spuSaleAttrValueList"
                  :key="salevalue.id"
                  :value="`${sale.id}:${salevalue.id}`"
                  :label="salevalue.saleAttrValueName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column label="图片" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width:100px;height:"/>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" width="width">
          </el-table-column>
          <el-table-column label="操作" prop="index" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
            <el-button v-else>默认</el-button>
            </template>
            
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      //存储销售的属性
      spuSaleAttrList: [],
      // 存储平台数据
      attrInfoList: [],
      // 收集sku数据
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: "",
        spuId: "",
        tmId: "",
        // 第二类：需要通过数据双向绑定v-model收集
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        // 第三类：需要自己书写代码
        // 收集图片的字段(某人图片)
        // 默认图片
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   id:0,
          //   imgName:"",
          //   imgUrl:"",
          //   isDefault:"",
          //   spuId:0,
          //   spuImgId:0
          // }
        ],
        // 平台属性
        skuAttrValueList: [
          {
            // 属性ID
            // attrId: 0,
            // 属性值ID
            // valueId: 0,
          },
        ],
        // 收集销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id:0,
          //   saleAttrId:0,
          //   saleAttrName:"",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   spuId: 0,
          //   skuId: 0,
          // }
        ],
      },
      spu: {},
      // 收集图片的数据字段：但是需要注意，收集的数据目前缺少isDefault字段，
      imageList:[]
    };
  },
  methods: {
    // 获得数据
    async getData(catagory1Id, catagory2Id, spu) {
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //  获得图片数据
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(result);
      if (result.code == 200) {
        let list = result.data;
        list.forEach(item => {
          item.isDefault=0
        });
        this.spuImageList =list;
      }
      // 获得销售数据
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      // console.log(result1);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      // 获得品牌数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        catagory1Id,
        catagory2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // table表格复选框按键
    handleSelectionChange(val) {
      // 可以获得用户选中图片的信息数据，但是需要注意的是，当前收集的数据当中，缺失isDefault数据
        this.imageList = val;
      },
// 排他操作
      changeDefault(row){
this.spuImageList.forEach(item=>{
item.isDefault=0
})
// 自己的isDefault变成1
row.isDefault=1
// 收集默认图片的地址
this.skuInfo.skuDefaultImg=row.imgUrl;

      },
    // 取消按钮
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      //  清除数据 es6新增的方法可以合并对象组件实例this._data
      Object.assign(this._data, this.$options.data());
    },
// 保存按钮
 async save(){
  // 整理参数
  const {attrInfoList, skuInfo,spuSaleAttrList,imageList}=this;
  // 第一种方法
  // let arr=[];
  // attrInfoList.forEach(item=>{
  //   if(item.attrIdAndValueId){
  //     const [attrId,valueId]=item.attrIdAndValueId.split(":")
  //     let obj={valueId,attrId};
  //     arr.push(obj);
  //   }
  // });
  // skuInfo.skuAttrValueList=arr;
  // 第二种方法reduce
  // 整理平台属性
skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
  if(item.attrIdAndValueId){
    const [attrId,valueId]=item.attrIdAndValueId.split(":")
    prev.push({attrId,valueId})
  }
  return prev
},[])
// 整理销售属性
skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
  if(item.saleIdAndValueId){
    const [saleAttrId,saleAttrValueId]=item.saleIdAndValueId.split(":")
    prev.push({saleAttrId,saleAttrValueId})
  }
  return prev
},[])
// 整理图片数据
skuInfo.skuImageList=imageList.map(item=>{
  return{
    imgName:item.imgName,
    imgUrl:item.imgUrl,
    isDefault:item.isDefault,
    spuImgId:item.id,
  }
})

// 发起请求
 let result=await this.$API.spu.reqAddSku(this.skuInfo)
// console.log(result);
if(result.code==200){
  // 提示
        this.$message({
          type: "success",
          message: "添加SKU成功",
        });
        // 通知父亲组件回到原来组件内
        this.$emit("changeScene",{scene:0,flag:''});
}
 //  清除数据 es6新增的方法可以合并对象组件实例this._data
      Object.assign(this._data,this.$options.data())
}


  },
};
</script>

<style>
</style>