<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索店铺名称'" @serch="onSherch"></sherch>
            </div>
          </mu-col>
        </mu-row>
      </mu-paper>
      <list
        :columns="columns"
        :nowPage="form.page"
        :totalPage="form.totalPage"
        :listData="list"
        @changePage="changePage"
        :secend="true"
      ></list>
    </div>
  </section>
</template>

<script>
import sherch from "@/components/sherch";
export default {
  components: {
    sherch
  },
  data() {
    return {
      list: [],
      columns: [
        { title: "店铺名称", name: "name", align: "center" },
        { title: "预约卡号", name: "tel", align: "center" },
        { title: "创建时间", name: "time", align: "center" }
      ],
      form: {
        totalPage: 1,
        page: 1,
        sherch: "",
        size: 20
      }
    };
  },
  created: function() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/admin/orderCardList", {
          page: this.form.page,
          size: this.form.size,
          shopName: this.form.sherch
        })
        .then(data => {
          this.setList(data.data.content);
          this.form.totalPage = data.data.totalElements;
        });
    },
    setList(data) {
      let newList = [];
      for (let i = 0; i < data.length; i++) {
        let li = {
          name: data[i].shopName,
          tel: data[i].number,
          secend: data[i].createTime,
          id: data[i].id
        };
        newList.push(li);
      }
      this.list = newList;
    },
    changePage(data) {
        this.form.page = data
        this.getList()
    },
    onSherch(data) {
        this.form.page = 1
        this.form.sherch = data
        this.getList()
    }
  }
};
</script>

<style>
</style>
