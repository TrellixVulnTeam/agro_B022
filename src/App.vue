<template>
  <div id="app">
    <alerts></alerts>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const alerts = () => import('@/components/alerts')
export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    alerts
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout'
    }
  }
}
</script>
