<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索质保卡号'" @serch="onSerch"></sherch>
            </div>
          </mu-col>
        </mu-row>
      </mu-paper>
      <list
        :columns="columns"
        :nowPage="form.page"
        :totalPage="form.totalPage"
        :listData="list"
        @openWin="openWin"
        @changePage="changePage"
        :orderList="true"
        :showSecendBtn="true"
        @secendCeck="secendCeck"
      ></list>
      <mu-dialog
        scrollable
        width="360"
        transition="slide-bottom"
        fullscreen
        :open.sync="openWindow"
        :padding="0"
      >
        <mu-appbar color="primary" :title="windowContent.getType">
          <mu-button slot="left" icon @click="openWindow = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <mu-tabs
            :value.sync="form.contentType"
            inverse
            color="primary"
            text-color="rgba(0, 0, 0, .54)"
            indicator-color="primary"
            center
          >
            <mu-tab>基本信息</mu-tab>
            <mu-tab>试压信息</mu-tab>
            <mu-tab>质保单</mu-tab>
            <mu-tab>第二次试压照片</mu-tab>
          </mu-tabs>
          <div class="content_box" v-if="form.contentType === 0">
            <mu-row gutter>
              <mu-col span="4">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>单据编号：{{windowContent.billNumber}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>制单日期：{{windowContent.makeBillDate}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>质保卡号：{{windowContent.promiseCard}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>单据状态：{{windowContent.billStatus}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>所属区域：{{windowContent.area}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>试压地址：{{windowContent.pressureAddress}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>预约试压时间：{{windowContent.orderPressureTime}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>期望时间：{{windowContent.expectTime}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>
                    现场是否张贴温馨提示和阀门贴：
                    <span
                      v-if="windowContent.ifPostTips !== null"
                    >{{windowContent.ifPostTips === 0 ? "否" : "是"}}</span>
                  </p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>
                    是否发送短信：
                    <span
                      v-if="windowContent.ifSendMsg !== null"
                    >{{windowContent.ifSendMsg === 0 ? "否" : "是"}}</span>
                  </p>
                </mu-flex>
              </mu-col>
              <mu-col span="4">
                <div class="grid-cell">
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>业主姓名：{{windowContent.ownerName}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>业主电话：{{windowContent.ownerTel}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>现场联系人：{{windowContent.localeContacts}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>联系人类型：{{windowContent.contactsType}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>联系人电话：{{windowContent.contactsTel}}</p>
                  </mu-flex>
                </div>
              </mu-col>
              <mu-col span="4">
                <div class="grid-cell">
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>水工姓名：{{windowContent.workerName}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>水工电话：{{windowContent.workerTel}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>TDS值（水质）：{{windowContent.TDS}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>水工积分：{{windowContent.workerIntegral}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>承包方式：{{windowContent.includeType}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>装修公司名称：{{windowContent.companyName}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>水管类型：{{windowContent.pipeType}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>管道走向：{{windowContent.pipeTrend === 1 ? "走地" : "走顶"}}</p>
                  </mu-flex>
                </div>
              </mu-col>
            </mu-row>
          </div>
          <div class="content_box" v-if="form.contentType === 1">
            <mu-row>
              <mu-col span="4" offset="5">
                <div class="grid-cell">
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>试压员姓名：{{windowContent.pressureName}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>试压员电话：{{windowContent.pressureTel}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>试压时间：{{windowContent.pressureTime}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>试压压力：{{windowContent.pressure}} Mpa</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>产品真伪：{{windowContent.ifTrue === 0 ? "否" : "是"}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>是否上传图片：{{windowContent.ifUploadPhoto === 0 ? "否" : "是"}}</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>保压时间：{{windowContent.keepPressureTime}} Min</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>房屋类型：{{windowContent.houseType === 0 ? "一厨一卫" : "两卫一厨"}}</p>
                  </mu-flex>
                </div>
              </mu-col>
            </mu-row>
          </div>
          <div class="content_box" v-if="form.contentType === 2">
            <mu-row>
              <mu-col span="6" offset="3">
                <div class="grid-cell">
                  <p>第一次细节照片：</p>
                  <mu-carousel
                    :hide-controls="windowContent.detailPhoto1.length > 1 ? false : true"
                    v-if="windowContent.detailPhoto1.length !== 0"
                  >
                    <mu-icon
                      v-if="windowContent.detailPhoto1.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="windowContent.detailPhoto1.length > 1"
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
                      v-for="(item,index) in windowContent.detailPhoto1"
                      :key="index"
                    >
                      <!-- <img :src="item"> -->
                      <div
                        @click="openBigImgWin(item)"
                        class="img"
                        :style="{'background-image':`url(${item}`}"
                      ></div>
                    </mu-carousel-item>
                  </mu-carousel>
                  <p v-else>暂无图片</p>
                  <p>第一次压力照片：</p>
                  <mu-carousel
                    :hide-controls="windowContent.pressurePhoto1.length > 1 ? false : true"
                    v-if="windowContent.pressurePhoto1.length !== 0"
                  >
                    <mu-icon
                      v-if="windowContent.pressurePhoto1.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="windowContent.pressurePhoto1.length > 1"
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
                      v-for="(item,index) in windowContent.pressurePhoto1"
                      :key="index"
                    >
                      <!-- <img :src="item"> -->
                      <div
                        @click="openBigImgWin(item)"
                        class="img"
                        :style="{'background-image':`url(${item}`}"
                      ></div>
                    </mu-carousel-item>
                  </mu-carousel>
                  <p v-else>暂无图片</p>
                  <p>质保单照片：</p>
                  <mu-carousel
                    :hide-controls="windowContent.warrantyPhoto.length > 1 ? false : true"
                    v-if="windowContent.warrantyPhoto.length !== 0"
                  >
                    <mu-icon
                      v-if="windowContent.warrantyPhoto.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="windowContent.warrantyPhoto.length > 1"
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
                      v-for="(item,index) in windowContent.warrantyPhoto"
                      :key="index"
                    >
                      <!-- <img :src="item"> -->
                      <div
                        @click="openBigImgWin(item)"
                        class="img"
                        :style="{'background-image':`url(${item}`}"
                      ></div>
                    </mu-carousel-item>
                  </mu-carousel>
                  <p v-else>暂无图片</p>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>业主评价（1星-5星）：{{windowContent.evaluate}}星</p>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <p>业主评价内容：{{windowContent.evaluateContent}}</p>
                  </mu-flex>
                </div>
              </mu-col>
            </mu-row>
          </div>
          <div class="content_box" v-if="form.contentType === 3">
            <mu-row>
              <mu-col span="6" offset="3">
                <p>第二次细节照片：</p>
                <mu-carousel
                  :hide-controls="windowContent.detailPhoto2.length > 1 ? false : true"
                  v-if="windowContent.detailPhoto2.length !== 0"
                >
                  <mu-icon
                    v-if="windowContent.detailPhoto2.length > 1"
                    color="primary"
                    value="chevron_left"
                    slot="left"
                  ></mu-icon>
                  <mu-icon
                    v-if="windowContent.detailPhoto2.length > 1"
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
                  <mu-carousel-item v-for="(item,index) in windowContent.detailPhoto2" :key="index">
                    <!-- <img :src="item"> -->
                    <div
                      @click="openBigImgWin(item)"
                      class="img"
                      :style="{'background-image':`url(${item}`}"
                    ></div>
                  </mu-carousel-item>
                </mu-carousel>
                <p v-else>暂无图片</p>
                <p>第二次压力照片：</p>
                <mu-carousel
                  :hide-controls="windowContent.pressurePhoto2.length > 1 ? false : true"
                  v-if="windowContent.pressurePhoto2.length !== 0"
                >
                  <mu-icon
                    v-if="windowContent.pressurePhoto2.length > 1"
                    color="primary"
                    value="chevron_left"
                    slot="left"
                  ></mu-icon>
                  <mu-icon
                    v-if="windowContent.pressurePhoto2.length > 1"
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
                    v-for="(item,index) in windowContent.pressurePhoto2"
                    :key="index"
                  >
                    <!-- <img :src="item"> -->
                    <div
                      @click="openBigImgWin(item)"
                      class="img"
                      :style="{'background-image':`url(${item}`}"
                    ></div>
                  </mu-carousel-item>
                </mu-carousel>
                <p v-else>暂无图片</p>
              </mu-col>
            </mu-row>
          </div>
        </div>
      </mu-dialog>
      <mu-dialog
        :overlay-close="false"
        :esc-press-close="false"
        transition="slide-bottom"
        :open.sync="openBigImg"
      >
        <mu-icon value="close" @click="closeBigImg"></mu-icon>
        <div ref="rotateImg_box" style="padding: 24px; position: relative;">
          <img
            ref="rotate_img"
            :style="{transform:'rotateZ('+deg+'deg)'}"
            class="bigImg"
            :src="bigImg"
            alt
          >
          <mu-icon @click="rotateImg" class="rotate_left" size="40" value="rotate_right"></mu-icon>
        </div>
      </mu-dialog>
    </div>
  </section>
</template>

<script>
import sherch from "@/components/sherch";
import Message from "muse-ui-message";
export default {
  components: {
    sherch
  },
  data() {
    return {
      form: {
        page: 1,
        totalPage: 1,
        sherch: "",
        size: 20,
        contentType: 0
      },
      deg: 0,
      openBigImg: false,
      bigImg: "",
      list: [],
      openWindow: false,
      columns: [
        { title: "质保卡号", name: "num", align: "center" },
        { title: "试压地址", name: "add", align: "center" },
        { title: "业主姓名", name: "name", align: "center" },
        { title: "业主电话", name: "tel", align: "center" },
        { title: "预约试压时间", name: "time", align: "center" },
        { title: "操作", name: "control", align: "center" }
      ],
      windowContent: {
        detailPhoto1: [],
        pressurePhoto1: [],
        warrantyPhoto: [],
        detailPhoto2: [],
        pressurePhoto2: []
      }
    };
  },
  created: function() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/admin/promiseCards", {
          page: this.form.page,
          promiseCard: this.form.sherch,
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
        let billStatus = "";
        let contactsType = "";
        let includeType = "";
        let pipeType = "";
        let detailPhoto1 = this.imgData(data[i].detailPhoto1);
        let pressurePhoto1 = this.imgData(data[i].pressurePhoto1);
        let warrantyPhoto = this.imgData(data[i].warrantyPhoto);
        let detailPhoto2 = this.imgData(data[i].detailPhoto2);
        let pressurePhoto2 = this.imgData(data[i].pressurePhoto2);
        switch (data[i].billStatus) {
          case 1:
            billStatus = "第一次预约";
            break;
          case 2:
            billStatus = "第一次预约";
            break;
          case 3:
            billStatus = "第一次上传";
            break;
          case 4:
            billStatus = "第一次审核通过";
            break;
          case 5:
            billStatus = "第二次预约";
            break;
          case 6:
            billStatus = "第二次预约";
            break;
          case 7:
            billStatus = "第二次上传";
            break;
          case 8:
            billStatus = "第二次审核通过";
            break;
        }
        switch (data[i].contactsType) {
          case 1:
            contactsType = "业主";
            break;
          case 2:
            contactsType = "装修公司";
            break;
          case 3:
            contactsType = "水工";
            break;
          case 4:
            contactsType = "家属";
            break;
        }
        switch (data[i].includeType) {
          case 1:
            includeType = "水工";
            break;
          case 2:
            includeType = "装修公司";
            break;
          case 3:
            includeType = "木工";
            break;
          case 4:
            includeType = "业主自购";
            break;
        }
        switch (data[i].pipeType) {
          case 1:
            pipeType = "精品管";
            break;
          case 2:
            pipeType = "瓷心管";
            break;
          case 3:
            pipeType = "铜管";
            break;
        }
        let li = {
          numId: data[i].promiseCard,
          count: data[i].pressureAddress,
          getType: data[i].ownerName,
          name: data[i].ownerTel,
          id: data[i].id,
          tel: data[i].orderPressureTime,
          content: true,
          billNumber: data[i].billNumber,
          makeBillDate: data[i].makeBillDate,
          promiseCard: data[i].promiseCard,
          billStatus: billStatus,
          pressureAddress: data[i].pressureAddress,
          ownerName: data[i].ownerName,
          area: data[i].area,
          ownerTel: data[i].ownerTel,
          localeContacts: data[i].localeContacts,
          contactsType: contactsType,
          contactsTel: data[i].contactsTel,
          workerName: data[i].workerName,
          workerTel: data[i].workerTel,
          TDS: data[i].tds,
          workerIntegral: data[i].workerIntegral,
          orderPressureTime: data[i].orderPressureTime,
          expectTime: data[i].expectTime,
          ifPostTips: data[i].ifPostTips,
          includeType: includeType,
          companyName: data[i].companyName,
          pipeType: pipeType,
          pipeTrend: data[i].pipeTrend,
          ifSendMsg: data[i].ifSendMsg,
          pressureName: data[i].pressureName,
          pressureTel: data[i].pressureTel,
          pressureTime: data[i].pressureTime,
          pressure: data[i].pressure,
          ifTrue: data[i].ifTrue,
          ifUploadPhoto: data[i].ifUploadPhoto,
          keepPressureTime: data[i].keepPressureTime,
          houseType: data[i].houseType,
          detailPhoto1: detailPhoto1,
          pressurePhoto1: pressurePhoto1,
          warrantyPhoto: warrantyPhoto,
          evaluate: data[i].evaluate,
          evaluateContent: data[i].evaluateContent,
          detailPhoto2: detailPhoto2,
          pressurePhoto2: pressurePhoto2
        };
        newList.push(li);
      }
      this.list = newList;
    },
    openWin(data) {
      this.form.contentType = 0;
      this.windowContent = data;
      this.openWindow = true;
    },
    changePage(data) {
      this.form.page = data;
      this.getList();
    },
    onSerch(data) {
      this.form.page = 1;
      this.form.sherch = data;
      this.getList();
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
    openBigImgWin(url) {
      this.openBigImg = true;
      this.bigImg = url;
    },
    rotateImg() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
      let dom = this.$refs.rotate_img;
      let deg = this.deg;
      let box = this.$refs.rotateImg_box;
      // let box_h = box.offsetHeight - 92;
      if (deg === 90 || deg === 270) {
        box.style.height = Number(dom.offsetWidth + 68) + "px";
        box.style.width = Number(dom.offsetHeight + 68) + "px";
        if (dom.offsetWidth >= dom.offsetHeight) {
          if (dom.offsetHeight >= 400) {
            dom.style.marginLeft = -92 + "px";
            dom.style.marginTop = 92 + "px";
          } else {
            dom.style.marginLeft = -Number(dom.offsetHeight / 2 + 24) + "px";
            dom.style.marginTop = Number(dom.offsetHeight / 2 + 24) + "px";
          }
        } else {
          if (dom.offsetWidth >= 400) {
            dom.style.marginLeft = 92 + "px";
            dom.style.marginTop = -92 + "px";
          } else {
            dom.style.marginLeft = Number(dom.offsetWidth / 2 + 24) + "px";
            dom.style.marginTop = -Number(dom.offsetWidth / 2 + 24) + "px";
          }
        }
      } else {
        box.style.height = Number(dom.offsetHeight + 68) + "px";
        box.style.width = Number(dom.offsetWidth + 68) + "px";
        dom.style.marginTop = 0 + "px";
        dom.style.marginLeft = 0 + "px";
      }
      // console.log(dom.offsetWidth);
      // console.log(dom.offsetHeight);
    },
    closeBigImg() {
      this.openBigImg = false;
      this.deg = 0;
    },
    secendCeck(data) {
      Message.confirm(`确定二次预约?`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/owner/secondOrderService", { serviceInfoId: data.id })
            .then(res => {
              Message.alert("二次预约成功！");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style>
.content_box {
  padding: 20px;
}
.mu-carousel-indicator-button {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #2196f3;
  opacity: 0.3;
}
.mu-carousel-indicator-button__active {
  opacity: 1;
}
</style>
