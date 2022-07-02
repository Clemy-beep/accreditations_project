<template>
  <div id="user-container">
    <img :src="imgURL" alt="avatar" id="avatar" />
    <div>
      <h3>{{ user.username }}</h3>
      <p>{{ user._count.followedBy }} abonnés</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgURL: String(),
    user: {},
  },
};
</script>

<style scoped>
h3,
p {
  margin: 0;
  text-align: left;
}

#avatar {
  border-radius: 50%;
  width: 50px;
  height: 50pxpx;
}

#user-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin-bottom: 32px;
}
</style>
