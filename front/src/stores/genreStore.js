import { defineStore } from "pinia";

export const genreStore = defineStore({
  id: "genre",
  state: () => ({
    genres: [],
  }),
  persist: true,
  actions: {
    fetchGenres: async function () {
      if (this.genres.length > 0) return;
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
      if (!genres) throw new Error("Genres not found");
      this.genres = genres;
    },
  },
});
