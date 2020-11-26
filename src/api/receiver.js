import request from '@/utils/request'

// 获取库存列表
export function getIncomeList(params) {
  return request({
    url: '/vue-admin-template/incomeManager/list',
    method: 'get',
    params
  })
}

// 获取详情表格
export function getOrderDetailList(params) {
  return request({
    url: '/vue-admin-template/income/detail',
    method: 'get',
    params
  })
}
