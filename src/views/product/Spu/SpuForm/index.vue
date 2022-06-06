<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in TradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片 action：提交图片的地址
        list-type:文件列表的类型
        :file-list:数据展示的数据，必须有URL和name
        :on-preview：图片预览会触发
        :on-remove:删除图片的时候会触发-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="SpuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还剩${unSelectSaleAttr.length}个未选`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="unselect in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 展示的是当前SPU属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <!-- row代表spu.spuSaleAttrList里的各个对象 -->
              <!-- @close="handleClose(tag)" -->
              <!-- 标签 -->
              <!-- el-tag：展示已有的属性列表 -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- 底下的结构跟attr的span，input相同 
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm"
              @click="showInput"-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      spu: {
        //   三级分类的id
        category3Id: "",
        // 品牌的ID
        tmId: "",
        // 描述
        description:
          "",
        //   收集图片SPU的信息
        spuImageList: [
          //   {
          //     id: 15988,
          //     imgName: "phone.jpg",
          //     imgUrl: "http://139.198.127.41:9000/sph/20220511/phone.jpg",
          //     spuId: 6634,
          //   },
        ],
        // spu名称
        spuName: "",
        // 平台属性与属性值的收集
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 2,
          //     id: 16248,
          //     saleAttrName: "版本",
          //     spuId: 6634,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 2,
          //         id: 8531,
          //         isChecked: '',
          //         saleAttrName: "版本",
          //         saleAttrValueName: "8+256",
          //         spuId: 6634,
          //       },
          //     ],
          //   },
        ],
      }, //存储spu信息
      TradeMarkList: {}, //品牌信息
      SpuImageList: [], //图片信息
      SaleAttrList: [], //销售信息(项目的全部销售属性)
      attrIdAndAttrName: "", //收集未选择的销售属性的id
    };
  },
  methods: {
    // 照片墙删除图片的时候触发
    handleRemove(file, fileList) {
      // file参数代表删除的那一张图片
      //fileList 照片墙删除某一张图片以后剩余的其他图片
      // console.log(file, fileList);
      // 收集照片墙的数据
      // 对于已有的图片是含有name、url属性的
      // 对于服务器而言，不需要name、url字段，对于将来有的图片的数据再提交给服务器的时候，需要处理的。
      this.SpuImageList = fileList;
    },
    // 照片墙预览功能
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    //   初始化supform数据
    async initSpuData(spu) {
      //获取spu信息的数据
      let spuresult = await this.$API.spu.reqSpu(spu.id);
      if (spuresult.code == 200) {
        this.spu = spuresult.data;
      }
      // 品牌的数据
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.TradeMarkList = tradeMarkResult.data;
      }
      // 图片地址
      let SpuImageListResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (SpuImageListResult.code == 200) {
        let listArr = SpuImageListResult.data;
        // 由于图片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 把整理好的数据赋值给
        this.SpuImageList = listArr;
      }
      // 销售属性
      let SaleAttrListResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(SaleAttrListResult);
      if (SaleAttrListResult.code == 200) {
        this.SaleAttrList = SaleAttrListResult.data;
      }
    },
    // 照片墙上传图片时的数据
    handleSuccess(response, file, fileList) {
      // 收集图片信息
      this.SpuImageList = fileList;
      // console.log(response, file, fileList);
    },
    // 添加销售属性
    addSaleAttr() {
      // 已经收集到添加属性的id和name
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清空数据
      this.attrIdAndAttrName = "";
    },
    // 添加属性值
    addSaleAttrValue(row) {
      // 点击销售属性值当中添加按钮的时候，需要有button变成input，通过当前销售属性inputVisible的控制
      // 挂载在销售属性inputVisible控制input和button互换
      this.$set(row, "inputVisible", true);
      // 通过响应式inputValue记录数据
      this.$set(row, "inputValue", "");
    },
    // 失去焦点或者enter之后切换input和button
    handleInputConfirm(row) {
      const { inputValue, baseSaleAttrId } = row;
      // 需要将值添加到属性值的数组里面
      if (inputValue.trim() == "") {
        this.$message("不能为空");
        return;
      }
      // 属性值不能重复,此时inputValue指的是正在写入的内容跟其余属性进行对比是否有重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      console.log(result);
      // 新增属性值
      let newSaleAttValueName = {
        saleAttrValueName: inputValue,
        baseSaleAttrId: baseSaleAttrId,
      };
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttValueName);
      // 切换button
      row.inputVisible = false;
    },
    // 删除属性值
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 保存按钮
    async addOrUpdateSpu() {
      // 整理参数：整理照片墙的数据
      // 携带参数：对于图片，需要携带imgUrl、imgName
      this.spu.spuImageList = this.SpuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      console.log(result);
      if (result.code == 200) {
        // 提示
        this.$message({
          type: "success",
          message: "保存成功",
        });

        // 通知父亲组件回到原来组件内
        this.$emit("changeScene",{scene:0,flag:this.id?"修改":"添加"});
      }
      //  清除数据 es6新增的方法可以合并对象组件实例this._data
      Object.assign(this._data,this.$options.data())
    },
    // 点击spu添加按钮发起的请求
   async addSpuData(category3Id) {
    //  添加SPU三级ID
    this.spu.category3Id=category3Id;
      // 品牌的数据
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.TradeMarkList = tradeMarkResult.data;
      }
      // 销售属性
      let SaleAttrListResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(SaleAttrListResult);
      if (SaleAttrListResult.code == 200) {
        this.SaleAttrList = SaleAttrListResult.data;
      }
    },
    // 取消按钮
    cancel(){
     this.$emit('changeScene',{scene:0,flag:""})
    //  清除数据 es6新增的方法可以合并对象组件实例this._data
    Object.assign(this._data,this.$options.data())
    }
  },

  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      // 平台拥有三个属性
      // spu自己拥有spu.spuSaleAttrList
      // every 数组会返回一个布尔值
      let result = this.SaleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>