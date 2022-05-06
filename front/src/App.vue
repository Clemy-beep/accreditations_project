<template>
  <router-view />
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  components: {
    FooterComponent,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
