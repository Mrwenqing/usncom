
import request from "../utils/request"

// 获取/查询 供应商列表接口
const getSupplierList = (currentPage,pageSize,data) => {
  return request({
    url : `/supplier/list/search/${currentPage}/${pageSize}`,
    method : "GET",
    data
  })
}


// 删除单个供应商接口
const deleteSupplierList = (id) => {
  return request({
    url : `/supplier/${id}`,
    method : 'DELETE'
  })
}

// 新增供应商
const addSupplier = (data) => {
  return request({
    url : '/supplier',
    method : 'POST',
    data
  })
}

// 编辑供应商
const editSupplier = (id,data) => {
  return request({
    url : `/supplier/${id}`,
    method : "PUT",
    data
  })
}

// 查询单个供应商接口
const findSupplier = (id) => {
  return request({
    url : `/supplier/${id}`,
    method : 'GET'
  })
}


export default {
  getSupplierList,
  deleteSupplierList,
  addSupplier,
  editSupplier,
  findSupplier
}
