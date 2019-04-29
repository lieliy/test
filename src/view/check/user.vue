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
          @change="getList('changeType')"
        >
          <mu-tab>未审核</mu-tab>
          <mu-tab>已审核</mu-tab>
        </mu-tabs>
        <div class="content_box" v-if="form.ifCheck === 0">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="form.totalPage"
            :listData="list"
            @openWin="openContent"
            :showChackBtn="true"
            @checked="checked"
            @changePage="changePage"
          ></list>
        </div>
        <div class="content_box" v-if="form.ifCheck === 1">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="form.totalPage"
            :listData="list"
            @openWin="openContent"
            @changePage="changePage"
          ></list>
        </div>
      </mu-paper>
    </div>
    <mu-dialog :padding="0" scrollable width="360" transition="slide-bottom" fullscreen :open.sync="openWindow">
      <mu-appbar color="primary" :title="windowContent.name">
        <mu-button slot="left" icon @click="openWindow = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="worker_box">
          <mu-row gutter>
            <mu-col span="12">
              <div class="grid-cell">
                <p>姓名：{{windowContent.name}}</p>
                <p>手机:{{windowContent.tel}}</p>
              </div>
            </mu-col>
            <mu-col span="12">
              <div class="grid-cell">
                <mu-row gutter>
                  <mu-col span="6">
                    <p>身份证正面照片：</p>
                    <img class="smallIng" @click="openBigImgWin(windowContent.content.idPositive)" :src="windowContent.content.idPositive" alt="身份证正面照片">
                  </mu-col>
                  <mu-col span="6">
                    <p>身份证反面照片：</p>
                    <img class="smallIng" @click="openBigImgWin(windowContent.content.idNegative)" :src="windowContent.content.idNegative" alt="身份证反面照片">
                  </mu-col>
                </mu-row>
              </div>
            </mu-col>
          </mu-row>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog transition="slide-bottom" :open.sync="openBigImg">
      <mu-icon value="close" @click="openBigImg = false"></mu-icon>
      <div style="padding: 24px;">
        <img class="bigImg" :src="bigImg" alt="">
      </div>
    </mu-dialog>
  </section>
</template>

<script>
import Message from "muse-ui-message";
export default {
  data() {
    return {
      form: {
        ifCheck: 0,
        totalPage: 0,
        page: 1,
        size: 20
      },
      openBigImg: false,
      bigImg: '',
      windowContent: { content: {} },
      openWindow: false,
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
      this.windowContent = data;
      this.openWindow = true;
    },
    checked(type, data) {
      let msg = "";
      if (type === 1) {
        msg = "确定通过？";
      } else {
        msg = "确定不通过？";
      }
      Message.confirm(msg, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/workerCheck", {
              id: data.id,
              ifPass: type
            })
            .then(data => {
              this.getList();
            });
        }
      });
    },
    getList(data) {
      if (data === "changeType") {
        this.form.page = 1;
      }
      this.$axios
        .post("/admin/checkWorkers", {
          ifCheck: this.form.ifCheck,
          page: this.form.page,
          size: this.form.size
        })
        .then(data => {
          this.form.totalPage = data.data.totalElements;
          let list = data.data.content;
          let newList = [];
          if (this.form.ifCheck === 1) {
            this.columns = [
              { title: "状态", name: "type", align: "center" },
              { title: "用户名", name: "name", align: "center" },
              { title: "手机号", name: "tel", align: "center" },
              { title: "操作", name: "control", align: "center" }
            ];
          } else {
            this.columns = [
              { title: "用户名", name: "name", align: "center" },
              { title: "手机号", name: "tel", align: "center" },
              { title: "操作", name: "control", align: "center" }
            ];
          }
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
            if (this.form.ifCheck === 1) {
              if (list[i].ifPass === 1) {
                li.checked = "已通过";
              } else {
                li.checked = "未通过";
              }
            }
            newList.push(li);
          }
          this.list = newList;
        });
    },
    changePage(data) {
      this.form.page = data;
      this.getList();
    },
    openBigImgWin(url) {
      this.openBigImg = true
      this.bigImg = url
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
