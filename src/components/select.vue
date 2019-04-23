<template>
  <section>
    <mu-select :label="title" v-model="selectVal" full-width @change="optionChange()">
      <mu-option v-for="(item,index) in options" :key="index" :label="item.title" :value="item.val"></mu-option>
    </mu-select>
  </section>
</template>

<script>
export default {
  props: ["options", "title"],
  data() {
    return {
      selectVal: ''
    };
  },
  methods: {
    optionChange() {
      this.$emit("optionChanged", this.selectVal);
    }
  },
  watch: {
      options(data) {
          this.selectVal = this.options[0].val
      }
  }
};
</script>

<style>
</style>
