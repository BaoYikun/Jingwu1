<template>
  <div class="header-box">
    <div class="container h-content p-r h">
      <img class="logo f-l" src="../assets/img/toplogo.png" alt=""/>
      <ul class="h-menu f-l h">
        <li
          class="h-menu-list f-l p-r"
          :class="{ activeClass: activeStatus == item.id || clickActive == item.id }"
          v-for="(item, index) in headeList"
          :key="index"
          @click="checkMenu(item)"
          @mouseover="hover(item)"
          @mouseleave="leave(item)"
        >
          <span>{{ item.title }}</span>
          <ul
            class="menu-select w p-a"
            :class="{ 'menu-s-active': moveActive == item.id }"
            v-if="item.ownSites && item.ownSites.length != 0"
          >
            <li class="menu-s-list w" v-for="(a, b) in item.ownSites" :key="b.id" @click="checkSonMenu(a.url)">
              {{ a.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="login-btn p-a vertical-center" @click="login">
        <img src="../assets/img/login-button-icon.png" alt=""/>
        <span>登陆</span>
      </div>
      <!-- 登陆后 -->
      <div class="login-after f-r vertical-center" v-if="userId!=''&&userId!=null&&userId!=undefined">
        <!--        <img-->
        <!--          class="portClass c-u f-l"-->
        <!--          :src="-->
        <!--            portType-->
        <!--              ? require('../assets/img/student.png')-->
        <!--              : require('../assets/img/teacher.png')-->
        <!--          "-->
        <!--          alt=""-->
        <!--          @click="switchPort"-->
        <!--        />-->
        <img
          class="portClass c-u f-l"
          :src="
            portType=require('../assets/img/teacher.png')
          "
          alt=""
          @click="switchPort"
        />
        <div class="info-mess f-l p-r c-u" @mousemove="showHlep = true" @mouseleave="showHlep = false">
          <div class="tximg-box p-r">
            <img class="tx-img" :src="avatarUrl" alt="">
            <span class="mess-num p-a">20</span>
          </div>
          <span class="login-name">{{ roleName }}</span>
          <img class="down" src="../assets/img/down.png" alt="">
        </div>
        <ul class="pull-down p-a" v-if="showHlep" @mousemove="showHlep = true" @mouseleave="showHlep = false">
          <li class="c-u">帮助中心</li>
          <li class="c-u">退出</li>
        </ul>
      </div>
      <!-- 站位 -->
      <div class="suspend">
        <ul>
          <div :class="{ closeClass: close }">
            <li class="icon">
              <img src="../assets/img/wenhao.png" alt=""/>
            </li>
            <li class="icon xkicon">选课</li>
          </div>
          <li class="icon" @click="close = !close">
            <img
              :style="`transform: rotate(${close ? '180deg' : '0deg'});`"
              src="../assets/img/top.png"
              alt=""
              @click="jumpTop"
            />
          </li>
        </ul>
        <div v-if="!close && !closeArrows" class="suspend-arrows">
          <div>选课开放</div>
          <div>2021年1月23日23:55截止，不要错过哟!</div>
          <img src="../assets/img/close.png" @click="closeArrows = !closeArrows" class="arrows-close" alt="">
        </div>
        <div class="aperture" v-if="!close"></div>
      </div>
    </div>
    <!-- 站位 -->
  </div>
</template>

<script>
export default {
  name: "JwHeader",
  data() {
    return {
      headeList: [],
      activeStatus: 0,
      avatarUrl: "",
      roleName: "",
      userId: "",
      portType: false,
      showHlep: false
    };
  },
  created() {
    this.getLoginInfo();
    this.loadData();
    let url = window.location.href.split('?')[1].split('=')[1];
    this.activeStatus = url;
  },
  methods: {
    // 切换端
    switchPort() {
      this.portType = !this.portType;
      window.location.href = "http://www.estudy.nsa/study/class";
    },
    checkMenu(item) {
      this.activeStatus = item.id;
      this.$router.push({path: item.path, query: {id: item.id}})
    },
    checkSonMenu(url) {
      window.location.href = url;
    },
    hover(item) {
      this.moveActive = item.id;
      this.clickActive = item.id;
    },
    leave(item) {
      this.moveActive = -1;
      this.clickActive = -1;
    },
    loadData() {
      var that = this;
      this.$get('cms-web/ad/navigation/api').then(res => {
        that.headeList = res.data;
        console.log(that.headeList)
      })
    },
    jumpTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    login() {
      window.location.href = "http://www.estudy.nsa/sso/login?tenant_id=1&service=http%3A%2F%2Fwww.estudy.nsa%2F";
    },
    getLoginInfo() {
      var userId = this.$common.getUrlKey("ticket", window.location.href);
      this.$get("cms-web/user/api", {ticket: userId}).then(res => {
        if (res.data != null && res.data != undefined) {
          this.avatarUrl = res.data.avatarUrl;
          this.roleName = res.data.name;
          this.userId = res.data.userId;
        }
      });
    }
  },
};
</script>

<style lang='scss' scoped>
@keyframes move_ {
  20%,
  60% {
    transform: translateX(40px);
  }
  40%,
  80%,
  100% {
    transform: translate(0);
  }
}

@-webkit-keyframes move_ {
  20%,
  60% {
    -webkit-transform: translateX(40px);
  }
  40%,
  80%,
  100% {
    -webkit-transform: translate(0);
  }
}

@-moz-keyframes move_ {
  20%,
  60% {
    -moz-transform: translateX(40px);
  }
  40%,
  80%,
  100% {
    -moz-transform: translate(0);
  }
}

@-o-keyframes move_ {
  20%,
  60% {
    -o-transform: translateX(40px);
  }
  40%,
  80%,
  100% {
    -o-transform: translate(0);
  }
}

.header-box {
  width: 100%;
  background-color: #1a56a8;
  color: #ffffff;
  height: 72px;
  line-height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  .suspend {
    position: fixed;
    bottom: 100px;
    right: 2%;

    ul {
      div {
        transition: all 0.3s;
        height: 160px;
        overflow: hidden;
      }
    }

    .closeClass {
      height: 0 !important;
    }

    li {
      margin-top: 20px;
      background-color: rgba(127, 178, 221, 0.9);
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 100px;
      cursor: pointer;
    }

    .xkicon {
      background-color: rgb(255, 172, 111);
      position: relative;
      z-index: 999999;
    }

    .aperture {
      animation: anim 1s ease-out infinite;
      position: absolute;
      top: 100px;
      // bottom: 0;
      // left: 0;
      right: 0;
      width: 60px;
      height: 60px;
      border-radius: 100px;
      background-color: rgb(255, 172, 111);
      z-index: 99999;
    }

    @keyframes anim {
      0% {
        transform: scale(0);

        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      100% {
        transform: scale(1.5);

        opacity: 0;
      }
    }

    img {
      width: 35px;
      height: 35px;
      display: inline-block;
      vertical-align: middle;
      transition: all 0.3s;
    }

    .suspend-arrows {
      padding: 30px 30px;
      background: url(../assets/img/selectCourseBg.svg) no-repeat;
      background-size: 100% 100%;
      width: 400px;
      height: 125px;
      position: absolute;
      top: 35%;
      right: 200%;
      animation: move_ 3s infinite;

      .arrows-close {
        position: absolute;
        top: 10px;
        right: 30px;
        width: 25px;
        height: 25px;
      }

      div {
        line-height: 26px;
        font-size: 16px;

        &:first-child {
          font-size: 18px;
        }
      }

      &.hide {
        display: none;
      }

      &.move {
        animation: move_ 2s infinite;
      }

      &:hover {
        animation: move_ 2s linear paused;
      }
    }
  }

  .menu-select {
    top: 72px;
    left: 0;
    transform: all 0.3s;
    height: 0;
    overflow: hidden;
  }

  .menu-s-active {
    height: auto !important;
  }

  .menu-s-list {
    // border-top: 1px solid #ffffff;
    // height: 10px;
    padding: 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgba(76, 137, 220, 0.7);
    border-top: 1px solid #7dc0ff;
  }

  .h-content {
    //
    .logo {
      // float: left;
      width: 195px;
      height: 62px;
      // left: 0;
      margin-top: 6px;
      // vertical-align: middle;
    }

    .h-menu {
      margin-left: 114px;

      .h-menu-list {
        padding: 0 20px;
        margin-right: 10px;
        font-size: 18px;
        cursor: pointer;
        text-align: center;
      }

      .h-menu-list:hover,
      .activeClass {
        background-color: #4c89dc;
      }
    }

    .login-after {
      right: 128px;
      width: 290px;
      height: 38px;
      margin-top: -19px;

      .info-mess {
        line-height: 38px;
      }

      .portClass {
        width: 125px;
        height: 38px;
        margin-right: 20px;
      }

      .tximg-box {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;
        line-height: 35px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #f7f7f7;
        }

        .mess-num {
          right: -10px;
          top: -5px;
          height: 18px;
          line-height: 18px;
          background: #ff5e4a;
          color: #fff;
          font-size: 12px;
          border-radius: 13px;
          padding: 0 5px;
        }
      }

      .login-name {
        line-height: normal;
        font-size: 15px;
        color: #fff;

        &:hover {
          color: #0067f7;
        }
      }

      .down {
        width: 15px;
        height: 10px;
        line-height: 15px;
      }

      .pull-down {
        width: 110px;
        background-color: #ffffff;
        color: #333333;
        right: 0;
        top: 40px;
        text-align: center;
        border-radius: 6px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);
        // display: none;
        // &:hover{
        //   display: inline-block;
        // }
        li {
          font-size: 16px;
          line-height: 50px;

          &:hover {
            color: #0067f7;
          }
        }
      }
    }

    .login-btn {
      width: 108px;
      height: 41px;
      border-radius: 100px;
      background-color: #f1df05;
      color: #000000;
      right: 0;
      margin-top: -20.5px;
      text-align: center;
      line-height: 41px;

      img,
      span {
        vertical-align: middle;
        font-size: 18px;
        color: #0b0055;
      }

      img {
        width: 17px;
        height: 18px;
        margin-right: 3px;
      }
    }
  }
}
</style>
