<template>
  <form>
    <div id="avatar-input">
      <div id="img">
        <img :src="url" alt=" " />
      </div>
      <label id="custom-file-upload" for="avatar">
        <span class="material-symbols-outlined photo"> add_a_photo </span>
        Ajoutez un poster à ce film
        <input
          type="file"
          name="poster"
          id="poster"
          accept="image/"
          @change="onFileChange"
          ref="avatar"
        />
      </label>
    </div>
    <div id="form-side">
      <h1>
        <span class="material-symbols-outlined reg-icon"> edit_note </span>
        Créer une fiche de film
      </h1>
      <div id="response" v-if="response !== ''">{{ response }}</div>
      <div id="success" v-if="success === true">
        Création de ficher réussie ! Vous pouvez la consulter
        <router-link to="/login">ici</router-link>.
      </div>
      <div id="form">
        <div>
          <label for="title">Titre</label>
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
          <label for="casting"
            >Casting (prénom puis nom, séparez chaque acteur par une
            virgule)</label
          >
          <input
            type="text"
            name="casting"
            id="casting"
            v-model="film.casting"
            placeholder="Ex: Loïs"
            required
          />
        </div>
        <div>
          <label>Réalisateur</label>
          <input
            type="text"
            name="realisator-firstname"
            class="realisator"
            v-model="film.realisator.firstname"
            placeholder="Prénom"
            required
          />
          <input
            type="text"
            name="realisator-lastname"
            class="realisator"
            v-model="film.realisator.lastname"
            placeholder="Nom"
            required
          />
        </div>
        <div>
          <label for="pwd">Producteur</label>
          <input
            type="text"
            name="producer-firstname"
            class="producer"
            v-model="film.producer.firstname"
            placeholder="Prénom"
            required
          />
          <input
            type="text"
            name="producer-lastname"
            class="producer"
            v-model="film.producer.lastname"
            placeholder="Nom"
            required
          />
        </div>
        <div>
          <label for="critic">Votre avis</label>
          <textarea
            name="critic"
            id="critic"
            cols="30"
            rows="10"
            v-model="film.critic"
            required
          ></textarea>
        </div>
        <div>
          <label for="budget">Budget ($)</label>
          <input
            type="number"
            name="budget"
            id="budget="
            placeholder="Ex: 10 0000 0000"
            required
          />
        </div>
        <input type="hidden" name="authorId" v-model="film.authorid" />
        <input type="hidden" name="createdAt" v-model="film.createdAt" />
        <input type="hidden" name="status" v-model="film.status" />
        <PrimaryButton :text="'Créer la fiche'" @click.prevent="handleSubmit" />
      </div>
    </div>
  </form>
  <teleport to="body">
    <ConfirmDialog ref="confirmDialog" />
  </teleport>
</template>
<script>
import PrimaryButton from "@/components/visual-components/PrimaryButton.vue";
import ConfirmDialog from "@/components/visual-components/ConfirmDialog.vue";
import { mapState } from "pinia";
import { userStore } from "@/stores/userStore";
export default {
  components: {
    PrimaryButton,
    ConfirmDialog,
  },
  data() {
    return {
      film: {
        realisator: {},
        producer: {},
      },
      user: {},
      response: "",
      success: false,
    };
  },
  computed: {
    ...mapState(userStore, {
      getUser: "user",
    }),
    currentUser() {
      return this.getUser;
    },
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      const avatar = this.$refs.avatar.files[0];
      this.user.avatar = avatar;
    },
    handleSubmit: async function () {
      this.error = "";
      this.success = false;
      console.log(this.user);
      if (
        !(
          this.user.email &&
          this.user.pwd &&
          this.user.firstname &&
          this.user.lastname &&
          this.user.dateOfBirth &&
          this.user.role &&
          this.user.username
        ) ||
        this.url === ""
      ) {
        this.response = "Tous les champs doivent être remplis.";
        return;
      }
      if (!this.validateEmail(this.user.email)) {
        this.response = "Merci de rentrer un email valide.";
        return;
      }
      if (this.user.role === "MODERATOR") {
        const ok = await this.$refs.confirmDialog.show({
          title: "Compte Modérateur",
          message:
            "Vous vous apprêtez à créer un compte de modérateur. Si vous abusez de vos fonctions, vous vous exposez à une sanction telle que la révocation de vos droits de modération, la restriction de votre compte voire à un banissement de notre site. Si vous ne l'avez pas déjà fait, merci de lire nos règles de modération. En cliquant sur 'M'inscrire', vous confirmez avoir lu nos Termes et Conditions d'utilisation ainsi que nos règles de modération.",
          okButton: "M'inscrire",
        });
        if (!ok) return;
        this.createAccount();
        return;
      }
      this.createAccount();
    },
    createAccount: async function () {
      let formData = new FormData();
      formData.append("username", this.user.username.toString());
      formData.append("firstname", this.user.firstname.toString());
      formData.append("lastname", this.user.lastname.toString());
      formData.append("email", this.user.email.toString());
      formData.append("pwd", this.user.pwd.toString());
      formData.append("avatar", this.user.avatar);
      formData.append("dateOfBirth", this.user.dateOfBirth);
      formData.append("role", this.user.role);
      let res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .catch((e) => {
          if (e.message) this.response = e.message;
          console.log(e);
        });
      if (res.error) {
        this.response = res.message;
        return;
      }

      this.success = true;
    },
    validateEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
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
  width: 30%;
  max-width: 432px;
}
#avatar-input {
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

#custom-file-upload span {
  vertical-align: middle;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
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
select {
  width: 100%;
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

.realisation,
.producer {
  display: flex;
  width: 40%;
}

@media (max-width: 980px) {
  #form-side {
    width: 70vw;
    margin: 0 auto;
  }
  form {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
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
