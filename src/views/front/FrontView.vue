<template>


   
         
<div id="page-container">
    <Navbar></Navbar>
      <router-view/>
   <div id="content-wrap">
     <!-- all other page content -->
   </div>
   <Footer></Footer>
 </div>    


</template>

<style lang="scss" scoped>
   #page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 5rem;    /* Footer height */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;            /* Footer height */
}
</style>
  



<script>
import Navbar from '@/components/front/Navbar.vue'
import Footer from '@/components/front/footer.vue'
export default {
    components:{
        Navbar,Footer
    }
}
</script>
