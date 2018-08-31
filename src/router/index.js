import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/pages/error'
import email from '@/pages/email'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'email',
      component: email
    },
    {
      path: '/404',
      name: 'error-page',
      component: ErrorPage,
      meta: {
        title: '404'
      }
    },
    // email
    {
      path: '/email',
      name: 'email',
      component: email,
      meta: {
        title: 'email'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
