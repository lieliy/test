<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper :z-depth="1">
        <mu-tabs
          :value.sync="form.goodsType"
          inverse
          color="primary"
          text-color="rgba(0, 0, 0, .54)"
          indicator-color="primary"
          center
          @change="getList()"
        >
          <mu-tab>套餐订单</mu-tab>
          <mu-tab>会员订单</mu-tab>
        </mu-tabs>
        <div class="content_box" v-if="form.goodsType === 0">
          <mu-row gutter>
            <mu-col span="2">
              <div class="grid-cell">
                <selectCom
                  @optionChanged="setOption"
                  :options="optionsList"
                  :title="'套餐类别'"
                  :selectVal="form.mealType"
                ></selectCom>
              </div>
            </mu-col>
          </mu-row>
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="form.totalPage"
            :listData="list"
            :showDeleteBtn="true"
            :orderList="true"
            :secend="true"
            @changePage="getList"
            @removeId="removeId"
          ></list>
        </div>
        <div class="content_box" v-if="form.goodsType === 1">
          <list
            :columns="columns"
            :nowPage="form.page"
            :totalPage="form.totalPage"
            :listData="list"
            :showDeleteBtn="true"
            :orderList="true"
            :secend="true"
            @removeId="removeId"
            @changePage="getList"
          ></list>
        </div>
      </mu-paper>
    </div>
  </section>
</template>

<script>
import Message from "muse-ui-message";
import selectCom from "@/components/select";
import moment from "moment";
export default {
  components: {
    selectCom
  },
  data() {
    return {
      list: [],
      form: {
        totalPage: 1,
        page: 1,
        size: 20,
        goodsType: 0,
        mealType: 1
      },
      columns: [
        { title: "订单号", name: "idNum", align: "center" },
        { title: "商品", name: "goods", align: "center" },
        { title: "交易状态", name: "type", align: "center" },
        { title: "购买人", name: "name", align: "center" },
        { title: "金额", name: "num", align: "center" },
        { title: "交易时间", name: "time", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ],
      optionsList: [
        { title: "套餐A", val: 1 },
        { title: "套餐B", val: 2 },
        { title: "套餐C", val: 3 }
      ]
    };
  },
  created: function() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/admin/orderList", {
          goodsType: this.form.goodsType,
          mealType: this.form.mealType,
          page: this.form.page,
          size: this.form.size
        })
        .then(data => {
          this.setList(data.data.content);
          this.form.totalPage = data.data.totalElements;
        });
    },
    setList(data) {
      let newList = [];
      for (let i = 0; i < data.length; i++) {
        let msg = "";
        if (data[i].status === 0) {
          msg = "支付成功";
        } else {
          msg = "支付失败";
        }
        let li = {
          numId: data[i].orderNumber,
          count: data[i].goodsDetail,
          getType: msg,
          name: data[i].businessName,
          tel: data[i].amount,
          secend: moment(data[i].createTime).format("YYYY-MM-DD HH:mm:ss"),
          id: data[i].id
        };
        newList.push(li);
      }
      this.list = newList;
    },
    removeId(data) {
      Message.confirm("确定删除?", "注意").then(({ result }) => {
        if (result) {
          this.$axios.post("/admin/delOrders", { ids: data.id }).then(data => {
            Message.alert("删除成功！");
            this.getList();
          });
        }
      });
    },
    setOption(data) {
      this.form.mealType = data;
      this.getList();
    }
  }
};
</script>

<style>
.content_box{
    padding: 20px;
}
</style>
