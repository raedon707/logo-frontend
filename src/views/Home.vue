<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="countries"
      item-key="name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:item="{ item }">
        <tr @click="showAlert(item)">
          <td class="text-xs-right">{{ item.id }}</td>
          <td class="text-xs-right">{{ item.name }}</td>
          <v-img :src="item.flag" :alt="item.name" contain width=50 aspect-ration=1.5 lazy-src></v-img>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            C O U N T R I E S
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
import countryList from '../assets/locationList.json'

export default {
  name: 'Home',
  data () {
    return {
      countrySearch: '',
      search: '',
      countries: [],
      sports: []
    }
  },
  computed: {
    headers () {
      return [{
        text: 'Country Id',
        align: 'start',
        sortable: true,
        value: 'id'
      }, {
        text: 'Country Name',
        align: 'start',
        sortable: true,
        value: 'name'
      }, {
        text: 'Flag',
        value: 'flag',
        sortable: false,
        align: 'start'
      }]
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      for (const country of countryList) {
        this.countries.push({
          ...country,
          flag: `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/flags/${country.id}.svg`
        })
      }
    },
    showAlert (country) {
      const routeData = this.$router.resolve({ name: 'SportAndLeagueList', query: country })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
</style>
