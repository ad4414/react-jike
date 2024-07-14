import { createHashRouter } from "react-router-dom";
import Login from "../pages/Login";
import GeekLayout from "../Layout";
import AuthRoute from "../components";
import { lazy } from "react";
import { Suspense } from "react";
 const Home=lazy(()=>import('../pages/Home'))
 const Article=lazy(()=>import('../pages/Article'))
 const Publish=lazy(()=>import('../pages/Publish'))
 const router=createHashRouter([{
    path:'/login',
    element:<Login/>
 },
 {
    path:'/',
    element: <AuthRoute><GeekLayout/></AuthRoute> ,
    children: [{
        index:true,
        element:<Suspense fallback={'加载中'}><Home/> </Suspense> 
    },{
        path:'/article',
        element: <Suspense fallback={'加载中'}><Article/> </Suspense>
    },
    {
        path:'/publish',
        element: <Suspense fallback={'加载中'}><Publish/></Suspense>
    }
]
     
 }
])
 export default router