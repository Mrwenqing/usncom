import request from "../utils/request";

// 获取/查询 商品列表接口
const getGoodsList = (page, size, data) => {
  return request({
    url: `/goods/list/search/${page}/${size}`,
    method: "GET",
    data,
  });
};

// 删除单个商品接口
const deleteGoodsList = (id) => {
  return request({
    url: `/goods/${id} `,
    method: "DELETE",
  });
};

// 新增商品
const addGoods = (data) => {
  return request({
    url: "/goods",
    method: "POST",
    data,
  });
};

// 编辑商品
const editGoods = (id, data) => {
  return request({
    url: `/goods/${id} `,
    method: "PUT",
    data,
  });
};

// 查询单个商品接口
const findGoods = (id) => {
  return request({
    url: `/goods/${id}`,
    method: "GET",
  });
};

export default {
  getGoodsList,
  deleteGoodsList,
  addGoods,
  editGoods,
  findGoods,
};
