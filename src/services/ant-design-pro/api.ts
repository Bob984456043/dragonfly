
const host= "http://10.168.0.10:31118"
const grpc="/grpc"
function grpcProxyApi(method:string) {
  return host+grpc+method
}
import { request } from 'ice';

/** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(options?: { [key: string]: any }) {
//   return request(grpcProxyApi('/whale.oauth.proto.OAuth/TokenInfo'),
//      'POST');
// }

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request({
    url:grpcProxyApi('/whale.oauth.proto.OAuth/Login'),
    method:"POST",
    data:body,
    withFullResponse: true,
  });
}

export async function getTabTree(options?: { [key: string]: any }){
  return request({
    url:host+'/vapp/sidebar',
    method:"GET",
    withFullResponse: true,
  });
}
export async function saveTabTree(body: API.SideBarConfig,options?: { [key: string]: any }){
  return request({url:host+'/vapp/sidebar',method:"POST",data:body,    withFullResponse: true,});
}
export async function getPageList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request({url:host+'/vapp/listapcfg',method:"POST",data:{
      limit:params?.pageSize,
      offset:(params?.current-1)*10
    }});
}
/** 新建页面 POST /api/rule */
export async function savePage(body:API.SavePageReq, options?: { [key: string]: any }) {
  return request({url:host+'/vapp/apcfg',method:"POST",data:body});
}
export async function GetPage(param:API.GetPageReq, options?: { [key: string]: any }) {
  return request({url:host+'/vapp/apcfg',params:param});
}
