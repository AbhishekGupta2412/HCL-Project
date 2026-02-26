package com.sprintcoders.smartbite.service;

import com.sprintcoders.smartbite.entity.*;
import com.sprintcoders.smartbite.repository.CartRepository;
import com.sprintcoders.smartbite.repository.OrderRepository;
import com.sprintcoders.smartbite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order placeOrder(String userId) {

        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart == null || cart.getItems().isEmpty()) return null;

        List<OrderItem> orderItems = cart.getItems().stream().map(item -> {

            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null) {
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            }

            return OrderItem.builder()
                    .productId(item.getProductId())
                    .name(item.getName())
                    .price(item.getPrice())
                    .quantity(item.getQuantity())
                    .build();
        }).collect(Collectors.toList());

        Order order = Order.builder()
                .userId(userId)
                .items(orderItems)
                .totalAmount(cart.getTotalAmount())
                .status(OrderStatus.PLACED)
                .orderDate(LocalDateTime.now())
                .build();

        cartRepository.delete(cart);
        return orderRepository.save(order);
    }
}