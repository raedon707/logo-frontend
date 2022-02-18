<template>
  <div>
    <Snackbar :snackbarText="snackbarText" :snackbarType="snackbarType" :random="random"/>
    <v-data-table
      :headers="headers"
      :items="sports"
      item-key="sportId"
      class="elevation-3"
      :search="search"
      :single-expand="true"
      show-expand
      :item-class="itemRowBackground"
      :loading="loading"
      loading-text="Loading..."
      @item-expanded="reloadLeagueList"
    >
      <template v-slot:item.activeIcon="{ item }">
        <v-img :src="sportActiveDevIconGetter(item.sportId)" :alt="item.nameEn" contain width=40 aspect-ration=1.5 lazy-src></v-img>
      </template>
      <template v-slot:item.inactiveIcon="{ item }">
        <v-img :src="sportInactiveDevIconGetter(item.sportId)" :alt="item.nameEn" contain width=40 aspect-ration=1.5 lazy-src></v-img>
      </template>
      <template v-slot:item.isDeleted="{ item }">
        <v-switch
          :input-value="!item.isDeleted"
          @change="toggle(item)"
          color="primary"
          hide-details
        ></v-switch>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            S P O R T S
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
        <td v-if="!item.isDeleted" :colspan="headers.length">
          <LeagueTable :sport="item" :location="location" :key="key"/>
        </td>
        <td v-else :colspan="headers.length">
          Please enable {{ item.nameEn }} first
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </div>
</template>

<script>
import { SNACKBAR_TYPE } from '../../common/constants'
import Snackbar from '@/components/common/Snackbar.vue'
import LeagueTable from '@/components/tables/LeagueTable.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SportAndLeagueList',
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      random: '',
      snackbarType: '',
      snackbarText: '',
      expanded: false,
      search: '',
      sports: [],
      loading: false,
      key: +new Date(),
      headers: [{
        text: 'Sport Id',
        align: 'start',
        sortable: true,
        value: 'sportId'
      }, {
        text: 'Sport Name',
        align: 'start',
        sortable: true,
        value: 'nameEn'
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
      }, {
        text: 'Active',
        align: 'start',
        sortable: true,
        value: 'isDeleted'
      }]
    }
  },
  components: {
    Snackbar,
    LeagueTable
  },
  watch: {
    sportsGetter: {
      handler: function (val) {
        this.sports = val
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['sportsGetter', 'sportActiveDevIconGetter', 'sportInactiveDevIconGetter'])
  },
  async created () {
    this.loading = true
    this.sports = this.sportsGetter
    if (this.sports.length) {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['toggleSport']),
    reloadLeagueList (rowData) {
      if (rowData.value) {
        this.key = +new Date()
      }
    },
    itemRowBackground (item) {
      if (item.isDeleted) {
        return 'red lighten-2'
      }
    },
    async toggle (item) {
      try {
        await this.toggleSport({ sportId: item.sportId })
        item.isDeleted = !item.isDeleted

        this.snackbarType = SNACKBAR_TYPE.SUCCESS.text
        this.snackbarText = item.nameEn + ' ' + (item.isDeleted ? 'disabled' : 'enabled')
      } catch (error) {
        this.snackbarType = SNACKBAR_TYPE.ERROR.text
        this.snackbarText = error.message
      }

      this.random = String(+new Date())
      return item.isDeleted
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
.v-input--switch {
  margin-top: 0;
}
</style>
