import { createApp } from "vue";
import VueTippy from "vue-tippy";
import Toast from "~/components/Toast.vue";
import App from "~/App.vue";

import "tippy.js/dist/tippy.css";

createApp(App)
  .component("Toast", Toast)
  .directive("resizable", {
    updated(el) {
      el.addEventListener("input", (e: any) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      });
    },
  })
  .use(VueTippy, {
    directive: "tooltip",
    component: "Tooltip",
    defaultProps: {
      placement: "bottom",
      offset: [0, 30],
    },
  })
  .mount("#app");
