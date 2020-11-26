const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    prodName: '@sentence(0,5)',
    prodClass: '@sentence(0, 5)',
    prodType: '@sentence(10, 20)',
    prodStandard: '@sentence(0, 5)',
    systemAmount: '@integer(300, 5000)',
    wareHouseAmount: '@integer(300, 5000)'
  }],
  'types|5': [{
    id: '@id',
    label: '@sentence(0, 5)',
    value: '@sentence(0, 5)'
  }],
  'result': { msg: 'success' }
})

module.exports = [
  {
    url: '/vue-admin-template/inventory/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/inventoryType/list',
    type: 'get',
    response: config => {
      const types = data.types
      return {
        code: 20000,
        data: {
          total: types.length,
          types: types
        }
      }
    }
  },
  {
    url: '/vue-admin-template/createInventory',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          result: data.result
        }
      }
    }
  },
  {
    url: '/vue-admin-template/leadOut',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          result: data.result
        }
      }
    }
  }
]
