import outsideClickDirective from './outsideClickDirective.js';

const vOutsideClick = {
  install(Vue) {
    Vue.directive('outside-click', outsideClickDirective);
  }
};

export default vOutsideClick;
export outsideClickDirective;
