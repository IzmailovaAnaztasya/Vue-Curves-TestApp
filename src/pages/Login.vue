<template>
  <div class="wrapper">
    <div class="form">
      <div class="label">Авторизация</div>
      <b-form-input
        :id="`type-text`"
        type="text"
        placeholder="Имя пользователя"
        v-model="username"
      ></b-form-input>
      <b-form-input
        :id="`type-password`"
        type="password"
        placeholder="Пароль"
        v-model="password"
      ></b-form-input>
      <b-button block variant="success" @click="submitForm" :disabled="disabled"
        >Войти</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      disabled: false,
      username: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      await this.login({
        username: this.username,
        password: this.password,
        onRequest: () => {
          this.disabled = true;
        },
        onError: () => {
          this.disabled = false;
        },
      });
      // Если токена нет, то не сработает
      this.$router.push("/");
    },
    ...mapActions(["login"]),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background: #039be5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  color: white;
  max-width: 450px;
}
.label {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
