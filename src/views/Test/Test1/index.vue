<template>
  <div class="div1">
      <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btn.Add1')!=-1">添加按钮1</el-button>
      <el-button type="primary">添加按钮2</el-button>
      <div id="a" ref="a" style="height:50px">nuxwc</div>
  </div>
</template>

<script>
export default {
name:"",
mounted(){
 let a= this.$refs.a.style.height
 console.log(a);
this.addp()
},
methods:{
  addp(){
            let p = document.createElement("p")
            p.classList.add("class1")
            p.style.cssText="background:pink;width:200px;height:200px"
            let bodys = document.querySelector(".div1")
            bodys.appendChild(p)
        }
}
}
</script>

<style>

</style>