<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['id'],
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    computed: {
      acceptanceWithResearch () {
        return this.$store.getters.acceptanceWithResearch
      }
    },
    watch:{
      acceptanceWithResearch () {
        this.renderChart(this.acceptanceWithResearch, this.options)
      }
    },
    mounted () {
      this.$store.dispatch('getAcceptanceWithResearch', this.id)
    }
  }
</script>