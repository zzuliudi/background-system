import request from "../../utils/request"
// 获得sku列表的接口
// /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: "get" })

// 产品上架
// /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: "get" })
    // 产品下架
    ///admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" })

// 获取sku详情
// /admin/product/getSkuById/{skuId} get
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: "get" })