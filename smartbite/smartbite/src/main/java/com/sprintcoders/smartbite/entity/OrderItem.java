package com.sprintcoders.smartbite.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    private String productId;

    private String name;

    private Double price;

    private Integer quantity;
}