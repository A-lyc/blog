import debug from 'debug';
import _ from 'lodash';

export default function ({ app, store }, inject) {
  inject('debug', function (name) {
    let debug = debug('app:' + name);
    return function (...args) {
      debug(_.trim(`
        --------------------------------------
        ${ args }
        --------------------------------------
      `));
    };
  });
}
