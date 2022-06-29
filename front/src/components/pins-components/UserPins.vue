<template>
  <div class="container">
    <div>
      <h1>
        <span class="material-symbols-outlined"> newspaper </span> Vos dernières
        fiches
      </h1>
      <span id="pins-link">en voir plus</span>
    </div>
    <div class="pins-container">
      <PinCard
        v-for="film in films"
        :key="film.id"
        :title="film.title"
        :resume="film.resume"
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
import { mapActions, mapState } from "pinia";
import { filmsStore } from "@/stores/filmStore";
export default {
  components: {
    PinCard,
  },
  data() {
    return {
      films: [],
    };
  },
  computed: {
    ...mapState(filmsStore, {
      getFilms: "userFilms",
    }),
    currentFilms() {
      return this.getFilms;
    },
  },
  created() {
    this.getUserFilms();
  },
  methods: {
    ...mapActions(filmsStore, ["fetchUserFilms"]),
    getUserFilms: async function () {
      try {
        await this.fetchUserFilms();
        this.films = this.currentFilms;
        this.films = this.films.slice(0, 4);
      } catch (e) {
        console.log(e);
      }
    },
    redirectToPinPage: function (id) {
      this.$router.push(`/film/${id}`);
    },
  },
};
</script>
<style scoped>
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
#pins-link {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #9461ff;
  cursor: pointer;
}
</style>
