import Kuma from '@/services/kuma'
import { MeshInsight } from '@/types'
import { fetchAllResources } from '@/helpers'

import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootInterface } from '../..'
import { calculateMeshInsights, calculateGlobalInsights } from './utils'
import { SidebarInterface } from './sidebar.types'

const state: SidebarInterface = {
  insights: {
    global: {},
    mesh: {
      services: {
        internal: 0,
        external: 0,
      },
      dataplanes: {
        total: 0,
        standard: 0,
        gateway: 0,
      },
      policies: {},
    },
  },
}

const mutations: MutationTree<SidebarInterface> = {
  SET_GLOBAL_INSIGHTS: (state, globalInsights) => (state.insights.global = globalInsights),
  SET_MESH_INSIGHTS: (state, meshInsight) => (state.insights.mesh = meshInsight),
}

const getters: GetterTree<SidebarInterface, RootInterface> = {}

const actions: ActionTree<SidebarInterface, RootInterface> = {
  getInsights({ dispatch }) {
    return Promise.all([dispatch('getGlobalInsights'), dispatch('getMeshInsights')])
  },

  async getMeshInsights({ commit, rootState }) {
    const selectedMesh = rootState.selectedMesh

    let meshInsightsRawData: { items: MeshInsight[]; total: number }
    let meshInsights

    try {
      if (selectedMesh === 'all') {
        const params = {
          callEndpoint: Kuma.getAllMeshInsights.bind(Kuma),
        }

        meshInsightsRawData = await fetchAllResources<MeshInsight>(params)
      } else {
        meshInsightsRawData = { items: [await Kuma.getMeshInsights({ name: selectedMesh })], total: 1 }
      }

      meshInsights = calculateMeshInsights(meshInsightsRawData)
    } catch {
      meshInsights = []
    }

    commit('SET_MESH_INSIGHTS', meshInsights)
  },

  async getGlobalInsights({ commit }) {
    const globalInsightsRawData = await Kuma.getGlobalInsights()

    const globalInsights = calculateGlobalInsights(globalInsightsRawData)

    commit('SET_GLOBAL_INSIGHTS', globalInsights)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
