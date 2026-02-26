package com.sprintcoders.smartbite.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    private String id;

    private String userId;

    private List<CartItem> items;

    private Double totalAmount;

    private LocalDateTime updatedAt;
}