package com.backend.portfolio.contacts.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.portfolio.contacts.dao.ContactDao;
import com.backend.portfolio.contacts.dao.ContactDto;
import com.backend.portfolio.contacts.entity.Contact;

@Service
public class ContactServiceImpl implements ContactService {
    private final ContactDao contactDao;

    public ContactServiceImpl(ContactDao contactDao) {
        this.contactDao = contactDao;
    }

    @Override
    public List<Contact> allcontacts() {
        return contactDao.findAll();
    }

    @Override
    public Contact createContact(ContactDto contactDto) {
        Contact newContact = new Contact();
        newContact.setName(contactDto.getName());
        newContact.setEmail(contactDto.getEmail());
        newContact.setMessage(contactDto.getMessage());
        newContact.setCreatedAt(LocalDateTime.now());

        return contactDao.save(newContact);
    }

    @Override
    public void deleteContact(Integer id) {
        Contact exisContact = contactDao.findById(id).get();
        if (exisContact == null) {
            throw new RuntimeException("No id Exist");
        }
        contactDao.delete(exisContact);
    }

}
