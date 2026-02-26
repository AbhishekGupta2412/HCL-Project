package com.sprintcoders.smartbite.repository;

import com.sprintcoders.smartbite.entity.Order;
import com.sprintcoders.smartbite.entity.OrderStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserId(String userId);

    List<Order> findByStatus(OrderStatus status);
}