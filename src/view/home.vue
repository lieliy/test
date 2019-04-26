<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="2">
            <div class="grid-cell">
              <selectCom
                @optionChanged="setOption"
                :options="optionsList"
                :title="'角色名称'"
                :selectVal="getLists.roleId"
              ></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索手机号'" @serch="onSerch"></sherch>
            </div>
          </mu-col>
          <mu-col offset="2" span="1">
            <div class="grid-cell">
              <mu-button class="btn" small color="primary" @click="openChan({},true)">添加用户</mu-button>
            </div>
          </mu-col>
        </mu-row>
      </mu-paper>
      <list
        :columns="columns"
        :nowPage="getLists.page"
        :totalPage="getLists.totalPage"
        :listData="list"
        @openWin="openWin"
        @openChange="openChan"
        @removeId="removeId"
        :showDeleteBtn="true"
        :showChangeBtn="true"
        @changePage="changePage"
      ></list>
    </div>
    <mu-dialog :padding="0" scrollable width="360" transition="slide-bottom" fullscreen :open.sync="openWindow">
      <mu-appbar color="primary" :title="windowContent.name">
        <mu-button slot="left" icon @click="openWindow = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="business_box" v-if="windowContent.type === 2">
          <mu-row gutter>
            <mu-col span="6">
              <div class="grid-cell">
                <p>商家名称：{{windowContent.content.businessName}}</p>
                <p>商家类别：{{businessType[windowContent.content.businessType].title}}</p>
                <p>联系电话：{{windowContent.content.tel}}</p>
                <p>商家详细地址：{{windowContent.content.address}}</p>
                <p>营业执照：</p>
                <img :src="windowContent.content.businessLicense" alt="营业执照">
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell">
                <p>身份证正面照片：</p>
                <img :src="windowContent.content.legalPositive" alt="身份证正面照片">
                <p>身份证反面照片：</p>
                <img :src="windowContent.content.legalNegative" alt="身份证反面照片">
              </div>
            </mu-col>
          </mu-row>
        </div>
        <div class="company_box" v-if="windowContent.type === 3">
          <mu-row gutter>
            <mu-col span="6">
              <div class="grid-cell">
                <p>公司名称：{{windowContent.content.companyName}}</p>
                <p>公司地址：{{windowContent.content.address}}</p>
                <p>法人：{{windowContent.content.legalPerson}}</p>
                <p>联系电话：{{windowContent.content.tel}}</p>
                <p>线管数量：{{windowContent.content.pipeCount}}</p>
                <p>累计销量：{{windowContent.content.salesCount}}</p>
                <p>已完成家数：{{windowContent.content.installCount}}</p>
                <p>营业执照：</p>
                <img :src="windowContent.content.businessLicense" alt="营业执照">
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell">
                <p>身份证正面照片：</p>
                <img :src="windowContent.content.legalPositive" alt="身份证正面照片">
                <p>身份证反面照片：</p>
                <img :src="windowContent.content.legalNegative" alt="身份证反面照片">
              </div>
            </mu-col>
          </mu-row>
        </div>
        <div class="worker_box" v-if="windowContent.type === 5">
          <mu-row gutter>
            <mu-col span="2" offset="5">
              <div class="grid-cell">
                <p>姓名：{{windowContent.content.workerName}}</p>
                <p>手机:{{windowContent.content.workerTel}}</p>
                <p>虚拟现金：{{windowContent.content.virtualCash}}</p>
                <p>累计销量：{{windowContent.content.salesCount}}</p>
                <p>累计安装家数：{{windowContent.content.installCount}}</p>
                <p>积分：{{windowContent.content.integral}}</p>
                <p>评分：{{windowContent.content.score}}</p>
              </div>
            </mu-col>
          </mu-row>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog width="360" scrollable :padding="0" transition="slide-bottom" fullscreen :open.sync="openChange">
      <mu-appbar color="primary" :title="userAdd?'添加用户':'修改用户'">
        <mu-button slot="left" icon @click="openChange = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="changeUp()">完成{{userAdd?"添加":"修改"}}</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="business_box" v-if="changeFrom.type === 2">
          <mu-row gutter>
            <mu-col span="6">
              <div class="grid-cell">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>商家名称：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userName"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <selectCom
                  style="width: 200px;"
                  :options="businessType"
                  @optionChanged="changeType"
                  :title="'商家类别'"
                  :selectVal="changeFrom.businessType"
                ></selectCom>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>负责人：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.manager"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>联系电话：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userTel"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>商家详细地址：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.address"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <p>营业执照：</p>
                <img
                  @click="upImg('businessLicense')"
                  ref="businessLicense"
                  :src="changeFrom.businessLicense"
                  alt="营业执照"
                >
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell">
                <p>身份证正面照片：</p>
                <img
                  @click="upImg('legalPositive')"
                  ref="legalPositive"
                  :src="changeFrom.legalPositive"
                  alt="身份证正面照片"
                >
                <p>身份证反面照片：</p>
                <img
                  @click="upImg('legalNegative')"
                  ref="legalNegative"
                  :src="changeFrom.legalNegative"
                  alt="身份证反面照片"
                >
              </div>
            </mu-col>
          </mu-row>
        </div>
        <div class="company_box" v-else-if="changeFrom.type === 3">
          <mu-row gutter>
            <mu-col span="6">
              <div class="grid-cell">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>公司名称：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userName"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>公司地址：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.address"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>法人：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.legalPerson"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>联系电话：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userTel"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>线管数量：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.pipeCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>累计销量：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.salesCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>已完成家数：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.installCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <p>营业执照：</p>
                <img
                  @click="upImg('businessLicense')"
                  ref="businessLicense"
                  :src="changeFrom.businessLicense"
                  alt="营业执照"
                >
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell">
                <p>身份证正面照片：</p>
                <img :src="changeFrom.legalPositive" alt="身份证正面照片">
                <p>身份证反面照片：</p>
                <img :src="changeFrom.legalNegative" alt="身份证反面照片">
              </div>
            </mu-col>
          </mu-row>
        </div>
        <div class="worker_box" v-else-if="changeFrom.type === 5">
          <mu-row gutter>
            <mu-col span="4" offset="5">
              <div class="grid-cell">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>姓名：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userName"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>手机</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.userTel"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>虚拟现金：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.virtualCash"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>累计销量：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.salesCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>累计安装家数：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.installCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>积分：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.integral"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>评分：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.score"></mu-text-field>
                  </mu-flex>
                </mu-flex>
              </div>
            </mu-col>
          </mu-row>
        </div>
        <div class="worker_box" v-else>
          <mu-row gutter>
            <mu-col span="3" offset="5">
              <div class="grid-cell">
                <selectCom
                  v-if="userAdd"
                  style="width: 256px;"
                  :options="[{title:'服务工程师',val:4},{title:'一般管理员',val:7},{title:'客服',val:8},{title:'试压员',val:9}]"
                  @optionChanged="roleIdAdd"
                  :title="'角色类别'"
                ></selectCom>
                <p>用户名：</p>
                <mu-text-field v-model="changeFrom.userName" label="请输入用户名" label-float></mu-text-field>
                <p>手机号:</p>
                <mu-text-field v-model="changeFrom.userTel" label="请输入手机号" label-float></mu-text-field>
                <div v-if="changeFrom.type !== 6 || userAdd">
                  <p>密码:</p>
                  <mu-text-field
                    v-model="changeFrom.userPassword"
                    type="password"
                    label="请输入新密码"
                    label-float
                  ></mu-text-field>
                </div>
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
import selectCom from "@/components/select";
import sherch from "@/components/sherch";
export default {
  components: {
    selectCom,
    sherch
  },
  data() {
    return {
      changeFrom: {},
      list: [
        { name: "test", tel: "12312312311", content: { value: "Test Object" } }
      ],
      userAdd: false,
      businessType: [
        { title: "快销品", val: 0 },
        { title: "地板", val: 1 },
        { title: "瓷砖", val: 2 },
        { title: "门窗", val: 3 },
        { title: "卫浴", val: 4 },
        { title: "灯饰", val: 5 },
        { title: "厨房设施", val: 6 },
        { title: "家居", val: 7 }
      ],
      openWindow: false,
      openChange: false,
      windowContent: { content: { value: "" } },
      windowChange: {},
      getLists: {
        page: 1,
        roleId: 1,
        totalPage: 0,
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
          this.setList(data.data.content);
          this.getLists.totalPage = data.data.totalElements;
        });
    },
    setList(data) {
      let list = data;
      let newList = [];
      this.columns = [
        { title: "用户名", name: "name", align: "center" },
        { title: "手机号", name: "tel", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ];
      if (this.getLists.roleId === 2) {
        if (!list.length) {
          let li = {
            name: list.username,
            tel: list.tel,
            id: list.id,
            content: list.business,
            type: 2
          };
          newList.push(li);
        } else {
          for (let i = 0; i < list.length; i++) {
            let li = {
              name: list[i].username,
              tel: list[i].tel,
              id: list[i].id,
              content: list[i].business,
              type: 2
            };
            newList.push(li);
          }
        }
      } else if (this.getLists.roleId === 3) {
        if (!list.length) {
          let li = {
            name: list.username,
            tel: list.tel,
            id: list.id,
            content: list.company,
            type: 3
          };
          newList.push(li);
        } else {
          for (let i = 0; i < list.length; i++) {
            let li = {
              name: list[i].username,
              tel: list[i].tel,
              id: list[i].id,
              content: list[i].company,
              type: 3
            };
            newList.push(li);
          }
        }
      } else if (this.getLists.roleId === 5) {
        if (!list.length) {
          let li = {
            name: list.username,
            tel: list.tel,
            id: list.id,
            content: list.worker,
            type: 5
          };
          newList.push(li);
        } else {
          for (let i = 0; i < list.length; i++) {
            let li = {
              name: list[i].username,
              tel: list[i].tel,
              id: list[i].id,
              content: list[i].worker,
              type: 5
            };
            newList.push(li);
          }
        }
      } else if (this.getLists.roleId === 6) {
        if (!list.length) {
          let li = {
            name: list.username,
            id: list.id,
            type: this.getLists.roleId,
            tel: list.tel
          };
          newList.push(li);
        } else {
          for (let i = 0; i < list.length; i++) {
            let li = {
              name: list[i].username,
              id: list[i].id,
              type: this.getLists.roleId,
              tel: list[i].tel
            };
            newList.push(li);
          }
        }
      } else {
        if (!list.length) {
          let li = {
            name: list.username,
            id: list.id,
            tel: list.tel,
            type: this.getLists.roleId,
            password: list.password
          };
          newList.push(li);
        } else {
          for (let i = 0; i < list.length; i++) {
            let li = {
              name: list[i].username,
              id: list[i].id,
              type: this.getLists.roleId,
              tel: list[i].tel,
              password: list[i].password
            };
            newList.push(li);
          }
        }
        this.columns = [
          { title: "用户名", name: "name", align: "center" },
          { title: "手机号", name: "tel", align: "center" },
          { title: "密码", name: "password", align: "center" },
          { title: "操作", name: "control", align: "center", width: "500" }
        ];
      }
      this.list = newList;
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
    changeUp() {
      if (this.userAdd) {
        this.$axios
          .post("/admin/register", {
            password: this.changeFrom.userPassword,
            tel: this.changeFrom.userTel,
            roleId: this.changeFrom.roleId,
            username: this.changeFrom.userName
          })
          .then(data => {
            Message.alert("添加成功");
            this.openChange = false;
            this.getList();
          });
      } else {
        if (this.changeFrom.type === 2) {
          this.$axios
            .post("/admin/modifyBusiness", {
              address: this.changeFrom.address,
              businessId: this.changeFrom.id,
              businessLicense: this.changeFrom.businessLicense,
              businessName: this.changeFrom.userName,
              businessType: this.changeFrom.businessType,
              legalNegative: this.changeFrom.legalNegative,
              legalPositive: this.changeFrom.legalPositive,
              manager: this.changeFrom.manager,
              tel: this.changeFrom.userTel
            })
            .then(data => {
              Message.alert("修改成功");
              this.openChange = false;
              this.getList();
            });
        } else if (this.changeFrom.type === 3) {
          this.$axios
            .post("/admin/modifyCompany", {
              address: this.changeFrom.address,
              companyId: this.changeFrom.id,
              businessLicense: this.changeFrom.businessLicense,
              companyName: this.changeFrom.userName,
              legalPerson: this.changeFrom.legalPerson,
              legalNegative: this.changeFrom.legalNegative,
              legalPositive: this.changeFrom.legalPositive,
              tel: this.changeFrom.userTel
            })
            .then(data => {
              Message.alert("修改成功");
              this.openChange = false;
              this.getList();
            });
        } else if (this.changeFrom.type === 5) {
          this.$axios
            .post("/admin/modifyWorker", {
              installCount: this.changeFrom.installCount,
              workerId: this.changeFrom.id,
              integral: this.changeFrom.integral,
              workerName: this.changeFrom.userName,
              salesCount: this.changeFrom.salesCount,
              score: this.changeFrom.score,
              virtualCash: this.changeFrom.virtualCash,
              workerTel: this.changeFrom.userTel
            })
            .then(data => {
              Message.alert("修改成功");
              this.openChange = false;
              this.getList();
            });
        } else {
          this.$axios
            .post("/admin/modifyOther", {
              password: this.changeFrom.userPassword,
              userId: this.changeFrom.id,
              username: this.changeFrom.userName,
              tel: this.changeFrom.userTel
            })
            .then(data => {
              Message.alert("修改成功");
              this.openChange = false;
              this.getList();
            });
        }
      }
    },
    changeType(data) {
      this.changeFrom.businessType = data;
    },
    openWin(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    openChan(data, add) {
      this.changeFrom = {};
      if (!add) {
        this.userAdd = false;
        if (data.type === 2) {
          this.changeFrom = {
            businessType: data.content.businessType,
            userName: data.content.businessName,
            manager: data.content.manager,
            userTel: data.content.tel,
            id: data.content.id,
            address: data.content.address,
            businessLicense: data.content.businessLicense,
            legalPositive: data.content.legalPositive,
            legalNegative: data.content.legalNegative,
            type: data.type
          };
        } else if (data.type === 3) {
          this.changeFrom = {
            legalPerson: data.content.legalPerson,
            userName: data.content.companyName,
            manager: data.content.manager,
            userTel: data.content.tel,
            id: data.content.id,
            address: data.content.address,
            pipeCount: data.content.pipeCount,
            salesCount: data.content.salesCount,
            installCount: data.content.installCount,
            businessLicense: data.content.businessLicense,
            legalPositive: data.content.legalPositive,
            legalNegative: data.content.legalNegative,
            type: data.type
          };
        } else if (data.type === 5) {
          this.changeFrom = {
            virtualCash: data.content.virtualCash,
            userName: data.content.workerName,
            salesCount: data.content.salesCount,
            userTel: data.content.workerTel,
            id: data.content.id,
            installCount: data.content.installCount,
            integral: data.content.integral,
            score: data.content.score,
            type: data.type
          };
        } else {
          this.changeFrom = {
            userName: data.name,
            userTel: data.tel,
            id: data.id,
            userPassword: data.password,
            type: data.type
          };
        }
      } else {
        this.userAdd = true;
      }
      this.openChange = true;
    },
    roleIdAdd(data) {
      this.changeFrom.roleId = data;
    },
    removeId(data) {
      Message.confirm("确定删除?", "注意").then(({ result }) => {
        if (result) {
          this.$axios.post("/admin/delUsers", { ids: data.id }).then(data => {
            Message.alert("删除成功！");
            this.getList();
          });
        }
      });
    },
    onSerch(data) {
      this.$axios.post("/admin/findUserByTel", { tel: data }).then(res => {
        this.getLists.roleId = res.data.roles[0].id;
        this.getLists.totalPage = 1;
        this.getLists.page = 1;
        this.setList(res.data);
      });
    },
    upImg(dom) {
      const _this = this;
      let inputfile = document.createElement("input");
      inputfile.type = "file";
      inputfile.onchange = function(e) {
        let form = new FormData(); // FormData 对象
        form.append("file", e.target.files[0]); // 文件对象
        _this.$axios.filePost("/test/upload", form).then(data => {
          let url = `${_this.ServiceUrl}/upload/${data.data.data}`;
          _this.$refs[dom].src = url;
          _this.changeFrom[dom] = url;
        });
        document.body.removeChild(inputfile);
      };
      inputfile.style.display = "none";
      inputfile.accept = "image/png,image/jpeg,image/gif,image/jpg";
      document.body.appendChild(inputfile);
      inputfile.click();
    },
    changePage(data) {
        this.getLists.page = data
        this.getList()
    }
  }
};
</script>

<style>
</style>
