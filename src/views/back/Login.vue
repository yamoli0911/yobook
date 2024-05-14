<template>
     <div class="container mt-5">
	<form class="row justify-content-center">
	  <div class="col-md-6">
	    <h1 class="h3 mb-3 font-weight-normal">管理者登入</h1>
	    <div class="mb-2">
	      <label for="inputEmail" class="sr-only">Email address</label>
	      <input
	        type="email"
	        id="inputEmail"
	        class="form-control"
	        placeholder="Email address"
	        required
	        autofocus
            v-model="user.username"
	      />
	    </div>
	    <div class="mb-2">
	      <label for="inputPassword" class="sr-only">Password</label>
	      <input
	        type="password"
	        id="inputPassword"
	        class="form-control"
	        placeholder="Password"
	        required
            v-model="user.password"
	      />
	    </div>
	
	    <div class="text-end mt-4">
	      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="signIn">登入</button>
	    </div>
	  </div>
	</form>
</div>
</template>

<script>
export default {
    data(){
         return{
             user:{
                username:"",
                password:"",
             }
         }
    },
    methods:{
        signIn(){
            console.log('login');
            const api =`${process.env.VUE_APP_API}/admin/signin`;
            console.log(api);
            this.$http.post(api,this.user)
                .then((res)=>{
					const {token,expired} = res.data; //定義兩個變數
				
                
					document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
					if(res.data.success){
this.$router.push('/dashboard/products');
					}
					
					
                })
        }
    },
	created(){
          // 從cookie 取得token的值
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
          this.$http.defaults.headers.common.Authorization = `${token}`;
          const api =`${process.env.VUE_APP_API}/api/user/check`;
           this.$http.post(api,this.user)
            .then((res)=>{
                         console.log(res);
                         if(res.data.success){
                            this.$router.push('/Dashboard/Products');
                         }else{
							this.$router.push('/login');
						 }
            })
      }

}
</script>