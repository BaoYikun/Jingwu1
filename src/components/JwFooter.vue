<template>
  <div class="footer-box w">
    <div class="container">
      <div>联系电话：0532-51858098</div>
      <div>海军潜艇学院 版权所有 山东省青岛市李沧区金水路1号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JwHeader",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.footer-box {
  height: 129px;
  background-color: #f0f0f0;
  float: left;
  margin-top: 33px;
  padding: 31px 0 35px 0;
  div {
    text-align: center;
    font-size: 18px;
    color: #333333;
    &:first-child {
      margin-bottom: 13px;
    }
  }
}
</style>
