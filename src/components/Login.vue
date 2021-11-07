<template>
    <div>
        <input v-model="login">
        <button @click="auth()">Ok</button>
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios);
    export default {
        data: function(){
            return{
                login:"",
            };
        },
        methods:{
            auth(){
                Vue.axios.get("http://46.101.212.195:3000/students/name/"+this.login).then((response)=>{
                    if (response.data === null) {
                        return
                    }
                    this.$store.commit('setUser', response.data);
                    console.log("dfds" + response.data);
                    this.$router.push('/');
                })
            }
        }
    }
</script> 