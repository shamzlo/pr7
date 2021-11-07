import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var app = new Vue({
    el:'#app',
    data:{
        search:"",
        students:[],
        currency:[],
        search:"",
        start_ccy:0,
        end_ccy:0,
        sell:0,
        buy:0,
        start_value:0,
        end_value:0,
        result:"",
    },
    methods:
    {
        deletePeople:function (id) {
            this. people =  this. people.filter(elem => elem.id!=id)
          }
        
    },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response)=>{
            console.log(response.data);
            this.students = response.data;
        })
        axios.get("https://api.monobank.ua/bank/currency").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
    methods:{
        deleteRow:function(id){
             this.students =  this.students.filter(stud => stud.id!=id)
        },
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].currencyCodeA==this.start_ccy && this.currency[i].currencyCodeB== 980 )
                      this.sell=this.currency[i].rateSell;
                if (this.currency[i].currencyCodeA==this.end_ccy && this.currency[i].currencyCodeB== 980)
                      this.buy=this.currency[i].rateBuy;
            }
            console.log("Start value = " + this.start_value);
            console.log("Sell value = " + this.sell);
            console.log("buy value = " + this.buy);
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " +  " = " + this.end_value ;
            
        }
     }
 })

