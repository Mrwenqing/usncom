
import request from "../utils/request"

// 获取会员列表与查询分页接口
const getMemberList = (currentPage,pageSize,data) => {
  return request({
    url : `/member/list/search/${currentPage}/${pageSize}`,
    method : "POST",
    data
  })
}


// 删除会员接口
const deleteMemberList = (id) => {
  return request({
    url : `/member/${id}`,
    method : 'DELETE'
  })
}

// 新增会员接口
const addMember = (data) => {
  return request({
    url : '/member',
    method : 'POST',
    data
  })
}

// 编辑会员接口
const editMember = (id,data) => {
  return request({
    url : `/member/${id}`,
    method : "PUT",
    data
  })
}

// 查询单个会员接口
const findMember = (id) => {
  return request({
    url : `/member/${id}`,
    method : 'GET'
  })
}


export default {
  getMemberList,
  deleteMemberList,
  addMember,
  editMember,
  findMember
}
