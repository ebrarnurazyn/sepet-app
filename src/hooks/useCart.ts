//react componentların kullanacağı custom hooke ları yazacağız
import { useState } from 'react';//reactın hazır aracı- değişkeni state olarak tutmayı sağlıyor
import { useQuery } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import type { ProductDTO, CartItemDTO } from '../types/cart.dto';

export function useProducts() {//apıden ürün listesini çekiyor.React query loading/cache/error u yonetiyor 
  return useQuery({
    queryKey: ['products'],
    queryFn: cartService.getProducts,
  });
}

export function useCart() {//
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);//sepetteki ürünler adında bir tane state başlaıtyor başlangıç değerleri boş
//cartItems su anki sepet içeriğini okumak için kullanılcak değişken
//setCartItems sepeti güncellemek için kullanacağımız fonksiyon. React te statei doğrudan değiş
//tiremezsin ,hep bu tarz bir setter fonksiyonuyla güncellersin
  const addToCart = (product: ProductDTO) => {//sepete ürün ekleyen fonksiyon dışarıdan product alıyor
    setCartItems((prev) => {//sepetin güncellenmeden önceki hali. reacte eskş halşne bakrak 
        //yeni halini hesapla diyoruz- bu art arda hızlı güncellemelerde hata olmaması için gücenli yöntem
      const existing = prev.find((item) => item.id === product.id);
//prev.find sepette bu üründen zaten var mı diye arıyoruz find listede eşleşen ilk ögeyi bulur 
//yoksa undefined döner 
      if (existing) {
        return prev.map((item) =>// eğer ürün sepette varsa prev.map ile sepetteki her öge
        //gezilir eşleşeninin quantitysi 1 artar
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }//1 artma işlemi burada bu ögenin tüm 
            //alanlarını kopyala, sadece quantityi değiştir demek diğerlerini olduğu gibi bırakır
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
 //eğer ürün sepette yoksa mevcut listeye (prev ile eski ögeleri kopyalıyırouz) yeni bir öge 
 //ekliyoruz --product ın tüm alanlarını alıp üstüne quantity:1 ekliyoruz ilk kez ekleniyor adet 1     
    });
  };

  const removeFromCart = (id: number) => {//bir ürünü sepetten tamamen çıkarır
    setCartItems((prev) => prev.filter((item) => item.id !== id));///idsi eşleşmeyen her şeyi tut
    //eşleşen ürün listeden düşer
  };

  const totalPrice = cartItems.reduce(//reduce bir listeyi bir değere indirger burada topluyoruz
    (sum, item) => sum + item.price * item.quantity,//her ürün için fiyatx adet hesaplayıp toplama ekliyoruz
    //0 dan başlayarak
    0
  );

  return { cartItems, addToCart, removeFromCart, totalPrice };
  //bu hooke u kullanan componente (cartPage.tsx) 4 şey veriyoyz mevcut sepet listesi,
  //ekleme fonksiyonu,çıkarma fonksioynu toplam fiyat
}