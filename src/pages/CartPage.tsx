//sepeti ekrana basan sayfa
import { useProducts, useCart } from '../hooks/useCart';

export function CartPage() {
  const { data: products, isLoading } = useProducts();
  const { cartItems, addToCart, removeFromCart, totalPrice } = useCart();

  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h1>Ürünler</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.title} — {product.price} TL
            <button onClick={() => addToCart(product)}>Sepete Ekle</button>
          </li>
        ))}
      </ul>

      <h1>Sepetim</h1>
      {cartItems.length === 0 && <p>Sepetin boş.</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} — {item.quantity} adet — {item.price * item.quantity} TL
            <button onClick={() => removeFromCart(item.id)}>Çıkar</button>
          </li>
        ))}
      </ul>

      <h2>Toplam: {totalPrice} TL</h2>
    </div>
  );
}