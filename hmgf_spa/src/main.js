// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import page from 'page'
import store from './store'
import routes from './routes'

import AppStyles from './AppStyles' // eslint-disable-line no-unused-vars

const app = new Vue({
  el: '#app',
  store,
  data: {
    ViewComponent: { render: h => h('div', 'loading...') }
  },
  render (h) { return h(this.ViewComponent) }
})

Object.keys(routes).forEach(route => {
  const Component = require('./views/' + routes[route] + '.vue')
  page(route, () => { app.ViewComponent = Component })
})

page('*', () => { app.ViewComponent = require('./views/404.vue') })
page()
