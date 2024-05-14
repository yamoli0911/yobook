<template>
   

    <SildeMain></SildeMain>
   
        <div class="homebg">
           <div class="container">
                <br>
             <span class="title-tage">#最新上架</span>
             <br><br>
           </div>
      <SildeCard :getView="'最新'" :getType="'state'" ></SildeCard>
        </div>
       
       <div class="homebg02">
           <div class="container">
                <br>
             <span class="title-tage">#排行版</span>
             <br><br>
           </div>
    <SildeCard :getView="'熱門'" :getType="'state'" ></SildeCard>
        </div>
        <div class="homebg">
           <div class="container">
                <div class="discountbox">
                   <div class="discount-text">
                        <h3>首購立馬享8折優惠</h3>
                        <button  class="bg02" @click="copyText()" >點我領取</button>
                   </div>
                </div>
           </div>
        </div>
      
         <div class="homebg02">
           <div class="container">
                <br>
             <span class="title-tage">#少年漫畫</span>
             <br><br>
              <SildeCard :getView="'少年'"  ></SildeCard>
           </div>
    
        </div>
         <div class="homebg">
           <div class="container">
                <br>
             <span class="title-tage">#戀愛漫畫</span>
             <br><br>
             <SildeCard :getView="'戀愛'"  ></SildeCard>
           </div>
     
        </div>
         <div class="homebg02">
           <div class="container">
                <br>
             <span class="title-tage">#百合漫畫</span>
             <br><br>
             <SildeCard :getView="'百合'"  ></SildeCard>
           </div>
    
        </div>
    
     <router-view/>
</template>
<style scoped>

 .discountbox{
    height: 250px;
    background-image: url(../../assets/img/discount.jpg);
    background-position: center;
    background-size: cover;
    background-attachment:fixed;
    display: flex;
    align-items: center;
    justify-content: center;
 }
 .discount-text{
   color: #fff;
   text-align: center;
 }
 .discount-text button {
    width: 100%;
    padding: 3px 0;
    border: none;
    background: #C38154;
    color: #fff;
 }
</style>
<script>
import SildeMain from "@/components/front/SildeMain.vue";
import SildeCard from "@/components/front/SildeCard.vue";

import Navbar from "@/components/front/Navbar.vue";
import { mapState , mapActions } from 'pinia' ;
import userStore from '@/store/user';
export default {
    components:{
       SildeMain,
       SildeCard,

       Navbar
    },
    computed:{
      ...mapState(userStore,['name','getUserName']),
    },
    methods:{
      ...mapActions(userStore,['updataName']),
      copyText(){
         let text = "mom520"; //折購碼
            navigator.clipboard.writeText(text).then(() => {
                alert("複製成功")
                    
            })
         }
    },
   
}


</script>




