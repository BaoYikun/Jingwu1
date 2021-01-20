<template>
  <div class="forumBox">
    <div class="custom-title w f-l">
      <img class="f-l" src="../../../assets/img/index-bbs.png"/>
      <a class="f-r">查看更多 ></a>
    </div>
    <div class="forum-content">
      <div class="forum-c-b">
        <div class="f-c-t forum-new">
          <img src="../../../assets/img/bbs-new.png">
          <span>最新贴</span>
        </div>
        <div class="forum-l-box">
          <div class="forum-list" v-for="(item,index) in newForum" :key="index">
            <i class="forum-icon"></i>
            <div class="forum-r">
              <p class="forum-l-title">{{ item.title }}</p>
              <div class="forum-h-hint">
                <span>发布日期：{{ item.postTime }}</span>
                <span>回复人数：{{ item.viewTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="forum-c-b">
        <div class="f-c-t forum-reply">
          <img src="../../../assets/img/bbs-reply.png">
          <span>最新回复贴</span>
        </div>
        <div class="forum-l-box">
          <div class="forum-list" v-for="(item,index) in latestReplyForum" :key="index">
            <i class="forum-icon"></i>
            <div class="forum-r">
              <p class="forum-l-title">{{ item.title }}</p>
              <div class="forum-h-hint">
                <span>发布日期：{{ item.postTime }}</span>
                <span>回复人数：{{ item.viewTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="forum-c-b">
        <div class="f-c-t forum-hot">
          <img src="../../../assets/img/bbs-hot.png">
          <span>最热贴</span>
        </div>
        <div class="forum-l-box">
          <div class="forum-list" v-for="(item,index) in hotForum" :key="index">
            <i class="forum-icon"></i>
            <div class="forum-r">
              <p class="forum-l-title">{{ item.title }}</p>
              <div class="forum-h-hint">
                <span>发布日期：{{ item.postTime }}</span>
                <span>回复人数：{{ item.viewTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexLt",
  props: {
    imgUrl: "",
    url: "",
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
      newForum: [],
      hotForum: [],
      latestReplyForum: [],
    };
  },
  created() {
    console.log(this.imgUrl);
    this.loadData();
  },
  methods: {
    loadData() {
      this.$get("bbs/findTopicByType", {type: "hot"}).then((res) => {
        this.hotForum = res;
      });
      this.$get("bbs/findTopicByType", {type: "new"}).then((res) => {
        this.newForum = res;
      });
      this.$get("bbs/findTopicByType", {type: "latestReply"}).then((res) => {
        this.latestReplyForum = res;
      });
    },
    getImgUrl() {
      let url = '';
      this.imgList.forEach((item) => {
        if (item.name == this.imgUrl) {
          url = item.url;
        }
      });
      return url;
    }
  },
};
</script>
<style scoped lang='scss'>

/* 论坛 */
.forumBox {
  width: 80%;
  height: 500px;
  margin: 0 auto
}

.forumBox .forum-title {
  height: 10%;
  width: 100%;
}

.forumBox .forum-title a {
  float: right;
  margin-top: 10px;
  color: #403E3E
}

.forumBox .forumBox {
  width: 100%;
  height: 90%
}

.forumBox .forum-c-b {
  background-color: #FFFFFF;
  float: left;
  border-radius: 10px;
  width: 32.4%;
  margin-right: 1.4%;
  padding: 27px 32px;
  box-sizing: border-box;
}

.forumBox .forum-c-b:last-child {
  margin-right: 0;
}

.forumBox .forum-c-b .f-c-t img {
  width: 28px;
  margin-right: 5px;
  vertical-align: middle;
}

.forumBox .forum-c-b .f-c-t span {
  font-size: 23px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #1452DB;
}

.forumBox .forum-c-b .forum-reply span {
  color: #27AC3E;
}

.forumBox .forum-c-b .forum-hot span {
  color: #FE880A;
}

.forumBox .forum-list {
  width: 100%;
  float: left;
  margin-top: 27px;
  margin-bottom: 5px;
}

.forumBox .forum-list .forum-icon {
  float: left;
  width: 26px;
  height: 26px;
  background: url(../../../assets/img/bbs-number.png) no-repeat 100%;
  margin-right: 9px;
}

.forumBox .forum-list:first-child .forum-icon {
  background-position: 0% -2%;
}

.forumBox .forum-list:nth-child(2) .forum-icon {
  background-position: 0% 26%;
}

.forumBox .forum-list:nth-child(3) .forum-icon {
  background-position: 0% 50%;
}

.forumBox .forum-list:nth-child(4) .forum-icon {
  background-position: 0% 75%;
}

.forumBox .forum-list:nth-child(5) .forum-icon {
  background-position: 0% 100%;
}

.forumBox .forum-r {
  float: left;
  width: 84%;
  overflow: hidden;
}

.forumBox .forum-r p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #4E4E4E;
  margin-bottom: 8px;
}

.forumBox .forum-h-hint {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #898989;
  line-height: 22px;
}

.forumBox .forum-h-hint span {
  margin-right: 15px;
}
</style>
