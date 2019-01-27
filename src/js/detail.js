function getGoodsDetailInfo () {
  // 天猫详情页会暴露一个变量 _DATA_Detail
  let detailInfo = _DATA_Detail
  if (!detailInfo) return alert('页面发生错误，请刷新重试')
  // 商品信息
  let item = detailInfo.item

  // 商家信息
  let seller = detailInfo.seller
  return {
    itemId: item.itemId,
    shopId: seller.shopId,
    shopUrl: seller.shopUrl
  }
}
