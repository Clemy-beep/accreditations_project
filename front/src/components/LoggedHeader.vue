<template>
  <header>
    <div id="logo">
      <img src="../assets/images/logo.png" alt="logo" />
      <h1>
        <router-link to="/home">CMDB</router-link>
      </h1>
    </div>
    <nav>
      <div id="mobile-links">
        <router-link to="/submit-pin" id="small-screen-submit"
          ><span class="material-symbols-outlined"> post_add </span>
        </router-link>
        <router-link
          v-if="user.role === 'MODERATOR'"
          to="/moderate"
          id="small-screen-moderate"
          ><span class="material-symbols-outlined"> shield </span></router-link
        >
        <router-link
          to="/admin"
          v-if="user.role === 'ADMIN'"
          id="small-screen-admin"
          ><span class="material-symbols-outlined">
            admin_panel_settings
          </span></router-link
        >
        <router-link to="/search" id="small-screen-search"
          ><span class="material-symbols-outlined"> search </span></router-link
        >
        <router-link to="/profile" id="small-screen-profile"
          ><span class="material-symbols-outlined">
            account_circle
          </span></router-link
        >
        <router-link to="/" id="small-screen-logout"
          ><span class="material-symbols-outlined"> logout </span></router-link
        >
      </div>
      <div id="big-screen-links">
        <router-link to="/submit-pin" id="submit-text"
          >Publier une fiche</router-link
        >

        <router-link
          to="/moderate"
          v-if="user.role.toString() == 'MODERATOR'"
          id="modo-text"
          >Modération</router-link
        >

        <router-link id="admin-text" to="/admin" v-if="user.role === 'ADMIN'"
          >Admin</router-link
        >

        <router-link id="search-text" to="/search">Rechercher</router-link>

        <router-link id="profile-text" to="/profile">Profil</router-link>

        <router-link id="logout-text" to="/">
          Déconnexion
          <span
            class="material-symbols-outlined"
            style="vertical-align: middle"
          >
            logout
          </span></router-link
        >
      </div>
    </nav>
  </header>
</template>
<script setup>
import { userStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const store = userStore();
const router = useRouter();

if (!store.$state.user.id || !localStorage.getItem("token")) {
  console.log(store.$state.user);
  alert("Merci de vous reconnecter");
  router.replace("/");
}
const user = store.$state.user;
</script>
<style scoped>
* {
  color: white;
}

#mobile-links {
  display: none;
}
header {
  height: 84px;
  background-color: #9461ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 20px 4px #00000035;
}

#logo,
#big-screen-links {
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo {
  gap: 0.5em;
}
#big-screen-links {
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
@media (max-width: 1000px) {
  nav #big-screen-links a {
    font-size: 16px;
  }
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
  #mobile-links {
    display: flex;
    gap: 1em;
  }
  #big-screen-links {
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
