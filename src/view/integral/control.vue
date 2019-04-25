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
                :title="'所属区域'"
                :selectVal="getLists.region"
              ></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索商品名称'" @serch="getList"></sherch>
            </div>
          </mu-col>
          <mu-col offset="2" span="1">
            <div class="grid-cell">
              <mu-button class="btn" small color="primary" @click="openChan({},true)">添加商品</mu-button>
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
        :showChangeBtn="true"
        :showstatusBtn="true"
        @changeStatus="statusId"
      ></list>
    </div>
    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      v-if="openWindow"
      :open.sync="openWindow"
    >
      <mu-appbar color="primary" :title="windowContent.name">
        <mu-button slot="left" icon @click="openWindow = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-row gutter>
          <mu-col span="6">
            <div class="grid-cell">
              <p>商品名称：{{windowContent.name}}</p>
              <p>所属区域：{{optionsList[Number(windowContent.content.region + 1)].title}}</p>
              <p
                v-if="windowContent.content.overTime !== 'Invalid date'"
              >限时截至时间：{{windowContent.content.overTime}}</p>
              <p v-if="windowContent.content.remainCount">商品限量：{{windowContent.content.remainCount}}</p>
              <p>商品规格：{{windowContent.tel}}</p>
              <p>商品积分：{{windowContent.content.integral}}</p>
              <p>商品排序：{{windowContent.content.sort}}</p>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <p>商品图片：</p>
              <img :src="windowContent.content.goodsPhoto" alt="商品图片">
            </div>
          </mu-col>
        </mu-row>
      </div>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openChange">
      <mu-appbar color="primary" :title="goodsAdd?'添加商品':'修改商品'">
        <mu-button slot="left" icon @click="openChange = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="changeUp()">完成{{goodsAdd?"添加":"修改"}}</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-row gutter>
          <mu-col span="6">
            <div class="grid-cell">
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>商品名称：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.name"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <selectCom
                style="width: 200px;"
                :options="optionsList"
                @optionChanged="changeType"
                :title="'所属区域'"
                :selectVal="changeFrom.region"
              ></selectCom>
              <div v-show="changeFrom.region === 3">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>商品限量：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.remainCount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>限时截至时间：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-paper :z-depth="1">
                      <mu-date-picker :date.sync="changeFrom.newOverTime"></mu-date-picker>
                    </mu-paper>
                  </mu-flex>
                </mu-flex>
              </div>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>商品规格：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.specifications"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>商品积分：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.integral"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>商品排序：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.sort"></mu-text-field>
                </mu-flex>
              </mu-flex>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <p>商品图片：</p>
              <img v-if="changeFrom.goodsPhoto" @click="upImg" :src="changeFrom.goodsPhoto" alt="商品图片">
              <mu-button v-if="!changeFrom.goodsPhoto" color="primary" @click="upImg">添加商品图片</mu-button>
            </div>
          </mu-col>
        </mu-row>
      </div>
    </mu-dialog>
  </section>
</template>

<script>
import Message from "muse-ui-message";
import selectCom from "@/components/select";
import sherch from "@/components/sherch";
import qs from "qs";
import moment from "moment";
export default {
  components: {
    selectCom,
    sherch
  },
  data() {
    return {
      changeFrom: { newOverTime: undefined },
      list: [
        { name: "test", tel: "12312312311", content: { value: "Test Object" } }
      ],
      goodsAdd: false,
      openWindow: false,
      openChange: false,
      windowContent: { content: { value: "" } },
      windowChange: {},
      totalPage: 0,
      getLists: {
        page: 1,
        region: 1,
        size: 20
      },
      optionsList: [
        { title: "积分兑换区", val: 1 },
        { title: "精品兑换区", val: 2 },
        { title: "限时限量兑换区", val: 3 }
      ],
      columns: [
        { title: "商品名称", name: "name", align: "center" },
        { title: "商品规格", name: "specifications", align: "center" },
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
    }
  },
  methods: {
    getList(sherchData) {
      this.$axios
        .post("/admin/integralGoodsList", {
          page: this.getLists.page,
          region: this.getLists.region,
          size: this.getLists.size,
          goodsName: sherchData
        })
        .then(data => {
          this.setList(data.data.content);
          this.totalPage = data.data.totalPages;
        });
    },
    setList(data) {
      let list = data;
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        let content = {
          goodsPhoto: list[i].goodsPhoto,
          region: list[i].region,
          overTime: moment(list[i].overTime).format("YYYY-MM-DD HH:mm:ss"),
          remainCount: list[i].remainCount,
          integral: list[i].integral,
          sort: list[i].sort
        };
        let li = {
          name: list[i].goodsName,
          tel: list[i].specifications,
          id: list[i].id,
          status: list[i].status,
          content: content
        };
        newList.push(li);
      }
      this.list = newList;
    },
    setOption(data) {
      this.getLists.region = data;
      this.getList();
    },
    changeUp() {
      this.$axios
        .post("/admin/addIntegralGoods", {
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
    },
    changeType(data) {
      this.changeFrom.region = data;
    },
    openWin(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    openChan(data, add) {
      if (!add) {
        this.goodsAdd = false;
        this.changeFrom = {
          name: data.name,
          id: data.id,
          specifications: data.tel,
          goodsPhoto: data.content.goodsPhoto,
          region: data.content.region,
          overTime: data.content.overTime,
          remainCount: data.content.remainCount,
          integral: data.content.integral,
          sort: data.content.sort
        };
      } else {
        this.changeFrom = {
          region: 1,
          goodsPhoto: ''
        };
        this.goodsAdd = true;
      }
      this.openChange = true;
    },
    roleIdAdd(data) {
      this.changeFrom.roleId = data;
    },
    statusId(data) {
      let msg = "";
      if (data.status === 0) {
        msg = "上架";
      } else {
        msg = "下架";
      }
      Message.confirm(`确定立即${msg}？`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/downIntegralGoods", { ids: data.id })
            .then(data => {
              Message.alert(`${msg}成功！`);
              this.getList();
            });
        }
      });
    },
    upImg() {
      const _this = this;
      let inputfile = document.createElement("input");
      inputfile.type = "file";
      inputfile.onchange = function(e) {
        let form = new FormData(); // FormData 对象
        form.append("file", e.target.files[0]); // 文件对象
        _this.$axios.filePost("/test/upload", form).then(data => {
          let url = `${_this.ServiceUrl}/upload/${data.data.data}`;
          _this.changeFrom.goodsPhoto = url;
        });
        document.body.removeChild(inputfile);
      };
      inputfile.style.display = "none";
      inputfile.accept = "image/png,image/jpeg,image/gif,image/jpg";
      document.body.appendChild(inputfile);
      inputfile.click();
    }
  }
};
</script>

<style>
</style>
