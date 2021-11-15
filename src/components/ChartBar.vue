<script>
import { Bar, mixins } from 'vue-chartjs'
import chartjsPluginAnnotation from 'chartjs-plugin-annotation'

const { reactiveProp } = mixins

export default {
  name: 'ChartBar',
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: { type: Object, required: true, default: () => null },
    options: { type: Object, required: false, default: () => null }
  },
  mounted () {
    this.addPlugin([chartjsPluginAnnotation])
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped></style>