import request from '@/utils/request'

// 获取库存列表
export function getList(params) {
  return request({
    url: '/getInstockGoods',
    method: 'get',
    params
  })
}

// 获取库存商品分类
export function getProdTypes(params) {
  return request({
    url: '/vue-admin-template/inventoryType/list',
    method: 'get',
    params
  })
}

// 创建库存列表
export function createInventory(params) {
  return request({
    url: '/vue-admin-template/createInventory',
    method: 'get',
    params
  })
}

// 导出
export function inventoryLeadOut(params) {
  return request({
    url: '/vue-admin-template/leadOut',
    method: 'get',
    params
  })
}
