<template>

  <div class="bg-img">
     <div class="title h1 bg01">我的收藏書單</div>
  </div>
  <div class="favorite">
     <Card :getCardProducts="stared" ></Card>
  </div>
</template>

<script>

import Card from "@/components/front/favoriteCard.vue";

export default {
  data(){
    return{
   
       stared: JSON.parse(localStorage.getItem("stared")) || []
    }
  },
  components:{
    Card
  }
}
</script>

<style scoped>
 .bg-img{
  background-image: url(../../assets/img/save.png);
  background-size:cover;
  background-position: center;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
 }
 .title{
  padding: 10px 10px;
 }
 .favorite{
   width: 60%;
   background: #fff;
   margin: 0 auto;
   position: relative;
  top:-40px;
  padding: 20px;
  
 }
</style>