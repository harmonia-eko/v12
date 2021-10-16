import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from 'quasar'
import "./assets/styles.scss";
import "@/styles/bootstrap-grid.css"
import './styles/quasar.scss'
import '@quasar/extras/mdi-v5/mdi-v5.css'
import {Buffer} from  "buffer"
(window as any).Buffer = (window as any).Buffer|| Buffer;
createApp(App).use(Quasar, {
  config: {
    brand: {
      primary: "#d4ac34",
      secondary: "#2D2D2D",
      // accent: '#9C27B0',
      // dark: '#1d1d1d',
      // positive: '#21BA45',
      // negative: '#C10015',
      // info: '#31CCEC',
      // warning: '#F2C037'
    }
  },
  plugins: {},
  iconSet: "mdi-v5"
})
  .use(router)
  .use(store)
  .mount("#app");
