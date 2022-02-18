<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="participants"
      item-key="id"
      class="elevation-3"
      :search="search"
      dense
    >
      <template v-slot:item.icon="{ item }">
        <td class="text-xs-right">
          <v-img :src="participantDevIconGetter(item.id) + '?rand=' + random" :alt="item.name" contain width=40 aspect-ration=1.5 lazy-src></v-img>
        </td>
      </template>
      <template v-slot:item.uploadIcon="{ item }">
        <td class="text-xs-right">
          <FileUpload :item="item" type="participant" v-on:file-uploaded="reloadIcons"/>
        </td>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            P A R T I C I P A N T S
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
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FileUpload from '@/components/common/FileUpload.vue'

export default {
  name: 'Home',
  props: {
    league: Object
  },
  data () {
    return {
      participants: [],
      search: '',
      random: +new Date(),
      headers: [{
        text: 'Participant Id',
        align: 'start',
        sortable: true,
        value: 'id'
      }, {
        text: 'Participant Name',
        align: 'start',
        sortable: true,
        value: 'name'
      }, {
        text: 'Icon',
        value: 'icon',
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
  components: {
    FileUpload
  },
  computed: {
    ...mapGetters(['participantGetter', 'participantDevIconGetter'])
  },
  async created () {
    await this.getParticipants({ leagueId: this.league.leagueId })
    this.participants = this.participantGetter
  },
  methods: {
    ...mapActions(['getParticipants']),
    reloadIcons (data) {
      if (data) {
        this.random = +new Date()
      }
    }
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
.upload {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
