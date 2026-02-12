package com.backend.portfolio.login.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.portfolio.login.entity.Users;
import java.util.List;


public interface UserDao extends JpaRepository<Users,Integer>{
    Optional<Users>  findByEmail(String email);
}
