import { defineStore } from "pinia";

export const filmsStore = defineStore({
  id: "films",
  state: () => ({
    userFilms: [],
  }),
  persist: true,
  actions: {
    fetchUserFilms: async function () {
      if (this.userFilms.length > 0) return;
      try {
        const response = await fetch(
          `http://localhost:3000/api/films/user/${localStorage.getItem("id")}`,
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
  },
});
