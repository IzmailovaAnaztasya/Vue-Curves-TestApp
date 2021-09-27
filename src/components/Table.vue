<template>
  <div class="div">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Unit</th>
          <th v-for="(reach, index) in 10" v-bind:key="index" scope="col">
            Reach% {{ index + 1 }}+
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, unitIndex) in getDataSet" v-bind:key="unitIndex">
          <td>
            {{ item.unit }}
          </td>
          <td v-for="(reach, reachIndex) in item.reach" v-bind:key="reachIndex">
            <b-form-input
              :value="reach"
              :state="(() => getFieldError({ unitIndex, reachIndex }))()"
              @change="
                (e) => changeReachValue({ unitIndex, reachIndex, value: e })
              "
            ></b-form-input>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons_container">
      <div class="leftGroup">
        <b-button
          variant="success"
          @click="addRow"
          :disabled="getCurvesFetchState"
          >Добавить ряд</b-button
        >
        <b-button
          variant="danger"
          @click="deleteRow"
          :disabled="getCurvesFetchState"
          >Удалить ряд</b-button
        >
      </div>
      <div class="rightGroup">
        <b-button
          variant="primary"
          @click="saveData"
          :disabled="getCurvesFetchState"
          >Сохранить данные</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["changeReachValue", "saveData"]),
    ...mapMutations(["addRow", "deleteRow"]),
  },
  computed: {
    ...mapGetters(["getDataSet", "getFieldError", "getCurvesFetchState"]),
  },
};
</script>

<style lang="scss" scoped>
.buttons_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .leftGroup {
    display: flex;
    gap: 20px;
  }
}
</style>
