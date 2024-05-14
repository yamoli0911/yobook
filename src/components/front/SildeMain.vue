<template>
     <div class="wrap-silde">
        <div id="carouselExampleIndicators" class="slidemain carousel slide content" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
     
    </div>
    <div class="carousel-inner ">
      
      <div class="carousel-item active ">
        <div class="cardimg s1" ></div>
           <div class="sss01">
                <h1>找到屬於你的漫生活</h1>
                <button @click="goPage()" class="bg03 h5">立即找尋想要的書籍</button>
             </div>
      </div>
      <div class="carousel-item">
        <div class="cardimg s2" ></div>
          <div class="sss01">
                <h1>漫畫是生活的能量來源</h1>
                <button  @click="goPage()" class="bg03 h5">立即找尋想要的書籍</button>
             </div>
      </div>
  
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
        </div>
     </div>
</template>

<script>


export default {
   methods:{
    goPage(){
      this.$router.push('/bookview');
    }
   }
}
</script>

<style scoped>

 .s1{
  background:url(../../assets/img/s4.png);

 }
 .s2{
  background:url(../../assets/img/discount.jpg);
 }
 .cardimg{
    width: 100%;
    height: 400px;
    background-size:cover;
    background-position: center;

 }
 .sss01{
  position: absolute;
  z-index: 1;
  left: 50%;
  top:50%;
  color:#fff;
  transform: translate(-50%);
 }
 .sss01 button{
   padding: 0.5em 1em;
 }
</style>