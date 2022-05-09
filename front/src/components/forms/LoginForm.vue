<template>
  <div class="container">
    <div class="title">
      <h1>
        <span class="material-symbols-outlined"> sentiment_satisfied </span>
        Ravi de vous revoir !
      </h1>
      <span id="register"
        >Pas encore de compte ?
        <router-link to="/register">Inscrivez-vous !</router-link></span
      >
    </div>
    <form>
      <h2><span class="material-symbols-outlined"> login </span> Connexion</h2>
      <span class="response" v-if="response !== ''">{{ response }}</span>
      <div>
        <label for="email">Email</label>
        <input
          @keypress="emptyRes"
          type="email"
          name="email"
          id="email"
          required
          v-model="user.email"
        />
      </div>
      <div>
        <label for="pwd">Mot de passe</label>
        <input
          @keypress="emptyRes"
          type="password"
          name="pwd"
          id="pwd"
          v-model="user.pwd"
          required
        />
      </div>
      <PrimaryButton :text="'Connexion'" @click.prevent="handleSubmit" />
    </form>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  data() {
    return {
      user: {},
      response: "",
    };
  },
  components: {
    PrimaryButton,
  },
  methods: {
    handleSubmit: async function () {
      this.response = "";
      if (!this.user.pwd || !this.user.email) {
        this.response = "Tous les champs sont requis";
        return;
      }
      let res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          if (e.error === "Invalid credentials") {
            this.response = e.message;
          }
          console.log(e);
        });
      if (res && res.error === "Invalid credentials") {
        this.response = res.message;
        return;
      }
      if (!res.token) {
        this.response = "Une erreur s'est produite, connexion impossible";
        return;
      }
      sessionStorage.setItem("token", res.token);
    },
    emptyRes: function () {
      this.response = "";
    },
  },
};
</script>

<style scoped>
.title {
  background-color: white;
  box-shadow: 0px 0px 25px 30px #ffffff;
  text-align: center;
}

h1,
h2 {
  font-family: "Popins", sans-serif;
  text-align: center;
}

.title #register {
  font-family: "Montserrat", sans-serif;
}

.title span a {
  font-weight: 600;
  color: #9461ff;
  text-decoration: none;
}
.material-symbols-outlined {
  font-size: 38px;
  color: #9461ff;
  vertical-align: middle;
}
.container {
  background-image: url("../../assets/images/d6s4ye0-15581d92-b84c-479f-8fab-0b9b48d18762.jpg");
  background-size: cover;
  background-position: center;
  box-shadow: inset 0px 0px 25px 30px #ffffff;
  min-height: 75%;
  margin: 0 auto;
  aspect-ratio: 16/9;
  max-height: 500px;
}
form {
  background-color: white;
  min-width: 250px;
  max-width: 432px;
  padding: 1.5em 2em;
  box-shadow: 0px 0px 8px 0px #00000035;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 10% auto;
}
label {
  display: block;
  text-align: left;
  padding-left: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 20px;
}

input[type="password"],
input[type="email"],
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

.response {
  font-size: 16px;
  color: #ea6c6c;
  font-family: "Montserrat", sans-serif;
}

@media (max-width: 1280px) {
  .container {
    aspect-ratio: 4/3;
  }
}

@media (max-width: 920px) {
  .container {
    aspect-ratio: 4/5;
    background-image: none;
  }
}

@media (max-width: 450px) {
  .container {
    aspect-ratio: 1/2;
  }
  h1 {
    font-size: 24px;
  }
  .title #register {
    font-size: 14px;
  }

  h2 {
    font-size: 20px;
  }

  label,
  input {
    font-size: 16px;
  }
  .title {
    box-shadow: 0px 0px 0px 0px white;
    margin: 0;
  }
} ;
</style>
