<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="visite"> </el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMooth">本月</span>
        <span @click="setYear">本年</span>
        <!--  -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <!-- 容器 -->
          <div class="charts" ref="charts">
            <h3></h3>
          </div>
        </el-col>
        <el-col :span="8" class="right">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="one rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one rindex">2</span>
              <span>麦当劳</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one rindex">3</span>
              <span>海底捞</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one">4</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one">5</span>
              <span>汉堡王</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one">6</span>
              <span>真功夫</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="one">7</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
// 引入时间
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      //   收集日历的数据
      date: [],
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "yellowgreen",
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  //   监听属性
  watch: {
    title() {
      // 重新修改图标的配置数据
      //   图标配置数据可以再次修改，如果有新的数值，没有新的数值，则用以前的
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:this.title=="销售额"? this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:[
          {
            data:this.title=="销售额"? this.listState.orderFullYear:this.listState.userFullYear
          }
        ]
      });
    },
    listState(){
      this.mycharts.setOption({
      title: {
        text: this.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data:this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data:this.listState.orderFullYear,
          color: "yellowgreen",
        },
      ],
    });
  },
  },
  methods: {
    //   本天
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //   每周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 每月
    setMooth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //  每年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.tab {
  width: 100%;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.one {
  float: left;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
}
.rindex {
  border-radius: 50%;
  background-color: black;
  color: white;
}
.rvalue {
  float: right;
}
</style>