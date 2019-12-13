const bodyElement = document.querySelector('body');

function bind(el, binding) {
  if (binding.arg) {
    startListening(el, binding);
  } else {
    stopListening(el);
  }
}

function startListening(el, binding) {
  if (!el._outsideClickData) {
    el._outsideClickData = {
      observedElement: bodyElement,
      isMobileApple: !!navigator.userAgent.match(/iPad|iPhone/i),
      hadFirstClick: false
    };
  }

  if (el._outsideClickData.callback) {
    el._outsideClickData.observedElement.removeEventListener('click', el._outsideClickData.callback);
  }

  el._outsideClickData.callback = function(event) {
    if (el._outsideClickData.hadFirstClick && !event.composedPath().includes(el)) {
      binding.value();
    }

    el._outsideClickData.hadFirstClick = true;
  }

  if (el._outsideClickData.isMobileApple) {
    bodyElement.style.cursor = 'pointer';
  }

  el._outsideClickData.observedElement.addEventListener('click', el._outsideClickData.callback);
}

function stopListening(el) {
  if (el._outsideClickData && el._outsideClickData.callback) {
    el._outsideClickData.observedElement.removeEventListener('click', el._outsideClickData.callback);
    el._outsideClickData.callback = null;

    if (el._outsideClickData.isMobileApple) {
      bodyElement.style.cursor = '';
    }
  }
}

const outsideClickDirective = {
  bind: bind,
  update: bind,
  unbind(el) {
    stopListening(el);
    el._outsideClickData = null;
  }
};

export default outsideClickDirective;
