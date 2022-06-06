<template>
  <div>
      <!-- 区域一 -->
      <div class="header">
          <span class="search-header">搜索用户数</span>
        <svg t="1653007395971" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4998" width="26" height="26"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="4999"></path><path d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" p-id="5000"></path><path d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" p-id="5001"></path></svg>
      </div>
      <!-- 区域二 -->
      <div class="main" >
          <span class="main-title">
              12321
          </span>
          <span class="main-content">17.1</span>
         <i class="el-icon-caret-top" style="color:greenyellow"></i>
         <i class="el-icon-caret-bottom" style="color:red"></i>
         </div>
      <!-- 区域三 -->
      <div class="footer"> 
        <div class="charts" ref="charts"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
export default {
name:"LineCharts",
mounted(){
let lineCharts=echarts.init(this.$refs.charts)
lineCharts.setOption({
    xAxis:{
        show:false,
        type:'category'
    },
    yAxis:{
        show:false
    },
    series:[
        {
            type:"line",
            data:[10,7,33,12,48,9,29,10,44],
            // 拐点样式的设置
            lineStyle:{color:"blue"},
            itemStyle:{
                opacity:0
            },
            // 填充颜色
            areaStyle:{
                color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                    },

            },
            smooth:true
        }
    ],
    grid:{
left:0,
top:0,
right:0,
bottom:0
    },
})
},
}
</script>

<style scoped>
.header{
    display: flex;
    align-items: center;
}
.content{
    font-size: 30px;
    padding: 10px 0px;
}
.search-header{
margin-right: 20px;
}
.main-title{
    margin-right: 30px;
    font-size: 30px;
}
.main{
margin-top:10px
}
.main-content{
margin-right: 10px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>