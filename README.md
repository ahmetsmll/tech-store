# TechVault - Yeni Nesil Teknoloji E-Ticaret Platformu

TechVault; modern, yüksek performanslı, ölçeklenebilir ve tam teşekküllü bir teknoloji aletleri e-ticaret platformudur.

## 🛠️ Mimari & Teknoloji Yığını

- **Backend:** Java 21, Spring Boot 3.3.4, Spring Data JPA, Spring Security 6, JJWT (JSON Web Token), Maven
- **Frontend:** Next.js (App Router), React 19, Lucide React, Modern Dark Cyber CSS Design System
- **Veritabanı:** PostgreSQL 16 (Docker Compose ile tek komutla çalışır)

---

## 🚀 Hızlı Başlangıç

### 1. Veritabanını Başlatma (Docker)
Proje kök dizininde (`tech-store`):
```bash
docker compose up -d
```
*Bu komut PostgreSQL 16 veritabanını `localhost:5432` portunda başlatır.*

### 2. Spring Boot Backend'i Başlatma
`backend` dizinine geçin ve çalıştırın:
```bash
cd backend
mvn spring-boot:run
```
*Backend `http://localhost:8080` üzerinde başlar ve açılışta `DataSeeder` ile kategorileri, zengin ürünleri ve test kullanıcılarını otomatik olarak veritabanına ekler.*

### 3. Next.js Frontend'i Başlatma
`frontend` dizinine geçin ve çalıştırın:
```bash
cd frontend
npm run dev
```
*Frontend `http://localhost:3000` adresinde kullanıma hazırdır.*

---

## 🔑 Hazır Test Kullanıcıları

| Rol | E-Posta | Şifre |
| :--- | :--- | :--- |
| **Admin** | `admin@techstore.com` | `TechAdmin#2026!` |
| **Demo Kullanıcı** | `user@techstore.com` | `TechUser#2026!` |

*Giriş modalında "Demo Kullanıcı" veya "Admin" butonuna basarak tek tıkla formları doldurabilirsiniz.*

---

## 📡 REST API Uç Noktaları

### Kimlik Doğrulama (`/api/auth`)
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Giriş yapma & JWT token alma
- `GET /api/auth/me` - Oturum açmış kullanıcının profili (Bearer Token ile)

### Ürünler & Kategoriler (`/api/products`, `/api/categories`)
- `GET /api/products` - Ürün listesi (Filtreleme: `?search=...&category=...`)
- `GET /api/products/featured` - Öne çıkan ürünler
- `GET /api/products/{id}` - Ürün detayı
- `GET /api/categories` - Tüm kategoriler

### Sipariş Yönetimi (`/api/orders`)
- `POST /api/orders` - Yeni sipariş oluşturma (Yetkilendirilmiş kullanıcı)
- `GET /api/orders/my-orders` - Kullanıcının sipariş geçmişi
- `GET /api/orders/{id}` - Sipariş detayı

---

## 🎨 Tasarım & Kullanıcı Deneyimi
- **Dark Cyber & Glassmorphism Estetiği**: Neon mavi ve mor vurgular, yarı saydam kartlar.
- **Dinamik Sepet**: Drawer çekmece, anlık miktar güncelleme, ara toplam ve ücretsiz kargo hesaplayıcı.
- **Hızlı Ürün İnceleme**: Teknik özellikler, yüksek çözünürlüklü görseller ve stok bilgisi.
- **Güvenli Sipariş & Simülasyon**: Tek tıkla ödeme ve anında sipariş takip ekranı.
