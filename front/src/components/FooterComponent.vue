<template>
  <footer>
    <nav>
      <router-link to="/about">About</router-link>
      <router-link to="/moderation-rules">Moderator Rules</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/Terms of Use">ToU</router-link>
    </nav>
  </footer>
</template>

<style scoped>
a {
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  color: #9461ff;
  text-decoration: none;
  margin: 0.5em;
  font-size: 18px;
}

a:hover,
a:focus {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  text-decoration: overline;
  text-decoration-color: #9461ff;
  font-weight: 500;
}

footer {
  margin: -6px;
  height: 80px;
  background-color: white;
  box-shadow: 0px -1px 6px 0px #00000025;
  width: 99.3vw;
  text-align: right;
  overflow-x: clip;
  overflow-y: clip;
}

@media (max-width: 650px) {
  a {
    font-size: 12px;
    text-align: center;
  }
}
</style>
