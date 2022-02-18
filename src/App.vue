<template>
  <v-app>
    <v-app-bar app flat absolute>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-divider style="border-color: transparent"></v-divider>
    </v-app-bar>
    <v-navigation-drawer v-model="toggledDrawer" app>
      <Drawer/>
    </v-navigation-drawer>
    <v-main app>
      <router-view id="main" />
    </v-main>
    <v-footer inset app>
      <v-divider style="border-color:transparent"></v-divider>
    </v-footer>
  </v-app>
</template>
<script>
import Drawer from '@/components/Drawer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Drawer
  },
  data () {
    return {
      drawer: false
    }
  },
  async created () {
    await this.getLocations()
    await this.getSports()
  },
  computed: {
    toggledDrawer: {
      get: function () {
        return this.drawer
      },
      set: () => null
    }
  },
  methods: {
    ...mapActions(['getSports', 'getLocations'])
  }
}
</script>
