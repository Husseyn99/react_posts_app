import About from "../../pages/About";
import Login from "../../pages/Login";
import Posts from "../../pages/Posts";
import PostIdPage from "../posts/PostIdPage";


export const privateRoutes = [
    {path: '/', component: <Posts />},
    {path: '/posts', component: <Posts />},
    {path: '/posts/:id', component: <PostIdPage />},
    {path: '/about', component: <About />}
]

export const publicRoutes = [
    {path: '/login', component: <Login />}
]