<template>

 <Loading :active="isLoading" ></Loading>
 <h1>  </h1>
 <div class="container ">
   <br>
   <span class="p-3 mt-3 h1">  <i class="fa-solid fa-book"></i> 書籍資訊</span>
   <div class="p-3"><span class="">  <router-link class="router-link" to="/"> <i class="fa-solid fa-house"></i> 首頁 </router-link>/ {{product.title}}</span></div>
   
    <div class="card mb-3 " style="max-width: 1200px;">
     <div class="row g-0">
       <div class="col-md-4">
         <img :src="product.imageUrl" class="img-fluid rounded-start" alt="...">
       </div>
       <div class="col-md-8 ">

            <div class="card-body">
              <h5 class="card-title h1">{{ product.title }}</h5>
              <p class="card-text h5">作者: {{ product.creator }} </p>
              <p class="card-text h5">譯者: {{ product.translator }} </p>
              <p class="card-text h5 ">類型: <span class="tags">{{ tostring(product.booktag) }}</span>  </p>
              <p class="card-text h5">出版社: {{ product.publishing }} </p>
               <p class="card-text h5">出版日期: {{ product.bookdate}} </p>
               <p class="card-text h5">新台幣售價: {{ product.price}} 元 </p>

               <button @click="staredData(product)" :class="starColor(product)"><i class="fa-solid fa-bookmark"></i> 加入收藏</button> 
               <button class="title-bg-color" @click="addCart(product.id)" >
                <i class="fa-solid fa-cart-plus"></i> 加入購物車 
                 <div v-if="status.loadingItem === product.id"  class="spinner-grow spinner-grow-sm" role="status">
         <span class="visually-hidden">Loading...</span>
    </div>
                </button>
              <hr>
           
             
             <p class="card-text "><span class="h5">作品描述<br><br></span> {{ product.descripiton}} </p>
            </div>
     
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>
 .card-body{
   display: block;
 }
 button{
  border: none;
  margin-left: 10px;
  padding: 5px 10px;
 }
 .addcart{
   background: #000;
 }

</style>
<script>


export default {
 
    data(){
     return{
        product:{},
        isLoading:false,
         stared: JSON.parse(localStorage.getItem("stared")) || [],
         status:{
                loadingItem:'',//對應品項ID
            },
     }
    },
    methods:{
   tostring(item){
    let text ="";
    if(!item){
      item ="";
    }else{
    text = item.toString();
    }
    
    return  text;
  },
    // 星星顏色顯示
        
    starColor(item) {
      const vm = this;
      let staredCompare = false;
      staredCompare = vm.stared.some((it) => it.title === item.title);
      if (staredCompare) {
        return "savenow";
      }
      return "";
    },
        // 增加或移除關注漫畫資料
    staredData(item) {
        
       const vm = this;
          let isExit = false;
          isExit = vm.stared.some((it) => it.title === item.title)
          //假如已經存在就移除
          if(isExit){
             vm.stared = vm.stared.filter((it) => it.title !== item.title);
             localStorage.setItem("stared", JSON.stringify(vm.stared));
             return;
          }else{
            vm.stared.push(item);
          }
       
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
                 console.log(res);
                 this.$emitter.emit('sendProduct',res.data);
                 //前面是自定義事件名稱,後面是參數
             })
        },
    },
     created(){
      const vm = this;
      let seed = this.$route.params.id;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${seed}`;

             this.$http.get(api).then((res)=>{
                
                 if(res.data.success){
                    console.log(res.data.product);
                   vm.product = res.data.product;
                    vm.isLoading = false;
                 }
                 else{
                    alert("尚未得到");
                 }
             })
    }
}
</script>
