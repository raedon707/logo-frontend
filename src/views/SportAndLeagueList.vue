<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sports"
      item-key="name"
      class="elevation-2"
      :search="search"
      :single-expand="false"
      show-expand
    >
      <template v-slot:item.activeIcon="{ item }">
        <v-img :src="item.activeIcon" :alt="item.name" contain width=40 aspect-ration=1.5 lazy-src></v-img>
      </template>
      <template v-slot:item.inactiveIcon="{ item }">
        <v-img :src="item.inactiveIcon" :alt="item.name" contain width=40 aspect-ration=1.5 lazy-src></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ country.name }}
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">League Id</th>
                  <th class="text-left">League Name</th>
                  <th class="text-left">League Icon</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="league in item.leagues" :key="league.id">
                  <td>{{ league.id }}</td>
                  <td>{{ league.name }}</td>
                  <td>
                    <v-img :src="league.icon" :alt="league.name" contain width=40 aspect-ration=1.5 lazy-src></v-img>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import sportList from '../assets/sportList.json'
import leagueList from '../assets/leagueList.json'

export default {
  name: 'SportAndLeagueList',
  data () {
    return {
      country: null,
      search: '',
      leagueSearch: '',
      sports: []
    }
  },
  computed: {
    headers () {
      return [{
        text: 'Sport Id',
        align: 'start',
        sortable: true,
        value: 'id'
      }, {
        text: 'Sport Name',
        align: 'start',
        sortable: true,
        value: 'name'
      }, {
        text: 'Active Icon',
        value: 'activeIcon',
        sortable: false,
        align: 'start'
      }, {
        text: 'Inactive Icon',
        value: 'inactiveIcon',
        sortable: false,
        align: 'start'
      }]
    },
    leagueHeaders () {
      return [{
        text: 'League Id',
        align: 'start',
        sortable: true,
        value: 'id'
      }, {
        text: 'League Name',
        align: 'start',
        sortable: true,
        value: 'name'
      }, {
        text: 'Icon',
        value: 'icon',
        sortable: false,
        align: 'start'
      }]
    }
  },
  created () {
    this.country = this.$route.query
    this.initialize(parseInt(this.country.id))
  },
  methods: {
    async initialize (countryId) {
      const sports = {}

      for (const league of leagueList) {
        if (league.locationId === countryId) {
          if (!sports[league.sportId]) {
            sports[league.sportId] = {
              ...sportList.find(sport => parseInt(sport.id) === league.sportId),
              activeIcon: `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/sports/${league.sportId}-b.svg`,
              inactiveIcon: `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/sports/${league.sportId}-g.svg`,
              leagues: []
            }
          }
          league.icon = `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/leagues_by_id/${league.id}.png`
          sports[league.sportId].leagues.push(league)
        }
      }

      for (const sport in sports) {
        this.sports.push(sports[sport])
      }
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
</style>
