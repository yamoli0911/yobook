<template>
     <footer>
         <div class="container">
            <div class="wrap-footer">
                <div class="wrap-li">
                     <li> <router-link class="nav-link active" aria-current="page"  to="/Login">
                      <i class="fa-solid fa-user"></i>
                      
                      <span> 管理者登入 </span></router-link> </li>
                    
                </div>
                  
                  <span>本網站僅供個人作品使用，不提供商業用途</span>
            </div>
         </div>
     </footer>
</template>

<style scoped>
  .container{
       display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }
  .wrap-li{
     display: flex;
    justify-content: center;
    align-items: center;
  }
  i,span{
    color:#fff;
  }
</style>