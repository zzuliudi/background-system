import request from "../../utils/request"
// /admin/product/{page}/{limit} catagory3Id
// 获取SPU列表
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: "get", params: { category3Id } })
    // spu
    // 获取某一个SPU信息(修改)
    // /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" })

// 品牌的数据
// /admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: "get" })

// 获取spu图片的地址
// /admin/product/spuImageList/{spuId}
// 获得图片接口
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" })
    // 获得品牌接口
    // /admin/product/baseSaleAttrList get
export const reqAttrInfoList = (catagory1Id, catagory2Id, catagory3Id) => request({ url: `/admin/product/attrInfoList/${catagory1Id}/${catagory2Id}/${catagory3Id}`, method: "get" })

// 获得销售接口
// /admin/product/spuSaleAttrList/${spuId} get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
    // sku的销售属性
    // -----------------------------------------------------------------------


// 销售属性（spu的销售属性获取）
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 修改SPU||添加SPU 唯一区别在于是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
    // 携带的参数带有id
    if (spuInfo.id) {
        return request({ url: "/admin/product/updateSpuInfo", method: "post", data: spuInfo })
    } else {
        // 携带的参数是不带id的
        return request({ url: "/admin/product/saveSpuInfo", method: "post", data: spuInfo })
    }

}

// 删除spu
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: "delete" })

// 保存接口
// /admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) => request({ url: "/admin/product/saveSkuInfo", data: skuInfo, method: "post" })

// 获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" })