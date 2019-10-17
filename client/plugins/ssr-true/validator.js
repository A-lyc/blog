import validator from 'validator'

export default ((context, inject) => {
  inject('validator', validator)
})
