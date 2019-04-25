<template>
  <section>
    <mu-select :label="title" v-model="nowVal" full-width @change="optionChange()">
      <mu-option v-for="(item,index) in options" :key="index" :label="item.title" :value="item.val"></mu-option>
    </mu-select>
  </section>
</template>

<script>
export default {
  props: ["options", "title", "selectVal"],
  data() {
    return {
      nowVal: ''
    };
  },
  methods: {
    optionChange() {
      this.$emit("optionChanged", this.nowVal);
    }
  },
  watch: {
      selectVal(data) {
          this.nowVal = data
      }
  },
  created: function () {
    if (this.selectVal) {
      this.nowVal = this.selectVal
    } else {
      this.nowVal = this.options[0].val
      this.$emit("optionChanged", this.nowVal);
    }
  }
};
</script>

<style>
</style>
