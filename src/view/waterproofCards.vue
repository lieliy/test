<template>
  <section>
    <leftTab class="left_tab"></leftTab>
    <div class="right_list">
      <mu-paper class="top_box" :z-depth="1">
        <mu-row gutter>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索手机号或姓名'" @serch="onSerch"></sherch>
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
        :showChangeBtn="true"
        @openChange="openChange"
        :showDeleteBtn="true"
        @removeId="deleteList"
        :waterproof="true"
      ></list>
      <mu-dialog
        scrollable
        width="360"
        transition="slide-bottom"
        fullscreen
        :open.sync="openWindow"
        :padding="0"
      >
        <mu-appbar color="primary" title="详情">
          <mu-button slot="left" icon @click="openWindow = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <div class="content_box">
            <mu-row gutter>
              <mu-col span="4">
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>业主姓名：{{windowContent.name}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>业主电话：{{windowContent.tel}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>所属区域：{{windowContent.addressArea}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>服务地址：{{windowContent.address}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>施工区域：{{windowContent.area | userArea}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>服务工程师姓名：{{windowContent.waiterName}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>服务工程师电话：{{windowContent.waiterTel}}</p>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <p>服务时间：{{windowContent.createTime}}</p>
                </mu-flex>
              </mu-col>
              <mu-col span="4">
                <div class="img_box">
                  <p>细节照片:</p>
                  <mu-carousel
                    :hide-controls="windowContent.detailPhoto.length > 1 ? false : true"
                    v-if="windowContent.detailPhoto.length !== 0"
                  >
                    <mu-icon
                      v-if="windowContent.detailPhoto.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="windowContent.detailPhoto.length > 1"
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
                      v-for="(item,index) in windowContent.detailPhoto"
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
                </div>
              </mu-col>
              <mu-col span="4">
                <div class="img_box">
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
                </div>
              </mu-col>
            </mu-row>
          </div>
        </div>
      </mu-dialog>
      <mu-dialog
        scrollable
        width="360"
        transition="slide-bottom"
        fullscreen
        :open.sync="openChangeWin"
        :padding="0"
      >
        <mu-appbar color="primary" title="修改详情">
          <mu-button slot="left" icon @click="openChangeWin = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="changeUp()">完成修改</mu-button>
        </mu-appbar>
        <div class="content_box">
          <mu-row gutter>
            <mu-col span="4">
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>业主姓名：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.name"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>业主电话：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.tel"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>所属区域：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.addressArea"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>服务地址：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.address"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>施工区域：</p>
                </mu-flex>
                <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                  <mu-radio
                    style="margin-right: 20px;"
                    :value="1"
                    v-model="changeFrom.area"
                    label="卫生间"
                  ></mu-radio>
                  <mu-radio
                    style="margin-right: 20px;"
                    :value="2"
                    v-model="changeFrom.area"
                    label="一卫一厨"
                  ></mu-radio>
                  <mu-radio :value="3" v-model="changeFrom.area" label="两卫一厨"></mu-radio>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>服务工程师姓名：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.waiterName"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>服务工程师电话：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-text-field v-model="changeFrom.waiterTel"></mu-text-field>
                </mu-flex>
              </mu-flex>
              <mu-flex class="flex-wrapper" justify-content="start">
                <mu-flex class="flex-demo" justify-content="start">
                  <p>服务时间：</p>
                </mu-flex>
                <mu-flex class="flex-demo" justify-content="end">
                  <mu-date-input v-model="changeFrom.createTime" type="date"></mu-date-input>
                </mu-flex>
              </mu-flex>
            </mu-col>
            <mu-col span="4">
              <p>细节照片：</p>
              <mu-carousel
                :hide-controls="changeFrom.detailPhoto.length > 1 ? false : true"
                v-if="changeFrom.detailPhoto.length !== 0"
                :active="activeImg0"
                :cycle="false"
                @change="changeImg0"
              >
                <mu-icon
                  v-if="changeFrom.detailPhoto.length > 1"
                  color="primary"
                  value="chevron_left"
                  slot="left"
                ></mu-icon>
                <mu-icon
                  v-if="changeFrom.detailPhoto.length > 1"
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
                <mu-carousel-item v-for="(item,index) in changeFrom.detailPhoto" :key="index">
                  <!-- <img :src="item"> -->
                  <mu-icon
                    @click="deleteImg('detailPhoto',index)"
                    class="img_close_btn"
                    value="close"
                  ></mu-icon>
                  <div
                    @click="openBigImgWin(item)"
                    class="img"
                    :style="{'background-image':`url(${item}`}"
                  ></div>
                </mu-carousel-item>
              </mu-carousel>
              <mu-flex class="flex-wrapper" justify-content="center">
                <mu-flex class="flex-demo" justify-content="center">
                  <mu-button class="addBtn" color="primary" @click="upImg('detailPhoto')">添加图片</mu-button>
                </mu-flex>
              </mu-flex>
            </mu-col>
            <mu-col span="4">
              <p>质保单照片：</p>
              <mu-carousel
                :hide-controls="changeFrom.warrantyPhoto.length > 1 ? false : true"
                v-if="changeFrom.warrantyPhoto.length !== 0"
                :active="activeImg1"
                :cycle="false"
                @change="changeImg1"
              >
                <mu-icon
                  v-if="changeFrom.warrantyPhoto.length > 1"
                  color="primary"
                  value="chevron_left"
                  slot="left"
                ></mu-icon>
                <mu-icon
                  v-if="changeFrom.warrantyPhoto.length > 1"
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
                <mu-carousel-item v-for="(item,index) in changeFrom.warrantyPhoto" :key="index">
                  <!-- <img :src="item"> -->
                  <mu-icon
                    @click="deleteImg('warrantyPhoto',index)"
                    class="img_close_btn"
                    value="close"
                  ></mu-icon>
                  <div
                    @click="openBigImgWin(item)"
                    class="img"
                    :style="{'background-image':`url(${item}`}"
                  ></div>
                </mu-carousel-item>
              </mu-carousel>
              <mu-flex class="flex-wrapper" justify-content="center">
                <mu-flex class="flex-demo" justify-content="center">
                  <mu-button class="addBtn" color="primary" @click="upImg('warrantyPhoto')">添加图片</mu-button>
                </mu-flex>
              </mu-flex>
            </mu-col>
          </mu-row>
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
        size: 20
      },
      columns: [
        { title: "业主姓名", name: "name", align: "center" },
        { title: "业主电话", name: "tel", align: "center" },
        { title: "服务地址", name: "add", align: "center" },
        { title: "服务时间", name: "time", align: "center" },
        { title: "操作", name: "control", align: "center", width: "400" }
      ],
      list: [],
      windowContent: {
        detailPhoto: [],
        warrantyPhoto: []
      },
      openWindow: false,
      changeFrom: {
        detailPhoto: [],
        warrantyPhoto: []
      },
      openChangeWin: false,
      openBigImg: false,
      bigImg: "",
      deg: 0,
      activeImg0: 0,
      activeImg1: 0
    };
  },
  created: function() {
    this.getList();
  },
  methods: {
    onSerch(data) {
      this.form.page = 1;
      this.form.sherch = data;
      this.getList("sherch");
    },
    changePage(data) {
      this.form.page = data;
      this.getList();
    },
    getList(type) {
      this.$axios
        .post("/admin/WaterproofBillList", {
          page: this.form.page,
          keyword: this.form.sherch,
          size: this.form.size
        })
        .then(data => {
          this.form.totalPage = data.data.totalElements;
          let list = [];
          data.data.content.forEach(a => {
            let item = {
              name: a.ownerName,
              tel: a.ownerTel,
              address: a.address,
              createTime: a.createTime,
              content: true,
              addressArea: a.addressArea,
              area: a.area,
              waiterName: a.waiterName,
              waiterTel: a.waiterTel,
              detailPhoto: this.imgData(a.detailPhoto),
              warrantyPhoto: this.imgData(a.warrantyPhoto),
              id: a.id
            };
            list.push(item);
          });
          this.list = list;
        });
    },
    changeUp() {
      let data = this.changeFrom;
      this.$axios
        .post("/admin/upWaterproofBill", {
          address: data.address,
          addressArea: data.addressArea,
          area: data.area,
          createTime: data.createTime,
          detailPhoto: data.detailPhoto.join(","),
          id: data.id,
          ownerName: data.name,
          ownerTel: data.tel,
          waiterTel: data.waiterTel,
          waiterName: data.waiterName,
          warrantyPhoto: data.warrantyPhoto.join(",")
        })
        .then(data => {
          Message.alert("修改成功！");
          this.openChangeWin = false;
          this.getList();
        });
    },
    openWin(data) {
      this.windowContent = data;
      this.openWindow = true;
    },
    openChange(data) {
      this.changeFrom = data;
      this.openChangeWin = true;
    },
    openBigImgWin(url) {
      this.openBigImg = true;
      this.bigImg = url;
    },
    closeBigImg() {
      this.openBigImg = false;
      this.deg = 0;
    },
    deleteList(data) {
      Message.confirm(`确定删除?`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/delWaterproofBill", { id: data.id })
            .then(res => {
              Message.alert("删除成功！");
              this.getList();
            });
        }
      });
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
    rotateImg() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
      let dom = this.$refs.rotate_img;
      let deg = this.deg;
      let box = this.$refs.rotateImg_box;
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
    },
    changeImg0(index) {
      this.activeImg0 = index;
    },
    changeImg1(index) {
      this.activeImg1 = index;
    },
    upImg(id) {
      let domId = undefined;
      switch (id) {
        case "detailPhoto":
          domId = this.changeFrom.detailPhoto;
          break;
        case "warrantyPhoto":
          domId = this.changeFrom.warrantyPhoto;
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
        case "detailPhoto":
          domId = this.changeFrom.detailPhoto;
          break;
        case "warrantyPhoto":
          domId = this.changeFrom.warrantyPhoto;
          break;
      }
      Message.confirm(`确定删除此图片？`, "注意").then(({ result }) => {
        if (result) {
          domId.splice(index, 1);
          this.activeImg0 = 0;
          this.activeImg1 = 0;
        }
      });
    }
  },
  filters: {
    userArea: function(type) {
      switch (type) {
        case 1:
          return "卫生间";
          break;
        case 2:
          return "一卫一厨";
          break;
        case 3:
          return "两卫一厨";
          break;
      }
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
.addBtn {
  margin-top: 20px;
}
</style>
