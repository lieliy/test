<template>
  <section>
    <mu-paper :z-depth="1">
      <mu-data-table :label-float="true" stripe :columns="columns" :data="listData">
        <template slot-scope="scope">
          <td class="is-center">{{scope.row.name}}</td>
          <td class="is-center">{{scope.row.tel}}</td>
          <td v-if="scope.row.password" class="is-center">*********</td>
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
            <mu-button v-if="showDeleteBtn" small color="primary" @click="removeId(scope.row)">删除</mu-button>
            <mu-menu v-if="showChackBtn" cover>
              <mu-button small color="primary">审核</mu-button>
              <mu-list slot="content">
                <mu-list-item @click="checked(true)" button>
                  <mu-list-item-title>通过</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="checked(false)" button>
                  <mu-list-item-title>不通过</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </td>
        </template>
      </mu-data-table>
    </mu-paper>
    <mu-flex class="page_box" justify-content="end">
      <mu-pagination raised :total="totalPage" :current.sync="nowPage"></mu-pagination>
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
    "showChackBtn"
  ],
  data() {
    return {};
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
    checked(data) {
      this.$emit("checked", data)
    }
  }
};
</script>

<style>
.page_box {
  margin-top: 20px;
}
</style>
