<template>
  <router-view />
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/visual-components/FooterComponent.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    FooterComponent,
  },
});
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  min-height: calc(100vh - 3px);
  grid-template-rows: auto 1fr auto;
  align-items: center;
}

footer {
  overflow-x: clip;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
