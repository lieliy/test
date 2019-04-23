<template>
  <section class="box">
    <mu-paper class="login_box" :z-depth="1">
      <p class="title">登录</p>
      <mu-form ref="form" :model="form" class="mu-demo-form">
        <mu-form-item
          label="用户名"
          prop="username"
          :rules="usernameRules"
          icon="account_circle"
          label-float
        >
          <mu-text-field v-model="form.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules" icon="locked" label-float>
          <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button full-width class="login_btn" color="primary" @click="submit">登录</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-paper>
  </section>
</template>

<script>
export default {
  data() {
    return {
      usernameRules: [{ validate: val => !!val, message: "必须填写用户名" }],
      passwordRules: [{ validate: val => !!val, message: "必须填写密码" }],
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {});
      if (this.form.username && this.form.password) {
        this.login();
      }
    },
    login() {
      this.$axios
        .post("/login", {
          password: this.form.password,
          tel: this.form.username
        })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userName", data.data.username);
          this.$router.push("/home");
        });
    }
  },
  created: function() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/home");
    }
  }
};
</script>

<style>
.box {
  height: 100vh;
  position: relative;
}
.title {
  font-size: 20px;
  text-align: center;
  letter-spacing: 3em;
  margin-right: -3em;
}
.login_box {
  width: 30vw;
  min-width: 300px;
  padding: 20px 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_btn {
  margin: 30px auto 0 !important;
  font-size: 20px;
  max-width: 250px;
}
</style>
