//burada sepetle ilgili API çağrılarını yazacağız
import { axiosInstance } from '../api/axiosInstance';//axios ayarını ve tip şablonunu içe aktarıyoruz
import type { ProductDTO } from '../types/cart.dto';

export const cartService = {//apıden ürün listesini çeken fonksiyon
  getProducts: async (): Promise<ProductDTO[]> => {
    const { data } = await axiosInstance.get('/posts', {
      params: { _limit: 10 },// /posts kullanıyoruz 
      //jsonplaceholderdan gerçek ürün verisi yok ama post 
      // verisinin title alanı ürün ismi gibi kullanılabilir
    });

    return data.map((item: { id: number; title: string }) => ({
      id: item.id,
      title: item.title,
      price: (item.id * 7) % 100 + 10,
    }));//apıden gelen ham veriyi kendi ProductDO şeklimizze
    // dönüştürüyoruz 
    //data.map gelen listesindeki her ögeyi tek tek işleyip 
    // yeni bir liste oluşturuyotuz
    //price:(item.id*7)%100+10 apıde fiyat bilgisi olmadığı için 
    //id ye dayalı sahte ama tutarlı fiyat üretiyoruz
    //her ürün her sferinde aynı fiyata sahip olsun diye 
    // rastgele değil id den türetilmiş bir hesap kullandık 
    // gerçek projede bu satır olmazdı apı zaten fiyatı verirdi
  },
};