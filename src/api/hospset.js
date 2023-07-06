import request from '@/utils/request'

// 获取所有分页信息
export function gethospsetList(current, limit, searchObj) {
  return request({
    url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
    method: 'post',
    data: searchObj
  })
}
// 删除单个
export function deleteHospSet(id) {
  return request({
    url: `/admin/hosp/hospitalSet/delete/${id}`,
    method: 'delete'
  })
}

// 批量删除
export function removeRows(idList) {
  return request({
    url: `/admin/hosp/hospitalSet/beach`,
    method: 'delete',
    data: idList
  })
}

// 锁定和取消锁定
export function lockHospSet(id, status) {
  return request({
    url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
    method: 'put'
  })
}

// 院设置id查询
export function getHospSet(id) {
  return request({
    url: `/admin/hosp/hospitalSet/${id}`,
    method: 'get'
  })
}

// 新增医院信息
export function addHospSet(hosp) {
  return request({
    url: '/admin/hosp/hospitalSet/add',
    method: 'put',
    data: hosp,
  })
}

// 修改医院信息
export function updateHospSet(hospitalSet) {
  return request({
    url: `/admin/hosp/hospitalSet/update`,
    method: 'post',
    data: hospitalSet
  })
}

