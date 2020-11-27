import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/getInstockGoods?goodName=red',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getInstockGoods?goodName=red',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
