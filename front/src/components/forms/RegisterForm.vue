<template>
  <form>
    <div id="avatar-input">
      <div id="img">
        <img :src="url" alt=" " />
      </div>
      <label id="custom-file-upload" for="avatar">
        <span class="material-symbols-outlined photo"> add_a_photo </span>
        Ajoutez une photo de profil
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/"
          @change="onFileChange"
          required
          ref="avatar"
        />
      </label>
    </div>
    <div id="form-side">
      <h1>
        <span class="material-symbols-outlined reg-icon"> person_add </span>
        Créer un compte
      </h1>
      <div id="response" v-if="response !== ''">{{ response }}</div>
      <div id="success" v-if="success !== ''">{{ success }}</div>
      <div id="form">
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="user.email"
            placeholder="Ex : yourmail@example.com"
            required
          />
        </div>
        <div>
          <label for="username">Pseudo</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="user.username"
            placeholder="Ex : Superman"
            required
          />
        </div>
        <div>
          <label for="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            v-model="user.firstname"
            placeholder="Ex: Loïs"
            required
          />
        </div>
        <div>
          <label for="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            v-model="user.lastname"
            placeholder="Ex: Lane"
            required
          />
        </div>
        <div>
          <label for="pwd">Mot de passe</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            v-model="user.pwd"
            required
          />
        </div>
        <div>
          <label for="dateOfBirth">Date de naissance</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            v-model="user.dateOfBirth"
            :max="new Date()"
            required
          />
        </div>
        <div>
          <label for="role">Type d'utilisateur</label>
          <select name="role" id="role" v-model="user.role" required>
            <option value="USER">Utilisateur</option>
            <option value="MODERATOR">Moderateur</option>
          </select>
        </div>
        <PrimaryButton :text="'S\'enregistrer'" @click.prevent="handleSubmit" />
      </div>
    </div>
  </form>
  <teleport to="body">
    <ConfirmDialog ref="confirmDialog" />
  </teleport>
</template>
<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
export default {
  components: {
    PrimaryButton,
    ConfirmDialog,
  },
  data() {
    return {
      user: {},
      url: "",
      response: "",
      success: "",
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(this.url);
      const avatar = this.$refs.avatar.files[0];
      this.user.avatar = avatar;
      console.log(this.user.avatar);
    },
    handleSubmit: async function () {
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
      if (this.user.role === "MODERATOR") {
        const ok = await this.$refs.confirmDialog.show({
          title: "Compte Modérateur",
          message:
            "Vous vous apprêtez à créer un compte de modérateur. Si vous abusez de vos fonctions, vous vous exposez à une sanction telle que la révocation de vos droits de modération, la restriction de votre compte voire à un banissement de notre site. Si vous ne l'avez pas déjà fait, merci de lire nos règles de modération. En cliquant sur 'M'inscrire', vous confirmez avoir lu nos Termes et Conditions d'utilisation ainsi que nos règles de modération.",
          okButton: "M'inscrire",
        });
        if (!ok) return;
        this.createAccount();
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
      let res = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .catch((e) => {
          if (e.message) this.response = e.message;
          console.log(e);
        });
      if (res.error) {
        this.response = this.res.error.message;
        return;
      }
      this.success = `Création de compte réussie ! Vous pouvez désormais vous <router-link to="/login" style="color:black">connecter</router-link> à votre compte.`;
    },
  },
};
</script>

<style scoped>
#form-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
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
  gap: 3em;
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
select {
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

@media (max-width: 980px) {
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
  form {
    width: 70vw;
    margin: 0 auto;
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
