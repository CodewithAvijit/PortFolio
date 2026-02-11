package com.backend.portfolio.contacts.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.portfolio.contacts.dao.ContactDto;
import com.backend.portfolio.contacts.entity.Contact;
import com.backend.portfolio.contacts.service.ContactService;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactsController {
    private final ContactService contactService;
    public ContactsController(ContactService contactService){
        this.contactService=contactService;
    }
    @GetMapping("/health")
    public Map<String,String> gethealth() {
        return Map.of("status","okay");
    }
    @GetMapping
    public List<Contact> getallContacts() {
        return contactService.allcontacts();
    } 
    @PostMapping
    public Contact createContact(@RequestBody ContactDto contactDto){
        return contactService.createContact(contactDto);
    }
    @DeleteMapping("/{id}")
    public Map<String,Integer> deleteContact(@PathVariable Integer id){

        contactService.deleteContact(id);
        return Map.of("contact_deleted",id);
    }
    
    
}
