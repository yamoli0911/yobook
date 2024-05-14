import axios from 'axios';
import { defineStore } from 'pinia';

//1.store 名稱 可自定義 
//2.屬性參數3種
export default defineStore('cartStore',{
  
     //Data
     state:()=>({
        couponCode:"",//折購碼
        total:"",//原始金額
        final_total:"",//總金額
        cartdata:"", //購物車金額
        
     }),

     //Methods
     actions:{
        getCart(){
              
            const vm = this;
      
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;   
            axios.get(api).then((res)=>{
                let data = res.data.data.carts;
                vm.total = res.data.data.total;  //把總金額丟入
                vm.final_total = res.data.data.final_total; //最終金額     
                vm.cartdata =data ;
               
               
            })
   
        },
        addCouponCode(getinput){
            const vm = this;
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`; 
             const  coupon = {
               code: getinput
             }
             axios.post(api,{ data:coupon }).then((res)=>{
                  if(res.data.success){
                  
                      this.couponCode = getinput;
                      this.getCart();
                      
                  }
               
                  
                    
                })
          },
     }

})
   
