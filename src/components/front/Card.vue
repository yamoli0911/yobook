<template>

 <div class="row row-cols-1 row-cols-md-3 g-2 w-100">
  <div class="col " v-for="item in filterProducts" :key="item" v-show="(item.title.indexOf(search)!=-1) " >
     <div class="card "  > 
                 
                    <router-link  :to="`book/${item.id}`"  src="#" class="card-img-top cardimg" :style="{backgroundImage: 'url('+ item.imageUrl +')'}" alt="...">
                         <div class="tagbox tag d-flex justify-content-start"> <span class="badge bg02 " v-for="tag in item.booktag" >{{tag}}</span></div>
                         
                        </router-link>
                       <span class="badge bg-danger save" @click="staredData(item)"> <i :class="starColor(item)"   class="fa fa-bookmark" aria-hidden="true"></i></span>
                   
                    
                  
                
                    <div class="card-body">
                    <h5 class="card-title card-text">{{item.title}}</h5>
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

 

</style>

<script>



export default {
    props:['getCardProducts','getTagNow','getSearch'],
    data(){
        return{
            cardProduct:[],
            //用來判斷讀取狀態
            status:{
                loadingItem:'',//對應品項ID
            },
            cardNow:"",
            search:"",
             stared: JSON.parse(localStorage.getItem("stared")) || [],
             stared_title:"",
            
        }
    },
    provide:{
       toStatus:"hi"
    },
     watch:{
         getCardProducts(){
            this.cardProduct = this.getCardProducts;
            
          },
          getTagNow(){
            this.cardNow = this.getTagNow;
 
          },
          getSearch(){
            this.search = this.getSearch;
            console.log('hi'+this.getSearch);
          }
     },
     methods:{
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
            this.cardNow = this.getTagNow;
            this.search = this.getSearch;
           
     }
}
</script>

