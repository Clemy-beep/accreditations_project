<template>
  <div class="container">
    <h2>Fiches en attente <router-link to="/home"> voir plus</router-link></h2>
    <p style="text-align: center" v-if="movies.length === 0">
      Aucun film en attente
    </p>
    <span v-if="error !== ''"> {{ error }}</span>
    <div id="waiting-movies-container" v-if="movies && movies.length > 0">
      <PinCard
        v-for="(movie, key) in movies"
        :key="key"
        :title="movie.title"
        :resume="movie.resume"
        :authorUsername="movie.author.username"
        :sideText="'En attente'"
        :poster="movie.poster"
        @click="redirectToPinPage(movie.id)"
      />
    </div>
  </div>
</template>
<script>
import PinCard from "../visual-components/PinCard.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { filmsStore } from "@/stores/filmStore";
export default {
  components: {
    PinCard,
  },
  data() {
    return {
      movies: [],
      error: "",
    };
  },
  computed: {
    ...mapWritableState(filmsStore, {
      setWaitingFilms: "waitingFilms",
    }),
    ...mapState(filmsStore, ["waitingFilms"]),
  },
  created() {
    this.getWaitingMovies();
  },

  methods: {
    ...mapActions(filmsStore, ["fetchWaitingMovies", "fetchPoster"]),
    getWaitingMovies: async function () {
      try {
        if (this.movies.length === 0) await this.fetchWaitingMovies();
        await this.getPosters();
        this.movies = this.waitingFilms;
      } catch (error) {
        this.error = error;
      }
    },
    getPosters: async function () {
      try {
        this.waitingFilms.forEach(async (movie) => {
          if (movie.poster !== null)
            movie.poster = await this.fetchPoster(movie.id);
        });
      } catch (error) {
        throw `${error}`;
      }
    },
    redirectToPinPage: function (filmId) {
      this.$router.push(`/moderate-movies/${filmId}`);
    },
  },
};
</script>

<style scoped>
#waiting-movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
}

.container {
  width: 80vw;
  max-width: 1000px;
  text-align: left;
  margin: 0 auto;
}

a {
  font-weight: 600;
  color: #9461ff;
  text-decoration: none;
  font-size: 18px;
}
</style>
