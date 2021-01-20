<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
@import './assets/css/common.css';
html{
  font-size: 16px;
  background-color: #f7f7f7;
}
.container{
  width: 1536px;
  margin: 0 auto;
}
.standing-position{
  height: 72px;
}
.custom-title {
    margin-top: 41px;
    margin-bottom: 24px;
    img {
      width: 143px;
    }
    a {
      margin-top: 10px;
      color: #403e3e;
    }
  }
  .polaroid {
        margin-right: 20px;
        margin-bottom: 19px;
        .c-l-t {
          font-size: 18px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 4px;
        }

        .polaroid-img {
          width: 260px;
          height: 146px;
          margin-bottom: 14px;
        }

        .c-l-b {
          font-size: 15px;
          color: #898989;
          width: 100%;

          span {
            display: inline-block;
            width: 49%;
          }

          .c-l-time {
            text-align: left;
          }

          .c-l-num {
            text-align: right;
          }
        }
      }
      // 搜索框
      .search {
      width: 765px;
      height: 54px;
      line-height: 54px;
      background: #ffffff;
      border-radius: 100px;
      border: 1px solid #ffffff;
      padding: 6px 14px 6px 16px;
      img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
        vertical-align: middle;
        line-height: 54px;
        margin-top: 13px;
        margin-bottom: 11px;
      }
      input {
        border: none;
        outline: none;
        vertical-align: middle;
        width: 400px;
        line-height: 35px;
        font-size: 18px;
      }
      button {
        padding: 0 16px;
        height: 41px;
        line-height: 41px;
        background: #1a56a8;
        border-radius: 100px;
        color: #ffffff;
        vertical-align: middle;
        border: none;
        font-size: 17px;
        outline: none;
      }
    }
</style>
