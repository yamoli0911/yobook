"use strict";(self["webpackChunkyozubook0_2"]=self["webpackChunkyozubook0_2"]||[]).push([[474],{1474:function(t,a,s){s.r(a),s.d(a,{default:function(){return F}});var r=s(6768);const d=t=>((0,r.Qi)("data-v-71b2128c"),t=t(),(0,r.jt)(),t),e=d((()=>(0,r.Lk)("div",{class:"bg-img"},[(0,r.Lk)("div",{class:"title h1 bg01"},"我的收藏書單")],-1))),o={class:"favorite"};function c(t,a,s,d,c,i){const l=(0,r.g2)("Card");return(0,r.uX)(),(0,r.CE)(r.FK,null,[e,(0,r.Lk)("div",o,[(0,r.bF)(l,{getCardProducts:c.stared},null,8,["getCardProducts"])])],64)}var i=s(4232);const l=t=>((0,r.Qi)("data-v-f7e4c7ac"),t=t(),(0,r.jt)(),t),n={class:"row row-cols-1 row-cols-md-3 g-2 w-100"},u={class:"card"},g={class:"tagbox tag d-flex justify-content-start"},k={class:"badge bg02"},b=["onClick"],p=l((()=>(0,r.Lk)("i",{class:"fa fa-bookmark savenow","aria-hidden":"true"},null,-1))),v=[p],h={class:"card-body"},C={class:"card-title"},m={class:"card-text"},f=["onClick","disabled"],w={key:0,class:"spinner-grow spinner-grow-sm",role:"status"},I=l((()=>(0,r.Lk)("span",{class:"visually-hidden"},"Loading...",-1))),P=[I];function y(t,a,s,d,e,o){const c=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",n,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.filterProducts,(t=>((0,r.uX)(),(0,r.CE)("div",{class:"col",key:t},[(0,r.Lk)("div",u,[(0,r.bF)(c,{to:`book/${t.id}`,src:"#",class:"card-img-top cardimg",style:(0,i.Tr)({backgroundImage:"url("+t.imageUrl+")"}),alt:"..."},{default:(0,r.k6)((()=>[(0,r.Lk)("div",g,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(t.booktag,(t=>((0,r.uX)(),(0,r.CE)("span",k,(0,i.v_)(t),1)))),256))])])),_:2},1032,["to","style"]),(0,r.Lk)("span",{class:"badge bg-danger save",onClick:a=>o.staredData(t)},v,8,b),(0,r.Lk)("div",h,[(0,r.Lk)("h5",C,(0,i.v_)(t.title),1),(0,r.Lk)("p",m,"售價: "+(0,i.v_)(t.price)+"元",1),(0,r.Lk)("button",{class:"cart-btn w-100 bg01",onClick:a=>o.addCart(t.id),disabled:e.status.loadingItem===t.id},[(0,r.eW)("加入購物車 "),e.status.loadingItem===t.id?((0,r.uX)(),(0,r.CE)("div",w,P)):(0,r.Q3)("",!0)],8,f)])])])))),128))])}s(4114);var L={props:["getCardProducts"],data(){return{cardProduct:[],status:{loadingItem:""},cardNow:"",search:"",stared:JSON.parse(localStorage.getItem("stared"))||[]}},watch:{getCardProducts(){this.cardProduct=this.getCardProducts}},methods:{staredData(t){const a=this;a.stared=a.stared.filter((a=>a.title!==t.title)),localStorage.setItem("stared",JSON.stringify(a.stared)),window.location.reload(),localStorage.setItem("stared",JSON.stringify(a.stared))},addCart(t){const a=this;a.status.loadingItem=t;const s="https://vue3-course-api.hexschool.io/api/yozubook011/cart",r={product_id:t,qty:1};this.$http.post(s,{data:r}).then((t=>{a.status.loadingItem="",this.$emitter.emit("sendProduct",t.data)}))}},computed:{filterProducts(){const t=this;return t.cardNow.length?t.cardProduct.filter((a=>a.booktag.includes(t.cardNow))):t.cardProduct}},created(){this.cardProduct=this.getCardProducts}},_=s(1241);const S=(0,_.A)(L,[["render",y],["__scopeId","data-v-f7e4c7ac"]]);var E=S,N={data(){return{stared:JSON.parse(localStorage.getItem("stared"))||[]}},components:{Card:E}};const X=(0,_.A)(N,[["render",c],["__scopeId","data-v-71b2128c"]]);var F=X}}]);
//# sourceMappingURL=474.865be425.js.map