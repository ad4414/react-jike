import './index.scss'
import { Card, Form, Input, Button} from 'antd'
import logo from '../../assets/logo.png'
import {useDispatch} from 'react-redux'
import { fetchData } from '../../store/dataLogin'
import { useNavigate } from 'react-router-dom'
 
const Login = () => {
      const dispatch=useDispatch()
      const navigate=useNavigate()
    const onFinish=async (values)=>{
      console.log(values);
      await dispatch(fetchData(values))  
       navigate('/')
    }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger={['onBlur']}>
          <Form.Item  name="mobile"
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: /[0-9-_]{11}$/,
            message: '手机号码格式不对'
          }
        ]} >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item  name="code"
        rules={[
          { required: true, message: '请输入验证码' },
        ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login