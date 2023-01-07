import request from '@/utils/request'

export function imgQuery(query){
    console.log( ' API imgQuery query --> ', query );
    return request({
        method: 'get',
		url: '/tujingling/ieat?' + query
    })
}
