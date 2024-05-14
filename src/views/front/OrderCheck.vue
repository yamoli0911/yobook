<template>
        <div class="container mt-5">
             <div class="row">
                 <div class="col-md-6">
                        <!-- 購物車 -->
<div class="card text-cente cartbox">
  <div class="card-header text-center h3">
    購物車
  </div>
  <div class="card-body ">
   <div class="card">
  <div class="card-body product" v-for="item in cartdata">
     <div class="col-2 d-flex justify-content-end product-img-wrap "><img class="product-img"  :src="item.product.imageUrl" alt=""></div>
     <div class="cart-text col-8">
       <div class="row op1">
         <div class="row col-12">
            <span>{{item.product.title}}</span>  
            <span>{{item.total}}元</span>
            <div class="input-group mb-3 col-6">
            <button class="btn btn-outline-secondary"  @click="updataCart(item,'reduce')"  type="button" id="button-addon1" :disabled="item.id=== status.loadingItem" >-</button>
            <input type="number" @change="updataCart(item,'')"  v-model="item.qty" class="form-control" placeholder="1" aria-label="Example text with button addon" aria-describedby="button-addon1">
            <button class="btn btn-outline-secondary" @click="updataCart(item,'plus')" type="button" id="button-addon1" :disabled="item.id=== status.loadingItem">+</button>
         </div>
         <div>
          <i class="fa-solid fa-trash"></i> 刪除 <br>
      
          </div>
       </div>
</div>
     </div>
     <hr>
     
  </div>
  <hr>
      <div class="input-group mb-3 container">
      <input type="text" v-model="getInput"  class="form-control" :placeholder="couponCode.length!=0 ? '已輸入折價卷': '輸入折價卷' " aria-label="Recipient's username" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode(getInput)">套用折價卷</button><br>
    
    </div>
   
   <div class="container mb-3 h5 text-end pt-2 " > 小計 {{total}}元</div>  
    <div class="container coupon-text h4 text-end mb-2" v-if="couponCode.length!=0" >折購價 {{final_total}}元</div>
 
</div>
  </div>
  
</div>
  <br>               </div>
                  <div class="col-md-5 mt-3">
                    <form class="row g-3 bg-light" @submit="createOrder">
                        <div class="row mt-3">
                             <div class="col-10">
                                <label for="validationServer01" class="form-label">Email*</label>
                                <input type="email"  v-model="form.user.email" class="form-control " id="validationServer01" value="請輸入email" required>
                              
                            </div>
                        </div>
                        <div class="row mt-2">
                                <div class="col-md-6">
                                    <label for="validationServer01" class="form-label">訂購人姓名*</label>
                                    <input type="text"  v-model="form.user.name"  class="form-control " id="validationServer01" value="請輸入姓名" required>
                                   
                                </div>
                                 <div class="col-md-6">
                                    <label for="validationServer01" class="form-label">訂購人電話*</label>
                                    <input type="tel"  v-model="form.user.tel" class="form-control " id="validationServer01" value="請輸入電話" required>
                                   
                                </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-10">
                               <label for="validationServer04" class="form-label">付款方式</label>
                                    <select class="form-select " id="validationServer04" v-model="form.user.pay"  aria-describedby="validationServer04Feedback" required>
                                    <option selected disabled value="">請選擇付款方式</option>
                                    <option value="信用卡">信用卡</option>
                                    <option value="現金">現金</option>
                                    </select>
                            </div>
                        </div>
                         <div class="row mt-3">
                             <div class="col-10">
                                <label for="validationServer01" class="form-label">訂購地址</label>
                                <input type="text"  v-model="form.user.address" class="form-control " id="validationServer01" value="訂購地址" required>
                              
                            </div>
                        </div>
                        <div class="row mt-3">
                             <div class="col-10">
                                <label for="validationTextarea" class="form-label">備註 </label>
                                <textarea class="form-control "  v-model="form.user.text" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                                <!-- <div class="invalid-feedback">
                                Please enter a message in the textarea.
                                </div> -->
                            </div>
                        </div>
                        <div class=" m-3 d-flex justify-content-center">
                          <button class="col-10" @click="createOrder()" >送出訂單</button>
                        </div>
                    </form>    
                 </div>
             </div>
        </div>
</template>

<style scoped>
  button{
    margin-right:6% ;
    display: block !important;
  }
  .op01{
   display: flex ;
  justify-content: center;
}
.product{
  display: flex ;
  justify-content: center;
}
.product-img-wrap{
    margin-right: 30px;
}
.product-img{
    
  width: 100px;
  height: auto;

}
.form-control{
  text-align: center;
}
.coupon-text{
    color:#75A47F;
}
</style>

<script>
  import { mapState , mapActions } from 'pinia' ; //基本方法
  import cartStore from '@/store/cart'; //目標檔案  
export default{
  
    data(){
			 return{
           getInput:"",
                orderId:"",
                  //用來判斷讀取狀態
            status:{
                loadingItem:'',//對應品項ID
            },
            form:{
               user:{
                 name:'',
                 email:'',
                 tel:'',
                 address:'',
                 pay:'',
                 
               },
               message:'',
            }
		         }
		  },
     watch:{
      couponCode(){
      
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
        
           $(".cartbox").toggle();
        },
        createOrder(){
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;   
        const order = this.form;
        console.log(order);
        const vm = this;
        this.$http.post(api,{ data:order } ).then((res)=>{
                   this.orderId = res.data.orderId;
                    this.$router.push(`/OrderOut/${vm.orderId}`);
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
        }
      },
      created(){
        
        let vm = this;
    
        this.$emitter.on('sendCoupon',(data)=>{
        vm.couponCode = data;
         alert(vm.couponCode);
        });
        
        this.getCart();

      }


  }
</script>
