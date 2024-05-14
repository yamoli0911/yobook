<template>
 
<div class="wrap">
  <div class="header bg01 w-100 p-2 text-center">本館首購8折優惠,各種漫畫任你挑選</div>
  <!-- 電腦版顯示  -->
   <div class="for-pc wrap-nav shadow-sm p-3 mb-2 bg-white rounded">
       <div class="content  ">
         <a class="navbar-brand logo" href="#">
          <img class="logo-img p-1" src="../../assets/logo.jpg"  alt="">
          <span>漫漫書店</span>
        </a>
    
    <nav class="navbar navbar-expand-lg navbar-light ">
      
      <div class="container-fluid">
       
       
        <div class="collapse navbar-collapse" id="navbarNav">
          
          <ul class="navbar-nav">
             <li class="nav-item">
                 <router-link class="nav-link " aria-current="page"  to="/">
                 <i class="fa-solid fa-house"></i>
                 <span>首頁</span></router-link> 
            </li>
            <li class="nav-item">
              
               <router-link class="nav-link" aria-current="page"  to="/bookview">
               <i class="fa-solid fa-magnifying-glass"></i>
               <span>書本查詢</span></router-link> 
            </li>
             <li class="nav-item">
               <router-link class="nav-link" aria-current="page"  to="/FavoriteView">
               <i class="fa-solid fa-bookmark"></i>
               <span>我的收藏</span></router-link> 
            </li>
             <li class="nav-item" >
               <router-link class="nav-link" aria-current="page"  to="/OrderView">
               <i class="fa-solid fa-file"></i>
               <span>訂單查詢</span></router-link> 
            </li>
             <li class="nav-item cart" href="#"  @click="openCart()"><i class="fa-solid fa-cart-shopping"></i><span>購物車</span></li>
       
         
          </ul>
          
        </div>
         
      </div>
    </nav>
     
         </div>
  
    </div> 
   <!-- 手機版顯示 -->
  
  <nav class="for-ph navbar navbar-light  bg-light  fixed-top  ">
    
    <div class="container-fluid ">
       
      <a class="navbar-brand" href="#">
        <img class="logo-img p-1 " width="50" src="../../assets/logo.jpg"  alt="">
        漫漫書店</a>
      <div class="d-flex ">
         <li class="nav-item cart" href="#"  @click="openCart()"><i class="fa-solid fa-cart-shopping"></i><span></span></li>
           <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
    
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">漫書店</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
             <li class="nav-item">
                 <router-link class="nav-link active" aria-current="page"  to="/">
                 <i class="fa-solid fa-house"></i>
                 <span>首頁</span></router-link> 
            </li>
            <li class="nav-item">
              
               <router-link class="nav-link" aria-current="page"  to="/bookview">
               <i class="fa-solid fa-magnifying-glass"></i>
               <span>書本查詢</span></router-link> 
            </li>
              <li class="nav-item">
               <router-link class="nav-link" aria-current="page"  to="/FavoriteView">
               <i class="fa-solid fa-bookmark"></i>
               <span>我的收藏</span></router-link> 
            </li>
             <li class="nav-item" >
               <router-link class="nav-link" aria-current="page"  to="/OrderView">
               <i class="fa-solid fa-file"></i>
               <span>訂單查詢</span></router-link> 
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  </nav>
  
  <!-- 購物車 -->
  <div class="card text-cente cartbox navbar-cart">
    <div class="card-header text-center h3 bg01">
      購物車 {{ text }}
    </div>
    <div class="card-body" v-show="cartdata.length!=0">
     <div class="card">
      <div class="col-12 text-end p-3 "><button class="clear-cart" @click="clearCart()" >清空購物車</button></div>
    <div class="card-body product" v-for="item in cartdata">
       <div class="col-2 d-flex justify-content-end product-img-wrap "><img class="product-img"  :src="item.product.imageUrl" alt=""></div>
       <div class="cart-text col-7">
         <div class="row op1">
           <div class="row col-12">
              <span>{{item.product.title}} </span>  
              <h5>{{item.total}}元</h5>
              <div class="input-group mb-3 col-6">
              <button class="btn btn-outline-secondary"  @click="updataCart(item,'reduce')"  type="button" id="button-addon1" :disabled="item.id=== status.loadingItem" >-</button>
              <input type="number" @change="updataCart(item,'')"  v-model="item.qty" class="form-control" placeholder="1" aria-label="Example text with button addon" aria-describedby="button-addon1">
              <button class="btn btn-outline-secondary" @click="updataCart(item,'plus')" type="button" id="button-addon1" :disabled="item.id=== status.loadingItem">+</button>
           </div>
           <a class="denBtn"  @click="delCart(item)">
            <i class="fa-solid fa-trash "></i> 刪除 <br>
        
            </a>
         </div>
  </div>
       </div>
       <hr>
       
    </div>
    <hr>
        <div class="input-group mb-3 container">
        <input type="text" v-model="getinput"  class="form-control" :placeholder="coupon_now ? '已輸入折價卷': '輸入折價卷' " aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode(getinput)">套用折價卷</button><br>
      
      </div>
     
     <div class="container mb-3 h5 text-end pt-2 " > 小計 {{total}}元</div>  
      <div class="container coupon-text h4 text-end mb-2" v-show="couponCode.length !=0" >折購價 {{final_total}}元</div>
      <button class="bg01 mb-3 container col-12 p-2" @click="toCheckout()">確認結帳</button>
  </div>
    </div>
    <div class="card-body d-flex justify-content-center" v-if=" (cartdata.length === 0)">
       <div>
         <div class="h4 text-center"><i class="fa-solid fa-triangle-exclamation"></i></div>
         <h5>購書車內還沒有商品</h5>
          <router-link class="nav-link " aria-current="page"  to="/BookView"><button @click="morebook()" class="bg01 mb-3 container col-12 p-2">查找更多漫畫</button></router-link>
       </div>
    </div>
  
  </div>
</div>

</template>
<script>
  import { mapState , mapActions } from 'pinia' ; //基本方法
  import cartStore from '@/store/cart'; //目標檔案  
  export default{
    inject:['toStatus'],
    data(){
			 return{
              getinput:"",
               
                addCart:"",//判斷是否有加入購物車以用來監聽
                  //用來判斷讀取狀態
            status:{
                loadingItem:'',//對應品項ID
            },
            
		     }
		  },
    watch:{
      addCart(){
       this.getCart();
      }
    },
     computed:{
      ...mapState(cartStore,['couponCode','couponInput',"final_total","cartdata","total"]),
    },
      methods:{
         ...mapActions(cartStore,['addCouponCode','getCart']),
        updata(item){
          (item.qty)>=1 ? (item.qty)--  : item.qty;
         this.updataCart(item);
        },
        openCart(){
        
           $(".navbar-cart").toggle();
        },
       toCheckout(){
          
         
          
          this.$router.push('/OrderCheck');
          $(".navbar-cart").hide();
          
        },
       
          delCart(item){
            const vm = this;
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
             this.$http.delete(api).then((res)=>{
                   vm.cartdata = "";
                   vm.getCart(); 

                   
                })
          },
        
          updataCart(item,type){
             const vm = this;
             if(type === 'reduce'){
                (item.qty)>=1 ? (item.qty)--  : item.qty;
             }
             if(type === 'plus'){
                  item.qty++
             }
             vm.status.loadingItem =true;
            // 增添加入購物車的api  cart
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
             //使用接收的id 定義資料與數量
             const cart = {
                 product_id: item.product_id, //傳進來的目標id
                 qty: item.qty ,//數量
             };
             
             this.$http.put(api,{ data:cart }).then((res)=>{
               this.getCart();
                vm.status.loadingItem ="";
                
             })
        },
        clearCart(){
          const vm = this;
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
             this.$http.delete(api).then((res)=>{
                   vm.getCart();                   
                   this.couponCode ="";
                })
        }
      },
      created(){
        this.getCart();
        const vm = this;
        this.$emitter.on('sendProduct',(data)=>{
         vm.addCart = data;
        });
        
      }


  }

</script>

<style scoped>
.logo-img{
  border-radius:20px;
}
.for-ph{
  margin-top:35px ;
}
.coupon-text{
    color:#75A47F;
}
.form-control{
  text-align: center;
}
.cartbox{
  width: 450px;
 position: absolute;
  right:10%;
  top:100px;
  z-index: 99;
  display: none;
  overflow-y: scroll;
 max-height: 600px;
 scroll-behavior:smooth;
 animation: cartRight 0.8s;
}
 @keyframes cartRight {
    from {
       transform: translateX(100%);
    }

    to {
     transform: translateX(0%);
    }
  }
.card{
  overflow: scroll;
  scroll-behavior:inherit !important;
}

.op01{
   display: flex ;
  justify-content: center;
}
.product{
  display: flex ;
  justify-content: center;
}
.product-img{
  width: 100px;
  height: auto;

}
.product-img-wrap{
    margin-right: 30px;
}

.for-ph{
    display: none;
  }
  @media screen and (max-width: 1000px) {
  .for-ph{
    display: block;
  }

}
@media screen and (max-width:1000px) {
  .for-ph{
    display: block;
  }
  .for-pc{
    display: none;
  }
  .cartbox{
    width: 100% ;
    right:0;
    top:100px;
  }
}

</style>