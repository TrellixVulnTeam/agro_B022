<template>
    <div>
      <p class="authInfo">
        Пожалуйста, укажите email, который<br>привязан к Вашему аккаунту
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          name="email"
          label="Ваш email"
          type="text"
          outlined
          v-model="email"
          :rules="loginRules"
          required
          v-on:keyup.enter="getPass"
          @input.native="checkEmailValid()"
          ref="inputEmail"
        ></v-text-field>
      </v-form>

      <v-btn
        block
        depressed
        large
        class="success mb-2"
        :loading="loading"
        :disabled="!valid || loading"
        @click="getPass"
        v-if="showSubmitBtn"
      >
        Далее
      </v-btn>
      <v-btn
        block
        depressed
        large
        color="white"
        @click="goToSignIn"
      >
        Отменить
      </v-btn>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      loginRules: [
        value => !!value || 'Необходимо указать email',
        value => (value || '').length <= 30 || 'Максимум 30 символов',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail адрес'
        },
      ],
      valid: false,
      showSubmitBtn: false,
    }
  },
  methods: {
    getPass() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('getPass', this.email)
      }
    },
    goToSignIn() {
      this.$router.push('/signin')
    },
    checkEmailValid() {
      this.showSubmitBtn = this.$refs.inputEmail.valid
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
  }
}
</script>