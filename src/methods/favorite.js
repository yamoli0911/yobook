const storageMethods = {
    save(item) {
      // 先把要存的item轉成JSON字串 這邊會存產品id
      const favoriteString = JSON.stringify(item);
      localStorage.setItem('myfavorite', favoriteString);
    },
    get() {
      // 可以用JSON.parse()將JSON字串轉換成JavaScript的數值或是物件
     return JSON.parse(localStorage.getItem('myfavorite'));
    },
  };

  export function getFavoriteIdAry() {
    // 如果localstorage沒東西，就預設回傳空陣列
     const favoriteIdAry = storageMethods.get('myfavorite') || [];
     return favoriteIdAry;
   }

   export function toggleFavorite(product) {
    const favoriteIdAry = getFavoriteIdAry();
       
    if (favoriteIdAry.includes(product.id)) {
      favoriteIdAry.splice(favoriteIdAry.indexOf(product.id), 1);
      content = '已從我的最愛中移除';
    } else {
      favoriteIdAry.push(product.id);
      content = '已加入我的最愛';
    }
    storageMethods.save(favoriteIdAry);
  }