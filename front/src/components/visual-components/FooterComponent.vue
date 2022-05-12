<template>
  <footer>
    <nav>
      <router-link to="/about">A propos</router-link>
      <router-link to="/moderation-rules">Règles de modération</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/Terms of Use">CU</router-link>
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
  height: 80px;
  background-color: white;
  box-shadow: 0px -1px 6px 0px #00000025;
  text-align: right;
  display: block;
}

@media (max-width: 650px) {
  a {
    font-size: 12px;
    text-align: center;
  }
}
</style>
