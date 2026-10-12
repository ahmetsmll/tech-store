package com.techstore.config;

import com.techstore.entity.Category;
import com.techstore.entity.Product;
import com.techstore.entity.Role;
import com.techstore.entity.User;
import com.techstore.repository.CategoryRepository;
import com.techstore.repository.ProductRepository;
import com.techstore.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategoriesAndProducts();
    }

    private void seedUsers() {
        User admin = userRepository.findByEmail("admin@techstore.com").orElse(null);
        if (admin == null) {
            admin = new User(
                    "Admin Kullanıcı",
                    "admin@techstore.com",
                    passwordEncoder.encode("TechAdmin#2026!"),
                    Role.ROLE_ADMIN
            );
            userRepository.save(admin);
        } else {
            admin.setPassword(passwordEncoder.encode("TechAdmin#2026!"));
            userRepository.save(admin);
        }

        User user = userRepository.findByEmail("user@techstore.com").orElse(null);
        if (user == null) {
            user = new User(
                    "Ahmet Yılmaz",
                    "user@techstore.com",
                    passwordEncoder.encode("TechUser#2026!"),
                    Role.ROLE_USER
            );
            userRepository.save(user);
        } else {
            user.setPassword(passwordEncoder.encode("TechUser#2026!"));
            userRepository.save(user);
        }
    }

    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() > 0) {
            return;
        }

        Category laptops = categoryRepository.save(new Category(
                "Dizüstü Bilgisayar", "laptops", "Yüksek performanslı iş, grafik ve oyun dizüstü bilgisayarları", "💻"));

        Category phones = categoryRepository.save(new Category(
                "Akıllı Telefon", "smartphones", "En yeni teknolojiye sahip amiral gemisi akıllı telefonlar", "📱"));

        Category audio = categoryRepository.save(new Category(
                "Kulaklık & Ses", "audio", "Stüdyo kalitesinde ses, ANC aktif gürültü engelleme ve hoparlörler", "🎧"));

        Category watches = categoryRepository.save(new Category(
                "Akıllı Saat & Bileklik", "smartwatches", "Gelişmiş sağlık ve fitness takibi sunan akıllı saatler", "⌚"));

        Category gaming = categoryRepository.save(new Category(
                "Oyuncu Ekipmanları", "gaming", "Profesyonel e-spor fareleri, mekanik klavyeler ve konsollar", "🎮"));

        Category monitors = categoryRepository.save(new Category(
                "Monitör & Görüntü", "monitors", "Yüksek yenileme hızlı OLED ve 4K profesyonel monitörler", "🖥️"));

        List<Product> products = List.of(
                new Product(
                        "Apple MacBook Pro 16\" M3 Max",
                        "macbook-pro-16-m3-max",
                        "16 çekirdekli CPU, 40 çekirdekli GPU, 48 GB Birleşik Bellek ve 1 TB SSD depolama. Liquid Retina XDR ekran ile profesyonel iş akışları için rakipsiz güç.",
                        new BigDecimal("129999.00"),
                        new BigDecimal("124999.00"),
                        "Apple",
                        12,
                        4.9,
                        84,
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "M3 Max Çip, 48GB RAM, 1TB SSD, 16.2\" Liquid Retina XDR",
                        laptops
                ),
                new Product(
                        "ASUS ROG Zephyrus G16 OLED (2024)",
                        "asus-rog-zephyrus-g16-oled",
                        "Intel Core Ultra 9 185H, NVIDIA GeForce RTX 4080, 32GB LPDDR5X RAM, 2.5K 240Hz ROG Nebula OLED ekran. İnce, hafif ve ultra güçlü oyuncu canavarı.",
                        new BigDecimal("114999.00"),
                        new BigDecimal("109999.00"),
                        "ASUS ROG",
                        8,
                        4.8,
                        42,
                        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "Intel Ultra 9, RTX 4080, 32GB RAM, 2TB SSD, 240Hz OLED",
                        laptops
                ),
                new Product(
                        "iPhone 16 Pro Max 256GB Çöl Titanyum",
                        "iphone-16-pro-max-256gb",
                        "A18 Pro çip, Kamera Denetimi düğmesi, 48 MP Fusion kamera ve sınıfının lideri pil ömrü. Havacılık ve uzay sınıfı titanyum tasarım.",
                        new BigDecimal("84999.00"),
                        new BigDecimal("81999.00"),
                        "Apple",
                        25,
                        4.9,
                        198,
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "A18 Pro, 6.9\" Super Retina XDR, Titanyum Kasa, 5x Telefoto",
                        phones
                ),
                new Product(
                        "Samsung Galaxy S24 Ultra 512GB",
                        "samsung-galaxy-s24-ultra-512gb",
                        "Galaxy AI destekli Snapdragon 8 Gen 3 for Galaxy, 200 MP kamera, dahili S Pen ve titanyum çerçeve. Flat Armor ekran ile yansımasız izleme deneyimi.",
                        new BigDecimal("74999.00"),
                        new BigDecimal("69999.00"),
                        "Samsung",
                        18,
                        4.8,
                        136,
                        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "Snapdragon 8 Gen 3, 200MP Kamera, Dahili S Pen, 12GB RAM, 512GB Depolama",
                        phones
                ),
                new Product(
                        "Sony WH-1000XM5 Kablosuz ANC Kulaklık",
                        "sony-wh-1000xm5-kablosuz-kulaklik",
                        "Sektör lideri Aktif Gürültü Engelleme (ANC), 8 mikrofonlu sistem, 30 saat pil ömrü ve LDAC yüksek çözünürlüklü ses desteği.",
                        new BigDecimal("14999.00"),
                        new BigDecimal("12999.00"),
                        "Sony",
                        30,
                        4.8,
                        312,
                        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "HD QN1 İşlemci, 30 Saat Pil, Hızlı Şarj, Çoklu Cihaz Bağlantısı",
                        audio
                ),
                new Product(
                        "Apple AirPods Max Uzay Grisi",
                        "apple-airpods-max-uzay-grisi",
                        "Özel tasarım dinamik sürücü, adaptif ekolayzır, dinamik kafa izleme özellikli uzamsal ses ve nefes alabilen file taç bandı.",
                        new BigDecimal("26999.00"),
                        null,
                        "Apple",
                        15,
                        4.7,
                        174,
                        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
                        false,
                        "Apple H1 Çip, Uzamsal Ses, Alüminyum Kulaklık Kapakları",
                        audio
                ),
                new Product(
                        "Apple Watch Ultra 2 Titanyum 49mm",
                        "apple-watch-ultra-2-titanyum-49mm",
                        "S9 SiP çip, 3000 nit ultra parlak ekran, hassas çift frekanslı GPS ve 36 saate kadar pil ömrü. Ekstrem sporlar ve maceralar için tasarlandı.",
                        new BigDecimal("42999.00"),
                        new BigDecimal("39999.00"),
                        "Apple",
                        10,
                        4.9,
                        95,
                        "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "49mm Titanyum Kasa, 3000 Nit, Çift Dokunuş Hareketi, Su Geçirmezlik",
                        watches
                ),
                new Product(
                        "Logitech G PRO X Superlight 2 Kablosuz Gaming Mouse",
                        "logitech-g-pro-x-superlight-2",
                        "60 gram ultra hafif tasarım, HERO 2 sensör (32.000 DPI), LIGHTFORCE hibrit optik-mekanik anahtarlar ve 95 saat pil ömrü.",
                        new BigDecimal("6499.00"),
                        new BigDecimal("5799.00"),
                        "Logitech G",
                        40,
                        4.9,
                        280,
                        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "60g Ağırlık, HERO 2 Sensör, 32K DPI, Lightspeed Wireless",
                        gaming
                ),
                new Product(
                        "Razer BlackWidow V4 Pro RGB Mekanik Klavye",
                        "razer-blackwidow-v4-pro",
                        "Razer Green Mekanik Anahtarlar, Razer Komuta Kadranı, 8 özel makro tuşu, alt parıltılı RGB aydınlatma ve manyetik peluş bilek desteği.",
                        new BigDecimal("9899.00"),
                        new BigDecimal("8499.00"),
                        "Razer",
                        20,
                        4.7,
                        118,
                        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
                        false,
                        "Yeşil Clicky Switch, 8000Hz Polling, Komuta Kadranı, Kromatik RGB",
                        gaming
                ),
                new Product(
                        "LG UltraGear 32\" 4K UHD 240Hz OLED Gaming Monitör",
                        "lg-ultragear-32-4k-oled-240hz",
                        "Dual-Hz özelliği (4K 240Hz / FHD 480Hz), 0.03ms (GtG) tepki süresi, DisplayHDR True Black 400 ve Pixel Sound hoparlörler.",
                        new BigDecimal("56999.00"),
                        new BigDecimal("52999.00"),
                        "LG",
                        6,
                        4.9,
                        51,
                        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
                        true,
                        "32 Inç OLED, 4K 240Hz / FHD 480Hz, 0.03ms Tepki, G-Sync Uyumlu",
                        monitors
                )
        );

        productRepository.saveAll(products);
    }
}
