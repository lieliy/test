<template>
  <section>
    <mu-paper :z-depth="1">
      <mu-data-table :label-float="true" stripe :columns="columns" :data="listData">
        <template slot-scope="scope">
          <td class="is-center" v-if="order || orderList">{{scope.row.numId}}</td>
          <td class="is-center" v-if="order">{{scope.row.workerName}}</td>
          <td class="is-center" v-if="order">{{scope.row.goodsContent}}</td>
          <td class="is-center" v-if="order || orderList">{{scope.row.count}}</td>
          <td class="is-center" v-if="order">{{scope.row.allIntegral}}</td>
          <td class="is-center" v-if="order || orderList">{{scope.row.getType}}</td>
          <td class="is-center" v-if="scope.row.checked">{{scope.row.checked}}</td>
          <td class="is-center">{{scope.row.name}}</td>
          <td class="is-center">{{scope.row.tel}}</td>
          <td class="is-center" v-if="order || waterproof || settlement">{{scope.row.address}}</td>
          <td class="is-center" v-if="settlement">{{scope.row.totalAmount}}</td>
          <td class="is-center" v-if="order || waterproof || settlement">{{scope.row.createTime}}</td>
          <td v-if="scope.row.password" class="is-center">*********</td>
          <td class="is-center" v-if="secend">{{scope.row.secend}}</td>
          <td class="is-center" v-if="settlement">{{scope.row.checkStatus === 0 ? "未结算" : "已结算"}}</td>
          <td class="is-center">
            <mu-button
              v-if="scope.row.content"
              small
              color="primary"
              @click="openContent(scope.row)"
            >详情</mu-button>
            <mu-button
              v-if="showChangeBtn"
              small
              color="primary"
              @click="changeContent(scope.row)"
            >修改</mu-button>
            <mu-button
              v-if="showstatusBtn"
              small
              color="primary"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 0 ? "立即上架" : "立即下架"}}</mu-button>
            <mu-button v-if="showDoneBtn" small color="primary" @click="doSomething(scope.row)">完成</mu-button>
            <mu-button v-if="showDeleteBtn" small color="primary" @click="removeId(scope.row)">删除</mu-button>
            <mu-menu class="v_center" v-if="showChackBtn" cover>
              <mu-button small color="primary">审核</mu-button>
              <mu-list slot="content">
                <mu-list-item @click="checked(1,scope.row)" button>
                  <mu-list-item-title>通过</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="checked(0,scope.row)" button>
                  <mu-list-item-title>不通过</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
            <mu-button
              v-if="showSecendBtn"
              small
              color="primary"
              @click="secendCeck(scope.row)"
            >二次预约</mu-button>
            <mu-button
              v-if="settlement"
              small
              color="primary"
              @click="settlementUp(scope.row)"
            >结算</mu-button>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
    <mu-flex class="page_box" justify-content="end">
      <mu-pagination
        raised
        :total="totalPage"
        :page-size="20"
        :current.sync="page"
        @change="changePage"
        v-if="totalPage"
      ></mu-pagination>
    </mu-flex>
  </section>
</template>

<script>
export default {
  props: [
    "listData",
    "totalPage",
    "columns",
    "nowPage",
    "showChangeBtn",
    "showDeleteBtn",
    "showChackBtn",
    "order",
    "showDoneBtn",
    "showstatusBtn",
    "noDo",
    "secend",
    "orderList",
    "showSecendBtn",
    "waterproof",
    "settlement"
  ],
  data() {
    return {
      page: 1
    };
  },
  methods: {
    openContent(data) {
      this.$emit("openWin", data);
    },
    changeContent(data) {
      this.$emit("openChange", data);
    },
    removeId(data) {
      this.$emit("removeId", data);
    },
    checked(type, data) {
      this.$emit("checked", type, data);
    },
    doSomething(data) {
      this.$emit("doSomething", data);
    },
    changeStatus(data) {
      this.$emit("changeStatus", data);
    },
    changePage() {
      this.$emit("changePage", this.page);
    },
    secendCeck(data) {
      this.$emit("secendCeck", data);
    },
    settlementUp(data) {
      this.$emit("settlement", data)
    }
  },
  created: function() {
    if (this.nowPage) {
      this.page = this.nowPage;
    }
  },
  watch: {
    nowPage(data) {
      this.page = data;
    }
  }
};
</script>

<style>
.page_box {
  margin-top: 20px;
}
</style>
