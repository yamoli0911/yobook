<template>
    <div class="my-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="payOrder()">
    <table class="table align-middle">
      <thead>
      <th>品名</th>
      <th>數量</th>
      <th>單價</th>
      </thead>
      <tbody>
      <tr  v-for="item in orderProducts" :key="item.id">
        <td>{{item.product.title}}</td>
        <td>{{item.qty}}</td>
        <td class="text-end">{{item.product.price}}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr >
        <td colspan="2" class="text-end">總計</td>
        <td class="text-end">{{order.total}}</td>
      </tr>
      </tfoot>
    </table>
    <div class="col-12">您的訂單編號為:{{order.id}}
      <button class="bg01 p-2" @click="copyText()">複製訂單編號</button>
    </div>
    <table class="table">
      <tbody>
      <tr>
        <th width="100">Email</th>
        <td>{{order.user.email}}</td>
      </tr>
      <tr>
        <th>姓名</th>
        <td>{{order.user.name}}</td>
      </tr>
      <tr>
        <th>收件人電話</th>
        <td>{{order.user.tel}}</td>
      </tr>
      <tr>
        <th>收件人地址</th>
        <td>{{order.user.address}}</td>
      </tr>
       <tr>
        <th>付款方式</th>
        <td>{{order.user.pay}}</td>
      </tr>
      <tr>
        <th>付款狀態</th>
        <td>
          <span v-show="!pay">尚未付款</span>
          <span class="text-success"  v-show="pay">付款完成</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="text-end" v-show="!pay">
      <button class="btn btn-danger">確認付款去</button>
    </div>
  </form>
</div>
</template>

<script>
   export default {
        data(){
           return{
              order:{
                 user:{},
              },
              orderId:'',
              isLoading:false,
              orderProducts:[],
              pay:false,
           } 
        },
        methods:{
            copyText(){
              const vm = this;
               navigator.clipboard.writeText(this.orderId).then(() => {
                alert("複製成功")
                   
              })
            },
            getOrder(){
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
                this.$http.get(api).then((res)=>{
                    if(res.data.success){
                        this.order = res.data.order;
                        this.orderId = this.order.id;
                        // 物件轉成陣列
                        this.orderProducts = Object.keys(this.order.products).map((i) => this.order.products[i])
                    
                    }
                })  
            },
            payOrder(){
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
                this.$http.post(api).then((res)=>{
                    if(res.data.success){                      
                       this.getOrder();
                       this.pay = true;
                       console.log(res.data);
                    }
                })  
            }
        },
        created(){
            this.orderId = this.$route.params.orderId;
           
            this.getOrder();
        }
   }
</script>
