import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'TechVault - Yeni Nesil Teknoloji ve Donanım Mağazası',
  description: 'En yeni MacBook Pro, RTX 4080 oyuncu laptopları, amiral gemisi akıllı telefonlar ve stüdyo kulaklıkları TechVault güvencesiyle.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
