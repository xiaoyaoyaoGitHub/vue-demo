const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    createTime: '@time',
    status: '@sentence(0, 5)',
    total: '@integer(300, 5000)',
    buyer: '@sentence(3, 5)',
    checker: '@integer(300, 5000)',
    handle: '@integer(300, 5000)'
  }],
  'orderItems|10': [{
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
    url: '/vue-admin-template/incomeManager/list',
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
    url: '/vue-admin-template/income/detail',
    type: 'get',
    response: config => {
      const orderItems = data.orderItems
      return {
        code: 20000,
        data: {
          total: orderItems.length,
          items: orderItems
        }
      }
    }
  },
  {
    url: '/vue-admin-template/income/put',
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
    url: '/vue-admin-template/income/delete',
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
