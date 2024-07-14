import { configureStore } from "@reduxjs/toolkit";
import loginReducer from  '../store/dataLogin'

const store=configureStore({
    reducer:{
        login:loginReducer
    }
})
export default store