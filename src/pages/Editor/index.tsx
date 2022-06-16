import React, { useEffect } from 'react'
import { init, skeleton } from '@alilc/lowcode-engine';
import './global.scss';
import registerPlugins from './plugin';

export default function PageEditor() {

    // skeleton.add({
    //     area: 'topArea',
    //     type: 'Widget',
    //     name: 'logo',
    //     content: "holyshit!",
    //     contentProps: {
    //       logo:
    //         'https://img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png',
    //       href: '/',
    //     },
    //     props: {
    //       align: 'left',
    //       width: 100,
    //     },
    //   });    
    
    useEffect(() => {
        registerPlugins();
        init(document.getElementById('lowcodeshit')!);
    }, [])
    return (
        <div id="lowcodeshit">hahahahah1</div>
    );
}



