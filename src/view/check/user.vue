<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper :z-depth="1">
        <mu-tabs
          :value.sync="form.ifCheck"
          inverse
          color="primary"
          text-color="rgba(0, 0, 0, .54)"
          indicator-color="primary"
          center
          @change="getList()"
        >
          <mu-tab>未审核</mu-tab>
          <mu-tab>已审核</mu-tab>
        </mu-tabs>
        <div class="content_box" v-if="form.ifCheck === 0">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="totalPage"
            :listData="list"
            @openWin="openContent"
          ></list>
        </div>
        <div class="content_box" v-if="form.ifCheck === 1">
           <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="totalPage"
            :listData="list"
            @openWin="openContent"
          ></list>
        </div>
      </mu-paper>
    </div>
  </section>
</template>

<script>
import leftTab from "@/components/leftTab";
import list from "@/components/list";
export default {
  components: {
    leftTab,
    list
  },
  data() {
    return {
      form: {
        ifCheck: 0,
        page: 1,
        size: 20
      },
      totalPage: 0,
      columns: [
        { title: "用户名", name: "name", align: "center" },
        { title: "手机号", name: "tel", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ],
      list: [
        { name: "test", tel: "12312312311", content: { value: "Test Object" } }
      ]
    };
  },
  methods: {
    openContent(data) {
      //
    },
    getList() {
      this.$axios
        .post("/admin/checkWorkers", {
          ifCheck: this.form.ifCheck,
          page: this.form.page,
          size: this.form.size
        })
        .then(data => {
          this.totalPage = data.data.totalPages;
          let list = data.data.content;
          let newList = [];
          for (let i = 0; i < list.length; i++) {
            let content = {
              legalPositive: list[i].idPositive,
              idNegative: list[i].idNegative
            };
            let li = {
              name: list[i].workerName,
              tel: list[i].workerTel,
              id: list[i].id,
              content: content
            };
            newList.push(li);
          }
          this.list = newList;
        });
    }
  },
  created: function() {
    this.getList();
  }
};
</script>

<style>
.content_box {
  padding: 20px;
}
</style>
