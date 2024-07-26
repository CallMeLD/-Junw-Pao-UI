import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import 'vant/lib/index.css'

// 1. 引入你需要的组件
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import routes from "./config/route.ts";

const app = createApp(App);
// 3. 注册你需要的组件
app.use(Vant);
// 路由
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router);

app.mount('#app')
