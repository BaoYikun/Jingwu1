<template>
  <div class="home-index w">
    <!-- HEADER -->
    <jw-header></jw-header>
    <!-- 站位 -->
    <div class="w standing-position"></div>
    <!-- BANNER -->
    <div class="banner-box w p-r" align="center">
      <div class="banner-title">鲸武学堂，终身学习的课堂</div>
      <div class="search">
        <img class="f-l" src="../../assets/img/search.png" alt=""/>
        <input class="f-l h" type="text" placeholder="资源任您选，请输入您的关键词" v-model="searchParams"/>
        <button class="f-r" @click="jumpPage">搜索</button>
      </div>
    </div>
    <!-- CLASS -->
    <index-kc :newCourseInfo='newCourseInfo' :hotCourseInfo="hotCourseInfo" imgUrl='index-kecheng'></index-kc>
    <index-lt url=""></index-lt>
    <index-js :newTeacherInfo="newTeacher" :hotTeacherInfo="hotTeacher" imgUrl='index-jiaoshi'></index-js>
    <index-js :newTeacherInfo="newComp" :hotTeacherInfo="hotComp" imgUrl='index-zonghe'></index-js>
    <index-js :newTeacherInfo="newExpert" :hotTeacherInfo="hotExpert" imgUrl='index-zhuanjia'></index-js>
    <jw-footer></jw-footer>
  </div>
</template>

<script>
import indexKC from "./components/indexKC";
import indexLt from "./components/indexLt";
import indexJS from "./components/indexJS";

export default {
  name: "homeIndex",
  components: {
    "index-kc": indexKC,
    "index-js": indexJS,
    'index-lt': indexLt
  },
  data() {
    return {
      searchParams: "",
      newCourseInfo: {
        url: "cms-web/class/api",
        curPage: "1",
        pageSize: "8",
        newHot: "new",
        rnd: new Date().getTime(),
        jumpPage: "/courseIndex"
      },
      hotCourseInfo: {
        url: "cms-web/classByMonth/api",
        curPage: "1",
        pageSize: "8",
        newHot: "hot",
        rnd: new Date().getTime()
      },
      newTeacher: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "gongzuofang",
        type: "new",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime(),
        jumpPage: "/teacherWork"
      },
      hotTeacher: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "gongzuofang",
        type: "hot",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime()
      },
      newComp: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "zonghe",
        type: "new",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime(),
        jumpPage: "/comprehensiveArea"
      },
      hotComp: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "zonghe",
        type: "hot",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime()
      },
      newExpert: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "zhuanjia",
        type: "new",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime(),
        jumpPage: "/expertLecture"
      },
      hotExpert: {
        url: "cms-web/review/video/item/selectAll/api",
        leibie: "zhuanjia",
        type: "hot",
        curPage: "1",
        pageSize: "8",
        rnd: new Date().getTime()
      },
    };
  },
  methods: {
    jumpPage() {
      this.$router.push({path: "/searchFun", query: {param: this.searchParams}})
    }
  }
};
</script>
<style scoped lang='scss'>
.home-index {
  .banner-box {
    height: 448px;
    background: url("../../assets/img/banner-bg.jpg") no-repeat;
    background-size: 128% 100%;
    background-position: center center;
    padding: 116px 0 186px 0;

    .banner-title {
      font-size: 41px;
      color: #ffffff;
      margin-bottom: 35px;
    }

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
        margin-right: 19px;
        vertical-align: middle;
        line-height: 54px;
        margin-top: 10px;
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
        width: 72px;
        height: 41px;
        line-height: 41px;
        background: #1a56a8;
        border-radius: 100px;
        color: #ffffff;
        vertical-align: middle;
        border: none;
      }
    }
  }
}
</style>
