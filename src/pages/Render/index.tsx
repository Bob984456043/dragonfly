import React, { useState, useRef ,useEffect} from 'react';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import ReactDOM from "react-dom"
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import {  useRouteMatch } from 'react-router-dom';
import { GetPage } from '@/services/ant-design-pro/api';
import schemeJson from "/src/pages/Render/schema.json";
import packageJson from "/src/pages/Render/packages.json";
const PageRender = () => {
  const route = useRouteMatch<{ slug: string }>();
  const [data, setData] = useState({});
  const slug = route.params.slug;
  async function init() {
    const config =await GetPage({fid:slug})
    // const packages = packageJson;
    // const projectSchema = schemeJson;
    const { componentsMap: componentsMapArray, componentsTree } = JSON.parse(config?.projectSchema||'{}');
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];
    const libraryMap = {};
    const libraryAsset = [];
    console.log(JSON.parse(config?.packages||'[]'))
    JSON.parse(config?.packages||'[]').forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });
    console.log("----asset---",libraryAsset)
    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    try {
      await assetLoader.load(libraryAsset);
    }catch (e){
      console.log("------------chu---------",e)
    }
    const components = await buildComponents(libraryMap, componentsMap);


    console.log("0-----------------",components)
    setData({
      schema,
      components,
    });
  }
  const { schema, components } = data;
  if (!schema || !components) {
    init();
    return <p>玛卡巴卡---------</p>;
  }
  return (
    <div>
        <ReactRenderer
          className="lowcode-plugin-sample-preview-content"
          schema={schema}
          components={components}
        />
    </div>
  );
};

export default PageRender
