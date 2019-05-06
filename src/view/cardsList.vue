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
                :title="'预约状态'"
                :selectVal="form.billStatus"
              ></selectCom>
            </div>
          </mu-col>
          <mu-col span="6">
            <div class="grid-cell">
              <sherch :title="'搜索预约卡号'" @serch="onSerch"></sherch>
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
        :showChangeBtn="true"
        @openChange="openChange"
        :showDeleteBtn="true"
        @removeId="deleteList"
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
          <div v-if="form.billStatus === 2 || form.billStatus === 4">
            <mu-flex style="margin-bottom: 20px;" class="flex-wrapper" justify-content="center">
              <mu-flex class="flex-demo" justify-content="center">
                <mu-button
                  style="margin-right: 20px;"
                  color="primary"
                  @click="checkCard(windowContent.id,1)"
                >通过</mu-button>
                <mu-button color="secondary" @click="checkCard(windowContent.id,0)">不通过</mu-button>
              </mu-flex>
            </mu-flex>
          </div>
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
                  <p>预约卡号：{{windowContent.orderCard}}</p>
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
        scrollable
        width="360"
        transition="slide-bottom"
        fullscreen
        :open.sync="openChangeWin"
        :padding="0"
      >
        <mu-appbar color="primary" :title="changeFrom.getType">
          <mu-button slot="left" icon @click="openChangeWin = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="changeUp()">完成修改</mu-button>
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
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>单据编号：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.billNumber"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>制单日期：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="start">
                    <!-- <mu-text-field v-model="changeFrom.makeBillDate"></mu-text-field> -->
                    <mu-date-input v-model="changeFrom.makeBillDate" type="date"></mu-date-input>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>预约卡号：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.orderCard"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>质保卡号：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.promiseCard"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>单据状态：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <!-- <mu-text-field v-model="changeFrom.billStatus"></mu-text-field> -->
                    <mu-select v-model="changeFrom.billStatusList">
                      <mu-option
                        v-for="(item,index) in billStatusList"
                        :key="index"
                        :label="item.title"
                        :value="item.val"
                      ></mu-option>
                    </mu-select>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>所属区域：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.area"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>试压地址：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <mu-text-field v-model="changeFrom.pressureAddress"></mu-text-field>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>预约试压时间：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <!-- <mu-text-field v-model="changeFrom.orderPressureTime"></mu-text-field> -->
                    <mu-date-input v-model="changeFrom.orderPressureTime" type="date"></mu-date-input>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>期望时间：</p>
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end">
                    <!-- <mu-text-field v-model="changeFrom.expectTime"></mu-text-field> -->
                    <mu-date-input v-model="changeFrom.expectTime" type="date"></mu-date-input>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <!-- <p>现场是否张贴温馨提示和阀门贴：{{windowContent.ifPostTips === 0 ? "否" : "是"}}</p> -->
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>现场是否张贴温馨提示和阀门贴：</p>
                  </mu-flex>
                  <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                    <mu-radio
                      style="margin-right: 20px;"
                      :value="0"
                      v-model="changeFrom.ifPostTips"
                      label="否"
                    ></mu-radio>
                    <mu-radio :value="1" v-model="changeFrom.ifPostTips" label="是"></mu-radio>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="flex-wrapper" justify-content="start">
                  <!-- <p>是否发送短信：{{windowContent.ifSendMsg === 0 ? "否" : "是"}}</p> -->
                  <mu-flex class="flex-demo" justify-content="start">
                    <p>是否发送短信：</p>
                  </mu-flex>
                  <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                    <mu-radio
                      style="margin-right: 20px;"
                      :value="0"
                      v-model="changeFrom.ifSendMsg"
                      label="否"
                    ></mu-radio>
                    <mu-radio :value="1" v-model="changeFrom.ifSendMsg" label="是"></mu-radio>
                  </mu-flex>
                </mu-flex>
              </mu-col>
              <mu-col span="4">
                <div class="grid-cell">
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>业主姓名：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.ownerName"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>业主电话：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.ownerTel"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>现场联系人：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.localeContacts"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>联系人类型：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-select v-model="changeFrom.contactsTypeList">
                        <mu-option
                          v-for="(item,index) in contactsTypeList"
                          :key="index"
                          :label="item.title"
                          :value="item.val"
                        ></mu-option>
                      </mu-select>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>联系人电话：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.contactsTel"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                </div>
              </mu-col>
              <mu-col span="4">
                <div class="grid-cell">
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>水工姓名：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.workerName"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>水工电话：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.workerTel"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>TDS值（水质）：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.TDS"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>水工积分：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.workerIntegral"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>承包方式：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-select v-model="changeFrom.includeTypeList">
                        <mu-option
                          v-for="(item,index) in includeTypeList"
                          :key="index"
                          :label="item.title"
                          :value="item.val"
                        ></mu-option>
                      </mu-select>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>装修公司名称：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.companyName"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>水管类型：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-select v-model="changeFrom.pipeTypeList">
                        <mu-option
                          v-for="(item,index) in pipeTypeList"
                          :key="index"
                          :label="item.title"
                          :value="item.val"
                        ></mu-option>
                      </mu-select>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>管道走向：{{windowContent.pipeTrend === 1 ? "走地" : "走顶"}}</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>管道走向：</p>
                    </mu-flex>
                    <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                      <mu-radio
                        style="margin-right: 20px;"
                        :value="1"
                        v-model="changeFrom.pipeTrend"
                        label="走地"
                      ></mu-radio>
                      <mu-radio :value="2" v-model="changeFrom.pipeTrend" label="走顶"></mu-radio>
                    </mu-flex>
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
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>试压员姓名：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.pressureName"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>试压员电话：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field v-model="changeFrom.pressureTel"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>试压时间：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <!-- <mu-text-field v-model="changeFrom.pressureTime"></mu-text-field> -->
                      <mu-date-input v-model="changeFrom.pressureTime" type="date"></mu-date-input>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>试压压力：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field suffix="MPa" v-model="changeFrom.pressure"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>产品真伪：{{windowContent.ifTrue === 0 ? "否" : "是"}}</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>产品真伪：</p>
                    </mu-flex>
                    <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                      <mu-radio
                        style="margin-right: 20px;"
                        :value="0"
                        v-model="changeFrom.ifTrue"
                        label="否"
                      ></mu-radio>
                      <mu-radio :value="1" v-model="changeFrom.ifTrue" label="是"></mu-radio>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>是否上传图片：{{windowContent.ifUploadPhoto === 0 ? "否" : "是"}}</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>是否上传图片：</p>
                    </mu-flex>
                    <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                      <mu-radio
                        style="margin-right: 20px;"
                        :value="0"
                        v-model="changeFrom.ifUploadPhoto"
                        label="否"
                      ></mu-radio>
                      <mu-radio :value="1" v-model="changeFrom.ifUploadPhoto" label="是"></mu-radio>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>保压时间：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field suffix="Min" v-model="changeFrom.pressureTime"></mu-text-field>
                      <!-- <mu-date-input v-model="changeFrom.keepPressureTime" type="date"></mu-date-input> -->
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>房屋类型：{{windowContent.houseType === 0 ? "一厨一卫" : "两卫一厨"}}</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>房屋类型：</p>
                    </mu-flex>
                    <mu-flex style="margin-top: 15px;" class="flex-demo" justify-content="end">
                      <mu-radio
                        style="margin-right: 20px;"
                        :value="0"
                        v-model="changeFrom.houseType"
                        label="一厨一卫"
                      ></mu-radio>
                      <mu-radio :value="1" v-model="changeFrom.houseType" label="两卫一厨"></mu-radio>
                    </mu-flex>
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
                    :hide-controls="changeFrom.detailPhoto1.length > 1 ? false : true"
                    v-if="changeFrom.detailPhoto1.length !== 0"
                    :active="activeImg0"
                    :cycle="false"
                    @change="changeImg0"
                  >
                    <mu-icon
                      v-if="changeFrom.detailPhoto1.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="changeFrom.detailPhoto1.length > 1"
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
                    <mu-carousel-item v-for="(item,index) in changeFrom.detailPhoto1" :key="index">
                      <!-- <img :src="item"> -->
                      <mu-icon
                        @click="deleteImg('detailPhoto1',index)"
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
                      <mu-button class="addBtn" color="primary" @click="upImg('detailPhoto1')">添加图片</mu-button>
                    </mu-flex>
                  </mu-flex>
                  <p>第一次压力照片：</p>
                  <mu-carousel
                    :hide-controls="changeFrom.pressurePhoto1.length > 1 ? false : true"
                    v-if="changeFrom.pressurePhoto1.length !== 0"
                    :active="activeImg1"
                    :cycle="false"
                    @change="changeImg1"
                  >
                    <mu-icon
                      v-if="changeFrom.pressurePhoto1.length > 1"
                      color="primary"
                      value="chevron_left"
                      slot="left"
                    ></mu-icon>
                    <mu-icon
                      v-if="changeFrom.pressurePhoto1.length > 1"
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
                      v-for="(item,index) in changeFrom.pressurePhoto1"
                      :key="index"
                    >
                      <!-- <img :src="item"> -->
                      <mu-icon
                        @click="deleteImg('pressurePhoto1')"
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
                      <mu-button
                        class="addBtn"
                        color="primary"
                        @click="upImg('pressurePhoto1')"
                      >添加图片</mu-button>
                    </mu-flex>
                  </mu-flex>
                  <p>质保单照片：</p>
                  <mu-carousel
                    :hide-controls="changeFrom.warrantyPhoto.length > 1 ? false : true"
                    v-if="changeFrom.warrantyPhoto.length !== 0"
                    :active="activeImg2"
                    :cycle="false"
                    @change="changeImg2"
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
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>业主评价（1星-5星）：{{windowContent.evaluate}}星</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>业主评价（1星-5星）：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field suffix="星" full-width v-model="changeFrom.evaluate"></mu-text-field>
                    </mu-flex>
                  </mu-flex>
                  <mu-flex class="flex-wrapper" justify-content="start">
                    <!-- <p>业主评价内容：{{windowContent.evaluateContent}}</p> -->
                    <mu-flex class="flex-demo" justify-content="start">
                      <p>业主评价内容：</p>
                    </mu-flex>
                    <mu-flex class="flex-demo" justify-content="end">
                      <mu-text-field
                        style="margin-top: 12px;"
                        v-model="changeFrom.evaluateContent"
                        multi-line
                        :rows="4"
                      ></mu-text-field>
                    </mu-flex>
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
                  :hide-controls="changeFrom.detailPhoto2.length > 1 ? false : true"
                  v-if="changeFrom.detailPhoto2.length !== 0"
                  :active="activeImg3"
                  :cycle="false"
                  @change="changeImg3"
                >
                  <mu-icon
                    v-if="changeFrom.detailPhoto2.length > 1"
                    color="primary"
                    value="chevron_left"
                    slot="left"
                  ></mu-icon>
                  <mu-icon
                    v-if="changeFrom.detailPhoto2.length > 1"
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
                  <mu-carousel-item v-for="(item,index) in changeFrom.detailPhoto2" :key="index">
                    <!-- <img :src="item"> -->
                    <mu-icon
                      @click="deleteImg('detailPhoto2',index)"
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
                    <mu-button class="addBtn" color="primary" @click="upImg('detailPhoto2')">添加图片</mu-button>
                  </mu-flex>
                </mu-flex>
                <p>第二次压力照片：</p>
                <mu-carousel
                  :hide-controls="changeFrom.pressurePhoto2.length > 1 ? false : true"
                  v-if="changeFrom.pressurePhoto2.length !== 0"
                  :active="activeImg4"
                  :cycle="false"
                  @change="changeImg4"
                >
                  <mu-icon
                    v-if="changeFrom.pressurePhoto2.length > 1"
                    color="primary"
                    value="chevron_left"
                    slot="left"
                  ></mu-icon>
                  <mu-icon
                    v-if="changeFrom.pressurePhoto2.length > 1"
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
                  <mu-carousel-item v-for="(item,index) in changeFrom.pressurePhoto2" :key="index">
                    <!-- <img :src="item"> -->
                    <mu-icon
                      @click="deleteImg('pressurePhoto2',index)"
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
                    <mu-button class="addBtn" color="primary" @click="upImg('pressurePhoto2')">添加图片</mu-button>
                  </mu-flex>
                </mu-flex>
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
import selectCom from "@/components/select";
import Message from "muse-ui-message";
import sherch from "@/components/sherch";
export default {
  components: {
    selectCom,
    sherch
  },
  data() {
    return {
      form: {
        page: 1,
        totalPage: 1,
        sherch: "",
        billStatus: 1,
        size: 20,
        contentType: 0
      },
      deg: 0,
      openBigImg: false,
      bigImg: "",
      activeImg0: 0,
      activeImg1: 0,
      activeImg2: 0,
      activeImg3: 0,
      activeImg4: 0,
      activeImgNum: 0,
      list: [],
      openWindow: false,
      openChangeWin: false,
      columns: [
        { title: "预约卡号", name: "num", align: "center" },
        { title: "试压地址", name: "add", align: "center" },
        { title: "业主姓名", name: "name", align: "center" },
        { title: "业主电话", name: "tel", align: "center" },
        { title: "预约试压时间", name: "time", align: "center" },
        { title: "操作", name: "control", align: "center", width: "400" }
      ],
      optionsList: [
        { title: "第一次预约", val: 1 },
        { title: "第一次审核", val: 2 },
        { title: "第二次预约", val: 3 },
        { title: "第二次审核", val: 4 }
      ],
      billStatusList: [
        { title: "第一次预约", val: 1 },
        { title: "第一次上传", val: 2 },
        { title: "第二次预约", val: 3 },
        { title: "第二次上传", val: 4 }
      ],
      contactsTypeList: [
        { title: "业主", val: 1 },
        { title: "装修公司", val: 2 },
        { title: "水工", val: 3 },
        { title: "家属", val: 4 }
      ],
      includeTypeList: [
        { title: "水工", val: 1 },
        { title: "装修公司", val: 2 },
        { title: "水工", val: 3 },
        { title: "业主自购", val: 4 }
      ],
      pipeTypeList: [
        { title: "精品管", val: 1 },
        { title: "瓷心管", val: 2 },
        { title: "铜管", val: 3 }
      ],
      windowContent: {
        detailPhoto1: [],
        pressurePhoto1: [],
        warrantyPhoto: [],
        detailPhoto2: [],
        pressurePhoto2: []
      },
      changeFrom: {
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
    getList(type) {
      if (type === "sherch") {
        this.form.billStatus = null;
      }
      this.$axios
        .post("/admin/serviceInfoList", {
          page: this.form.page,
          orderCard: this.form.sherch,
          size: this.form.size,
          billStatus: this.form.billStatus
        })
        .then(data => {
          this.setList(data.data.content);
          this.form.totalPage = data.data.totalElements;
          if (type === "sherch") {
            let billStatusData = 1;
            switch (data.data.content[0].billStatus) {
              case 1:
                billStatusData = 1;
                break;
              case 2:
                billStatusData = 1;
                break;
              case 3:
                billStatusData = 2;
                break;
              case 5:
                billStatusData = 3;
                break;
              case 6:
                billStatusData = 3;
                break;
              case 7:
                billStatusData = 4;
                break;
            }
            this.form.billStatus = billStatusData;
            this.form.sherch = "";
          }
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
          numId: data[i].orderCard,
          orderCard: data[i].orderCard,
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
          pipeTypeList: data[i].pipeType,
          includeTypeList: data[i].includeType,
          contactsTypeList: data[i].contactsType,
          billStatusList: data[i].billStatus,
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
    setOption(data) {
      this.form.billStatus = data;
      this.getList();
    },
    openWin(data) {
      this.form.contentType = 0;
      this.windowContent = data;
      this.openWindow = true;
    },
    checkCard(id, type) {
      let msg = "";
      if (type === 0) {
        msg = "不通过";
      } else {
        msg = "通过";
      }
      Message.confirm(`确定${msg}?`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/checkOrderInfo", { infoId: id, ifPass: type })
            .then(data => {
              this.openWindow = false;
              Message.alert("操作成功！");
              this.getList();
            });
        }
      });
    },
    changePage(data) {
      this.form.page = data;
      this.getList();
    },
    onSerch(data) {
      this.form.page = 1;
      this.form.sherch = data;
      this.getList("sherch");
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
    upImg(id) {
      let domId = undefined;
      switch (id) {
        case "detailPhoto1":
          domId = this.changeFrom.detailPhoto1;
          break;
        case "pressurePhoto1":
          domId = this.changeFrom.pressurePhoto1;
          break;
        case "warrantyPhoto":
          domId = this.changeFrom.warrantyPhoto;
          break;
        case "detailPhoto2":
          domId = this.changeFrom.detailPhoto2;
          break;
        case "pressurePhoto2":
          domId = this.changeFrom.pressurePhoto2;
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
        case "detailPhoto1":
          domId = this.changeFrom.detailPhoto1;
          break;
        case "pressurePhoto1":
          domId = this.changeFrom.pressurePhoto1;
          break;
        case "warrantyPhoto":
          domId = this.changeFrom.warrantyPhoto;
          break;
        case "detailPhoto2":
          domId = this.changeFrom.detailPhoto2;
          break;
        case "pressurePhoto2":
          domId = this.changeFrom.pressurePhoto2;
          break;
      }
      Message.confirm(`确定删除此图片？`, "注意").then(({ result }) => {
        if (result) {
          domId.splice(index, 1);
          this.activeImg0 = 0;
          this.activeImg1 = 0;
          this.activeImg2 = 0;
          this.activeImg3 = 0;
          this.activeImg4 = 0;
        }
      });
    },
    changeImg0(index) {
      // this.activeImg[this.activeImgNum] = index;
      // console.log(this.activeImg);
      this.activeImg0 = index;
    },
    changeImg1(index) {
      this.activeImg1 = index;
    },
    changeImg2(index) {
      this.activeImg2 = index;
    },
    changeImg3(index) {
      this.activeImg3 = index;
    },
    changeImg4(index) {
      this.activeImg4 = index;
    },
    // changeActiveImg(index) {
    //   this.activeImgNum = index;
    // },
    openChange(data) {
      this.form.contentType = 0;
      this.changeFrom = data;
      this.openChangeWin = true;
    },
    changeUp(data) {
      this.$axios
        .post("/admin/upOrderInfo", {
          TDS: this.changeFrom.TDS,
          area: this.changeFrom.area,
          billNumber: this.changeFrom.billNumber,
          billStatus: this.changeFrom.billStatusList,
          companyName: this.changeFrom.companyName,
          contactsTel: this.changeFrom.contactsTel,
          contactsType: this.changeFrom.contactsTypeList,
          detailPhoto1: this.changeFrom.detailPhoto1.join(","),
          detailPhoto2: this.changeFrom.detailPhoto2.join(","),
          evaluate: this.changeFrom.evaluate,
          evaluateContent: this.changeFrom.evaluateContent,
          expectTime: this.changeFrom.expectTime,
          houseType: this.changeFrom.houseType,
          id: this.changeFrom.id,
          ifPostTips: this.changeFrom.ifPostTips,
          ifSendMsg: this.changeFrom.ifSendMsg,
          ifTrue: this.changeFrom.ifTrue,
          ifUploadPhoto: this.changeFrom.ifUploadPhoto,
          includeType: this.changeFrom.includeTypeList,
          keepPressureTime: this.changeFrom.keepPressureTime,
          localeContacts: this.changeFrom.localeContacts,
          makeBillDate: this.changeFrom.makeBillDate,
          orderCard: this.changeFrom.orderCard,
          orderPressureTime: this.changeFrom.orderPressureTime,
          orderType: this.changeFrom.orderTypeList,
          ownerName: this.changeFrom.ownerName,
          ownerTel: this.changeFrom.ownerTel,
          pipeTrend: this.changeFrom.pipeTrend,
          pipeType: this.changeFrom.pipeTypeList,
          pressure: this.changeFrom.pressure,
          pressureAddress: this.changeFrom.pressureAddress,
          pressureName: this.changeFrom.pressureName,
          pressurePhoto1: this.changeFrom.pressurePhoto1.join(","),
          pressurePhoto2: this.changeFrom.pressurePhoto2.join(","),
          pressureTel: this.changeFrom.pressureTel,
          pressureTime: this.changeFrom.pressureTime,
          promiseCard: this.changeFrom.promiseCard,
          warrantyPhoto: this.changeFrom.warrantyPhoto.join(","),
          workerIntegral: this.changeFrom.workerIntegral,
          workerName: this.changeFrom.workerName,
          workerTel: this.changeFrom.workerTel
        })
        .then(data => {
          Message.alert("修改成功！");
          this.openChangeWin = false;
          this.getList();
        });
    },
    openBigImgWin(url) {
      this.openBigImg = true;
      this.bigImg = url;
    },
    deleteList(data) {
      Message.confirm(`确定删除?`, "注意").then(({ result }) => {
        if (result) {
          this.$axios
            .post("/admin/delServiceInfo", { id: data.id })
            .then(res => {
              Message.alert("删除成功！");
              this.getList();
            });
        }
      });
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
    closeBigImg() {
      this.openBigImg = false;
      this.deg = 0;
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
