import Vue from 'vue';
import Alert from '../components/alert';

export default ({ app }, inject) => {
  let divEl = document.createElement('div');
  let Profile = Vue.extend(Alert);
  let vm = new Profile();
  
  // 将元素放入 dom
  document.body.appendChild(divEl);
  
  // 挂载
  vm.$mount(divEl);
  
  // 防止 next 在 客户端 对比 dom 时的报错
  inject('alert', {
    show (color, text, timeout = 4000) {
      vm.color = color;
      vm.text = text;
      vm.timeout = timeout;
      vm.isShow = true;
    },
    hide () {
      vm.isShow = hide;
    }
  });
}
