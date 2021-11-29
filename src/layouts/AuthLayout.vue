<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="authBox">
          <div class="logo">
            <img src="/images/logo.svg" alt="Agro">
          </div>
          <slot/>
          <footer class="authFooter">
            <a href="#">Стать нашим партнером <v-icon class="ml-0" color="black">chevron_right</v-icon></a>
          </footer>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss">
  .authBox {
    width: 400px;
    margin: 100px auto 20px;
    .v-btn:not(.v-btn--round).v-size--large {
      height: 58px;
    }
    .logo {
      width: 180px;
      margin: 100px auto 40px;
      img {
        max-width: 100%;
      }
    }
    .authInfo {
      margin-bottom: 36px;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 129%;
      text-align: center;
    }
    .authFooter {
      border-top: 2px solid #F1F1F1;
      margin: 60px 0 0;
      padding: 20px;

      font-style: normal;
      font-weight: bold;
      font-size: 19px;
      line-height: 26px;
      align-items: center;
      text-align: center;
      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
</style>