<template>
    <div>
        <h1>
            login
        </h1>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: 'qq@qq.qq'
    }
  },
  methods: {
    getPass() {
      this.$store.dispatch('getPass', this.email)
    }
  },
  computed: {
  },
  created() {
    this.getPass()
  }
}
</script>