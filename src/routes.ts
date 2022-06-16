import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';

const Editor = lazy(() => import('@/pages/Editor'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Render = lazy(() => import('@/pages/Render'));
const PageList = lazy(() => import('@/pages/PageList'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/render/:slug',
      component: Render,
    },{
      path: '/page',
      component: PageList,
    }, {
      path: '/',
      //exact: true,
      component: Editor,
    }, {
      component: NotFound,
    }],
  },
];

export default routerConfig;
