/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
pinia.use(piniaPluginPersistedState);
app.mount("#app");