import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Ordered     = resolve => require(['../components/ordered'], resolve) //服务预约
const ServiceList = resolve => require(['../components/service_list'], resolve) //服务预约列表
const OrderDetial = resolve => require(['../components/order_detial'], resolve) //预约详情
const WorkDetial  = resolve => require(['../components/work_detial'], resolve) //派工详情
const Evaluate    = resolve => require(['../components/evaluate'], resolve) //评论
const Error       = resolve => require(['../components/Error'], resolve) //错误页面

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ordered',
      component: Ordered
    },
    {
      path: '/serviceList',
      name: 'ServiceList',
      component: ServiceList
    },
    {
      path: '/orderDetial',
      name: 'OrderDetial',
      component: OrderDetial
    },
    {
      path: '/workDetial',
      name: 'WorkDetial',
      component: WorkDetial
    },
    {
      path: '/evaluate',
      name: 'Evaluate',
      component: Evaluate
    },
    {
      path: '/*',
      name: 'error',
      component: Error
    }
  ]
})
