package com.backend.portfolio.contacts.service;

import java.util.List;

import com.backend.portfolio.contacts.dao.ContactDto;
import com.backend.portfolio.contacts.entity.Contact;

public interface ContactService {
    List<Contact> allcontacts();
    Contact createContact(ContactDto contactDto);
    void deleteContact(Integer id);
}
