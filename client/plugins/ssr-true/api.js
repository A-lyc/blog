import api from '../../api'

export default function (context, inject) {
  inject('api', api(context))
}
