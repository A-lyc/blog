// debug 版式统一，美化
import debug from 'debug';

export default function (...args) {
  const _debug = debug(...args);
  return function (...args) {
    _debug('');
    _debug('------------------------------------------');
    _debug(...args);
    _debug('------------------------------------------');
    _debug('');
  };
}
