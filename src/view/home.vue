<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="2">
            <div class="grid-cell">
              <selectCom @optionChanged="setOption" :options="optionsList" :title="'角色名称'"></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索手机号'"></sherch>
            </div>
          </mu-col>
        </mu-row>
      </mu-paper>
      <list
        :columns="columns"
        :nowPage="getLists.page"
        :totalPage="totalPage"
        :listData="list"
        @openWin="openWin"
        @openChange="openChan"
        @removeId="removeId"
      ></list>
    </div>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openWindow">
      <mu-appbar color="primary" :title="windowContent.name">
        <mu-button slot="left" icon @click="openWindow = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">{{windowContent.content.value}}</div>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openChange">
      <mu-appbar color="primary" :title="windowChange.name">
        <mu-button slot="left" icon @click="openChange = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="changeUp()">完成修改</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">{{windowChange.content}}</div>
    </mu-dialog>
  </section>
</template>

<script>
import Message from 'muse-ui-message'
import leftTab from "../components/leftTab";
import list from "../components/list";
import selectCom from "../components/select";
import sherch from "../components/sherch";
export default {
  components: {
    leftTab,
    list,
    selectCom,
    sherch
  },
  data() {
    return {
      list: [
        { name: "test", tel: "12312312311", content: { value: "Test Object" } }
      ],
      openWindow: false,
      openChange: false,
      windowContent: {content:{value:''}},
      windowChange: {},
      totalPage: 0,
      getLists: {
        page: 1,
        roleId: 1,
        size: 20
      },
      optionsList: [],
      columns: [
        { title: "用户名", name: "name", align: "center" },
        { title: "手机号", name: "tel", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ]
    };
  },
  created: function() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    } else {
      this.getList();
      this.getUser();
    }
  },
  methods: {
    getList() {
      this.$axios
        .post("/admin/findUserByRole", {
          page: this.getLists.page,
          roleId: this.getLists.roleId,
          size: this.getLists.size
        })
        .then(data => {
          let list = data.data.content;
          let newList = [];
          this.columns = [
            { title: "用户名", name: "name", align: "center" },
            { title: "手机号", name: "tel", align: "center" },
            { title: "操作", name: "control", align: "center" }
          ];
          if (this.getLists.roleId === 2) {
            for (let i = 0; i < list.length; i++) {
              let li = {
                name: list[i].username,
                tel: list[i].tel,
                content: list[i].business,
                type: 2
              };
              newList.push(li);
            }
          } else if (this.getLists.roleId === 3) {
            for (let i = 0; i < list.length; i++) {
              let li = {
                name: list[i].username,
                tel: list[i].tel,
                content: list[i].company,
                type: 3
              };
              newList.push(li);
            }
          } else if (this.getLists.roleId === 5) {
            for (let i = 0; i < list.length; i++) {
              let li = {
                name: list[i].username,
                tel: list[i].tel,
                content: list[i].worker,
                type: 5
              };
              newList.push(li);
            }
          } else if (
            this.getLists.roleId === 1 ||
            this.getLists.roleId === 6 ||
            this.getLists.roleId === 9
          ) {
            for (let i = 0; i < list.length; i++) {
              let li = {
                name: list[i].username,
                tel: list[i].tel
              };
              newList.push(li);
            }
          } else {
            for (let i = 0; i < list.length; i++) {
              let li = {
                name: list[i].username,
                tel: list[i].tel,
                password: list[i].password
              };
              newList.push(li);
            }
            this.columns = [
              { title: "用户名", name: "name", align: "center" },
              { title: "手机号", name: "tel", align: "center" },
              { title: "密码", name: "password", align: "center" },
              { title: "操作", name: "control", align: "center", width: "500" }
            ];
          }
          this.list = newList;
          this.totalPage = data.data.totalPages;
        });
    },
    getUser() {
      this.$axios.post("/admin/findRoles", {}).then(data => {
        let list = data.data;
        this.setOptionList(list);
      });
    },
    setOptionList(list) {
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        let li = { title: list[i].name, val: list[i].id };
        newList.push(li);
      }
      this.optionsList = newList;
    },
    setOption(data) {
      this.getLists.roleId = data;
      this.getList();
    },
    changeUp() {},
    openWin(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    openChan(data) {
      this.windowChange = data;
      this.openChange = true;
    },
    removeId(data) {
      Message.confirm('确定删除?', '注意').then(({result}) => {
        if (result) {
          //
        }
      })
    }
  }
};
</script>

<style>
.right_list {
  position: absolute;
  right: 0;
  top: 0;
  width: calc(100vw - 200px);
  padding: 20px;
}
.top_box {
  padding: 15px;
  padding-bottom: 0;
  margin-bottom: 20px;
}
</style>
