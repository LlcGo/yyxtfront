import request from '@/utils/request'

// 获取所有分页信息
export function gethosptList(current, limit, searchObj) {
  return request({
    url: `/admin/hosp/hospital/page/${current}/${limit}`,
    method: 'get',
    params: searchObj
  })
}

export function findByDictCode(dictCode) {
  return request({
    url: `/admin/cmn/dict/findDicChlidren/${dictCode}`,
    method: 'get'
  })
}

export function findByParentId(id) {
  return request({
    url: `/admin/cmn/dict/findChildDate/${id}`,
    method: 'get'
  })
}

export function updateStatus(id, status) {
  return request({
    url: `/admin/hosp/hospital/update/hospital/${id}/${status}`,
    method: 'get'
  })
}

// 查看医院详情
export function getHospById(id) {
  return request({
    url: `/admin/hosp/hospital/show/hospital/${id}`,
    method: 'get'
  })
}
