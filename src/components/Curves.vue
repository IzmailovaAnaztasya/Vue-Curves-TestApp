<template>
  <div class="curve">
    <canvas class="curves" id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      Curve: null,
      chartColors: [
        "#8e24aa",
        "#3949ab",
        "#039be5",
        "#00897b",
        "#7cb342",
        "#c0ca33",
        "#fdd835",
        "#ffb300",
        "#f4511e",
        "#6d4c41",
      ],
    };
  },
  async mounted() {
    await this.initData();
    const ctx = document.getElementById("myChart").getContext("2d");
    this.Curve = new Chart(ctx, {
      type: "line",
      data: this.preparedData,

      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
  methods: { ...mapActions(["initData"]) },
  computed: {
    ...mapGetters(["getDataSet", "getTrigger"]),
    preparedData() {
      const chartData = {
        labels: [],
        datasets: [],
      };

      this.getDataSet.forEach((element, index) => {
        const { unit, reach } = element;
        chartData.labels.push(unit);
        reach.forEach((r, rIndex) => {
          if (!index)
            return chartData.datasets.push({
              label: `reach${rIndex + 1}`,
              fill: false,
              borderColor: this.chartColors[rIndex],
              data: [r],
            });

          return chartData.datasets[rIndex].data.push(r);
        });
      });

      return chartData;
    },
  },
  watch: {
    getTrigger() {
      this.Curve.data.labels = this.preparedData.labels;
      this.Curve.data.datasets = this.preparedData.datasets;
      this.Curve.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.curves {
  height: auto;
  width: 100%;
  display: flex;
}
</style>
