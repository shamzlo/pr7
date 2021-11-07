import Vue from 'vue'
import App from './components/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Students from './components/Students.vue'
import StudentsInfo from './components/StudentInfo.vue'
import store from './components/store.js'
import Login from './components/Login.vue'

const routes= [{path:'/' ,component: Students, meta:{requiresAuth:true}},
{path:'/student-info/:id',component:StudentsInfo,props:true },
{path:'/Login',component:Login },
]
const router=new VueRouter({routes
})
router.beforeEach((to, from, next)=>{
    if(to.matched.some(record=>record.meta.requiresAuth)){
        if(store.getters.getUser == null){
            next({
                path: '/Login',
                query:{redirect: to.fullPath}
            })
        } else{
            next()
        }
    } else{
        next()
    }
})
    
    
    Vue.use(VueAxios, axios)
    Vue.use(VueRouter)


new Vue({
   render: h => h(App),
   el:'#app',
   router,
   store
})