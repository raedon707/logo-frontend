<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="locations"
      item-key="name"
      class="elevation-3"
      :search="search"
      :loading="loading"
      loading-text="Loading..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-xs-right">{{ item.locationId }}</td>
          <td class="text-xs-right">{{ item.nameEn }}</td>
          <td class="text-xs-right">
            <v-img :src="locationProdIconGetter(item.locationId)" :alt="item.name" contain width=50 aspect-ration=1.5 lazy-src></v-img>
          </td>
          <td class="text-xs-right">
            <v-img :src="locationDevIconGetter(item.locationId)" :alt="item.name" contain width=50 aspect-ration=1.5 lazy-src></v-img>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            L O C A T I O N S
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Locations',
  data () {
    return {
      search: '',
      locations: [],
      loading: false,
      headers: [{
        text: 'Location Id',
        align: 'start',
        sortable: true,
        value: 'location_id'
      }, {
        text: 'Location Name',
        align: 'start',
        sortable: true,
        value: 'name_en'
      }, {
        text: 'Production Flag',
        value: 'prodFlag',
        sortable: false,
        align: 'start'
      }, {
        text: 'Development Flag',
        value: 'deFlag',
        sortable: false,
        align: 'start'
      }]
    }
  },
  watch: {
    locationsGetter: {
      handler: function (value) {
        this.locations = value
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['locationsGetter', 'locationDevIconGetter', 'locationProdIconGetter'])
  },
  created () {
    this.loading = true
    this.locations = this.locationsGetter

    if (this.locations?.length) {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
</style>
