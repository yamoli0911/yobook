<template>
 <Loading :active="isLoading" ></Loading>
<div class="container">
  <!--電腦版 -->
   <carousel class="for-pc" :items-to-show="5">
      <slide v-for="item in filterData" :key="item.id"   >
        <div class="card col-11" >
                <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                        <div class="tagbox tag d-flex justify-content-start"> <span class="badge bg02 " v-for="tag in item.booktag" >{{tag}}</span></div>
                         </router-link>
                         
                    
                     <span class="badge bg-danger save"  @click="staredData(item)"> <i :class="starColor(item)"  class="fa fa-bookmark" aria-hidden="true"></i></span>
                 
                     <div class="card-body">
                     <h5 class="card-title card-text">{{item.title}}</h5>
                     <p class="card-text">售價: {{item.price}}元</p>
                     <button class="cart-btn w-100 bg01" @click="addCart(item.id)"
                      :disabled="status.loadingItem === item.id"   >加入購物車 
                      <!-- 使用vif來判斷當前是否該顯示 -->
                      <div v-if="status.loadingItem === item.id"  class="spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
     </div>
                      </button>
                     </div>
            </div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
     <!--平板 -->
   <carousel class="for-md" :items-to-show="3">
      <slide v-for="item in filterData" :key="item.id"   >
        <div class="card col-11" >
                <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                        <div class="tagbox tag d-flex justify-content-start"> <span class="badge bg02 " v-for="tag in item.booktag" >{{tag}}</span></div>
                         </router-link>
                         
                    
                     <span class="badge bg-danger save"> <i class="fa fa-bookmark" aria-hidden="true"></i></span>
                 
                     <div class="card-body">
                     <h5 class="card-title h5">{{item.title}}</h5>
                     <p class="card-text">售價: {{item.price}}元</p>
                     <button class="cart-btn w-100 bg01" @click="addCart(item.id)"
                      :disabled="status.loadingItem === item.id"   >加入購物車 
                      <!-- 使用vif來判斷當前是否該顯示 -->
                      <div v-if="status.loadingItem === item.id"  class="spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
     </div>
                      </button>
                     </div>
            </div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
   <!-- 手機版 --> 
    <carousel class="for-ph" :items-to-show="1">
      <slide v-for="item in filterData" :key="item.id"   >
        <div class="card col-11" >
                <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                        <div class="tagbox tag d-flex justify-content-start"> <span class="badge bg02 " v-for="tag in item.booktag" >{{tag}}</span></div>
                         </router-link>
                         
                    
                     <span class="badge bg-danger save"> <i class="fa fa-bookmark" aria-hidden="true"></i></span>
                 
                     <div class="card-body">
                     <h5 class="card-title h5">{{item.title}}</h5>
                     <p class="card-text">售價: {{item.price}}元</p>
                     <button class="cart-btn w-100 bg01" @click="addCart(item.id)"
                      :disabled="status.loadingItem === item.id"   >加入購物車 
                      <!-- 使用vif來判斷當前是否該顯示 -->
                      <div v-if="status.loadingItem === item.id"  class="spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
     </div>
                      </button>
                     </div>
            </div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
</div>
</template>

<script>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'App',
  props:["getView","getType"],
  data(){
    return{
        products:[],
        booktagbox:[],
        isLoading:false,
         status:{
                loadingItem:'',//對應品項ID
            },
            stared: JSON.parse(localStorage.getItem("stared")) || [], 
           
    }
  },
  components: {
  Carousel, Slide,Pagination, Navigation
  },
  methods:{
      getProducts(){
              const vm = this;
              
              const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
              console.log(api);
              vm.isLoading=true;
              this.$http.get(api).then((res)=>{               
                  if(res.data.success){
                      vm.products = res.data.products;
                      vm.isLoading=false;
                      console.log(vm.products);
                    
                  }
                  else{
                      alert("尚未得到");
                  }
              })
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
                 //前面是自定義事件名稱,後面是參數
              })
          } ,
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
    },
  
     
    computed:{
         filterData:function(){
                  const vm = this;
                  if(vm.getType == "state"){
                    return vm.products.filter((it) => it.state.includes(vm.getView));
                  }
                 return vm.products.filter((it) => it.booktag.includes(vm.getView));
         },
   },      
   created(){
     
       this.getProducts();
    }
}
</script>

<style scoped>

 .for-ph{
  display: none;
}
.for-md{
  display: none;
}
@media screen and (max-width: 1000px) {
.for-md{
  display: block;
}
.for-pc{
  display: none;
}
}
@media screen and (max-width: 600px) {
.for-ph{
  display: block;
}
.for-md{
  display: none;
}

}
.tagbox span{
   margin-right:5px ;
}
    .cardimg{
    width: 100%;
    height: 200px;
    background-size:cover;
    background-position: top;
    position: relative;
 }
 .tag{
    width: 100%;
    position: absolute;
    bottom:2%;
    left: 2%;

   
    
 }

</style>