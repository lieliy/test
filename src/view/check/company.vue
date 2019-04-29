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
    <mu-dialog
      :padding="0"
      scrollable
      width="360"
      transition="slide-bottom"
      fullscreen
      :open.sync="openWindow"
    >
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
                <p>公司名称：{{windowContent.name}}</p>
                <p>联系电话:{{windowContent.tel}}</p>
                <p>公司地址:{{windowContent.content.address}}</p>
                <p>法人:{{windowContent.content.legalPerson}}</p>
              </div>
            </mu-col>
            <mu-col span="12">
              <div class="grid-cell">
                <mu-row gutter>
                  <mu-col span="4">
                    <p>营业执照：</p>
                    <img
                      @click="openBigImgWin(windowContent.content.businessLicense)"
                      :src="windowContent.content.businessLicense"
                      alt="营业执照"
                      class="smallIng"
                    >
                  </mu-col>
                  <mu-col span="4">
                    <p>身份证正面照片：</p>
                    <img
                      @click="openBigImgWin(windowContent.content.legalPositive)"
                      :src="windowContent.content.legalPositive"
                      alt="身份证正面照片"
                      class="smallIng"
                    >
                  </mu-col>
                  <mu-col span="4">
                    <p>身份证反面照片：</p>
                    <img
                      @click="openBigImgWin(windowContent.content.legalNegative)"
                      :src="windowContent.content.legalNegative"
                      alt="身份证反面照片"
                      class="smallIng"
                    >
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
        <img class="bigImg" :src="bigImg" alt>
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
      bigImg: "",
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
            .post("/admin/companyCheck", {
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
        .post("/admin/notCheckCompany", {
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
              address: list[i].address,
              legalPerson: list[i].legalPerson,
              legalPositive: list[i].legalPositive,
              legalNegative: list[i].legalNegative,
              businessLicense: list[i].businessLicense
            };
            let li = {
              name: list[i].companyName,
              tel: list[i].tel,
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
      this.openBigImg = true;
      this.bigImg = url;
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
