<template>
  <v-container>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-uppercase primary--text">
            I C O N S - M A N A G E R
          </v-list-item-title>
          <span class="overline grey--text">{{ appVersion }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item to="/" exact-active-class="primary--text" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/locations" exact-active-class="primary--text" exact>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Locations</v-list-item-title>
        </v-list-item>
        <v-list-item to="/sports" exact-active-class="primary--text" exact>
          <v-list-item-icon>
            <v-icon>mdi-run</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sports</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>
<script>
import pjson from '../../package.json'

export default {
  name: 'Drawer',
  data () {
    return {
      version: pjson.version
    }
  },
  computed: {
    appVersion: {
      get: function () {
        return this.version
      },
      set: () => null
    }
  }
}
</script>
