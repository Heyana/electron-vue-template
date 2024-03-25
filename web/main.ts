import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "reset-css";
import "./assets/styles/origin-ex.less";
import "./assets/styles/global/global.less";
import "./permission";
import "./assets/styles/main.less";
import "./assets/fonts/iconfont/iconfont.css";
import App from "./App.vue";
import router from "./router";
import { errorHandler } from "./error";
import TitleBar from "./components/common/TitleBar.vue";
import store from "./store";
const app = createApp(App);
app.use(router);
app.use(store);

errorHandler(app);
// 全局引入 TitleBar 组件
app.component("TitleBar", TitleBar);
app.mount("#app");
