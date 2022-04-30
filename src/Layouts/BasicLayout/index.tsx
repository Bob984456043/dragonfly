import { createElement,useState ,useEffect} from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'ice';
import { asideMenuConfig } from './menuConfig';
import {walk} from "@/utils/utils";
import {getTabTree} from "@/services/ant-design-pro/api";
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import {RightContent} from '../../components/RightContent'
import React from 'react';
const loopMenuItem = (menus) =>
  menus.map(({icon, children, ...item}) => ({
    ...item,
    icon: createElement(icon),
    children: children && loopMenuItem(children),
  }))

export default function BasicLayout({ children, location }) {

  // const [dynamicMenuConfig,setDynamicMenuConig] = useState<[[]]>(asideMenuConfig)
  const [dynamicMenuConfig, setDynamicMenuConfig] = useState(asideMenuConfig)

  useEffect(() => {
    getTabTree().then(({data:resp})=>{
      const tabTree=resp.config
      tabTree?.map((node)=>{
        walk(node,(cur:any)=>{
          cur.name=cur.title
          cur.path=cur.key
          if (cur.type==2){
            cur.path="/render/"+cur.key
            cur.icon=SmileOutlined
            // cur.component='./Render'
          }
        })
      })
      console.log(tabTree.concat(asideMenuConfig))

      setDynamicMenuConfig([...tabTree,...asideMenuConfig])
    })

  }, [])

  return (
    <ProLayout
      title="Dragonfly"
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      rightContentRender={()=><p>3123132131</p>}
      menuDataRender={() => loopMenuItem(dynamicMenuConfig)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
      // footerRender={() => (
      //   <DefaultFooter
      //     links={[
      //       {
      //         key: 'icejs',
      //         title: 'icejs',
      //         href: 'https://github.com/ice-lab/icejs',
      //       },
      //       {
      //         key: 'antd',
      //         title: 'antd',
      //         href: 'https://github.com/ant-design/ant-design',
      //       },
      //     ]}
      //     copyright="by icejs & antd"
      //   />
      // )}
    >
      <div style={{ minHeight: '60vh' }}>{children}</div>
    </ProLayout>
  );
}
