<template>
    <DachBar></DachBar>
    <router-view/>
</template>


<script>

import  DachBar from "../../components/back/DachBar.vue";

export default ({
      components:{
        DachBar
      },
      created(){
          // 從cookie 取得token的值
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
          this.$http.defaults.headers.common.Authorization = `${token}`;
          const api =`${process.env.VUE_APP_API}/api/user/check`;
           this.$http.post(api,this.user)
            .then((res)=>{
                         console.log(res);
                         if(!res.data.success){
                            this.$router.push('/login');
                         }
            })
      }
})
</script>