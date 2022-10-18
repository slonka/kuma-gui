import { createStore } from 'vuex'

import { storeConfig, State } from '../../index'

describe('sidebar module', () => {
  describe('actions', () => {
    it('tests getInsights action', async () => {
      const store = createStore<State>(storeConfig)

      await store.dispatch('sidebar/getInsights')

      expect(store.state.sidebar).toMatchInlineSnapshot(`
{
  "insights": {
    "global": {
      "GlobalSecret": 0,
      "Mesh": 3,
      "Zone": 4,
      "ZoneEgress": 1,
      "ZoneIngress": 1,
    },
    "mesh": {
      "dataplanes": {
        "gateway": 1,
        "standard": 9,
        "total": 10,
      },
      "policies": {
        "CircuitBreaker": 2,
        "FaultInjection": 2,
        "HealthCheck": 4,
        "MeshGateway": 1,
        "MeshGatewayRoute": 1,
        "ProxyTemplate": 1,
        "RateLimit": 0,
        "Retry": 1,
        "Secret": 6,
        "Timeout": 1,
        "TrafficLog": 1,
        "TrafficPermission": 3,
        "TrafficRoute": 1,
        "TrafficTrace": 3,
        "VirtualOutbound": 0,
      },
      "services": {
        "external": 2,
        "internal": 3,
        "total": 5,
      },
    },
  },
}
`)
    })
  })
})
