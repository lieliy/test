<template>
  <section>
    <mu-flex class="flex-wrapper" justify-content="start">
      <mu-flex class="flex-demo" justify-content="start">
        <mu-text-field :label="title" v-model="serchTel"></mu-text-field>
      </mu-flex>
      <mu-flex class="flex-demo" justify-content="end">
        <mu-button class="btn" small color="primary" @click="onSerch()">搜索</mu-button>
      </mu-flex>
    </mu-flex>
  </section>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      serchTel: ''
    };
  },
  methods: {
    onSerch() {
      this.$emit('serch', this.serchTel)
      this.serchTel = ''
    }
  }
};
</script>

<style>
.btn{
    margin-top: 28px;
    margin-left: 20px;
}
</style>
