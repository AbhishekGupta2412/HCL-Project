package com.sprintcoders.smartbite.service;

import com.sprintcoders.smartbite.entity.User;
import com.sprintcoders.smartbite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}