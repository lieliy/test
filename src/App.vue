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
.v_center{
  vertical-align: baseline;
}
</style>
