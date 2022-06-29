<template>
  <div id="container">
    <form>
      <h1>
        <span class="material-symbols-outlined reg-icon"> edit_note </span>
        Créer une fiche de film
      </h1>
      <div class="form">
        <div id="poster-input">
          <div id="img">
            <img :src="url" alt=" " />
          </div>
          <label id="custom-file-upload" for="poster">
            <span class="material-symbols-outlined photo"> add_a_photo </span>
            Ajoutez un poster à ce film
            <input
              type="file"
              name="poster"
              id="poster"
              accept="image/"
              @change="onFileChange"
              ref="poster"
            />
          </label>
        </div>
        <div id="form-side">
          <div id="form">
            <div>
              <label for="title">Titre *</label>
              <input
                type="text"
                name="title"
                id="title"
                v-model="film.title"
                placeholder="Ex : The Shawshank Redemption"
                required
              />
            </div>
            <div>
              <label for="resume"> Résumé *</label>
              <textarea
                name="resume"
                id="resume"
                cols="30"
                rows="10"
                v-model="film.resume"
                required
              ></textarea>
            </div>
            <div>
              <label for="realease">Date de sortie</label>
              <input
                type="date"
                name="releaseDate"
                id="releaseDate"
                v-model="film.releaseDate"
                :max="Date()"
              />
            </div>
            <div>
              <label>Genres </label>
              <div id="genres">
                <div v-for="genre in genres" :key="genre.id">
                  <input
                    class="genres-checkbox"
                    type="checkbox"
                    name="genre"
                    :value="genre.id"
                    v-model="film.genres"
                  />
                  <span class="custom-checkbox"></span>
                  <label for="genre" class="genre">{{ genre.name }}</label>
                </div>
              </div>
            </div>
            <div>
              <label for="casting"
                >Casting
                <span id="casting-rule"
                  >prénom puis nom, séparez chaque acteur par une virgule</span
                ></label
              >

              <input
                type="text"
                name="casting"
                id="casting"
                v-model="film.casting"
                placeholder="Ex: Loïs Lane, Bruce Wayne, John Wayne"
                required
                multiple
              />
            </div>
            <div>
              <label>Réalisateur</label>
              <div class="realisator">
                <input
                  type="text"
                  name="realisator-firstname"
                  class="row-input"
                  v-model="film.realisator.firstname"
                  placeholder="Prénom"
                />
                <input
                  type="text"
                  name="realisator-lastname"
                  class="row-input"
                  v-model="film.realisator.lastname"
                  placeholder="Nom"
                />
              </div>
            </div>
            <div>
              <label for="pwd">Producteur</label>
              <div class="producer">
                <input
                  type="text"
                  name="producer-firstname"
                  class="row-input"
                  v-model="film.producer.firstname"
                  placeholder="Prénom"
                />
                <input
                  type="text"
                  name="producer-lastname"
                  class="row-input"
                  v-model="film.producer.lastname"
                  placeholder="Nom"
                />
              </div>
            </div>
            <div>
              <label for="budget">Budget ($)</label>
              <input
                type="number"
                name="budget"
                id="budget="
                v-model="film.budget"
                placeholder="Ex: 10 0000 0000"
              />
            </div>
            <div>
              <label for="critic">Votre avis *</label>
              <textarea
                name="critic"
                id="critic"
                cols="30"
                rows="10"
                v-model="film.critic"
                required
              ></textarea>
            </div>
            <span id="mandatory"> * = champs obligatoires</span>
            <PrimaryButton
              :text="'Créer la fiche'"
              @click.prevent="handleSubmit"
            />
            <div id="response" v-if="error !== ''">{{ error }}</div>
            <div id="success" v-if="success === true">
              Création de ficher réussie ! Vous pouvez la consulter
              <router-link to="/login">ici</router-link>.
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import PrimaryButton from "@/components/visual-components/PrimaryButton.vue";
import { mapActions, mapState } from "pinia";
import { userStore } from "@/stores/userStore";
import { genreStore } from "@/stores/genreStore";
export default {
  components: {
    PrimaryButton,
  },
  data() {
    return {
      url: "",
      film: {
        realisator: {},
        producer: {},
        status: "waiting",
        genres: [],
      },
      user: {},
      error: "",
      success: false,
      genres: [],
    };
  },
  computed: {
    ...mapState(userStore, {
      getUser: "user",
    }),
    ...mapState(genreStore, {
      getGenres: "genres",
    }),
    currentUser() {
      return this.getUser;
    },
    currentGenre() {
      return this.getGenres;
    },
  },
  created() {
    this.fGenres();
    this.user = this.currentUser;
  },
  methods: {
    ...mapActions(genreStore, ["fetchGenres"]),
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      const poster = this.$refs.poster.files[0];
      this.film.poster = poster;
    },
    fGenres: async function () {
      await this.fetchGenres();
      this.genres = this.currentGenre;
    },

    handleSubmit: function () {
      this.error = "";
      this.success = false;
      this.film.authorId = this.user.id;
      this.film.status = "waiting";
      console.log(this.film.releaseDate);
      console.log(typeof this.film.releaseDate);
      try {
        if (!(this.film.title && this.film.resume && this.film.critic)) {
          throw "Merci de remplir les champs obligatoires";
        }
        if (this.film.realisator) {
          if (
            !/[^0-9]+/g.test(this.film.realisator.firstname) ||
            !/[^0-9]+/g.test(this.film.realisator.lastname)
          )
            throw "Le nom ou le prénom du réalisateur n'est pas valide";
        }
        if (this.film.producer) {
          if (
            !/[^0-9]+/g.test(this.film.producer.firstname) ||
            !/[^0-9]+/g.test(this.film.producer.lastname)
          )
            throw "Le nom ou le prénom du producteur n'est pas valide";
        }

        this.postFilm();
      } catch (error) {
        this.error = error.message || error;
        if (error === "Invalid Token") {
          alert("Merci de vous reconnecter");
          this.$router.replace("/");
        }
      }
    },
    postFilm: async function () {
      let formData = new FormData();
      formData.append("hey", "hey");
      formData.append("title", this.film.title.toString());
      formData.append("resume", this.film.resume.toString());
      formData.append("critic", this.film.critic.toString());
      formData.append("status", this.film.status.toString());
      formData.append("authorId", this.user.id.toString());
      console.log(this.film);
      if (this.film.realisator) {
        formData.append(
          "realisatorFirstname",
          this.film.realisator.firstname.toString()
        );
        formData.append(
          "realisatorLastname",
          this.film.realisator.lastname.toString()
        );
      }
      if (this.film.producer) {
        formData.append("producerFirstname", this.film.producer.firstname);
        formData.append("producerLastname", this.film.producer.lastname);
      }
      if (this.film.poster) {
        formData.append("poster", this.film.poster);
      }
      if (this.film.budget) {
        formData.append("budget", this.film.budget.toString());
      }
      if (this.film.genres) {
        formData.append("genres", this.film.genres);
      }
      if (this.film.casting) {
        formData.append("casting", this.film.casting);
      }
      if (this.film.releaseDate)
        formData.append("releaseDate", this.film.releaseDate);
      try {
        let res = await fetch("http://localhost:3000/api/add-film", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        })
          .then((r) => {
            if (r.status === 401) {
              alert("Session expirée. Merci de vous reconnecter.");
              this.$router.replace("/");
              throw "Session expirée. Merci de vous reconnecter.";
            }
            return r.json();
          })
          .catch((e) => {
            throw `${e}`;
          });
        if (res.error) {
          throw `${res.message}`;
        }
        if (res.meta && res.meta.target === "Publication_title_key")
          throw "Ce film existe déjà.";
        if (res.id) this.success = true;
      } catch (e) {
        this.error = `${e}`;
      }
    },
  },
};
</script>

<style scoped>
#mandatory {
  font-family: "Montserrat", sans-serif;
  text-align: left;
  color: #9461ff;
}
#genres {
  display: flex;
  flex-wrap: wrap;
}
.genre {
  font-size: 14px;
}
#container {
  display: block;
  margin: auto;
}
h1 {
  text-align: left;
  margin-top: 32px;
  width: 50%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}
.login {
  font-family: "Montserrat", sans-serif;
  margin-bottom: 1em;
}
.login a {
  font-weight: 600;
  color: #9461ff;
  text-decoration: none;
}
#form-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 432px;
}
#poster-input {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.5em;
}
img,
#img {
  width: 400px;
  height: 400px;
  border-radius: 16px;
}
#img {
  background: linear-gradient(#ffe1e1, #f8ddff);
  border: none;
}
input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
#custom-file-upload {
  border: 2px solid #9461ff;
  display: inline-block;
  padding: 0.6em;
  border-radius: 16px;
  cursor: pointer;
  color: #9461ff;
  height: 24px;
  text-align: center;
}
input[type="checkbox"] {
  accent-color: #9461ff;
}
#custom-file-upload span {
  vertical-align: middle;
}

.form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 32px;
  gap: 5em;
  margin-bottom: 32px;
}

label {
  display: block;
  text-align: left;
  padding-left: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 20px;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="date"],
input[type="number"] {
  height: 42px;
  width: 90%;
  min-width: calc(100% - 128px);
  border: 2px solid #9461ff;
  background-color: transparent;
  border-radius: 19px;
  font-size: 16px;
  padding-left: 16px;
  font-family: "Montserrat", sans-serif;
  padding-right: 16px;
}
textarea {
  height: 150px;
  width: 90%;
  min-width: calc(100% - 128px);
  border: 2px solid #9461ff;
  background-color: transparent;
  border-radius: 19px;
  font-size: 16px;
  padding: 16px;
  font-family: "Montserrat", sans-serif;
  padding-right: 16px;
}
select {
  width: 100%;
}

#casting-rule {
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  text-align: left;
  padding-left: 16px;
}
.reg-icon {
  font-size: 38px;
  color: #9461ff;
  vertical-align: middle;
}

#form {
  padding: 1.5em 2em;
  box-shadow: 0px 0px 8px 0px #00000035;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
}

#response {
  font-size: 16px;
  color: #ea6c6c;
  font-family: "Montserrat", sans-serif;
}

#success {
  font-family: "Montserrat", sans-serif;
}

#success a {
  font-weight: 500;
  color: #9461ff;
  text-decoration: none;
}

.realisator,
.producer {
  display: flex;
  width: 70%;
  gap: 1em;
}

@media (max-width: 980px) {
  h1 {
    width: 80%;
  }
  #form-side {
    width: 70vw;
    margin: 0 auto;
  }
  .form {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .realisator,
  .producer {
    display: flex;
    gap: 1em;
  }
}

@media (max-width: 450px) {
  #img,
  img {
    width: 300px;
    height: 300px;
  }

  h1 {
    font-size: 20px;
    line-height: 64px;
  }
  label,
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="date"],
  select {
    font-size: 16px;
  }
  #custom-file-upload {
    margin-bottom: 16px;
  }
}
</style>
