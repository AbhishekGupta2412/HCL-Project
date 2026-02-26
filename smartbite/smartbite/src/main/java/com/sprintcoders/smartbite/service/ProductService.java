package com.sprintcoders.smartbite.service;

import com.sprintcoders.smartbite.entity.Product;
import com.sprintcoders.smartbite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product, String vendorId) {

        product.setVendorId(vendorId);
        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByVendor(String vendorId) {
        return productRepository.findByVendorId(vendorId);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }
}