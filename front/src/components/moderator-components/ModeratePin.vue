<template>
  <div id="top-container">
    <AlertDialog
      :title="modalTitle"
      :text="modalText"
      :btntext="'Revenir aux fiches'"
      @closeModal="redirect"
      v-if="showModal === true"
    />
    <div
      id="action-btns"
      v-if="movie.status === 'waiting' || movie.moderatorId !== moderatorId"
    >
      <ModerationButton :text="'Refuser'" @click="refusePub()" />
      <ModerationButton :text="'Accepter'" @click="acceptPub()" />
    </div>
    <h1 v-if="movie.title">{{ movie.title }}</h1>
    <h2>
      <span class="material-symbols-outlined"> auto_awesome </span> 9.5/10
    </h2>
  </div>
  <UserInfos
    v-if="movie.author"
    :user="movie.author"
    :imgURL="imgUrl"
    class="user"
  />
  <p v-if="response !== ''">{{ response }}</p>
  <p
    class="status"
    v-if="movie.status === 'waitin'"
    :class="
      movie.status === 'waiting'
        ? 'waiting'
        : movie.moderatorId === localStorage.getItem('token')
        ? 'already-moderated'
        : 'accepted'
    "
  >
    {{ status }}
  </p>
  <div id="movie">
    <div id="poster-container">
      <img
        id="poster"
        v-if="movie.poster !== null"
        :src="movie.poster"
        alt="poster"
      />
    </div>
    <div id="movie-container">
      <div v-if="movie.relaaseDate !== null">
        <h2>Date de sortie</h2>
        <p>{{ movie.relaaseDate }}</p>
      </div>
      <div>
        <h2>Résumé</h2>
        <p>{{ movie.resume }}</p>
      </div>
      <div v-if="movie.casting !== undefined && movie.length > 0">
        <h2>Casting</h2>
        <p class="actor" v-for="(element, key) in movie.casting" :key="key">
          {{ element.actor.firstname }} {{ element.actor.lastname }}
        </p>
      </div>
      <div id="technical-staff">
        <div v-if="movie.realisator !== undefined">
          <h2>Réalisateur</h2>
          <p>
            {{ movie.realisator.firstname }} {{ movie.realisator.lastname }}
          </p>
        </div>
        <div v-if="movie.producer !== undefined">
          <h2>Producteur</h2>
          <p>{{ movie.producer.firstname }} {{ movie.producer.lastname }}</p>
        </div>
      </div>
      <div v-if="movie.genres && movie.genres.length > 0">
        <h2>Genres</h2>
        <div class="genres">
          <Badge
            v-for="(item, key) in movie.genres"
            :key="key"
            :text="item.genre.name"
          />
        </div>
      </div>
      <div v-if="movie.budget">
        <h2>Budget</h2>
        <p>{{ movie.budget }} $</p>
      </div>
      <div>
        <h2>Votre avis</h2>
        <p>{{ movie.critic }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { filmsStore } from "@/stores/filmStore";
import { userStore } from "@/stores/userStore";
import { mapActions, mapState, mapWritableState } from "pinia";
import UserInfos from "../user-component/UserInfosLittle.vue";
import Badge from "../visual-components/BadgeComponent.vue";
import ModerationButton from "../visual-components/ModerationButton.vue";
import AlertDialog from "../visual-components/AlertDialog.vue";

export default {
  components: {
    UserInfos,
    Badge,
    ModerationButton,
    AlertDialog,
  },
  data() {
    return {
      author: {},
      movie: {},
      imgUrl: "",
      response: "",
      status: "",
      moderatorId: Number(),
      modalTitle: "Test",
      modalText: "test",
      showModal: false,
    };
  },
  computed: {
    ...mapState(filmsStore, ["waitingFilms"]),
    ...mapWritableState(filmsStore, {
      setFilms: "waitingFilms",
    }),
  },
  async created() {
    this.checkModerator();
    this.getMovie();
    this.getPoster();
    this.setStatus();
    this.getAvatar();
    this.moderatorId = localStorage.getItem("id");
  },
  methods: {
    ...mapActions(userStore, ["fetchUser", "fetchAvatar"]),
    ...mapActions(filmsStore, ["fetchPoster"]),
    showModalFunc: function () {
      this.showModal = true;
    },
    setStatus: function () {
      if (
        this.movie.moderatorId !== localStorage.getItem("id") ||
        this.movie.status !== "waiting"
      )
        this.status = "Cette fiche a déjà été modérée";
      if (this.movie.status === "waiting")
        this.status = "En attente de modération";
    },
    getAvatar: async function () {
      this.imgUrl = await this.fetchAvatar(this.movie.author.id);
    },

    getMovie: function () {
      let filteredMovies = this.waitingFilms.find(
        (movie) => movie.id === parseInt(this.$route.params.id)
      );
      this.movie = filteredMovies;
      if (this.movie.relaaseDate === null) return;
      this.movie.relaaseDate = new Date(
        this.movie.relaaseDate.split("T")[0]
      ).toLocaleDateString("fr");
    },
    getPoster: async function () {
      if (this.movie.poster === null) return;
      try {
        this.movie.poster = await this.fetchPoster(this.movie.id);
      } catch (e) {
        this.response = `${e}`;
        this.movie.poster = "";
      }
    },
    checkModerator: async function () {
      if (this.movie.moderator !== null) {
        if (
          this.movie.moderatorId !== localStorage.getItem("id") ||
          this.movie.status !== "waiting"
        ) {
          this.response === "Cette fiche a déjà été modérée";
        }
        return;
      }

      try {
        await fetch(
          `http://localhost:3000/api/moderate/add-moderator/${localStorage.getItem(
            "id"
          )}/${this.$route.params.id}`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            throw `${e}`;
          });
      } catch (error) {
        this.response = `${error}`;
      }
    },
    acceptPub: async function () {
      try {
        let res = await fetch(
          `http://localhost:3000/api/moderate/${localStorage.getItem(
            "id"
          )}/accept/${this.$route.params.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            throw `${e}`;
          });
        this.response = res.message;
        if (this.response === "Fiche modifiée") {
          this.setFilms = [];
          this.modalTitle = "Fiche acceptée";
          this.modalText =
            "La publication a bien été acceptée et sera maintenant visible pour tous les utilisateurs.";
          this.showModal = true;
        }
      } catch (error) {
        this.response = error;
      }
    },
    refusePub: async function () {
      try {
        let res = await fetch(
          `http://localhost:3000/api/moderate/${localStorage.getItem(
            "id"
          )}/refuse/${this.$route.params.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => {
            return r.json();
          })
          .catch((e) => {
            throw `${e}`;
          });
        this.response = res.message;
        if (this.response === "Fiche modifiée") {
          this.setFilms = [];
          this.modalTitle = "Fiche refusée";
          this.modalText =
            "La publication a bien été refusée et ne sera pas publiée.";
          this.showModal = true;
        }
      } catch (e) {
        this.response = e;
      }
    },
    redirect: function () {
      this.showModal = false;
      this.$router.push("/moderate-movies");
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
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px #00000025;
}

#movie {
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

#movie-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1em;
}
</style>
