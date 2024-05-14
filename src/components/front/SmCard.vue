<template>
    
        <div class="card" v-for="item in cardProduct" :key="item"> 
             
                <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                    </router-link>
                <span class="badge bg-danger tag">{{item.category}}</span>
                <span class="badge bg-danger save"> <i class="fa fa-bookmark" aria-hidden="true"></i></span>
            
                <div class="card-body">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">售價: {{item.price}}元</p>
                <button class="cart-btn w-100" @click="addCart(item.id)"
                 :disabled="status.loadingItem === item.id"   >加入購物車 
                 <!-- 使用vif來判斷當前是否該顯示 -->
                 <div v-if="status.loadingItem === item.id"  class="spinner-grow spinner-grow-sm" role="status">
     <span class="visually-hidden">Loading...</span>
</div>
                 </button>
                </div>
                 
        </div>
  

</template>
<style scoped>

     .cardimg{
    width: 100%;
    height: 380px;
    background-size:cover;
    background-position: top;
 }
 .tag{
    width: 20%;
    position: absolute;
    bottom:28%;
    left: 2%;
    padding: 5px ;
    font-size:1.1em;
   
    background: #FFBE98 !important;
 }
 .save{
      width: 20%;
    position: absolute;
    bottom:28%;
    right: 2%;
    padding: 5px ;
    font-size:1.1em;
    background: #FEECE2 !important;
  
 
 }
 .save i {
    color:#ccc;
 }

</style>

<script>



export default {
    props:['getCardProducts'],
    data(){
        return{
            cardProduct:[],
            status:{
                loadingItem:'',//對應品項ID
            },
            
        }
    },
  
     watch:{
         getCardProducts(){
            this.cardProduct = this.getCardProducts;
          }
     },
     methods:{
      
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
                 console.log(res);
             })
        }
     },
     created(){
            this.cardProduct = this.getCardProducts;
     }
}
</script>

