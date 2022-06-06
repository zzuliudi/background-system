// 引入axios二次封装函数
import request from "../utils/request"
// 对外暴露登录接口函数
export function login(data) {
    return request({
        url: '/admin/acl/index/login',
        method: 'post',
        data
    })
}
// 对外暴露获得用户信息的函数
export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/admin/acl/index/logout',
        method: 'post'
    })
}