<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <el-card style="margin: 20px 0px">
      <!-- 底部这里有三部分进行切换 -->
      <div v-show="scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSup"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加spu"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部的实例"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @current-change="getPageList"
      @size-change="handleSizeChange"
      分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          layout="prev,pager,next,jumper,->,total,sizes"
        ></el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />
      <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku" />
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width:100%" border  v-loading="loading">
        <el-table-column
          prop="skuName"
          label="名称"
          width="width">
          </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="width">
          </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="width">
        </el-table-column>
        <el-table-column
          property="name"
          label="默认图片"
          width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px">
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0, //代表展示SPU列表数据 1 添加SPU|修改SPU 2添加SPU(按钮添加)
      dialogTableVisible: false,
      // 收集查看列表的数据
      spu: {},
      skuList:[],
      loading:true,
    };
  },
  components: { SpuForm, SkuForm },
  methods: {
    //   点击分页器第几页按钮的回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 三级分类有了
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 获得页表
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
      this.$API.spu.reqSpuList(page, limit, category3Id);
    },
    // 每一页展示的数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加按钮
    addSup() {
      this.scene = 1;
      // 通知子组件发起请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //    修改某一个SUP
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件supform子组件的
      // 在父组件当中可以通过$ref获取子组件等等
      this.$refs.spu.initSpuData(row);
    },
    // 切换到父级组件的回调函数
    changeScene({ scene, flag }) {
      // flag是为了区分保存按钮时添加还是修改
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 删除按钮
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加按钮的回调（后面的）
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 查看按钮的回调
   async handler(row) {
      this.dialogTableVisible = true;
      this.spu = row;
      //获取sku列表的数据进行展示
    let result=await this.$API.spu.reqSkuList(row.id);
    // console.log(result);
    if(result.code==200){
      this.skuList=result.data
      // 此时已经获得数据，需要隐藏；loading
      this.loading=false
    }
    },
    // 关闭对话框的回调（由于loading只实行一次，因此需要再次触发
close(done){
// loading再次变成true
this.loading=true
//清除sku列表数据
this.skuList=[]
// 关闭对话框
done()
}


  },
};
</script>

<style>
</style>