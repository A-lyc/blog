import Vue from 'vue'

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// 引入所有默认规则，也可以选择部分规则引入
import * as rules from 'vee-validate/dist/rules'
// 错误提示语言包，内置了各种语言的
import cn from 'vee-validate/dist/locale/zh_CN'

// 引入所有默认规则
// 并指定 cn 为其错误语言
for (let rule in rules) {
  extend(rule, {
    ...rules[ rule ], // add the rule
    message: cn.messages[ rule ] // add its message
  })
}

// 注册组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
