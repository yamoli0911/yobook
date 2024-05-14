import { defineStore } from 'pinia';

//1.store 名稱 可自定義 
//2.屬性參數3種
export default defineStore('user store',{
  
     //Data
     state:()=>{
         return{
            name: '柚子',
            wallet: 300,
         }
     },

     // Computed
     getters:{
        getUserName:(state)=> `我的名字叫做${state.name}`,
     },

     //Methods
     actions:{
        //可以使用this
        updataName(){
            this.name ="杰倫"
        }
     }

})
   
