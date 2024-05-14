<template>

    <!-- Modal -->
<div  ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <!-- 請同學自行新增 v-model -->
<div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增產品</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-3">
            <label for="image" class="form-label">輸入圖片網址</label>
            <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結">
          </div>
          <div class="mb-3">
            <label for="customFile" class="form-label">或 上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input  @change="uploadFile"  ref="fileInput"  type="file" id="customFile" class="form-control">
          </div>
          <img class="img-fluid" alt="">
          <!-- 延伸技巧，多圖 -->
          <div class="mt-5">
            <div class="mb-3 input-group" >
              <input type="url" class="form-control form-control"
                      placeholder="請輸入連結">
              <button type="button" class="btn btn-outline-danger">
                移除
              </button>
            </div>
            <div>
              <button class="btn btn-outline-primary btn-sm d-block w-100">
                新增圖片
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6 ">
       
              書籍類型  <br> 
             <div v-for="(item,key) in tagall" :key="key"  style="margin-right:5px; margin-top:5px" class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input  v-model="tempProduct.booktag" :value="item"  type="checkbox" class="btn-check" :id="key" autocomplete="off">
                <label class="btn btn-outline-primary" :for="key">{{item}}</label>
            </div>
           
            </div>
          
              <div class="mb-3 col-md-6 btn-group6" >      
                狀態 <br>
              <div v-for="(item,key) in stateall" :key="key" role="group" style="margin-right:5px; margin-top:5px" class="btn-group"    aria-label="Basic checkbox toggle button group">
                <input  v-model="tempProduct.state" :value="item"  type="checkbox" class="btn-check" :id="item" autocomplete="off">
                   <label class="btn btn-outline-primary" :for="item">{{item}}</label>
              </div>
              
              </div>
          

          </div>

          <div class="row gx-2">
          
            <div class="mb-3 col-md-6">
              <label   for="price" class="form-label">售價</label>
              <input v-model="tempProduct.price"  type="number" class="form-control" id="price"
                      placeholder="請輸入售價">
            </div>
            <div class="mb-3 col-md-6">
              <label   for="origin_price" class="form-label">原價</label>
              <input v-model="tempProduct.origin_price"  type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價">
            </div>
             
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="creator" class="form-label">作者</label>
              <input v-model="tempProduct.creator"  type="text" class="form-control" id="creator"
                      placeholder="請輸入作者名">
            </div>
               <div class="mb-3 col-md-6">
              <label for="publishing" class="form-label">出版社</label>
              <select v-model="tempProduct.publishing" class="form-select" aria-label="Default select example" id="publishing" >
                 <option selected> 請輸入出版社</option>
                 <option value="東立">東立</option>
                 <option value="青文">青文</option>
                 <option value="角川">角川</option>
                 <option value="尖川">尖端</option>
                 
              </select>
              
              </div>

          </div>
          <div class="row gx-2">
               <div class="mb-3 col-md-6">
              <label for="translator" class="form-label">譯者</label>
              <input v-model="tempProduct.translator" type="text" class="form-control" id="translator"
                      placeholder="請輸入譯者名"> 
                </div>
                 <div class="mb-3 col-md-6">
              <label for="bookdate" class="form-label">出版日期</label>
              <input v-model="tempProduct.bookdate" type="text" class="form-control" id="bookdate"
                      placeholder="請輸入出版日期"> 
                </div>

          </div>
           <div class="row gx-2">
               <div class="mb-3 col-md-4">
              <label for="unit" class="form-label">單位</label>
              <input v-model="tempProduct.unit" type="text" class="form-control" id="unit"
                      placeholder="請輸入單位"> 
                </div>
                 <div class="mb-3 col-md-4">
              <label for="num" class="form-label">數量</label>
              <input v-model="tempProduct.num" type="number" class="form-control" id="num"
                      placeholder="請輸入數量"> 
                </div>
                  <div class="mb-3 col-md-4">
                    <label for="categoryr" class="form-label">分級</label>
    
                     <select v-model="tempProduct.category" class="form-select" aria-label="Default select example" id="categoryr" >
                        <option selected> 請輸入分級</option>
                        <option value="普通級">普通級</option>
                        <option value="保護級">保護級</option>
                        <option value="輔十二">輔十二</option>
                        <option value="輔十五">輔十五</option>
                        <option value="限制級">限制級</option>
                     </select>        

                </div>

          </div>
          
          <hr>
          
          <div class="mb-3">
            <label for="description" class="form-label">作品描述</label>
            <textarea  v-model="tempProduct.descripiton"  type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述"></textarea>
          </div>
         
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled" v-model="tempProduct.is_enabled"> 
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <button type="button" class="btn btn-primary" @click="$emit('updata-product',tempProduct)">確認</button>
    </div>
  </div>
</div>
</div> 
</template>

<script>
   import Modal from 'bootstrap/js/dist/modal';

    export default {
        props:{
          product:{
            type: Object,
            defalt(){return{};},
          }
        },
        data(){
            return{
                 modal:{},
                 booktag:[],
                 state:[],
                 tempProduct:{
                  
                 },
                 tagall:[
                  "少年","百合","戀愛","奇幻冒險","青春校園","日常","鬼神","社會寫實","搞笑","誤解系"
                 ],
                 stateall:[
                  "館藏","最新","熱門"
                 ],
            }
        },

        watch:{
          product(){
            //當他的屬性還不存在時 就先幫他把空的陣列屬性加上
            if(!this.product.booktag){
              this.product.booktag = this.booktag;
              
            }
              if(!this.product.state){
              this.product.state = this.state;
              
            }
      
            this.tempProduct.booktag = [];
            this.tempProduct = this.product;
         
          },
       
        },
        methods:{
     
           showModal(){
            this.modal.show();
        },
        hideModal(){
            this.modal.hide();
        },
        showModal(){
           this.modal.show();
        },
        uploadFile(){
          //取得檔案位置  //指向檔案內容
            const uploadFile = this.$refs.fileInput.files[0];
           //建議formData 格式
           const formData = new FormData();
                 // 第一個欄位file-to-upload 是對應 <input name="file-to-upload">
                 //後面的uploadFile 則是剛才所取得的檔案 
                 // 把以上兩個東西丟進去
           formData.append('file-to-upload',uploadFile);
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
   
             this.$http.post(api,formData).then((res)=>{
                
                 if(res.data.success){
                     this.tempProduct.imageUrl = res.data.imageUrl;
                   
                 }
                 else{
                    alert("尚未得到");
                 }
             })
        }
        },
         mounted(){
        this.modal = new Modal(this.$refs.modal);
       
       
    }, 
   
  

    }


</script>
<style scoped>
.tag{
  opacity: 0;
  position: absolute;
}
.tagbox{
  background: #000;
  color: #fff;

}
.tagbox label{
   font-size: 0.8em;
}
</style>