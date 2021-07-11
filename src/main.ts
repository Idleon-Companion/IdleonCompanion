import { createApp } from "vue";
import VueTippy from "vue-tippy";
import Toast, { PluginOptions } from "vue-toastification";
import App from "~/App.vue";
import { router } from "~/router";

import "virtual:windi.css";
import "tippy.js/dist/tippy.css";
import "vue-toastification/dist/index.css";

const toastOptions: PluginOptions = {
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  showCloseButtonOnHover: true,
  timeout: 2500,
};
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
  .use(Toast, toastOptions)
  .use(router)
  .mount("#app");
