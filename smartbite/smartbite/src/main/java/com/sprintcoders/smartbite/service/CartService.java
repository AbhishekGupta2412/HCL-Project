package com.sprintcoders.smartbite.service;

import com.sprintcoders.smartbite.entity.Cart;
import com.sprintcoders.smartbite.entity.CartItem;
import com.sprintcoders.smartbite.entity.Product;
import com.sprintcoders.smartbite.repository.CartRepository;
import com.sprintcoders.smartbite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(String userId, String productId, int quantity) {

        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return null;

        Cart cart = cartRepository.findByUserId(userId).orElse(
                Cart.builder()
                        .userId(userId)
                        .items(new ArrayList<>())
                        .totalAmount(0.0)
                        .build()
        );

        CartItem item = CartItem.builder()
                .productId(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(quantity)
                .build();

        cart.getItems().add(item);
        cart.setTotalAmount(cart.getTotalAmount() + (product.getPrice() * quantity));
        cart.setUpdatedAt(LocalDateTime.now());

        return cartRepository.save(cart);
    }
}