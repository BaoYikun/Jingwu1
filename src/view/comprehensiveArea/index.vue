<template>
  <div class="course-index w">
    <!-- HEADER -->
    <jw-header></jw-header>
    <!-- 站位 -->
    <div class="w standing-position"></div>
    <!-- 内容 -->
    <div class="custom-title container p-r">
      <img class="f-l" src="../../assets/img/index-jiaoshi.png"/>
      <div class="search f-l p-a">
        <img class="f-l" src="../../assets/img/search.png" alt=""/>
        <input class="f-l h" type="text" placeholder="请输入您的关键词" v-model="searchInfo"/>
        <button class="f-r" @click="search">搜索</button>
      </div>
    </div>
    <!-- 分类 -->
    <div class="special-cate container">
      <div class="special-box">
        <span class="special-title">专题分类</span>
        <span class="special-list" @click="activeCheck('specialStatus',-1)"
              :class="{'special-active':specialStatus == -1}">全部</span>
        <span class="special-list" v-for="(item,index) in specialList" :key="item.id"
              @click="activeCheck('specialStatus',index)" :class="{'special-active':specialStatus == index}">
            <span>{{ item.title }}</span>
            <img
              :src="specialStatus == index ? require('../../assets/img/bottom-active.png') : require('../../assets/img/bottom.png')"
              alt="">
          </span>
      </div>
      <div class="small-special" v-if="specialStatus != -1">
        <span class="samll-list" @click="activeCheck('smallStatus','-1')" :class="{'small-l-active':smallStatus == -1}">全部</span>
        <span class="samll-list" v-for="(item1,index1) in specialList[specialStatus].smallList" :key='index1'
              @click="activeCheck('smallStatus',index1)"
              :class="{'small-l-active':smallStatus == index1}">{{ item1.title }}</span>
      </div>
    </div>
    <!-- 课程列表 -->
    <div class="course-content w container">
      <div class="polaroid f-l p-r" v-for="(item, index) in gongzuofangList" :key="index">
        <img
          class="polaroid-img"
          :src="item.courseCover"
          alt="Norway"
          style="width: 100%"
        />
        <div class="w title-box">
          <p class="c-l-t">{{ item.className }}</p>
          <div class="c-l-b">
            <span class="c-l-time">课程时长：{{ item.studyHour }}分钟</span>
            <span class="c-l-num">学习人数：{{ item.userNum }}</span>
          </div>
        </div>
        <!-- 课程状态 -->
        <!--        <div class="course-status pa" :class="{ proceed: item. }">-->
        <!--          未开始-->
        <!--        </div>-->
        <!-- 课程信息 -->
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="f-l"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="currentChange"
    >
    </el-pagination>
    <!-- 页脚 -->
    <jw-footer></jw-footer>
  </div>
</template>

<script>
export default {
  name: "homeIndex",
  components: {},
  data() {
    return {
      // 课程分类
      specialList: [],
      smallStatus: -1,
      // 激活分类
      specialStatus: -1,
      gongzuofangList: [],
      total: "",
      currentPage: 1,
      pageSize: 25,
      subjectId: "",
      searchInfo: ""
    };
  },
  created() {
    this.loadMenu();
    this.loadData();
  },
  methods: {
    activeCheck(type, index) {
      this.currentPage = 1;
      if (type == 'specialStatus') {
        this.smallStatus = -1
      }
      this[type] = index;
      if (this.specialStatus == "-1") {
        this.subjectId = "";
      } else {
        if (this.smallStatus != "-1") {
          this.subjectId = this.specialList[this.specialStatus].smallList[this.smallStatus].id;
        } else {
          this.subjectId = this.specialList[this.specialStatus].id;
        }
      }
      this.loadData();
    },
    loadMenu() {
      var params = {
        leibie: "zhuanjia",
        rnd: new Date().getTime()
      };
      this.$get("cms-web/review/subject/selectByLeibie/first/api", params).then((res) => {
        res.data.forEach(i => {
          var childMenu = [];
          var arrs = {
            parentId: i.subjectId,
            rnd: new Date().getTime()
          };
          this.$get("cms-web/review/subject/select/second/api", arrs).then((res1) => {
            res1.data.forEach(j => {
              childMenu.push({id: j.subjectId, title: j.subjectName, parentId: j.parentSubjectId});
            });
          });
          this.specialList.push({
            id: i.subjectId,
            title: i.subjectName,
            smallList: childMenu
          })
        });
      });
    },
    loadData() {
      if (this.subjectId == "") {
        var params = {
          leibie: "zhuanjia",
          type: "new",
          curPage: this.currentPage,
          pageSize: this.pageSize,
          rnd: new Date().getTime(),
        };
        this.$get("cms-web/review/video/item/selectAll/api", params).then((res) => {
          this.gongzuofangList = res.data.dataList;
          this.total = parseInt(res.data.paging.total);
          this.currentPage = parseInt(res.data.paging.curPage);
        });
      } else {
        var params = {
          subjectId: this.subjectId,
          curPage: this.currentPage,
          pageSize: this.pageSize,
          rnd: new Date().getTime()
        };
        this.$get("cms-web/review/video/subject/select/api", params).then((res) => {
          this.gongzuofangList = res.data.dataList;
          this.total = parseInt(res.data.paging.total);
          this.currentPage = parseInt(res.data.paging.curPage);
        });
      }
    },
    currentChange(current) {
      this.currentPage = current;
      this.loadData();
    },
    search() {
      this.$post("cms-web/review/video/like/select/api?curPage=" + this.currentPage + "&pageSize=" + this.pageSize, {leibie: "zhuanjia",searchParams: this.searchInfo}).then((res) => {
        this.gongzuofangList = res.data.dataList;
        this.total = parseInt(res.data.paging.total);
        this.currentPage = parseInt(res.data.paging.curPage);
      });
    }
  },
};
</script>
<style scoped lang='scss'>
.course-index {
  .course-content {
    display: table;
  }

  .special-cate {
    margin-bottom: 26px;
    font-size: 18px;

    .special-box {
      height: 44px;
      line-height: 44px;
      // background-color: #ffffff;
    }

    img {
      width: 14px;
      height: 14px;
      margin-left: 7px;
      vertical-align: middle;
    }

    .special-list {
      margin-left: 20px;
      padding: 0 17px;
      display: inline-block;
      height: 100%;
      cursor: pointer;
    }

    .special-active {
      background: #ffffff;
      color: #1A56A8;
    }

    .small-special {
      height: 49px;
      background-color: #ffffff;
      padding: 9px 10px;

      .samll-list {
        font-size: 18px;
        padding: 3px 8px 3px 9px;
        border-radius: 100px;
        margin-right: 30px;
        display: inline-block;
        cursor: pointer;
      }

      .small-l-active {
        background-color: #1FB7FF;
        color: #ffffff;
      }
    }
  }

  .custom-title {
    display: table;
    margin-bottom: 28px;
  }

  .search {
    left: 50%;
    margin-left: -382.5px;
  }

  .el-pagination {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .polaroid {
    width: 18.3%;
    margin-right: 32px;
    background-color: #ffffff;
    cursor: pointer;

    &:nth-child(5n + 5) {
      margin-right: 0;
    }

    img {
      width: 100%;
      height: 159px;
    }

    .title-box {
      padding: 0 9px 14px 9px;
    }

    .course-status {
      position: absolute;
      top: -3px;
      left: 9px;
      width: 31px;
      height: 70px;
      color: #fff;
      font-size: 15px;
      padding: 1px 8px 4px 8px;
      background-color: #bababa;
    }

    .proceed {
      background-color: #1aa874;
    }
  }
}
</style>
