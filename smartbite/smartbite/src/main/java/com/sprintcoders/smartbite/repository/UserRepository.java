package com.sprintcoders.smartbite.repository;

import com.sprintcoders.smartbite.entity.User;
import com.sprintcoders.smartbite.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);
}