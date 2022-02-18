<template>
  <div>
    <Snackbar :snackbarText="snackbarText" :snackbarType="snackbarType" :random="snackbarRandom"/>
    <v-data-table
      :headers="headers"
      :items="leagues"
      item-key="leagueId"
      class="elevation-3"
      :search="search"
      :single-expand="true"
      show-expand
      :item-class="itemRowBackground"
      :options.sync="options"
      dense
      :loading="loading"
      loading-text="Loading..."
      :server-items-length="count"
      @item-expanded="reloadParticipantList"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            L E A G U E S
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
            single-line
            hide-details
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-toolbar>
        <v-toolbar v-if="!location || !sport" extended flat>
          <v-toolbar-title class="d-flex">
            <SearchSelect v-if="!location" :items="locations" :label="searchLocationLabel" item-text="nameEn" item-value="locationId" v-on:item-selected="itemSelected"/>
            <SearchSelect v-if="!sport" :items="sports" :label="searchSportLabel" item-text="nameEn" item-value="sportId" v-on:item-selected="itemSelected"/>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.location="{ item }">
        <td class="text-xs-right">
          <v-img :src="locationDevIconGetter(item.Location.locationId)" :alt="item.Location.nameEn" width=40 aspect-ration=1.5 lazy-src></v-img>
        </td>
        <td class="text-xs-right">&nbsp; {{ item.Location.nameEn }}</td>
      </template>
      <template v-slot:item.sport="{ item }">
        <td class="text-xs-right">{{ item.Sport.nameEn }}</td>
      </template>
      <template v-slot:item.icon="{ item }">
        <td class="text-xs-right">
          <v-img :src="leagueDevIconGetter(item.leagueId) + '?rand=' + random" :alt="item.name" contain width=40 aspect-ration=1.5 lazy-src></v-img>
        </td>
      </template>
      <template v-slot:item.isDeleted="{ item }">
        <v-switch
          :input-value="!item.isDeleted"
          @change="toggle(item)"
          color="primary"
          hide-details
        ></v-switch>
      </template>
      <template v-slot:item.uploadIcon="{ item }">
        <td class="text-xs-right">
          <FileUpload :item="item" type="league" v-on:file-uploaded="reloadIcons"/>
        </td>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td v-if="!item.isDeleted" :colspan="headers.length">
          <ParticipantTable :league="item" :key="key"/>
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
import { SEARCH_SELECT_LABELS, SNACKBAR_TYPE } from '../../common/constants'
import Snackbar from '@/components/common/Snackbar.vue'
import FileUpload from '@/components/common/FileUpload.vue'
import SearchSelect from '@/components/common/SearchSelect.vue'
import ParticipantTable from '@/components/tables/ParticipantTable.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  props: {
    location: {
      type: Object,
      default: null
    },
    sport: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      searchSportLabel: SEARCH_SELECT_LABELS.SPORTS,
      searchLocationLabel: SEARCH_SELECT_LABELS.LOCATIONS,
      snackbarText: '',
      snackbarType: '',
      snackbarRandom: '',
      selectedSportId: this.sport?.sportId,
      selectedLocationId: this.location?.locationId,
      count: 0,
      leagues: [],
      sports: [],
      locations: [],
      search: '',
      key: +new Date(),
      loading: false,
      options: {},
      random: +new Date(),
      headers: [{
        text: 'League Id',
        align: 'start',
        sortable: true,
        value: 'leagueId'
      }, {
        text: 'Location',
        align: 'start',
        sortable: false,
        value: 'location'
      }, {
        text: 'Sport',
        align: 'start',
        sortable: false,
        value: 'sport'
      }, {
        text: 'League Name',
        align: 'start',
        sortable: true,
        value: 'nameEn'
      }, {
        text: 'Icon',
        value: 'icon',
        sortable: false,
        align: 'start'
      }, {
        text: 'Deleted',
        value: 'isDeleted',
        sortable: false,
        align: 'start'
      }, {
        text: 'Updated Icon',
        value: 'uploadIcon',
        sortable: false,
        align: 'start'
      }]
    }
  },
  mounted () {
    this.sports = this.sportsGetter
    this.locations = this.locationsGetter
  },
  components: {
    Snackbar,
    FileUpload,
    SearchSelect,
    ParticipantTable
  },
  watch: {
    sportsGetter: {
      handler: function (val) {
        this.sports = val
      },
      deep: true
    },
    locationsGetter: {
      handler: function (val) {
        this.locations = val
      },
      deep: true
    },
    options: {
      async handler () {
        await this.setLeagues()
      },
      deep: true
    },
    search: {
      async handler () {
        await this.setLeagues()
      }
    }
  },
  computed: {
    ...mapGetters(['locationsGetter', 'sportsGetter', 'leaguesGetter', 'locationDevIconGetter', 'leagueDevIconGetter'])
  },
  methods: {
    ...mapActions(['getLeagues', 'toggleLeague']),
    itemSelected (event) {
      if (event.type === SEARCH_SELECT_LABELS.LOCATIONS) {
        this.selectedLocationId = event.id
      } else if (event.type === SEARCH_SELECT_LABELS.SPORTS) {
        this.selectedSportId = event.id
      }

      this.setLeagues()
    },
    reloadIcons (data) {
      if (data) {
        this.random = +new Date()
      }
    },
    itemRowBackground (item) {
      if (item.isDeleted) {
        return 'red lighten-2'
      }
    },
    async setLeagues (item) {
      this.loading = true
      this.leagues = []

      const { filters, sortingFilters } = this.getFilters()
      await this.getLeagues({ filters, sortingFilters })

      const { leagues, count } = this.leaguesGetter
      this.leagues = leagues
      this.count = count
      this.loading = false
    },
    async toggle (item) {
      try {
        await this.toggleLeague({ leagueId: item.leagueId })
        item.isDeleted = !item.isDeleted

        this.snackbarText = item.nameEn + ' ' + (item.isDeleted ? 'disabled' : 'enabled')
        this.snackbarType = SNACKBAR_TYPE.SUCCESS.text
      } catch (error) {
        this.snackbarText = error.message
        this.snackbarType = SNACKBAR_TYPE.ERROR.text
      }

      this.snackbarRandom = String(+new Date())
      return item.isDeleted
    },
    getFilters () {
      const sortingFilters = [{
        key: this.options.sortBy[0],
        value: this.options.sortDesc[0]
      }]

      const filters = {
        pageNumber: this.options.page,
        itemsPerPage: this.options.itemsPerPage
      }

      if (this.search !== '') filters.name = this.search
      if (this.selectedSportId) filters.sportId = this.selectedSportId
      if (this.selectedLocationId) filters.locationId = this.selectedLocationId

      return { filters, sortingFilters }
    },
    reloadParticipantList (rowData) {
      if (rowData.value) {
        this.key = +new Date()
      }
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
.select-group::nth-chile(1) {
  display: inline-flex !important;
}
</style>
