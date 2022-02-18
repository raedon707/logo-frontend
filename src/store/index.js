import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../lib/axios'
import { ICON_UPLOAD_TYPE } from '../common/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    sports: [],
    leagues: [],
    participants: [],
    leagueCount: 0
  },
  mutations: {
    setLocations (state, { locations }) {
      state.locations = locations
    },
    setSports (state, { sports }) {
      state.sports = sports
    },
    setLeagues (state, { leagues }) {
      state.leagues = leagues.rows
      state.leagueCount = leagues.count
    },
    setParticipants (state, { participants }) {
      state.participants = participants
    }
  },
  actions: {
    async getLocations ({ commit }) {
      try {
        const locations = await axios.get('/app/getLocations')
        commit('setLocations', { locations: locations.data })
      } catch (error) {
        throw new Error(error)
      }
    },

    async getSports ({ commit }) {
      try {
        const sports = await axios.get('/app/getSports')
        commit('setSports', { sports: sports.data })
      } catch (error) {
        throw new Error(error)
      }
    },

    async getLeagues ({ commit }, { filters, sortingFilters }) {
      try {
        const leagues = await axios.get('/app/getLeagues', {
          params: {
            ...filters,
            sortingFilters
          }
        })

        commit('setLeagues', { leagues: leagues.data })
      } catch (error) {
        throw new Error(error)
      }
    },

    async getParticipants ({ commit }, { leagueId }) {
      try {
        const participants = await axios.get('/app/getParticipants', {
          params: {
            leagueId
          }
        })
        commit('setParticipants', { participants: participants.data })
      } catch (error) {
        throw new Error(error)
      }
    },

    async toggleSport ({ commit }, { sportId }) {
      try {
        await axios.post('/app/toogleSport', {
          sportId
        })
      } catch (error) {
        throw new Error(error)
      }
    },

    async toggleLeague ({ commit }, { leagueId }) {
      try {
        await axios.post('/app/toggleLeague', {
          leagueId
        })
      } catch (error) {
        throw new Error(error)
      }
    },

    async uploadIcon ({ commit }, { item, uploadType }) {
      try {
        const formData = new FormData()
        formData.append('file', item.file, item.file.name)
        formData.append(uploadType, JSON.stringify(item))

        if (uploadType === ICON_UPLOAD_TYPE.LEAGUE) {
          await axios.post('/app/uploadLeagueIcon', formData)
        } else if (uploadType === ICON_UPLOAD_TYPE.PARTICIPANT) {
          await axios.post('/app/uploadParticipantIcon', formData)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    locationsGetter: state => {
      return state.locations
    },
    sportsGetter: state => {
      return state.sports
    },
    leaguesGetter: state => {
      return { leagues: state.leagues, count: state.leagueCount }
    },
    participantGetter: state => {
      return state.participants
    },
    locationDevIconGetter: state => (locationId) => {
      return `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/flags/${locationId}.svg`
    },
    locationProdIconGetter: state => (locationId) => {
      return `https://tfl-node-production.s3.eu-central-1.amazonaws.com/icons/flags/${locationId}.svg`
    },
    leagueDevIconGetter: state => (leagueId) => {
      return `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/leagues/${leagueId}.png`
    },
    leagueProdIconGetter: state => (leagueId) => {
      return `https://tfl-node-production.s3.eu-central-1.amazonaws.com/icons/leagues/${leagueId}.png`
    },
    sportActiveDevIconGetter: state => (sportId) => {
      return `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/sports/${sportId}-b.svg`
    },
    sportInactiveDevIconGetter: state => (sportId) => {
      return `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/sports/${sportId}-g.svg`
    },
    sportActiveProdIconGetter: state => (sportId) => {
      return `https://tfl-node-production.s3.eu-central-1.amazonaws.com/icons/sports/${sportId}-b.svg`
    },
    sportInactiveProdIconGetter: state => (sportId) => {
      return `https://tfl-node-production.s3.eu-central-1.amazonaws.com/icons/sports/${sportId}-g.svg`
    },
    participantProdIconGetter: state => (participantId) => {
      return `https://tfl-node-production.s3.eu-central-1.amazonaws.com/icons/participants/${participantId}.png`
    },
    participantDevIconGetter: state => (participantId) => {
      return `https://tfl-node-development.s3.ap-south-1.amazonaws.com/icons/participants/${participantId}.png`
    }
  },
  modules: {
  }
})
