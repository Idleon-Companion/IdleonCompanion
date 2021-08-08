import { Quasar, QuasarPluginOptions } from "quasar";
import { createApp } from "vue";
import { router } from "~/Router";
import App from "~/App.vue";
import Toast, { PluginOptions } from "vue-toastification";
import VueTippy from "vue-tippy";

import "quasar/dist/quasar.prod.css";
import "tippy.js/dist/tippy.css";
import "virtual:windi.css";
import "vue-toastification/dist/index.css";
import mdiIconSet from "quasar/icon-set/svg-mdi-v5";

const toastOptions: PluginOptions = {
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  showCloseButtonOnHover: true,
  timeout: 2500,
};
createApp(App)
  .component("Toast", Toast)
  .use(Quasar, <Partial<QuasarPluginOptions>>{
    config: {
      brand: {
        primary: "#3a3f44",
        secondary: "#7a8288",
        info: "#5bc0de",
        warning: "#f89406",
        positive: "#62c462",
        negative: "#ee5f5b",
        light: "#e9ecef",
        dark: "#272b30",
      },
      supportTS: true,
    },
    iconSet: mdiIconSet,
  })
  .use(VueTippy, {
    directive: "tooltip",
    component: "Tooltip",
    defaultProps: {
      placement: "bottom",
      duration: 200,
    },
  })
  .use(Toast, toastOptions)
  .use(router)
  .mount("#app");
