import createApi from '../../api'

export default function (context, inject) {
  inject('api', createApi(context))
}
