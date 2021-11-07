import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store =new Vuex.Store({
    plugins:[createPersistedState()],
    state:{
        count:0,
        user:null
    },
    mutations: {
        setCount:(state,c)=> state.count = c,
        setUser:(state,user)=> state.user = user,
    },
    getters: {
        getCount:(state,c)=>{
            return state.count
        } ,
        getUser:(state)=>{
            return state.user
        } ,
    }
})
export default store;