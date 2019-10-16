import cookies from 'js-cookie';

export default function ({ app }, inject) {
  inject('cookies', cookies);
}
