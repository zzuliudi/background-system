<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echart
import * as echarts from "echarts"
export default {
name:'',
mounted(){
let lineCharts=echarts.init(this.$refs.charts)
lineCharts.setOption({
    xAxis:{
        show:false,
        // 最小值与最大值的设置
        min:0,
        max:100,
    },
    yAxis:{
        show:false,
        // 均分
        type:'category'
    },
    series:[
        {
            // 柱状图
            type:"bar",
            data:[78],
            barWidth:10,
            color:"yellowgreen" ,
            // 背景颜色设置
            showBackground:true,
            // 设置背景颜色
            backgroundStyle:{color:"#eee"},
            // 文本标签
            label:{
                show:true,
            // 改版文本内容
                formatter:"|",
            // 文本标签位置的调试
                position:"right",
                color:"yellowgreen"
            },
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
.charts{
    width: 100%;
    height: 100%;
}
</style>