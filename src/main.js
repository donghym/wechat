// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/common.css'
import FastClick from 'fastclick';


Vue.config.productionTip = false

import {
	Dialog,
	Input,
	Select,
	DatePicker,
	Form,
  	Option,
	FormItem,
	Button,
	Card,
	Loading,
	Rate,
	Upload,
	Row,
	Col,
  	Notification,
  	Radio,
  	Checkbox,
  	CheckboxGroup,
  	Pagination,
  	Message,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Button)
Vue.use(Rate)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = binding.value
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
