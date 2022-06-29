<template>
  <div class="container">
    <div>
      <h1>
        <span class="material-symbols-outlined"> summarize </span> Vos dernières
        listes
      </h1>
      <span id="lists-link">en voir plus</span>
    </div>
    <div id="lists-container">
      <ListTile :list="list" />
      <ListTile :list="list" />
      <ListTile :list="list" />
    </div>
  </div>
</template>
<script>
import ListTile from "../visual-components/ListTIle.vue";
export default {
  components: {
    ListTile,
  },
  data() {
    return {
      list: {
        title: "new list",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: {
          username: "new author",
        },
      },
    };
  },
};
</script>
<style scoped>
.container {
  width: 80vw;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}
#lists-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.material-symbols-outlined {
  font-size: 28px;
  vertical-align: middle;
  color: #9461ff;
}
h1 {
  display: inline;
}
#lists-link {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #9461ff;
  cursor: pointer;
}
</style>
