const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    createTime: '@time',
    info: '@sentence(0, 5)',
    receiver: '@integer(300, 5000)',
    recePhone: '@sentence(3, 5)',
    address: '@integer(300, 5000)'
  }],
  'orderItems|10': [{
    id: '@id',
    createTime: '@time',
    outAmount: '@integer(300, 5000)',
    status: '@sentence(10, 20)'
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
    url: '/vue-admin-template/outManager/list',
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
    url: '/vue-admin-template/outManager/order',
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
    url: '/vue-admin-template/createOutOrder',
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
    url: '/vue-admin-template/outManager/delete',
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
