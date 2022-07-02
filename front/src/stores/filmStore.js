import { defineStore } from "pinia";

export const filmsStore = defineStore({
  id: "films",
  state: () => ({
    userFilms: [],
    waitingFilms: [],
    acceptedMovies: [],
  }),
  persist: true,
  actions: {
    fetchUserFilms: async function () {
      if (this.userFilms.length > 0) return;
      try {
        const response = await fetch(
          `http://localhost:3000/api/films/${localStorage.getItem("id")}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            throw `${e}`;
          });
        this.userFilms = response.films;
      } catch (e) {
        console.log(e);
        throw `${e}`;
      }
    },
    fetchPoster: async function (filmId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/films/poster/${filmId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.blob())
          .then(function (image) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, _) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(image);
            });
          })
          .catch((e) => {
            throw `${e}`;
          });
        return response;
      } catch (e) {
        throw `${e}`;
      }
    },
    fetchWaitingMovies: async function () {
      try {
        if (this.waitingFilms.length > 0) return;
        const response = await fetch(
          `http://localhost:3000/api/moderate/${localStorage.getItem(
            "id"
          )}/waiting-films`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            throw `${e}`;
          });
        this.waitingFilms = response;
      } catch (e) {
        throw `${e}`;
      }
    },
    fetchAcceptedMovies: async function () {
      try {
        this.acceptedMovies = await fetch(
          "http://localhost:3000/api/week-movies",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            throw `${e}`;
          });
      } catch (e) {
        throw `${e}`;
      }
    },
  },
});
