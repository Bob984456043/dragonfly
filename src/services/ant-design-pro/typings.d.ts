// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetCurrentUserReq = {
    accessToken?:string
    clientId?:string
    clientSecret?:string
  }
  type CurrentUser = {
    user_name?: string;
    avatar?: string;
    user_type?: string;
    mail?: string;
    phone?: string;
    id?:string;
    real_name?:string
  };

  type LoginResult = {
    accessToken?:string
    expiresIn?:number
    refreshToken?:string
    scope?:string
    tokenType?:string
    userInfo?:object
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };
  type PageListItem = {
    _id?: string;
    fid?: string;
    pageName?: string;
    update_time?: number;
    create_time?: number;
    projectSchema?: string;

    hasUsed?:boolean
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type GetPageReq={
    fid?:string
  }
  type SavePageReq={
    _id?: string;
    fid?: string;
    pageName?: string;
    update_time?: number;
    create_time?: number;
    projectSchema?: string;
  }
  type PageList = {
    data?: PageListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;

  }
  type SideBarConfig={
    _id?:string
    config?:SideBarNode[]
  }
  type SideBarNode={
    title?:string
    key?:string
    type?:number
    children?:SideBarNode[]
  }
  type FakeCaptcha = {
    code?: number;
    status?: string;
  };
  type LoginParams = {
    username?: string;
    password?: string;
    clientId?:string;
    clientSecret?:string;
    platformId?:number;
    appClient?:number;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
