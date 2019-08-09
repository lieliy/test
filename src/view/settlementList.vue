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
                :title="'结算状态'"
                :selectVal="getLists.checkStatus"
              ></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索名称'" @serch="onSerch"></sherch>
            </div>
          </mu-col>
          <mu-col offset="2" span="1">
            <div class="grid-cell">
              <mu-button class="btn" small color="primary" @click="openChan({},true)">添加名单</mu-button>
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
        @settlement="settlement"
        :showDeleteBtn="true"
        :showChangeBtn="true"
        :settlement="true"
        @changePage="changePage"
      ></list>
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
        <div class="business_box">
          <mu-row gutter>
            <mu-col span="6" offset="3">
              <div class="grid-cell">
                <p>名称：{{windowContent.name}}</p>
                <p>拿货金额：{{windowContent.tel}}</p>
                <p>退货金额：{{windowContent.address}}</p>
                <p>总计：{{windowContent.totalAmount}}</p>
                <p>时间：{{windowContent.createTime}}</p>
                <p>结算状态：{{windowContent.checkStatus === 0 ? "未结算" : "已结算"}}</p>
              </div>
            </mu-col>
            <mu-col span="12">
              <div class="grid-cell">
                <mu-row gutter>
                  <mu-col span="6">
                    <p>拿货照片：</p>
                    <mu-carousel
                      :hide-controls="windowContent.content.getPhoto.length > 0 ? false : true"
                      v-if="windowContent.content.getPhoto.length !== 0"
                    >
                      <mu-icon
                        v-if="windowContent.content.getPhoto.length > 1"
                        color="primary"
                        value="chevron_left"
                        slot="left"
                      ></mu-icon>
                      <mu-icon
                        v-if="windowContent.content.getPhoto.length > 1"
                        color="primary"
                        value="chevron_right"
                        slot="right"
                      ></mu-icon>
                      <template slot="indicator" slot-scope="{ index, active }">
                        <mu-button
                          icon
                          color="primary"
                          class="mu-carousel-indicator-button"
                          :class="{'mu-carousel-indicator-button__active': active}"
                        >
                          <span class="rect-indicator"></span>
                        </mu-button>
                      </template>
                      <mu-carousel-item
                        v-for="(item,index) in windowContent.content.getPhoto"
                        :key="index"
                      >
                        <div
                          @click="openBigImgWin(item)"
                          class="img"
                          :style="{'background-image':`url(${item}`}"
                        ></div>
                      </mu-carousel-item>
                    </mu-carousel>
                  </mu-col>
                  <mu-col span="6">
                    <p>退货照片：</p>
                    <mu-carousel
                      :hide-controls="windowContent.content.outPhoto.length > 0 ? false : true"
                      v-if="windowContent.content.outPhoto.length !== 0"
                    >
                      <mu-icon
                        v-if="windowContent.content.outPhoto.length > 1"
                        color="primary"
                        value="chevron_left"
                        slot="left"
                      ></mu-icon>
                      <mu-icon
                        v-if="windowContent.content.outPhoto.length > 1"
                        color="primary"
                        value="chevron_right"
                        slot="right"
                      ></mu-icon>
                      <template slot="indicator" slot-scope="{ index, active }">
                        <mu-button
                          icon
                          color="primary"
                          class="mu-carousel-indicator-button"
                          :class="{'mu-carousel-indicator-button__active': active}"
                        >
                          <span class="rect-indicator"></span>
                        </mu-button>
                      </template>
                      <mu-carousel-item
                        v-for="(item,index) in windowContent.content.outPhoto"
                        :key="index"
                      >
                        <div
                          @click="openBigImgWin(item)"
                          class="img"
                          :style="{'background-image':`url(${item}`}"
                        ></div>
                      </mu-carousel-item>
                    </mu-carousel>
                  </mu-col>
                </mu-row>
              </div>
            </mu-col>
          </mu-row>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog
      width="360"
      scrollable
      :padding="0"
      transition="slide-bottom"
      fullscreen
      :open.sync="openChange"
    >
      <mu-appbar color="primary" :title="userAdd?'添加名单':'修改名单'">
        <mu-button slot="left" icon @click="openChange = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="changeUp()">完成{{userAdd?"添加":"修改"}}</mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div class="worker_box">
          <mu-row gutter>
            <mu-col span="6" offset="3">
              <div class="grid-cell">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>名称：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.name"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>拿货金额：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.getAmount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>退货金额：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.outAmount"></mu-text-field>
                  </mu-flex>
                </mu-flex>
              </div>
            </mu-col>
            <mu-col span="12">
              <div class="grid-cell">
                <mu-row gutter>
                  <mu-col span="6">
                    <p>拿货照片：</p>
                    <mu-carousel
                      :hide-controls="changeFrom.getPhoto.length > 1 ? false : true"
                      v-if="changeFrom.getPhoto.length !== 0"
                      :active="activeImg0"
                      :cycle="false"
                      @change="changeImg0"
                    >
                      <mu-icon
                        v-if="changeFrom.getPhoto.length > 1"
                        color="primary"
                        value="chevron_left"
                        slot="left"
                      ></mu-icon>
                      <mu-icon
                        v-if="changeFrom.getPhoto.length > 1"
                        color="primary"
                        value="chevron_right"
                        slot="right"
                      ></mu-icon>
                      <template slot="indicator" slot-scope="{ index, active }">
                        <mu-button
                          icon
                          color="primary"
                          class="mu-carousel-indicator-button"
                          :class="{'mu-carousel-indicator-button__active': active}"
                        >
                          <span class="rect-indicator"></span>
                        </mu-button>
                      </template>
                      <mu-carousel-item v-for="(item,index) in changeFrom.getPhoto" :key="index">
                        <mu-icon @click="deleteImg('getPhoto')" class="img_close_btn" value="close"></mu-icon>
                        <div
                          @click="openBigImgWin(item)"
                          class="img"
                          :style="{'background-image':`url(${item}`}"
                        ></div>
                      </mu-carousel-item>
                    </mu-carousel>
                    <mu-flex class="flex-wrapper" justify-content="center">
                      <mu-flex class="flex-demo" justify-content="center">
                        <mu-button class="addBtn" color="primary" @click="upImg('getPhoto')">添加图片</mu-button>
                      </mu-flex>
                    </mu-flex>
                  </mu-col>
                  <mu-col span="6">
                    <p>退货照片：</p>
                    <mu-carousel
                      :hide-controls="changeFrom.outPhoto.length > 1 ? false : true"
                      v-if="changeFrom.outPhoto.length !== 0"
                      :active="activeImg1"
                      :cycle="false"
                      @change="changeImg1"
                    >
                      <mu-icon
                        v-if="changeFrom.outPhoto.length > 1"
                        color="primary"
                        value="chevron_left"
                        slot="left"
                      ></mu-icon>
                      <mu-icon
                        v-if="changeFrom.outPhoto.length > 1"
                        color="primary"
                        value="chevron_right"
                        slot="right"
                      ></mu-icon>
                      <template slot="indicator" slot-scope="{ index, active }">
                        <mu-button
                          icon
                          color="primary"
                          class="mu-carousel-indicator-button"
                          :class="{'mu-carousel-indicator-button__active': active}"
                        >
                          <span class="rect-indicator"></span>
                        </mu-button>
                      </template>
                      <mu-carousel-item v-for="(item,index) in changeFrom.outPhoto" :key="index">
                        <mu-icon @click="deleteImg('outPhoto')" class="img_close_btn" value="close"></mu-icon>
                        <div
                          @click="openBigImgWin(item)"
                          class="img"
                          :style="{'background-image':`url(${item}`}"
                        ></div>
                      </mu-carousel-item>
                    </mu-carousel>
                    <mu-flex class="flex-wrapper" justify-content="center">
                      <mu-flex class="flex-demo" justify-content="center">
                        <mu-button class="addBtn" color="primary" @click="upImg('outPhoto')">添加图片</mu-button>
                      </mu-flex>
                    </mu-flex>
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
        <img class="bigImg" :src="bigImg" alt />
      </div>
    </mu-dialog>
  </section>
</template>

<script>
import Message from "muse-ui-message";
import selectCom from "@/components/select";
import sherch from "@/components/sherch";
import Loading from "muse-ui-loading";
export default {
  components: {
    selectCom,
    sherch
  },
  data() {
    return {
      changeFrom: {
        outPhoto: [],
        getPhoto: []
      },
      activeImg0: 0,
      activeImg1: 0,
      list: [],
      userAdd: false,
      bigImg: "",
      openWindow: false,
      openChange: false,
      openBigImg: false,
      windowContent: { content: { getPhoto: [], outPhoto: [] } },
      getLists: {
        page: 1,
        checkStatus: "",
        totalPage: 0,
        size: 20
      },
      optionsList: [
        { title: "全部", val: "" },
        { title: "未结算", val: 0 },
        { title: "已结算", val: 1 }
      ],
      columns: []
    };
  },
  created: function() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/admin/unsettledManList", {
          page: this.getLists.page,
          checkStatus: this.getLists.checkStatus,
          size: this.getLists.size,
          keyword: this.getLists.keyword
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
        { title: "名称", name: "name", align: "center" },
        { title: "拿货金额", name: "tel", align: "center" },
        { title: "退货金额", name: "address", align: "center" },
        { title: "总计", name: "totalAmount", align: "center" },
        { title: "时间", name: "createTime", align: "center" },
        { title: "结算状态", name: "secend", align: "center" },
        { title: "操作", name: "checkStatus", align: "center", width: "500" }
      ];
      if (list.length) {
        for (let i = 0; i < list.length; i++) {
          let content = {
            getPhoto: this.imgData(list[i].getPhoto),
            outPhoto: this.imgData(list[i].outPhoto)
          };
          let li = {
            name: list[i].name,
            tel: list[i].getAmount,
            address: list[i].outAmount,
            totalAmount: list[i].totalAmount,
            createTime: list[i].createTime,
            checkStatus: list[i].checkStatus,
            id: list[i].id,
            content: content
          };
          newList.push(li);
        }
      }
      this.list = newList;
    },
    setOption(data) {
      this.getLists.checkStatus = data;
      this.getList();
    },
    changeUp() {
      let msg = "添加成功!";
      if (!this.userAdd) {
        msg = "修改成功!";
      }
      if (this.changeFrom.getPhoto) {
        this.changeFrom.getPhoto = this.changeFrom.getPhoto.join(",");
      }
      if (this.changeFrom.outPhoto) {
        this.changeFrom.outPhoto = this.changeFrom.outPhoto.join(",");
      }
      this.$axios.post("/admin/addUnsettledMan", this.changeFrom).then(data => {
        Message.alert(msg);
        this.openChange = false;
        this.getList();
      });
    },
    openWin(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    imgData(data) {
      if (data) {
        if (data.indexOf(",") === -1) {
          return [data];
        } else {
          return data.split(",");
        }
      } else {
        return [];
      }
    },
    openChan(data, add) {
      this.changeFrom = {
        getPhoto: [],
        outPhoto: []
      };
      if (!add) {
        this.userAdd = false;
        this.changeFrom = {
          name: data.name,
          getAmount: data.tel,
          outAmount: data.address,
          checkStatus: data.checkStatus,
          getPhoto: data.content.getPhoto,
          outPhoto: data.content.outPhoto,
          id: data.id
        };
      } else {
        this.userAdd = true;
      }
      this.openChange = true;
    },
    removeId(data) {
      Message.confirm("确定删除?", "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/deleteUnsettledMan", { id: data.id })
            .then(data => {
              Message.alert("删除成功！");
              this.getList();
            });
        }
      });
    },
    onSerch(data) {
      this.getLists.keyword = data;
      this.getList();
    },
    upImg(id) {
      let domId = undefined;
      switch (id) {
        case "getPhoto":
          domId = this.changeFrom.getPhoto;
          break;
        case "outPhoto":
          domId = this.changeFrom.outPhoto;
          break;
      }
      const _this = this;
      let inputfile = document.createElement("input");
      inputfile.type = "file";
      inputfile.onchange = function(e) {
        let form = new FormData(); // FormData 对象
        form.append("file", e.target.files[0]); // 文件对象
        _this.$axios.filePost("/test/upload", form).then(data => {
          let url = `${_this.ServiceUrl}/upload/${data.data.data}`;
          // _this.changeFrom.goodsPhoto = url;
          domId.push(url);
        });
        document.body.removeChild(inputfile);
      };
      inputfile.style.display = "none";
      inputfile.accept = "image/png,image/jpeg,image/gif,image/jpg";
      document.body.appendChild(inputfile);
      inputfile.click();
    },
    deleteImg(id, index) {
      let domId = undefined;
      switch (id) {
        case "getPhoto":
          domId = this.changeFrom.getPhoto;
          break;
        case "outPhoto":
          domId = this.changeFrom.outPhoto;
          break;
      }
      Message.confirm(`确定删除此图片？`, "注意").then(({ result }) => {
        if (result) {
          domId.splice(index, 1);
          this.activeImg0 = 0;
          this.activeImg1 = 0;
        }
      });
    },
    changeImg0(index) {
      this.activeImg0 = index;
    },
    changeImg1(index) {
      this.activeImg1 = index;
    },
    changePage(data) {
      this.getLists.page = data;
      this.getList();
    },
    openBigImgWin(url) {
      this.openBigImg = true;
      this.bigImg = url;
    },
    settlement(data) {
      //结算
      Message.confirm(`确定结算？`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/checkUnsettledMan", {
              id: data.id
            })
            .then(res => {
              Message.alert("结算成功！");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
