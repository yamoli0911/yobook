<template>
    <Loading :active="isLoading" ></Loading>
 <div class="container px-5 mt-5 ">
   <div class="row">
      <div class="col-12">
            <div class="input-group mb-3">
          <input type="text" class="form-control"  v-model="orderId" placeholder="輸入訂單編號" aria-label="Recipient's username" aria-describedby="button-addon2">
          <button @click="getOrder()"  class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>  
   </div>
   <div class="row">
          <div class="col-12 d-flex justify-content-center"><h3 v-show="!orderProducts">記得輸入訂單編號喔</h3></div>
          <div class="userinfo pt-5 row" v-show="orderProducts">
              <div class="col-md-6">
                <div class="title h2 bg01 p-2 w-50"># 用戶資訊</div>
                下單時間:  {{toData(order.create_at)}} <br>
                Email: {{order.user.email}} <br>
                收件人姓名: {{order.user.name}} <br>
                電話號碼: {{order.user.tel}} <br>
                收件地址: {{order.user.address}} <br>
                付款方式: {{order.user.pay}} <br>
                備註: {{order.user.text}} 
              </div>
              <div class="col-md-6">
                 <div class="title h2 bg01 p-2 w-50"># 訂單內容</div>
                <div class="row mb-4" v-for="item in orderProducts" :key="item.id">
                   <img class="col-3" :src="item.product.imageUrl" alt="">
                  <div class="col-6 d-flex align-items-center">
                     <div >
                       <span class="h5">{{item.product.title}}</span> <br>
                       
                       <span >{{item.product.creator}}</span><br>
                       <span>{{item.product.price}}元</span>
                     </div>&nbsp;&nbsp;&nbsp;
                    <div class="d-flex justify-content-center " >  {{item.qty}} 本 </div>
                  </div>
                </div>
               
              </div>
          </div>
     </div>
    
 </div>
</template>


<script>


export default {
  data(){
    return{
      search:"",
      order:{
        user:{}
      },
      orderId:"",
      orderProducts:"",
      isLoading:false
    }
  },
  methods:{
     getOrder(){
         if(!this.orderId){
          return;
         }
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
         this.isLoading = true;
         this.$http.get(api).then((res)=>{
                    if(res.data.success){
                      this.isLoading= false;
                        this.order = res.data.order;
                        this.orderId = this.order.id;
                        // 物件轉成陣列
                        this.orderProducts = Object.keys(this.order.products).map((i) => this.order.products[i])
                       console.log(this.order);
                    }
                })  
     },
     toData(time){
    const localDate = new Date(time * 1000)
    return localDate.toLocaleDateString()
}
  },

}
</script>
