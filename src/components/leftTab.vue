<template>
  <section>
    <mu-drawer class="box" :open.sync="open" :docked="docked" :z-depth="1" width="230">
      <div class="user_box">
        <p class="name">{{userName}}</p>
        <mu-button flat class="out" color="#fff" @click="sinOut()">退出</mu-button>
      </div>
      <mu-list class="leftList" toggle-nested>
        <!-- <mu-list-item v-for="(item,index) in titleList" :key="index" button>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
        </mu-list-item>-->
        <mu-list-item
          v-for="(item,index) in titleList"
          :key="index"
          button
          nested
          :open="openTab === item.urlName"
          :active-class="'action'"
          @toggle-nested="openTab = arguments[0] ? item.urlName : ''"
          :to="item.url"
        >
          <mu-list-item-action>
            <mu-icon color="#fff" :value="item.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
          <mu-list-item-action v-if="item.smallList">
            <mu-icon
              color="#fff"
              class="toggle-icon"
              size="24"
              :value="openTab === item.urlName?'keyboard_arrow_up':'keyboard_arrow_down'"
            ></mu-icon>
          </mu-list-item-action>
          <mu-list-item
            v-for="(x,y) in item.smallList"
            :key="y"
            button
            :active-class="'action'"
            :to="x.url"
            slot="nested"
          >
            <mu-list-item-title>{{x.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </section>
</template>

<script>
import Message from "muse-ui-message";

export default {
  data() {
    return {
      open: true,
      docked: true,
      openTab: "",
      userName: "",
      titleList: [
        { name: "用户管理", url: "/home", icon: "person", urlName: "home" },
        {
          name: "个人认证",
          icon: "person_outline",
          urlName: "check",
          smallList: [
            { name: "水工认证", url: "/check/user" },
            {
              name: "装修公司认证",
              url: "/check/company"
            }
          ]
        },
        {
          name: "商家认证",
          url: "/check/business",
          icon: "work",
          urlName: "checkBusiness"
        },
        {
          name: "积分商城",
          url: "",
          icon: "shopping_basket",
          urlName: "integral",
          smallList: [
            { name: "积分兑换订单", url: "/integral/order" },
            { name: "积分商品管理", url: "/integral/control" }
          ]
        },
        {
          name: "订单管理",
          url: "/orderList",
          urlName: "orderList",
          icon: "list"
        },
        {
          name: "预约卡号记录",
          url: "/orderCard",
          urlName: "orderCard",
          icon: "book"
        },
        {
          name: "预约管理",
          url: "/cardsList",
          urlName: "cardsList",
          icon: "local_phone"
        },
        {
          name: "质保卡管理",
          url: "/cards",
          urlName: "Cards",
          icon: "assignment"
        }
      ]
    };
  },
  methods: {
    sinOut() {
      Message.confirm("确定退出登录?").then(({ result }) => {
        if (result) {
          localStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    }
  },
  created: function() {
    this.userName = localStorage.getItem("userName");
    this.openTab = this.$route.name;
  }
};
</script>

<style>
.user_box {
  padding: 0 20px;
  float: left;
  width: 100%;
  border-bottom: 1px #ddd solid;
}
.user_box .name {
  float: left;
}
.user_box .out {
  margin: 8px 0;
  float: right;
}
.leftList .action,
.mu-item-wrapper.hover {
  background: rgba(245, 245, 245, 0.5);
  color: rgb(40, 44, 47);
}
.leftList .action .mu-item {
  /* color: rgb(40, 44, 47); */
}
.box {
  background: rgb(40, 44, 47);
  color: #fff;
}
.leftList .mu-item {
  color: #fff;
}
</style>
