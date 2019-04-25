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
          <mu-tab>未完成</mu-tab>
          <mu-tab>已完成</mu-tab>
        </mu-tabs>
        <div class="content_box" v-if="form.ifCheck === 0">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="totalPage"
            :listData="list"
            :order="true"
            :showDoneBtn="true"
            @doSomething="done"
            @changePage="getList"
          ></list>
        </div>
        <div class="content_box" v-if="form.ifCheck === 1">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="totalPage"
            :listData="list"
            :order="true"
            :noDo="true"
            @changePage="getList"
          ></list>
        </div>
      </mu-paper>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import Message from "muse-ui-message";
export default {
  data() {
    return {
      form: {
        ifCheck: 0,
        page: 1,
        size: 20
      },
      windowContent: {},
      openWindow: false,
      totalPage: 0,
      columns: [
        { title: "序号", name: "numId", align: "center" },
        { title: "兑换人", name: "name", align: "center" },
        { title: "商品*规格", name: "goodsType", align: "center" },
        { title: "数量", name: "num", align: "center" },
        { title: "消耗积分", name: "integral", align: "center" },
        { title: "取货方式", name: "getType", align: "center" },
        { title: "收货人", name: "getName", align: "center" },
        { title: "联系电话", name: "tel", align: "center" },
        { title: "收货地址", name: "address", align: "center" },
        { title: "兑换时间", name: "time", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ],
      list: [
        { name: "test", tel: "12312312311", content: { value: "Test Object" } }
      ],
      getType: ["到店自取", "送货上门"]
    };
  },
  methods: {
    openContent(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    done(data) {
      Message.confirm("确定完成？", "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/exchangeOver", {
              exchangeId: data.id
            })
            .then(data => {
              this.getList();
            });
        }
      });
    },
    getList(nowPage) {
      if (nowPage) {
        this.form.page = nowPage
      }
      this.$axios
        .post("/admin/integralOrders", {
          ifOver: this.form.ifCheck,
          page: this.form.page,
          size: this.form.size
        })
        .then(data => {
          this.totalPage = data.data.totalPages;
          let list = data.data.content;
          let newList = [];
          if (this.form.ifCheck === 1) {
            this.columns = [
              { title: "序号", name: "numId", align: "center" },
              { title: "兑换人", name: "name", align: "center" },
              { title: "商品*规格", name: "goodsType", align: "center" },
              { title: "数量", name: "num", align: "center" },
              { title: "消耗积分", name: "integral", align: "center" },
              { title: "取货方式", name: "getType", align: "center" },
              { title: "收货人", name: "getName", align: "center" },
              { title: "联系电话", name: "tel", align: "center" },
              { title: "收货地址", name: "address", align: "center" },
              { title: "兑换时间", name: "time", align: "center" }
            ];
          } else {
            this.columns = [
              { title: "序号", name: "numId", align: "center" },
              { title: "兑换人", name: "name", align: "center" },
              { title: "商品*规格", name: "goodsType", align: "center" },
              { title: "数量", name: "num", align: "center" },
              { title: "消耗积分", name: "integral", align: "center" },
              { title: "取货方式", name: "getType", align: "center" },
              { title: "收货人", name: "getName", align: "center" },
              { title: "联系电话", name: "tel", align: "center" },
              { title: "收货地址", name: "address", align: "center" },
              { title: "兑换时间", name: "time", align: "center" },
              { title: "操作", name: "control", align: "center" }
            ];
          }
          for (let i = 0; i < list.length; i++) {
            let goodsContent = `${list[i].goodsName}(${
              list[i].specifications
            })`;
            let createTime = moment(list[i].createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            let li = {
              numId: Number(i + 1),
              name: list[i].receiver,
              workerName: list[i].workerName,
              goodsContent: goodsContent,
              count: list[i].count,
              allIntegral: list[i].allIntegral,
              getType: this.getType[list[i].getType],
              address: list[i].address,
              createTime: createTime,
              tel: list[i].tel,
              id: list[i].id
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
