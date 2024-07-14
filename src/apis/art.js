import { request } from "../request";
//获取列表信息
export  function getChannelsApi(){
    return request({
        utl:'/channels',
        method:'GET'
    })
}
//新增文章
export function createArticleApi(data){
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data
    })
}
//更新文章
export function upDateArticleApi(data){
    return request({
        url:`/mp/articles/${data.id}?draft=false`,
        method:'PUT',
        data
    })
}
export function getArticleApi(params){
    return request({
        url:'/mp/articles',
        method:'GET',
        params
    })
}
export function delArticleApi(id){
    return request({
        url:`/mp/articles/${id}`,
        method:'DELETE'
    })
}
export function getArticleData(id){
    return request({
        url:`/mp/articles/${id}`,
        method:'GET'
    })
}