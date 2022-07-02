<template>
  <div id="top-container">
    <div id="action-btns">
      <DeleteButton v-if="expression" :text="'Supprimer'" />
      <SecondaryButton :text="'Modifier'" />
    </div>
    <h1>{{ film.title }}</h1>
    <h2>
      <span class="material-symbols-outlined"> auto_awesome </span> 9.5/10
    </h2>
  </div>
  <UserInfos :user="author" :imgURL="imgURL" class="user" />
  <p
    id="status"
    v-if="film.status === 'waiting' || film.status === 'refused'"
    :class="
      film.status === 'waiting'
        ? 'waiting'
        : film.status === 'refused'
        ? 'refused'
        : 'accepted'
    "
  >
    En attente de modération
  </p>
  <div id="film">
    <div id="poster-container">
      <img
        id="poster"
        v-if="film.poster !== null"
        :src="film.poster"
        alt="poster"
      />
    </div>
    <div id="film-container">
      <div v-if="film.relaaseDate !== null">
        <h2>Date de sortie</h2>
        <p>{{ film.relaaseDate }}</p>
      </div>
      <div>
        <h2>Résumé</h2>
        <p>{{ film.resume }}</p>
      </div>
      <div v-if="film.casting.length > 0">
        <h2>Casting</h2>
        <p class="actor" v-for="(element, key) in film.casting" :key="key">
          {{ element.actor.firstname }} {{ element.actor.lastname }}
        </p>
      </div>
      <div id="technical-staff">
        <div v-if="film.realisator !== null">
          <h2>Réalisateur</h2>
          <p>{{ film.realisator.firstname }} {{ film.realisator.lastname }}</p>
        </div>
        <div v-if="film.producer !== null">
          <h2>Producteur</h2>
          <p>{{ film.producer.firstname }} {{ film.producer.lastname }}</p>
        </div>
      </div>
      <div v-if="film.genres.length > 0">
        <h2>Genres</h2>
        <div class="genres">
          <Badge
            v-for="(item, key) in film.genres"
            :key="key"
            :text="item.genre.name"
          />
        </div>
      </div>
      <div v-if="budget !== null">
        <h2>Budget</h2>
        <p>{{ film.budget }} $</p>
      </div>
      <div>
        <h2>Votre avis</h2>
        <p>{{ film.critic }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";
import DeleteButton from "@/components/visual-components/DeleteButton.vue";
import SecondaryButton from "@/components/visual-components/SecondaryButton.vue";
import UserInfos from "@/components/user-component/UserInfosLittle.vue";
import { filmsStore } from "@/stores/filmStore";
import Badge from "../visual-components/BadgeComponent.vue";

export default {
  components: {
    DeleteButton,
    SecondaryButton,
    UserInfos,
    Badge,
  },
  data() {
    return {
      imgURL: "",
      author: {},
      film: {},
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapState(filmsStore, ["userFilms"]),
  },
  created() {
    this.author = this.user;
    this.getimg();
    this.getFilm();
    this.getPoster();
  },
  methods: {
    ...mapActions(userStore, ["fetchAvatar", "fetchFollowers"]),
    ...mapActions(filmsStore, ["fetchPoster"]),
    getimg: async function () {
      this.imgURL = await this.fetchAvatar(this.user.id);
    },
    getFilm: function () {
      let filteredFilms = this.userFilms.find(
        (film) => film.id === parseInt(this.$route.params.id)
      );
      this.film = filteredFilms;
      this.film.relaaseDate = new Date(
        this.film.relaaseDate.split("T")[0]
      ).toLocaleDateString("fr");
    },
    getPoster: async function () {
      if (this.film.poster === null) return;
      try {
        this.film.poster = await this.fetchPoster(this.film.id);
      } catch (e) {
        console.log(e);
        this.film.poster = "";
      }
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  color: #9461ff;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
.actor {
  display: inline-flex;
  margin-right: 16px;
  text-decoration: underline #2c3e50;
}

#poster-container {
  height: 550px;
  width: 350px;
  background: linear-gradient(#ffe1e1, #f8ddff);
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px #00000025;
}

#poster {
  height: inherit;
  width: inherit;
  image-rendering: optimizeSpeed;
  border: none;
}

#film {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 32px auto;
  gap: 2em;
  max-width: 1000px;
}

#top-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  width: clamp(90vw, 80vw, 1000px);
  margin-top: 32px;
}

#technical-staff {
  display: flex;
  gap: 2em;
  align-items: center;
}
.user {
  height: 64px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 0;
}

p {
  margin-top: 4px;
}

.waiting {
  font-weight: 400;
  color: white;
  background-color: #ff8c5b;
  padding: 0.5em;
  border-radius: 16px;
  width: fit-content;
  margin: 0 auto;
}

.refused {
  font-weight: 400;
  color: white;
  background-color: #ea6c6c;
  padding: 0.5em;
  border-radius: 16px;
  width: fit-content;
  margin: 0 auto;
}

#film-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1em;
}
</style>
