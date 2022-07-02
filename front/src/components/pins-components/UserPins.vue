<template>
  <div class="container">
    <div>
      <h1>
        <span class="material-symbols-outlined"> newspaper </span> Vos dernières
        fiches
      </h1>
      <span id="pins-link">en voir plus</span>
    </div>
    <p id="error" v-if="error !== ''"></p>
    <p style="text-align: center" v-if="films.length < 1">
      Vous n'avez publié aucune fiche. Postez-en une
      <router-link to="/submit-pin">ici</router-link>
    </p>
    <div class="pins-container">
      <PinCard
        v-for="film in films"
        :key="film.id"
        :title="film.title"
        :resume="film.resume"
        :poster="film.poster"
        :sideText="
          film.status === 'waiting'
            ? 'En modération'
            : film._count.comments + 'commentaires'
        "
        :authorUsername="film.author.username"
        @click="redirectToPinPage(film.id)"
      />
    </div>
  </div>
</template>
<script>
import PinCard from "@/components/visual-components/PinCard.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { filmsStore } from "@/stores/filmStore";
export default {
  components: {
    PinCard,
  },
  data() {
    return {
      films: [],
      error: "",
    };
  },
  computed: {
    ...mapState(filmsStore, {
      getFilms: "userFilms",
    }),
    ...mapWritableState(filmsStore, ["userFilms"]),
    currentFilms() {
      return this.getFilms;
    },
  },
  created() {
    this.getUserFilms();
  },
  methods: {
    ...mapActions(filmsStore, ["fetchUserFilms", "fetchPoster"]),
    getUserFilms: async function () {
      try {
        await this.fetchUserFilms();
        await this.getPosters();
        this.films = this.currentFilms;
        this.films = this.films.slice(0, 4);
      } catch (e) {
        this.error = `${e}`;
      }
    },
    redirectToPinPage: function (id) {
      this.$router.push(`/film/${id}`);
    },
    getPosters: async function () {
      try {
        this.userFilms.forEach(async (element) => {
          if (element.poster !== null)
            element.poster = await this.fetchPoster(element.id);
        });
      } catch (e) {
        throw `${e}`;
      }
    },
  },
};
</script>
<style scoped>
#error {
  color: #ea6c6c;
}
.container {
  width: 80vw;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  margin-bottom: 32px;
}
.pins-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 2em;
  width: 100%;
  flex-wrap: wrap;
}

.material-symbols-outlined {
  font-size: 28px;
  vertical-align: middle;
  color: #9461ff;
}
h1 {
  display: inline;
}
#pins-link,
a {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #9461ff;
  cursor: pointer;
  text-decoration: none;
}
</style>
