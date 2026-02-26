package com.sprintcoders.smartbite.service;

import com.sprintcoders.smartbite.entity.Order;
import com.sprintcoders.smartbite.entity.Product;
import com.sprintcoders.smartbite.entity.User;
import com.sprintcoders.smartbite.repository.OrderRepository;
import com.sprintcoders.smartbite.repository.ProductRepository;
import com.sprintcoders.smartbite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}