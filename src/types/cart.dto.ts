//sepetteki bir ürünün şeklini id,isim,fiyat,adet tanımlayacağız
export interface ProductDTO {  //apıden gelen ham ürün bilgisi
  id: number;
  title: string;
  price: number;
}

export interface CartItemDTO extends ProductDTO {//sepetteki bir ürün 
    //extends ProductDTO diyerek "ProductDTO daki tüm alanları al 
    // üzerine bir de adet quantity ekle " demiş oluyoruz
    //tekrardan id,title vs yazmamıza gerek kalmıyor
    quantity: number;
}