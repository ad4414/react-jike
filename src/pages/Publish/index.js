import {Card,Breadcrumb,Select ,Input,Space,Form, Button,Radio ,Upload } from "antd"
import { Link ,useSearchParams } from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {   channelsData } from "../../store/dataLogin"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createArticleApi, getArticleData, upDateArticleApi } from "../../apis/art"
const { Option } = Select
 
const Publish=()=>{
    const [imgType,setImgType]=useState(1)
    const [img,setImg]=useState([])//保存图片
   const [searchParams]=useSearchParams()
    //选择图片
     const upLoadChange=(value)=>{
        console.log(1);
        setImg(value.fileList)
      
        console.log(img);
     }
     //切换图片类型
     const changeType=(e)=>{
         setImgType(e.target.value)
       if(imgType===0){
        setImg([])
       }
     }
    
    //存文章
    const onFinish= (values)=>{
      const {title,content,channel_id}=values
      const data={
        title:title,
        content:content,
        cover:{
          type:imgType,
          images:img.map(item=>{
            if(item.response){
              return item.response.data.url
            }else{
              return item.url
            }
          })
        },
        channel_id:channel_id
    }
         //提交数据
         if(artId){
               //更新接口
             upDateArticleApi({...data,id:artId})
         }else{
          //新增接口
           createArticleApi(data)
         }
        
    }
     
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(channelsData())
    },[dispatch])
    //获取channels数据
    const channels=useSelector(state=>state.login.channels)
    console.log(channels);
    //回填数据
    //获取ID
    const artId=searchParams.get('id') 
    console.log(artId);
    //获取实例
    const [form]=Form.useForm()
    useEffect(()=>{
     async function getArt(){
     const res=await getArticleData(artId )
    form.setFieldsValue({...res.data,
     type: res.data.cover.type

    })
    setImgType(res.data.cover.type)
    setImg(res.data.cover.images.map(url=>{
      return {url}
    }))
      }
      if(artId)
      getArt()
    },[artId,form])
 
    return  <div className="publish">
    <Card
      title={
        <Breadcrumb items={[
          { title: <Link to={'/home'}>首页</Link> },
          { title:`${artId ? '编辑' : '发布'}文章`},
        ]}
        />
      }
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ type: 1 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input placeholder="请输入文章标题" style={{ width: 400 }} />
        </Form.Item>
        
        <Form.Item
          label="频道"
          name="channel_id"
          rules={[{ required: true, message: '请选择文章频道' }]}
        >
          <Select placeholder="请选择文章频道" style={{ width: 400 }} >
            {channels.map(element => (
                  <Option key={element.id} value={element.id}>{element.name}</Option>
                  
            ) )}
           
          </Select>
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
              <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
        </Form.Item>
        <Form.Item label="封面">
  <Form.Item name="type">
    <Radio.Group onChange={changeType}>
      <Radio value={1}>单图</Radio>
      <Radio value={3}>三图</Radio>
      <Radio value={0}>无图</Radio>
    </Radio.Group>
  </Form.Item>
   { imgType>0&&<Upload
    listType="picture-card"
    showUploadList
    action={'http://geek.itheima.net/v1_0/upload ' }
    onChange={upLoadChange}
    name="image"
     maxCount={imgType}
     disabled={img.length<=imgType?false :true}
     fileList={img}
  >
    <div style={{ marginTop: 8 }}>
      <PlusOutlined />
    </div>
  </Upload>  }
</Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button size="large" type="primary" htmlType="submit" >
              发布文章
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  </div>

    }

export default Publish