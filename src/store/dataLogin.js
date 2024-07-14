import {createSlice} from '@reduxjs/toolkit'
import { request } from '../request'
import {setToken as _setToken , getToken ,clearToken} from '../request/token'
const loginStore=createSlice({
    name:'user',
    initialState:{
        token:getToken()||'',
        channels:[],
        userInfo:{}
    },
    reducers:{
        
        setToken(state,action){
            state.token=action.payload
             _setToken(action.payload)
        },
       
        setChannels(state,action){
            state.channels=action.payload
        },
        setUserInfo(state,action){
            state.userInfo=action.payload
        },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
    }
}) 
const {setToken,setChannels,setUserInfo,clearUserInfo}=loginStore.actions
const reducer=loginStore.reducer
//获取登陆数据
const fetchData=(loginData)=>{
    return async (dispatch)=>{
        try {
            // 可能会抛出错误的代码
            const res= await request.post('/authorizations',loginData)
    console.log(res);
    dispatch(setToken(res.data.token))
        } catch (error) {
            console.error("Error caught: ", error);
            // 处理错误，不显示在页面上
        }
    
    }
}
 
//获取推荐数据
const channelsData=()=>{
    return async (dispatch)=>{
        const res=await request.get('/channels')
        dispatch(setChannels(res.data.channels))
    }
}
const fetchUserInfo=()=>{
return async (dispatch)=>{
    const res=await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
} 
}
export {setToken,fetchData , fetchUserInfo, channelsData,clearUserInfo}
export default reducer







