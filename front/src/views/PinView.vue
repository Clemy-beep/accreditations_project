<template>
  <LoggedHeader />
  <div id="top-container">
    <div id="action-btns">
      <DeleteButton :text="'Supprimer'" />
      <SecondaryButton :text="'Modifier'" />
    </div>
    <h1>{{ film.title }}</h1>
    <h2>
      <span class="material-symbols-outlined"> auto_awesome </span> 9.5/10
    </h2>
  </div>
  <UserInfos class="user" />
  <p id="status" v-if="film.status === 'waiting'">En attente de modération</p>
  <div></div>
</template>
<script>
import LoggedHeader from "@/components/LoggedHeader.vue";
import DeleteButton from "@/components/visual-components/DeleteButton.vue";
import SecondaryButton from "@/components/visual-components/SecondaryButton.vue";
import UserInfos from "@/components/user-component/UserInfosLittle.vue";
import { filmsStore } from "@/stores/filmStore";
import { mapState } from "pinia";
export default {
  data() {
    return {
      film: {},
    };
  },
  components: {
    LoggedHeader,
    DeleteButton,
    SecondaryButton,
    UserInfos,
  },
  computed: {
    ...mapState(filmsStore, ["userFilms"]),
  },
  created() {
    this.getFilm();
  },
  methods: {
    getFilm: function () {
      let filteredFilms = this.userFilms.find(
        (film) => film.id === parseInt(this.$route.params.id)
      );
      this.film = filteredFilms;
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  color: #9461ff;
}

#top-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  width: clamp(90vw, 80vw, 1000px);
}

.user {
  height: 64px;
}

#status {
  font-weight: 400;
  color: white;
  background-color: #ff8c5b;
  padding: 0.5em;
  border-radius: 16px;
  width: fit-content;
  margin: 0 auto;
}
</style>
