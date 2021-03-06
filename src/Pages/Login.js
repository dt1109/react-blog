import React,{useState,useEffect} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin,message } from 'antd'
import { Icon } from '@ant-design/compatible';
import '../static/css/Login.css';
import servicePath from '../config/api.url'
import axios from 'axios'


function Login(props){
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  
    const onKeyDownchange = (e)=>{
      if(e.keyCode == 0){
          //事件操作
          checkLogin()
      }
    }

  const checkLogin = ()=>{
    setIsLoading(true)

    if(!userName){
        message.error('用户名不能为空')
        setTimeout(()=>{
          setIsLoading(false)
      },500)
        return false
    }else if(!password){
        message.error('密码不能为空')
        setTimeout(()=>{
          setIsLoading(false)
      },500)
        return false
    }
    let dataProps = {
        'userName':userName,
        'password':password
    }
    axios({
        method:'post',
        url:servicePath.checkLogin,
        data:dataProps,
        withCredentials: true
    }).then(
       res=>{
            setIsLoading(false)
            if(res.data.data=='登录成功'){
              // debugger
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else{
                message.error('用户名密码错误')
            }
       }
    )

    setTimeout(()=>{
        setIsLoading(false)
    },1000)
}
  return (
    <div className='login-div'>
      <Spin tip='loading...' spinning={isLoading}>
      <Card title="JACK DT login systym" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="输入你的用户名"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        onKeyPress={e => onKeyDownchange(e)}
                        id="password"
                        size="large"
                        placeholder="输入你的密码"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large"  block onClick={checkLogin} > 登陸 </Button>
                </Card>
      </Spin>
    </div>
  )
}
export default Login