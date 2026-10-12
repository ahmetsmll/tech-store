package com.techstore.service;

import com.techstore.entity.Category;
import com.techstore.entity.Product;
import com.techstore.repository.CategoryRepository;
import com.techstore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts(String query, String categorySlug) {
        if ((query != null && !query.isBlank()) || (categorySlug != null && !categorySlug.isBlank())) {
            return productRepository.searchProducts(
                    (query != null && !query.isBlank()) ? query.trim() : null,
                    (categorySlug != null && !categorySlug.isBlank()) ? categorySlug.trim() : null
            );
        }
        return productRepository.findAll();
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ürün bulunamadı: " + id));
    }

    public Product getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Ürün bulunamadı: " + slug));
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Product createOrUpdateProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
