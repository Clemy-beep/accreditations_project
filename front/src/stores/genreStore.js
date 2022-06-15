import { defineStore } from "pinia";

export const genreStore = defineStore({
  id: "genre",
  state: () => ({
    genres: [],
  }),
  persist: true,
  actions: {
    fetchGenres: async function () {
      if (!localStorage.getItem("token")) {
        alert("Merci de vous reconnecter");
        this.$router.push("/");
        return;
      }
      const genres = await fetch(`http://localhost:3000/api/genres`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(genres);
      if (!genres) throw new Error("Genres not found");
      this.genres = genres;
    },
  },
});
