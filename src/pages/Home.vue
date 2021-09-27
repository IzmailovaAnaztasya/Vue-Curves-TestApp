<template>
  <div class="home">
    <div class="header">
      <div class="label">Тестовое задание: Анастасия Измайлова</div>
    </div>
    <div class="container">
      <Curves />
      <Table />
    </div>
  </div>
</template>

<script>
//import Chart from "../components/Chart.vue";
import Table from "../components/Table.vue";
import Curves from "../components/Curves.vue";
// @ is an alias to /src

export default {
  name: "Home",

  components: { Table, Curves },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr;
}
.header {
  background: #01579b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .label {
    font-size: 1.5rem;
  }
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
