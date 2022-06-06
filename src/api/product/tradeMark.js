import request from "../../utils/request"
//这个模块获取品牌管理的接口
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: "get" })
    // 添加品牌 切记不需要id，id是服务器自动生成的
    // /admin/product/baseTrademark/save 类型post 两个参数：品牌名称、品牌logo
    // 修改品牌 携带三个参数：id、品牌、品牌logo
    // /admin/product/baseTrademark/update  类型：put
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        // 修改品牌
        return request({ url: "/admin/product/baseTrademark/update", data: tradeMark, method: "put" })
    } else {
        // 添加品牌
        return request({ url: "/admin/product/baseTrademark/save", data: tradeMark, method: "post" })
    }
}

// 删除品牌
// /admin/product/baseTrademark/remove/{id}  类型：delete
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: "delete" })


//发现baseTrademarkByTrademarkIdList
// /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList



// getTrademarkList
// /admin/product/baseTrademark/getTrademarkList


// baseTrademark
// /admin/product/baseTrademark/get/{id}