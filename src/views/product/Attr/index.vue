<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <!-- 表格：暂时平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteTradeMark(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加、修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column prop="attrName" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要用span和input来回切换 -->
              <el-input
                v-if="row.falg"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="attrName" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}？`"
                @onConfirm="deletsAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrdataAttr" :disabled=" attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import clonDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      // 是否显示页面
      isShowTable: true,
      // 收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性可以有多个
        ],
        categoryId: 0, //三级分类ID
        categoryIdLevel: 3,
      },
    };
  },
  methods: {
    // 自定义事件
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
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值的回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        falg: true,
      });
      // 获得焦点
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // falg:给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处，每一个属性可以控制自己的模式切换。响应式数据（数据变化视图跟着变化）
    // 前面添加的回调函数
    addAttr() {
      this.isShowTable = false;
      // 清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [],
        categoryId: this.category3Id, //三级分类ID
        categoryIdLevel: 3,
        id:parseInt(Math.random()*10000000000)
      };
    },
    // 修改属性值
    updateAttr(row) {
      this.isShowTable = false;
      // 由于数据里面有套的新的数组，无法使用浅拷贝，只能使用深拷贝
      // 面试：
      // 浅拷贝，深拷贝切记要会手写前拷贝、深拷贝
      // this.attrInfo={...row}
      // console.log(row);
      this.attrInfo = clonDeep(row);
      console.log(this.attrInfo);
      this.attrInfo.attrValueList.forEach((item) => {
        // 给属性上面添加上falg属性；但是不是响应式数据，视图不会跟着变化
        // item.falg=false;
        this.$set(item, "falg", false);
      });
    },
    // 由编辑方式改为查看模式
    toLook(row) {
      //row: 形参是当前用户添加的最新的属性值；
      // 当前的编辑模式变为查看模式
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      // 新增的属性不能与之前的属性值相同
      let isPepat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      // 如果相同直接返回为空
      if (isPepat) return;
      row.falg = false;
      // console.log(row);
    },
    // 自动获焦
    toEdit(row, index) {
      row.falg = true;
      // 点击span之后由于整个页面会发生变化，因此需要nexttick
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除按钮（气泡确认框）
    deletsAttrValue(index) {
      // 最新版本的UI与本次版本不相同所以需要把confirm变为onConfirm
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮传递数据
    async addOrdataAttr() {
      // 整理参数：其中falg不应该被提交上去
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        item => {
          if (item.valueName.trim()!= "" ) {
            delete item.falg;
            return true;
          }
        }
      );
      // 发请求
      try {
        await this.$API.attr.reqAddOrdataAttr(this.attrInfo);
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.isShowTable = true;
        this.getAttrList();
      } catch (error) {
        this.$message( "保存失败" );
      }
    },
    // 删除键
    deleteTradeMark(row) {
      // 弹窗
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定删除的时候
          let result = await this.$API.attr.reqDeleteAttr(row.attrId);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          // 当用户点击取消的时候
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>