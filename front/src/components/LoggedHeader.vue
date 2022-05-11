<template>
  <header>
    <div id="logo">
      <img src="../assets/images/logo.png" alt="logo" />
      <h1>
        <router-link to="/">CMDB</router-link>
      </h1>
    </div>
    <nav>
      <router-link to="/submit-pin" id="submit-text"
        >Publier une fiche</router-link
      >
      <router-link to="/submit-pin" id="small-screen-submit"
        ><span class="material-symbols-outlined"> post_add </span>
      </router-link>
      <router-link
        to="/moderate"
        v-if="user.role.toString() == 'MODERATOR'"
        id="modo-text"
        >Modération</router-link
      >
      <router-link
        v-if="user.role === 'MODERATOR'"
        to="/moderate"
        id="small-screen-moderate"
        ><span class="material-symbols-outlined"> shield </span></router-link
      >
      <router-link id="admin-text" to="/admin" v-if="user.role === 'ADMIN'"
        >Admin</router-link
      >
      <router-link
        to="/admin"
        v-if="user.role === 'ADMIN'"
        id="small-screen-admin"
        ><span class="material-symbols-outlined">
          admin_panel_settings
        </span></router-link
      >
    </nav>
  </header>
</template>
<script setup>
import { userStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const store = userStore();
const router = useRouter();
var user = {};
console.log(store.$state);

if (!store.$state.user.id || !localStorage.getItem("token")) {
  router.push("/");
}
user = store.$state.user;
console.log(user.role.toString());
</script>
<style scoped>
* {
  color: white;
}

#small-screen-moderate,
#small-screen-submit,
#small-screen-admin {
  display: none;
}
header {
  height: 84px;
  background-color: #9461ff;
  display: flex;
  justify-content: space-between;
}

#logo,
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo {
  gap: 0.5em;
}
nav {
  gap: 1.5em;
}

nav a {
  text-decoration: none;
  font-size: 20px;
  font-weight: normal;
}

h1 a {
  text-decoration: none;
}

nav a:hover,
nav a:focus {
  text-decoration: overline;
  text-decoration-style: 2px solid white;
}
h1 {
  font-family: "Popins", sans-serif;
  font-weight: 500;
  font-size: 20px;
}

nav {
  font-family: "Montserrat", sans-serif;
}

img {
  width: 64px;
  height: 64px;
  margin-left: 1em;
  margin-bottom: 10px;
}

nav a.router-link-exact-active {
  text-decoration: overline;
  text-decoration-color: white;
}

#small-screen-login {
  color: white;
  fill: white;
}

@media (max-width: 850px) {
  header {
    height: 60px;
  }
  img {
    height: 50px;
    width: 50px;
    align-self: center;
  }
  nav a,
  h1 {
    font-size: 16px;
  }
  #small-screen-admin,
  #small-screen-modo,
  #small-screen-submit {
    display: inline;
  }
  #modo-text,
  #admin-text,
  #submit-text {
    display: none;
  }
}

@media (max-width: 450px) {
  nav a,
  h1 {
    font-size: 14px;
  }
}
</style>
