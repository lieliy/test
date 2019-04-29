<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
img {
  max-width: 100%;
}
.img{
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
}
.img_close_btn{
  position: absolute;
  right: 20px;
  top: 10px;
  color: #2196f3;
  cursor: pointer;
  z-index: 9;
}
.smallIng{
  max-height: 500px;
}
.bigImg{
  max-height: 80vh;
}
.right_list {
  position: absolute;
  right: 0;
  top: 0;
  width: calc(100vw - 230px);
  padding: 20px;
}
.top_box {
  padding: 15px;
  padding-bottom: 0;
  margin-bottom: 20px;
}
.v_center {
  vertical-align: baseline;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #ededed;
}
</style>
