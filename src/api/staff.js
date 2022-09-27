import request from "../utils/request";

// 获取/查询 员工列表接口
const getStaffList = (page, size, data) => {
  return request({
    url: `/staff/list/search/${page}/${size}`,
    method: "GET",
    data,
  });
};

// 删除单个员工接口
const deleteStaffList = (id) => {
  return request({
    url: `/staff/${id} `,
    method: "DELETE",
  });
};

// 新增员工
const addStaff = (data) => {
  return request({
    url: "/staff",
    method: "POST",
    data,
  });
};

// 编辑员工
const editStaff = (id, data) => {
  return request({
    url: `/staff/${id} `,
    method: "PUT",
    data,
  });
};

// 查询单个员工接口
const findStaff = (id) => {
  return request({
    url: `/staff/${id}`,
    method: "GET",
  });
};

export default {
  getStaffList,
  deleteStaffList,
  addStaff,
  editStaff,
  findStaff,
};
