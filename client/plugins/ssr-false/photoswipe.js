/**
 *  图片展示
 **/
import Vue from 'vue';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

Vue.prototype.$PhotoSwipe = PhotoSwipe;
Vue.prototype.$PhotoSwipeUI_Default = PhotoSwipeUI_Default;
