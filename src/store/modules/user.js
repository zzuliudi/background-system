// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块中重置路由的方法
import { asyncRoutes, resetRouter, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'
// 箭头函数
const getDefaultState = () => {
    return {
        // 获得token
        token: getToken(),
        // 存储用户名
        name: '',
        // 储存用户头像
        avatar: '',
        // 服务器返回的菜单信息
        routes: [],
        // 按钮信息
        buttons: [],
        // 角色信息
        roles: [],
        // 对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
        resultAsyncRouts: [],
        // 用户最终需要展示的全部内容
        resultAllRoutes: []
    }
}

const state = getDefaultState()
    // 唯一修改state的地方
const mutations = {
        // 重置state
        RESET_STATE: (state) => {
            Object.assign(state, getDefaultState())
        },
        // 获得token
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        // 存储用户名
        SET_USERINFO: (state, userinfo) => {
            // 用户名
            state.name = userinfo.name
                // 用户头像
            state.avatar = userinfo.avatar
                // 菜单权限的标记
            state.routes = userinfo.routes
                // 按钮权限
            state.buttons = userinfo.buttons
                // 角色
            state.roles = userinfo.roles
        },
        // 计算出异步路由
        SET_RESULTASYNCROUTES: (state, asyncRouts) => {
            // 保存的异步路由
            state.resultAsyncRouts = asyncRouts;
            // 计算出当前用户需要展开的所有路由
            state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRouts, anyRoutes)
                // 给路由器添加新的路由
            router.addRoutes(state.resultAllRoutes)
        }
    }
    // 定义一个函数：两个函数进行对比，对比出当前的用户到底显示那些也比路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
    // 过滤出当前用户的身份
    return asyncRoutes.filter(item => {
        if (routes.indexOf(item.name) != -1) {
            // 递归函数
            if (item.children && item.children.length) {
                item.children = computedAsyncRoutes(item.children, routes)
            }
            return true;
        }
    })
}
const actions = {
    // user login
    // 这里是登陆业务
    async login({ commit }, userInfo) {
        // 解构用户名与密码
        const { username, password } = userInfo
        let result = await login({ username: username.trim(), password: password })
        if (result.code == 20000) {
            // 此处使用的mock数据，mock数据是20000
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // 获取用户信息
    getInfo({ commit, state }) {

        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                // 获取用户信息：返回数据包含：用户名name、用户头像avatar、
                // routes[返回的标志:不同的用户应该展示那些菜单]、roles(用户角色信息),
                // button【按钮信息】
                const { data } = response
                console.log(data);
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                commit("SET_USERINFO", data)
                commit("SET_RESULTASYNCROUTES", computedAsyncRoutes(asyncRoutes, data.routes))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        // let result = await logout(state.token)
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}