import Vue from 'vue'
import Router from 'vue-router'
import homeIndex from '@/view/homeIndex/index'
import courseIndex from '@/view/course/index'
import teacherWork from '@/view/teacherWork/index'
import comprehensiveArea from '@/view/comprehensiveArea/index'
import expertLecture from '@/view/expertLecture/index'
import searchFun from '@/view/searchFun/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: homeIndex
    },
    {
      path: '/courseIndex',
      name: 'courseIndex',
      component: courseIndex
    },
    {
      path: '/teacherWork',
      name: 'teacherWork',
      component: teacherWork
    },
    {
      path: '/comprehensiveArea',
      name: 'comprehensiveArea',
      component: comprehensiveArea
    },
    {
      path: '/expertLecture',
      name: 'expertLecture',
      component: expertLecture
    },
    {
      path: '/searchFun',
      name: 'searchFun',
      component: searchFun
    }
  ]
})
