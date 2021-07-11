import { Quasar, QuasarPluginOptions } from "quasar";
import materialIconSet from "quasar/icon-set/svg-material-icons";
import { createApp } from "vue";
import VueTippy from "vue-tippy";
import Toast, { PluginOptions } from "vue-toastification";
import App from "~/App.vue";
import { router } from "~/Router";

import "virtual:windi.css";
import "tippy.js/dist/tippy.css";
import "vue-toastification/dist/index.css";
import "quasar/dist/quasar.prod.css";

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
  .use(Quasar, <Partial<QuasarPluginOptions>>{
    config: {
      brand: {
        primary: "#3a3f44",
        secondary: "#7a8288",
        success: "#62c462",
        info: "#5bc0de",
        warning: "#f89406",
        danger: "#ee5f5b",
        light: "#e9ecef",
        dark: "#272b30",
      },
      supportTS: true,
    },
    iconSet: materialIconSet,
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
