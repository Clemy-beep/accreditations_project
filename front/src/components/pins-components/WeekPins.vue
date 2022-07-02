<template>
  <div class="container">
    <h1>
      <span class="material-symbols-outlined">date_range</span> Publiés cette
      semaine
    </h1>
    <div id="accepted-movies-container" v-if="movies && movies.length > 0">
      <PinCard
        v-for="(movie, key) in movies"
        :key="key"
        :title="movie.title"
        :resume="movie.resume"
        :authorUsername="movie.author.username"
        :sideText="'En attente'"
        :poster="movie.poster"
      />
    </div>
  </div>
</template>
<script>
import { filmsStore } from "@/stores/filmStore";
import { mapActions, mapState } from "pinia";
import PinCard from "../visual-components/PinCard.vue";

export default {
  components: {
    PinCard,
  },
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    ...mapState(filmsStore, ["acceptedMovies"]),
  },
  created() {
    this.getMovies();
    this.movies = this.acceptedMovies;
  },
  methods: {
    ...mapActions(filmsStore, ["fetchAcceptedMovies", "fetchPoster"]),
    getMovies: async function () {
      await this.fetchAcceptedMovies();
      await this.getPosters();
    },
    getPosters: async function () {
      try {
        this.movies.forEach(async (movie) => {
          if (movie.poster !== null)
            movie.poster = await this.fetchPoster(movie.id);
        });
      } catch (error) {
        throw `${error}`;
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 80vw;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: left;
}

.material-symbols-outlined {
  font-size: 34px;
  vertical-align: middle;
  color: #9461ff;
}

#accepted-movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
}
</style>
