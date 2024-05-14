<template>
 <Loading :active="isLoading" ></Loading>
   <div class="container">
      <div class="d-flex justify-content-end m-4"> <button type="button" class="btn btn-primary" @click="openModal(true)">新增產品</button></div>
    <table class="table mt-4">
  <thead>
    <tr> 
       <th width="120">狀態</th>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">作者</th>
     
       <th width="120">譯者</th>
    
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody >
    <tr v-for="item in products" :key="item.id">
       <td>{{ tostring(item.state)  }}</td>
      <td>{{ tostring(item.booktag)  }}</td>
     
      <td>{{ item.title }}</td>
       <td>{{ item.creator }}</td>
    
       <td>{{item.translator}}</td>
 
      <td> {{ item.origin_price }} </td>
        <td>  {{ item.origin_price }} </td>
   
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
         <span class="text-success" v-else >不啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button @click="openModal(false,item)"   class="btn btn-outline-primary btn-sm">編輯</button>
          <button @click="deleteModal(item)"  class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
   </div>
   <Pagination @emit-pages="getProducts" :pages="pagination" ></Pagination>
   <ProductModal ref="productModal" :product="tempProduct" @updata-product="updateProduct" ></ProductModal>
</template>

<script>
 import ProductModal from "../../components/back/ProductModal.vue";
 import Pagination from "../../components/Pagination.vue";
import {tostring} from "../../methods/tostring";
 export default{
 
     data(){
        return{
            isLoading:false,
            products: [],
            pagination:{},
            tempProduct:{},
            isNew:false, //判斷是否是新增的狀態
            isLoading:false,
        }
     },
     components:{
      ProductModal,
      Pagination
      
     },
     methods:{
      tostring,
        
         getProducts(page = 1 ){
             const vm = this;
             vm.isLoading = true;
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
           
             this.$http.get(api).then((res)=>{
                
                 if(res.data.success){
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                    console.log(this.pagination);
                     vm.isLoading = false;
                 }
                 else{
                    alert("尚未得到");
                 }
             })
         },   
         openModal(isNew,item){
           if(isNew){
            this.tempProduct ={}; //新增按鈕打開
          }else{ 
            this.tempProduct ={...item}; //編輯按鈕打開
          }
          this.isNew = isNew;
           const productComponent = this.$refs.productModal;  //這裡指向的是ProductModal標籤 因為有設定ref="productModal"
           productComponent.showModal();//調用內層元件方法
         },
           updateProduct(item){
            // 利用isNew 來判斷目前是新增還是修改
            this.tempProduct = item;
            // 新增
            let api  = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
            let httpNethod = 'post';
            //編輯狀態
            if(!this.isNew){
              api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
              httpNethod = 'put';
            }
            
           
            //換成商品建立的api
            
             const productComponent = this.$refs.productModal; //取得內層元件 使方便我們輸入完成後 可以關閉
            this.$http[httpNethod](api,{data:this.tempProduct})
            .then((response)=>{
              
                console.log(response);
                //需要關閉視窗
               productComponent.hideModal();
                //需求重新取得列表的資料
                this.getProducts();
            })
         },
           deleteModal(item){
           const vm = this;
           const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;   
            this.$http.delete(api).then((response)=>{
                if(response.data.success){
                console.log(response);
                 alert("成功刪除");
                 
                   vm.getProducts();
                }
               

                //需求重新取得列表的資料
              
            })
           
         },
     } ,
    
   created(){
             this.getProducts();
         }


  }

</script>
