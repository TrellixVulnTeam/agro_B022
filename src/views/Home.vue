<template>
  <div>
    <h1 class="display-1">Главная</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created() {
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY0MTc5NzIsIlBheWxvYWQiOnsidXNlcl9uYW1lIjoiUGF1bG8iLCJ1c2VyX2lkIjoyLCJyb2xlIjoiYWRtaW4iLCJjb21wYW55IjoiZGV2In19.R00pIjFf8glszlkfWzuawEKcXco5Xy0xnvSkkhEMMEU'
      // var base64Url = token.split('.')[1]
      // var base64 = base64Url.replace('-', '+').replace('_', '/')
      // var encToken = JSON.parse(window.atob(base64))
      // console.log(encToken)
      // localStorage.exp = encToken.exp
      // localStorage.user_name = encToken.Payload.user_name
      // localStorage.user_id = encToken.Payload.user_id
      // localStorage.role = encToken.Payload.role
      // localStorage.company = encToken.Payload.company
  }
}
</script>