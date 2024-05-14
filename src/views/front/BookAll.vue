<template>
   <Loading :active="isLoading" ></Loading>
   

   <br class="for-ph"><br class="for-ph"><br class="for-ph">
   <div class="row content ">
  <div class="col-12">
    <div class="input-group mb-3">
  <input type="text" class="form-control"  v-model="search" placeholder="輸入漫畫或小說名稱" aria-label="Recipient's username" aria-describedby="button-addon2">
  
</div>
  </div>

  </div>
  <div class="row content">
    <div class=" col-md-3 ">
      <div class="form-check h3 title-bg-color shadow-sm p-2  rounded bg01  "  >類別</div>
    
     <div :class="{'bg02': tagNow === item.value}"   class="tagnow form-check shadow-sm p-2  bg-white rounded " v-for="item in tagall" >
      <label class="form-check-label tagnow" :for="item.id">
        <input  v-model="tagNow" class="form-check-input" type="radio" :value="item.value" id="item.id" style="opacity:0" >
        
          {{ item.name  }} 
        </label>
      </div>
    </div>
    <div class="card-group col-md-9 ">
      <Card :getCardProducts="products" :getTagNow="tagNow"  :getSearch="search" ></Card>

    </div>
    
  </div>
  
</template>

<style scoped>
   label{
    width: 100%;
   }
   .tagnow{
    cursor: pointer;
    transition: 0.2s ;
   }
   @media screen  and (min-width:900px) {
      .for-ph{
        display: none;
      }
   }
</style>

<script>

import Card from "@/components/front/Card.vue";
export default{
    components:{
       Card
    },
    data(){
      return{
         products:[],
          isLoading:false, //預設關閉
         search:"",
          tagall:[
             {
              name:'全部',
              value:""
              },
              {
              name:'少年',
              value:'少年'
              },
              {
              name:'百合',
              value:'百合'
              },
              {
              name:'戀愛',
              value:'戀愛'
              },
              {
              name:'奇幻冒險',
              value:'奇幻冒險'
              },
              {
              name:'青春校園',
              value:'青春校園'
              },
              {
              name:'日常',
              value:'日常'
              },
              {
              name:'鬼神',
              value:'鬼神'
              },
               {
              name:'社會寫實',
              value:'社會寫實'
              },
               {
              name:'搞笑',
              value:'搞笑'
              },
               {
              name:'誤解系',
              value:'誤解系'
              },
          ],       
          tagNow:"",       
      }
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
                     console.log(vm.products.booktag);
                  vm.isLoading=false;
                 }
                 else{
                    alert("尚未得到");
                 }
             })
         },   
        
    },
   
    created(){
       this.getProducts();
    }
  

}

</script>

