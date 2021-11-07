<template>
    <div >
        <table>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Mark</th>
                    <th>PR is Done</th>
                </tr>

       <td> <img v-bind:src="student.photo" width="50px"></td>
        <td>{{student.name}}</td>
        <td>{{student.group}}</td>
         <td>{{student.mark}}</td>
         <td><input type="checkbox" v-bind:checked="student.isDonePr"></td>

        </table>

    </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
export default {
       props: {
           id: '',
       },
data:function(){
    return{
        name:"",
            group:"",
        student: {},
    };
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students/"+this.$route.params.id).then((response)=>{
            console.log(response.data);
            this.student = response.data;
        })
},
computed:{
        getCount(){
            return this.$store.getters.getCount
        },
        getCurrentUser(){
            return this.$store.getters.CurrentUser
        } 
    },
}
</script>