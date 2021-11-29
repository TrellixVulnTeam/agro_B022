<template>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          name="email"
          label="Ваш email"
          type="text"
          outlined
          v-model="email"
          :rules="loginRules"
          required
          v-on:keyup.enter="signIn"
          @input.native="checkEmailValid()"
          ref="inputEmail"
        ></v-text-field>
        <v-text-field
          name="email"
          label="Пароль"
          type="text"
          outlined
          v-model="code"
          :rules="codeRules"
          required
          v-on:keyup.enter="signIn"
          ref="inputCode"
          @input.native="checkCodeValid()"
          v-if="showCodeField"
        ></v-text-field>
      </v-form>

      <v-btn
        block
        depressed
        large
        class="success mb-2"
        :loading="loading"
        :disabled="!valid || loading"
        @click="signIn"
        v-if="showSubmitBtn"
      >
        Войти
      </v-btn>
      <v-btn
        block
        depressed
        large
        color="white"
        @click="goToGetPass"
      >
        Получить код для входа
      </v-btn>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      code: '',
      loginRules: [
        value => !!value || 'Необходимо указать email',
        value => (value || '').length <= 30 || 'Максимум 30 символов',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail адрес'
        },
      ],
      codeRules: [
        v => !!v || 'Необходимо указать пароль',
        v => (v && v.length >= 6) || 'Пароль не может быть меньше 6-и символов'
      ],
      valid: false,
      showCodeField: false,
      showSubmitBtn: false,
    }
  },
  methods: {
    signIn() {
      const { email, code } = this

      if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', { email, code })
      }
    },
    goToGetPass() {
      this.$router.push('/getpass')
    },
    checkEmailValid() {
      this.showCodeField = this.$refs.inputEmail.valid
    },
    checkCodeValid() {
      this.showSubmitBtn = this.$refs.inputCode.valid
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
  },
  created() {
  }
}
</script>