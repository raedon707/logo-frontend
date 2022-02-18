<template>
  <LeagueTable/>
</template>

<script>
import LeagueTable from '@/components/tables/LeagueTable.vue'

export default {
  name: 'Leagues',
  components: {
    LeagueTable
  }
}
</script>

<style scoped>
.v-data-table {
  margin: 50px !important;
}
</style>
