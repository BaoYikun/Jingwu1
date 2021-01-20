<template>
  <div class="customBox container">
    <div class="custom-title w f-l">
      <img class="f-l" :src="getImgUrl()"/>
      <a class="f-r" @click="pageJump()">更多课程 ></a>
    </div>
    <div class="custom-content w f-l">
      <div class="custom-list-box">
        <div class="polaroid f-l" v-for="(item, index) in newCourse" :key="index" @click="jumpChild(item)">
          <img
            class="polaroid-img"
            :src="item.courseCover"
            alt="Norway"
            style="width: 100%"
          />
          <div class="w">
            <p class="c-l-t">{{ item.className }}</p>
            <div class="c-l-b">
              <span class="c-l-time">课程时长：{{ item.studyHour }}分钟</span>
              <span class="c-l-num">学习人数：{{ item.userNum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-box">
        <p class="hot-title">近一个月最热课程</p>
        <ul class="hot-list-box">
          <li class="hot-list" v-for="(item, index) in hotCourse" :key="index">
            <i class="h-l-icon"></i>
            <span class="h-l-title"
            >{{ item.className }}</span
            >
            <div class="hot-num-box">
              <img class="h-l-h-icon" src="../../../assets/img/list-hot.png"/>
              <span class="h-l-num">{{ item.userNum }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexKC",
  props: {
    imgUrl: "",
    newCourseInfo: {},
    hotCourseInfo: {}
  },
  data() {
    return {
      imgList: [
        {name: "index-bbs", url: require("../../../assets/img/index-bbs.png")},
        {name: "index-jiaoshi", url: require("../../../assets/img/index-jiaoshi.png")},
        {name: "index-kecheng", url: require("../../../assets/img/index-kecheng.png")},
        {name: "index-zhuanjia", url: require("../../../assets/img/index-zhuanjia.png")},
        {name: "index-zonghe", url: require("../../../assets/img/index-zonghe.png")},
      ],
      hotCourse: [],
      newCourse: []
    };
  },
  created() {
    console.log(this.imgUrl);
    this.loadData();
  },
  methods: {
    loadData() {
      this.infoUrl=this.n
      this.$get(this.newCourseInfo.url, this.newCourseInfo).then((res) => {
        console.log(res);
        if (res.dataList.length > 8) {
          for (var i = 0; i < 8; i++) {
            this.newCourse.push(res.dataList[i]);
          }
        } else {
          this.newCourse = res.dataList;
          console.log("newCourse===========" + this.newCourse)
        }
      });
      this.$get(this.hotCourseInfo.url, this.hotCourseInfo).then((res) => {
        console.log(res);
        if (res.dataList.length > 6) {
          for (var i = 0; i < 6; i++) {
            this.hotCourse.push(res.dataList[i]);
          }
        } else {
          this.hotCourse = res.dataList;
          console.log("hotCourse===========" + this.hotCourse)
        }
      });
    },
    pageJump() {
      this.$router.push({path:this.newCourseInfo.jumpPage})
    },
    jumpChild(itme){
      this.$router.push({path:`/cms-web/#/courses/detail/${itme.classId}`})
    },
    getImgUrl() {
      let url = '';
      this.imgList.forEach((item) => {
        if (item.name == this.imgUrl) {
          url = item.url;
        }
      });
      return url;
    },
  },
};
</script>
<style scoped lang='scss'>
.customBox {
  // width: 80%;
  height: 500px;
  margin: 0 auto;

  .custom-content {
    height: 500px;

    .custom-list-box {
      border-radius: 10px;
      width: 1155px;
      background-color: #ffffff;
      float: left;
      padding: 33px 26px 7px 28px;
      margin-right: 20px;

      .polaroid {
        width: 23.6%;
        margin-right: 20px;
        margin-bottom: 19px;

        &:nth-child(4n + 4) {
          margin-right: 0;
        }

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
    }

    .hot-box {
      width: 361px;
      background-color: #ffffff;
      float: right;
      padding: 19.5px 20px;
      box-sizing: border-box;
      border-radius: 10px;

      .hot-title {
        font-size: 23px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #14130f;
        margin: 0;
      }

      .hot-list-box {
        margin: 0;
        padding: 0;
        list-style-type: none;
        width: 100%;
        overflow: hidden;

        .hot-list {
          width: 100%;
          padding: 9px 0;
          float: left;
          border-bottom: 1px solid #ededed;

          &:last-child {
            border-bottom: 0;
          }

          .h-l-icon {
            display: inline-block;
            width: 22px;
            height: 49px;
            background: url(../../../assets/img/ph-number.png) no-repeat 100%;
            background-size: 100%;
            float: left;
          }

          &:first-child .h-l-icon {
            background-position: 0% -2%;
          }

          &:nth-child(2) .h-l-icon {
            background-position: 0% 18%;
          }

          &:nth-child(3) .h-l-icon {
            background-position: 0% 40%;
          }

          &:nth-child(4) .h-l-icon {
            background-position: 0% 60%;
          }

          &:nth-child(5) .h-l-icon {
            background-position: 0% 80%;
          }

          &:nth-child(6) .h-l-icon {
            background-position: 0% 102%;
          }

          .h-l-title {
            width: 65%;
            margin: 0 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 4px;
            float: left;
            line-height: 49px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #434040;
          }

          .hot-num-box {
            float: right;
            line-height: 49px;

            .h-l-h-icon {
              width: 12px;
              height: 14px;
              margin-right: 3px;
            }

            .h-l-num {
              color: #969696;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
