<template>
    <div>  
        <table>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Mark</th>
                    <th>PR is Done</th>

                </tr>
                <tr v-for="stud in students" v-bind:key="stud._id" >
                    <td><img v-bind:src="stud.photo"  width="50px"></td>
                    <td  >
                        <div v-bind:style="idTest == stud._id ? 'display:none' : 'display:inline'"><router-link v-bind:to="'/student-info/'+stud._id">
{{stud.name}}
</router-link></div>

                        <input v-bind:style="idTest == stud._id ? 'display:inline' : 'display:none'"  v-model="newStudent.name">
                    </td>
                    <td>
                        <div v-bind:style="idTest == stud._id ? 'display:none' : 'display:inline'">{{stud.group}}</div>
                        <select input v-bind:style="idTest == stud._id ? 'display:inline' : 'display:none'" name="group" v-model="newStudent.group" >
                        <option value="RPZ 18 1/9">RPZ 18 1/9</option>
                        <option value="RPZ 18 2/9">RPZ 18 2/9</option>
                        </select>
                    </td>
                    <td>
                        <div v-bind:style="idTest == stud._id ? 'display:none' : 'display:inline'">{{stud.mark}}</div>
                        <input v-bind:style="idTest == stud._id ? 'display:inline' : 'display:none'" v-model="newStudent.mark">
                    </td>
                    <td>

                        <div   type="checkbox" v-bind:style="idTest == stud._id ? 'display:none' : 'display:inline'" > <input type="checkbox" v-bind:checked="stud.isDonePr"></div>
                        <input type="checkbox" v-bind:style="idTest == stud._id ? 'display:inline' : 'display:none'" v-model="newStudent.isDonePr">
                    </td>
                     <td><a href="#" v-on:click.prevent="deletes(stud._id)" v-show="stud.group==getCurrentUser.group">Видалити</a></td>
                    <td>
                        <button v-on:click="get(stud._id,stud.name,stud.group,stud.isDonePr,stud.mark)">
                            <img src="components/Pencil.svg.png" width="25px">
                        </button>
                    </td>
                    <button v-on:click="update()" v-bind:style="showInput ? 'display:inline' : 'display:none'">edit</button>
                </tr>
                Информация
            </table>
            Имя<input v-model="name">
            <br>
            Группа<input v-model="group">
            <br>
            Оценка<input v-model="mark">
            <br>
             Сдал<input type="checkbox" v-bind:checked="isDonePr">
             <br>
             <button v-on:click="add"> Добавить</button>
             <br>Enter amount: <input type="number" value="100" v-model="start_value">
            <br>Convert from <input list="currency"  v-model="start_ccy">
            <datalist id="currency">
              <option value="USD"> </option>
              <option value="EUR"> </option>
              <option value="RUR"> </option>
            </datalist>
            to <input list="currency" v-model="end_ccy">
            <button v-on:click="convert">Convert</button>
            <br>{{result}}{{end_value | roundValue}}{{end_ccy}}




   </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
   export default {
    data: function() {
           return {
            students: [],
            currency:[],
            search:"",
            start_ccy:"",
            end_ccy:"",
            sell:0,
            buy:0,
            start_value:0,
            end_value:0,
            result:"",
             newStudent: {},
            search:"",
            result:"",
            name:"",
            group:"",
            mark:0,
            isDonePr:false,
            names:"",
            groups:"",
            isDonePrs:false,
            names:"",
            groups:"",
            isDonePrs:false,
            studId:"",
             showInput:false,
            idTest:"",
            marks:0,
            
        
        }},
    
    mounted: function(){
        
       axios.get("http://46.101.212.195:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
            this.$store.commit('setCount',this.students.length);
        })
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
    computed:{
        getCount(){
            return this.$store.getters.getCount
        },
               
        getCurrentUser () {
                return this.$store.getters.getUser
            }
    },
    
    
    methods:{
        deletes:function(id){ 
         Vue.axios.delete("http://46.101.212.195:3000/students/"+id)  
         .then((response)=> { 
 
              
            axios.get("http://46.101.212.195:3000/students").then((response)=>{ 
                this.students = response.data; 
                this.$store.commit('setCount', this.students.length) 
            }) 
            })
        },
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " = " ;
            
        },
         get: function(id,name,group,isDone,mark){
             this.newStudent.id = id;
            this.newStudent.name = name;
            this.newStudent.group = group;
            this.newStudent.isDonePr = isDone;
            this.newStudent.mark = mark;
            this.studId = id;
            this.idTest = id;
            this.showInput = true;
        },
        update:function(){
            Vue.axios.put("http://46.101.212.195:3000/students/"+this.studId, {
                name: this.newStudent.name,
                group: this.newStudent.group,
                isDonePr: this.newStudent.isDonePr,
                mark:this.newStudent.mark,
               
            })
            axios.get("http://46.101.212.195:3000/students").then((response)=>{
                this.students = response.data;
            })
            this.idTest = "";
        },
        
    add:function(){  
            Vue.axios.post("http://46.101.212.195:3000/students", {  
                 
                name: this.name,  
                group: this.group,  
                isDonePr: this.isDonePr,  
                mark:this.mark, 
            })  
            .then((response) => {  
 
                console.log(response.data) 
                axios.get("http://46.101.212.195:3000/students").then((response)=>{  
                this.students = response.data;  
                this.$store.commit('setCount', this.students.length) 
            })  
            })  
            
              
        },
        },
    filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        },
    }
    
    
 
    
</script> 