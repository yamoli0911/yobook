<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">後台管理</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        
        <li class="nav-item">
            <router-link class="nav-link active" aria-current="page"  to="/dashboard/products">
               產品</router-link> 
         
        </li>
        <li class="nav-item">
          <router-link class="nav-link " aria-current="page"  to="/dashboard/DachOrder">
               訂單</router-link> 
        </li>
        <li class="nav-item">
         <router-link class="nav-link " aria-current="page"  to="/dashboard/DashVoucher">
               優惠卷</router-link> 
        </li>
         <li class="nav-item">
         <router-link class="nav-link " aria-current="page"  to="/">
               回到首頁</router-link> 
        </li>
        <li class="nav-item">
            <a class="nav-link">登出</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>