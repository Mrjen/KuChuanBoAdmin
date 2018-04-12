import request from '@/utils/request';
import api  from './apiUrl';
console.log('api',api.SIGN)

export function yesterdayOverview(params) {
  params.sign = api.SIGN;
  return request({
    url: api.yesterayOverview,
    method: 'get',
    params
  })
}
