import Vue from 'vue'
import Alert from '../../components/alert'

export default ({ app }, inject) => {
  let divEl = document.createElement('div')
  let AlertCtor = Vue.extend(Alert)
  let vm = new AlertCtor()
  
  // 将元素放入 dom
  document.body.appendChild(divEl)
  
  // 挂载
  vm.$mount(divEl)
  
  // 注入 nuxt
  inject('alert', {
    show (color, text, timeout = 4000) {
      vm.color = color
      vm.text = text
      vm.timeout = timeout
      vm.isShow = true
    },
    hide () {
      vm.isShow = hide
    }
  })
}
