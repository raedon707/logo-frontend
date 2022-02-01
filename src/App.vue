<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
    I  C  O  N  S
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
