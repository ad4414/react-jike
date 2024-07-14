import { Card,Breadcrumb,Form,Radio,Select,DatePicker, Button, Popconfirm} from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { channelsData } from "../../store/dataLogin"
import locale from "antd/es/date-picker/locale/en_US"
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { delArticleApi, getArticleApi } from "../../apis/art"
const { Option } = Select
const { RangePicker } = DatePicker
const Article=()=>{
  const navagite=useNavigate()
     // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data =>data===1? <Tag color="green">审核通过</Tag>:<Tag color="red">审核未通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" onClick={() => navagite(`/publish/?id=${data.id}`)}  icon={<EditOutlined />} />
             <Popconfirm 
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消">
            <Button

              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          </Space>
        )
      }
    }
  ]
   
  //获取列表数据
  const [article,setArticle]=useState([])
  
   const dispatch=useDispatch()
   const [params, setParams] = useState({
    page: 1,
    per_page: 5,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null
  })
  const [count,setCount]=useState(0)
  useEffect(()=>{
   async function getArticle(){
   const res=await getArticleApi(params)
   setArticle(res.data.results)
   setCount(res.data.total_count)
 }
 getArticle()
   },[params])
   console.log(article);
    const channels=useSelector(state=>state.login.channels)//获取channels数据
   
    useEffect(()=>{
     dispatch(channelsData())
    },[dispatch])
    //实现筛选功能
    
   const onFinish=(values)=>{
    console.log(values);
     
    const reqData = {
      ...params,
      status:values.status,
      channel_id:values.channel_id,
      begin_pubdate:values.date[0].format('YYYY-MM-DD'),
      end_pubdate: values.date[1].format('YYYY-MM-DD'),
    }
    setParams(reqData)
   }
   //删除文章
  const delArticle=async (data)=>{
    console.log(data);
    await delArticleApi(data.id)
    // 更新列表
 setParams({
  ...params
 })
  }
   //分页
   const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({...params,page})
}
    return <div>
        <Card 
        title={
          <Breadcrumb items={[
            { title: <Link to={'/home'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish}>
            <Form.Item label="状态" name="status">
    <Radio.Group   >
      <Radio value={''}>全部</Radio>
      <Radio value={3}>草稿 </Radio>
      <Radio value={0}>审核通过</Radio>
    </Radio.Group>
  </Form.Item>
  <Form.Item
          label="频道"
          name="channel_id"
          rules={[{ required: true, message: '请选择文章频道' }]}
        >
          <Select placeholder="请选择文章频道"   style={{ width: 200 }} >
            {channels.map(element => (
                  <Option key={element.id} value={element.id}>{element.name}</Option>
                  
            ) )}
           
          </Select>
        </Form.Item>
            <Form.Item
            label="日期"
            name="date"
            rules={[{
                required:true,message:'请选择时间'
            }]}
            >
              <RangePicker locale={locale}></RangePicker>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>筛选</Button>
            </Form.Item>
        </Form>
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
          <Table rowKey="id" columns={columns} dataSource={article}  pagination={{
      pageSize: params.per_page,
      onChange: pageChange,
      total: count
    }}
      ></Table>
        </Card>
         
         </Card>

          
    </div>
}

export default  Article