<template>
  <div class="error-page">
    <div class="error-page__content f-clear">
      <img src="../assets/404.png" alt="">
      <div class="error-page__text">
        <h1>404</h1>
        <p>My God……页面居然丢失！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss" scoped>
  .error-page{
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    img{
      float: left;
      width: 380px;
      height: 338px;
    }
    h1{
      font-size: 110px;
      color: #555555;
    }
    p{
      font-size: 16px;
      color: #555555;
    }
  }
  .error-page__content{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -325px;
    margin-top: -170px;
    width: 650px;
    height: 340px;
  }
  .error-page__text{
    float: left;
    margin: 70px 0 0 20px;
  }
</style>
