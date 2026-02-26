package com.sprintcoders.smartbite.controller;

import com.sprintcoders.smartbite.entity.Cart;
import com.sprintcoders.smartbite.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestParam String userId,
                          @RequestParam String productId,
                          @RequestParam Integer quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable String userId) {
        return cartService.clearCart(userId);
    }
}