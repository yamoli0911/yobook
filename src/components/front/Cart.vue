<template>

<div ref="modal" class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div class=" modal-dialog modal-dialog-scrollable">
  新購物車
 </div>
</div>

<!-- Modal -->
<div   class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
 <!-- Scrollable modal -->

    <!-- <div class="modal-dialog modal-dialog-scrollable " role="document">
    
    </div> -->
 
</div>

    
</template>
<script>
 import Modal from 'bootstrap/js/dist/modal';

export default { 
		  data(){
			 return{
		            modal:{},
                cartdata:{},
		         }
		  },
		  methods:{
		       hideModal(){
		            this.modal.hide();
		        },
		        showModal(){
		           this.modal.show();
		        },
            getCart(){
              
                const vm = this;
          
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;   
                this.$http.get(api).then((res)=>{
              
               
                    vm.cartdata = res.data.data.carts;
                })
       
            }
		  },
      created(){
        this.getCart();
      },
		  //生命週期 等元件生成好後的階段
		  mounted(){
					  
		        this.modal = new Modal(this.$refs.modal);
		       
		       
		    },
}		    
</script>

<style scoped>
.modal-dialog{
  background: #fff;
}
.card{
  border: none !important;
}
.cartbox{

  position:fixed;
  background: #fff;
  right:0;
  top:0;
  z-index:999;
scroll-behavior: auto;
  animation: show 0.5s;
}
@keyframes show {
  0%{
    right:-100%;
  }; 
  100%{
    right:0;
  }
}
.noborde{
  border: none !important;
}

.cart-img{
  
  height:150px;
   background-size:contain;
   background-repeat: no-repeat;
    background-position: center;
    padding: 10px;
}
input{
  border: none;
}
</style>