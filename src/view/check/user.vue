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
            :showChackBtn="true"
            @checked="checked"
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
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openWindow">
      <mu-appbar color="primary" :title="windowContent.name">
        <mu-button slot="left" icon @click="openWindow = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="worker_box">
          <mu-row gutter>
            <mu-col span="6">
              <div class="grid-cell">
                <p>姓名：{{windowContent.name}}</p>
                <p>手机:{{windowContent.tel}}</p>
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell">
                <p>身份证正面照片：</p>
                <img :src="windowContent.content.idPositive" alt="身份证正面照片">
                <p>身份证反面照片：</p>
                <img :src="windowContent.content.idNegative" alt="身份证反面照片">
              </div>
            </mu-col>
          </mu-row>
        </div>
      </div>
    </mu-dialog>
  </section>
</template>

<script>
import Message from "muse-ui-message";
import list from "@/components/list";
export default {
  components: {
    list
  },
  data() {
    return {
      form: {
        ifCheck: 0,
        page: 1,
        size: 20
      },
      windowContent: {content:{}},
      openWindow: false,
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
      this.windowContent = data
      this.openWindow = true
    },
    checked(data) {
      let msg = "";
      if (data) {
        msg = "确定通过？";
      } else {
        msg = "确定不通过？";
      }
      Message.confirm(msg, "注意").then(({result}) => {
        this.getList()
      })
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
              idPositive: list[i].idPositive,
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
