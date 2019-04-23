<template>
  <section>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="3">
            <div class="grid-cell">
              <selectCom @optionChanged="setOption()" :options="optionsList" :title="'角色名称'"></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell"></div>
          </mu-col>
        </mu-row>
      </mu-paper>
      <list :listData="list"></list>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
