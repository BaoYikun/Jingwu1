<template>
  <!-- 分类筛选 -->
  <div class="cate-filter w container">
    <div class="class-filter w f-l">
      <div class="c-f-title f-l">
        <img src="../../../assets/img/filter-category.png" alt=""/>
        <span>课程分类</span>
      </div>
      <ul class="f-l">
        <li
          class="f-l"
          @click="classCateCheck('classCate', item)"
          :class="{ 'class-active': item.id == classCate }"
          v-for="(item, index) in classList"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="class-filter w f-l">
      <div class="c-f-title f-l">
        <img src="../../../assets/img/filter-status.png" alt=""/>
        <span>课程状态</span>
      </div>
      <ul class="f-l">
        <li
          class="f-l"
          @click="classCateCheck('classStatus', item)"
          :class="{ 'class-active': item.id == classStatus }"
          v-for="(item, index) in classStatusList"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexKC",
  props: {
    type: ""
  },
  data() {
    return {
      // 课程分类
      classList: [
        {
          id: 0,
          title: "全部",
        }
      ],
      // 课程状态
      classStatusList: [
        {
          id: 0,
          title: "全部",
        }
      ],
      // 课程分类激活状态
      classCate: 0,
      // 课程状态激活状态
      classStatus: 0,
    };
  },
  created() {
    console.log("执行方法")
    this.loadData();
  },
  methods: {
    classCateCheck(type, item) {
      this[type] = item.id;
      console.log("this[type]===="+this[type])
      console.log("this===="+type)
      if (type=="classCate"){
        this.$emit("categoryId", item.id);
      }
      if (type=="classStatus"){
        this.$emit("classType", item.id);
      }
      this.$emit("loadData")
    },
    loadData() {
      if (this.type == "course") {
        var params = {
          rnd: new Date().getTime()
        };
        this.$get("cms-web/categorys/api", params).then((res) => {
          res.data.forEach(i => {
            this.classList.push({id: i.categoryId, title: i.categoryName});
          });
          this.classStatusList.push(
            {id: 10, title: "待发布"},
            {id: 20, title: "预发布"},
            {id: 30, title: "已发布"},
            {id: 40, title: "关闭"},
          )
        });
      }
    }
  },
};
</script>
<style scoped lang='scss'>
.cate-filter {
  background-color: #ffffff;
  padding: 30px 19px;
  height: 147px;

  .class-active {
    background-color: #1fb7ff;
    color: #ffffff;
    border-radius: 100px;
  }

  .class-filter:first-child {
    margin-bottom: 26px;
  }

  img {
    width: 22px;
    height: 22px;
    margin-right: 12px;
    vertical-align: middle;
  }

  span {
    font-size: 18px;
    color: #000000;
    margin-right: 26px;
    vertical-align: middle;
  }

  ul {
    vertical-align: middle;
  }

  li {
    font-size: 18px;
    margin-right: 13px;
    padding: 3px 8px;
    color: #333333;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
