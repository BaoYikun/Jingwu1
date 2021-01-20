<template>
  <div class="course-index w">
    <!-- HEADER -->
    <jw-header></jw-header>
    <!-- 站位 -->
    <div class="w standing-position"></div>
    <!-- 内容 -->
    <div class="custom-title container p-r">
      <img class="f-l" src="../../assets/img/index-kecheng.png"/>
      <div class="search f-l p-a">
        <img class="f-l" src="../../assets/img/search.png" alt=""/>
        <input class="f-l" type="text" placeholder="请输入您的关键词" v-model="searchParams"/>
        <button class="f-r" @click="search">搜索</button>
      </div>
    </div>
    <category :type="courstType" @loadData="loadData" @categoryId="getCategoryId" @classType="getClassType"></category>
    <!-- 最新最热 -->
    <div class="most-new-hot w container">
      <span
        class="f-l"
        :class="{ active: filtStatus == 0 }"
        @click="filtrate(0)"
      >最新</span
      >
      <span
        class="f-l"
        :class="{ active: filtStatus == 1 }"
        @click="filtrate(1)"
      >最热</span
      >
    </div>
    <!-- 课程列表 -->
    <div class="course-content w container">
      <div
        class="polaroid f-l p-r"
        @mouseover="mouseMove(index)"
        @mouseleave="mouseleave"
        :class="{ moveActive: moveStatus == index }"
        v-for="(item, index) in couresList"
        :key="index"
      >
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
        <div
          class="course-status p-a"
          v-if="moveStatus != index"
          :class="{ proceed: item.status=='40' }"
        >
          {{ courseStatus[item.status] }}
        </div>
        <!-- 课程信息 -->
        <div
          class="clss-info p-a"
          :style="`display:${moveStatus == index ? 'block' : 'none'}`"
        >
          <div>
            <img
              v-for="(i, index) in 5"
              :key="index"
              :src="
                index < item.avgScore
                  ? require('../../assets/img/star-active.png')
                  : require('../../assets/img/star.png')
              "
              alt=""
            />
          </div>
          <div class="class-time">开课时间：{{ item.startAt }}</div>
          <div class="class-info" v-html="item.courseIntro">
          </div>
        </div>
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
import category from "./components/category";

export default {
  name: "homeIndex",
  components: {
    category,
  },
  data() {
    return {
      searchParams: "",
      courstType: "course",
      categoryId: "",
      classType: "",
      total: "",
      currentPage: 1,
      pageSize: 25,
      // 最新最热激活状态
      filtStatus: 0,
      // 鼠标经过
      moveStatus: -1,
      couresList: [],
      courseStatus: {
        10: "待发布",
        20: "预发布",
        30: "已发布",
        40: "关闭"
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    filtrate(type) {
      this.filtStatus = type;
      this.loadData()
    },
    mouseMove(index) {
      this.moveStatus = index;
    },
    mouseleave() {
      this.moveStatus = -1;
    },
    loadData() {
      var hotNew = "new";
      if (this.filtStatus == 1) {
        hotNew = "hot";
      }
      var params = {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        newHot: hotNew,
        categoryId: this.categoryId,
        classType: this.classType,
        rnd: new Date().getTime()
      }
      this.$get("cms-web/class/api", params).then((res) => {
        console.log(res);
        res.dataList.forEach(i => {
          i.startAt = this.$common.dateFtt("yyyy-MM-dd", i.startAt)
        })
        this.total = parseInt(res.paging.total);
        this.currentPage = parseInt(res.paging.curPage);
        this.couresList = res.dataList;
      });
    },
    currentChange(current) {
      this.currentPage = current;
      this.loadData();
    },
    getCategoryId(childData) {
      if (childData != 0) {
        this.categoryId = childData;
      } else {
        this.categoryId = "";
      }
    },
    getClassType(childData) {
      if (childData != 0) {
        this.classType = childData;
      } else {
        this.classType = "";
      }
    },
    search() {
      var param = {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        search: this.searchParams,
        newHot: "new",
        rnd: new Date().getTime()
      };
      this.$get("cms-web/class/api", param).then((res) => {
        this.couresList = res.dataList;
        this.total = parseInt(res.paging.total);
        this.currentPage = parseInt(res.paging.curPage);
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

  .moveActive {
    border-radius: 5px;
    box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, 0.2);
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

  .most-new-hot {
    height: 49px;
    margin: 15px auto 22px auto;
    background-color: #ffffff;
    padding: 0 30px;

    span {
      font-size: 18px;
      color: #777777;
      line-height: 49px;
      display: inline-block;
      height: 100%;
      border-bottom: 4px solid transparent;
      margin-right: 70px;
      cursor: pointer;
    }

    span.active {
      color: #1a56a8;
      border-color: #1a56a8 !important;
    }
  }

  .polaroid {
    width: 18.3%;
    margin-right: 32px;
    background-color: #ffffff;
    cursor: pointer;

    .clss-info {
      top: 0;
      left: 0;
      right: 0;
      height: 159px;
      background-color: rgba(0, 0, 0, 0.75);
      padding: 14px 10px;
      color: #ffffff;
      font-size: 15px;
      display: none;

      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }

      .class-time {
        margin: 10px 0;
      }

      .class-info {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

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
