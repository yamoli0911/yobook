<template>

 <div class="row row-cols-1 row-cols-md-3 g-2 w-100">
  <div class="col " v-for="item in filterProducts" :key="item" >
     <div class="card "  > 
                 
                    <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                         <div class="tagbox tag d-flex justify-content-start"> <span class="badge bg02 " v-for="tag in item.booktag" >{{tag}}</span></div>
                         
                        </router-link>
                       <span class="badge bg-danger save "   @click="staredData(item)"> <i    class="fa fa-bookmark savenow " aria-hidden="true"></i></span>
                   
                    
                  
                
                    <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text">售價: {{item.price}}元</p>
                    <button class="cart-btn w-100 bg01" @click="addCart(item.id)"
                     :disabled="status.loadingItem === item.id"   >加入購物車 
                  
                     <div v-if="status.loadingItem === item.id"  class="spinner-grow spinner-grow-sm" role="status">
         <span class="visually-hidden">Loading...</span>
    </div>
                     </button>
                    </div>
                     
            </div>
  </div>
  
</div>
  

</template>
<style scoped>

    .tagbox span{
   margin-right:5px ;
}
     .cardimg{
    width: 100%;
    height: 380px;
    background-size:cover;
    background-position: top;
    position: relative;
 }
 .tag{
    width: 20%;
    position: absolute;
    bottom:1%;
    left: 2%;
    padding: 5px ;
    
   

 }

 .save{
      width: 20%;
    position: absolute;
    top:2%;
    right: 2%;
    padding: 5px ;
    font-size:1.1em;
    background: #FEECE2 !important;
    cursor: pointer;
  
 
 }
 .save i {
    color:#ccc;
 }

</style>

<script>

import { Favorite } from '../../methods/favorite';

export default {
    props:['getCardProducts'],
    data(){
        return{
            cardProduct:[],
            //用來判斷讀取狀態
            status:{
                loadingItem:'',//對應品項ID
            },
            cardNow:"",
            search:"",
             stared: JSON.parse(localStorage.getItem("stared")) || []
            
        }
    },
  
  
     watch:{
         getCardProducts(){
            this.cardProduct = this.getCardProducts;
            
          },
       
      
     },
     methods:{
        // 增加或移除關注城市資料
    staredData(item) {
        
     const vm = this;
         vm.stared = vm.stared.filter((it) => it.title !== item.title);
             localStorage.setItem("stared", JSON.stringify(vm.stared));
            
       window.location.reload();
          // localStorage 儲存上次關注的漫畫
          localStorage.setItem("stared", JSON.stringify(vm.stared));
          
    },
        addCart(id){
             const vm = this;
             vm.status.loadingItem = id;
            // 增添加入購物車的api  cart
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
             //使用接收的id 定義資料與數量
             const cart = {
                 product_id: id, //傳進來的目標id
                 qty: 1 ,//數量
             };
             
             this.$http.post(api,{ data:cart }).then((res)=>{
                vm.status.loadingItem = "";
                 this.$emitter.emit('sendProduct',res.data);
             })
        },
       
     },
     computed:{
   
          filterProducts(){
         const vm = this;
         if(!vm.cardNow.length){
                return vm.cardProduct
         }
         return vm.cardProduct.filter((it) => it.booktag.includes(vm.cardNow));
        
      },
     },
    
     created(){
            this.cardProduct = this.getCardProducts;
         
     }
}
</script>

