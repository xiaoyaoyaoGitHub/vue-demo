import request from '@/utils/request'

// 获取库存列表
export function getOutList(params) {
  return request({
    url: '/vue-admin-template/outManager/list',
    method: 'get',
    params
  })
}

// 获取详情表格
export function getOutOrder(params) {
  return request({
    url: '/vue-admin-template/outManager/order',
    method: 'get',
    params
  })
}

// 生成出库单
export function createOutOrder(params) {
  return request({
    url: '/vue-admin-template/createOutOrder',
    method: 'get',
    params
  })
}
