import { PlusOutlined ,UnorderedListOutlined,CloseOutlined} from '@ant-design/icons';
import { Button, message,Modal,Tree ,Row,Col,List,Tag} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import {walk} from '@/utils/utils';
import moment from "moment"
import {
  savePage,
  getPageList,
  getTabTree,
  saveTabTree,
} from '@/services/ant-design-pro/api';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.SavePageReq) => {
  const hide = message.loading('正在创建');

  try {
    await savePage({ ...fields });
    hide();
    message.success('创建成功');
    return true;
  } catch (error) {
    hide();
    message.error('创建失败');
    return false;
  }
};


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [tabModalVisible, handleTabModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [tabTree, setTabTree] = useState<API.SideBarNode[]>([]);
  const [selectTabList, setSelectTabList] = useState<API.PageListItem[]>([]);

  const columns: ProColumns<API.PageListItem>[] = [
    {
      title: 'id',
      dataIndex: '_id',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'slug',
      dataIndex: 'fid',
      sorter: true,
      hideInForm: true,
      tip: '页面唯一标识',
    },
    {
      title: '页面名称',
      dataIndex: 'pageName',
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (_,record)=>[
        <p>{(record.create_time&&record.create_time!=0)?moment(parseInt(record.create_time*1000)).format("YYYY/MM/DD HH:mm:ss"):'-'}</p>
      ]


    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      render: (_,record)=>[
        <p>{(record.update_time&&record.update_time!=0)?moment(parseInt(record.update_time*1000)).format("YYYY/MM/DD HH:mm:ss"):'-'}</p>
      ]
    },
    {
      title: '操作',
      dataIndex: '',
      render: (_, record) => [
        // <button
        //   onClick={() => {
        //     // handleUpdateModalVisible(true);
        //     // setCurrentRow(record);
        //
        //
        //   }}
        // >
        //   重命名
        // </button>,
        <button
          onClick={() => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);

            window.open("http://localhost?slug="+record.fid+"&id="+record._id);
          }}
        >
          设计
        </button>,
        <button
          onClick={() => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);

            window.open("/render/"+record.fid);
          }}
        >
          预览
        </button>,
      ],

    },
  ];
  function onTabModelOpen() {
    handleTabModalVisible(true)
    getPageList({current:1,pageSize:10000000}).then((resp)=>{
      // saveTabTree({
      //   _id:"1",
      //   config:[{children:[]}]
      // })
      getTabTree().then(({data:respTree})=>{
        console.log("#####respTree",respTree)
        let existTabList: API.SideBarNode[]=[]
        setTabTree(respTree?.config||{children:[]})
        respTree?.config?.map((node)=>{
          walk(node,(n: API.SideBarNode)=>{
            if (n.type==2){
              existTabList=existTabList.concat(n)
            }
          })
        })
        resp?.data?.map((item)=>{
          existTabList.map((i)=>{
            if (item.fid==i.key){
              item.hasUsed=true
            }
          })
        })
        setSelectTabList( resp?.data||[])
      })
    })


  }
  function onDrop(){

  }
  return (
    <PageContainer>
      <ProTable<API.PageListItem, API.PageParams>
        headerTitle={'页面列表'}
        actionRef={actionRef}
        rowKey="_id"
        search={false}
        options={{
          search: true,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建页面
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={onTabModelOpen}
          >
            <UnorderedListOutlined /> 编辑侧边栏
          </Button>,
        ]}
        request={getPageList}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <ModalForm
        title={'新建页面'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.SavePageReq);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }


          }
        }}
      >
        <ProFormText
          label={"页面名称"}
          rules={[
            {
              required: true,
              message: '页面名称为必填项',
            },
          ]}
          width="md"
          name="pageName"
        />
        <ProFormText
          label={"页面标识/slug"}
          rules={[
            {
              required: true,
              message: '页面标识为必填项',
            },
          ]}
          width="md"
          name="fid"
        />
      </ModalForm>
      <Modal
        title="编辑侧边栏"
        centered
        visible={tabModalVisible}
        onOk={() => {

          console.log("dsdsdd",tabTree)
          saveTabTree({
            _id:"1",
            config:tabTree
          })

          handleTabModalVisible(false)
          window.location.reload()

        }}
        onCancel={() => handleTabModalVisible(false)}
        width={800}
      >
        <Row>
          <Col span={12}>
            <Tree
              className="draggable-tree"
              defaultExpandAll
              // defaultExpandedKeys={this.state.expandedKeys}
              draggable
              blockNode
              // onDragEnter={this.onDragEnter}
              onDrop={onDrop}
              treeData={tabTree}
              titleRender={(item)=>{
                return (
                  <Row align={"middle"}>
                    <Col span={12}>
                      <p>{item.title}</p>
                    </Col>
                    <Col span={8}>
                      <Tag color="blue">{item.type==2?"页面":"自定义nav"}</Tag>
                    </Col>
                    <Col span={4}>
                      <Button size={"small"} shape="round" icon={<CloseOutlined />} onClick={()=>{
                        tabTree?.map((node,i)=>{
                            if (node.key==item.key){
                              tabTree.splice(i,1)
                              console.log(tabTree)
                              return
                            }
                            walk(node,(curr: API.SideBarNode)=>{
                              curr?.children?.map((child,ci)=>{
                                if (curr.key==item.key){
                                  curr?.children?.splice(ci,1)
                                }
                              })
                            })
                          })
                          console.log("####tabTree",tabTree)
                          setTabTree([...tabTree])
                      }}>

                      </Button>
                    </Col>
                  </Row>


                )
              }}
              showLine={true}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <List
              className="demo-loadmore-list"
              // loading={initLoading}
              itemLayout="horizontal"
              // loadMore={loadMore}
              bordered={true}
              dataSource={selectTabList}
              key={"_id"}
              renderItem={item => (
                <List.Item
                  actions={(item.hasUsed!==true)?[<Button
                    type="primary"
                    key="primary"
                    onClick={()=>{

                      item.hasUsed=true
                      setSelectTabList(selectTabList)
                      console.log("####tabTree",tabTree)
                      setTabTree([{key:item.fid,title:item.pageName,type:2}, ...tabTree])
                      setSelectTabList(selectTabList)

                    }}
                  >
                    <PlusOutlined /> 添加
                  </Button>]:[<Button
                    type="primary"
                    key="primary"
                    disabled
                  >
                    <PlusOutlined /> 已添加
                  </Button>]}
                >
                  <List.Item.Meta
                    title={item?.pageName}
                    description={item?.fid}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
