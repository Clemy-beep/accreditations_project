<template>
  <div class="hello">
    <div class="text-container">
      <h1>Bienvenue sur la Curious Movie Database</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <div class="btns">
        <SecondaryButton
          :text="'Inscription'"
          @click="this.$router.push('/register')"
        />
        <PrimaryButton
          :text="'Connexion'"
          @click="this.$router.push('/login')"
        />
      </div>
    </div>
    <p id="credit">
      illutration made by @<a href="http://artburns.blogspot.com/"
        >Mike Burns</a
      >
    </p>
  </div>
</template>

<script>
import SecondaryButton from "@/components/SecondaryButton.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  name: "HelloWorld",
  components: {
    SecondaryButton,
    PrimaryButton,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-image: url("../assets/images/WigMonster_MikeBurns.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: calc(100vh - 152px);
  margin: -8px;
}
h1 {
  font-family: "Popins", sans-serif;
  font-size: 36;
  font-weight: 600;
  margin: 0;
}

p {
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: 400;
}

.text-container {
  max-width: 710px;
  background-color: #ffffff95;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 2em;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px #00000055;
}

#credit {
  position: absolute;
  bottom: 88px;
  left: 0;
  color: white;
  font-weight: 500;
}

#credit a {
  text-decoration: none;
  color: white;
}

#credit a:hover {
  text-decoration: underline;
}

@media (max-width: 850px) {
  h1 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
  .text-container {
    width: 70vw;
  }
}
</style>
