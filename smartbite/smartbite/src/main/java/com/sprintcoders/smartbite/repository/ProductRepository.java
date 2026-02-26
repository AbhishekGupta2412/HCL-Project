package com.sprintcoders.smartbite.repository;

import com.sprintcoders.smartbite.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory(String category);

    List<Product> findByVendorId(String vendorId);

    List<Product> findByStockLessThan(Integer stock);
}