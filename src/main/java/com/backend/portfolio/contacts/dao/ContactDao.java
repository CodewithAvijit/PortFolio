package com.backend.portfolio.contacts.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.portfolio.contacts.entity.Contact;

public interface ContactDao extends JpaRepository<Contact,Integer> {
    
}
