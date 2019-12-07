# v-outside-click

**requires Vue 2.6+**

Vue directive, which executes callback passed as value, on body click event, when dynamic argument is `true`, and element, which has directive binded is not in event composed path.

## Installation

Just import and install it like vue.js plugin.

```
import vOutsideClick from 'v-outside-click';

Vue.use(vOutsideClick);
```

You can also import just directive and add custom name to it, like shown below:

```
import {outsideClickDirective} from 'v-outside-click';

Vue.directive('custom-outside-name', outsideClickDirective);
```

## Usage

Let's say you have some custom drop down list component, and you want to close it when user clicks outside it. You can solve this problem in different ways. One solution is to set event listener on body element, and stop propagation for click event on your component, but that's not very good practice. Other is to check event composed path, and execute close method if main element is not there (this one's better). `v-outside-click` directive helps you implement this solution easier. Example below should make it clear:

```
// dropdownExample.vue

<template>
  <div
    class="dropdown"
    v-outside-click:[isOpen]="close"
  >
    <button
      class="dropdown__toggle"
      @click="toggleList"
    >
      Toggle list
    </button>
    <ul
      v-if="isOpen"
      class="dropdown__list"
    >
      <li>Some list element</li>
      <li>Some other element</li>
      <li>Last element</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggleList() {
        this.isOpen = !this.isOpen;
      },
      close() {
        this.isOpen = false;
      }
    }
  };
</script>
```

Directive adds event listener to body click events only, if passed attribute is `true`, otherwise it removes event listener.
