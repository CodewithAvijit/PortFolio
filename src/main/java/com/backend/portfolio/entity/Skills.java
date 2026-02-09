package com.backend.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skills {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY) 
   @Column(name="id")
   private Integer id;
   @Column(name = "skill")
   private String skill;
   
   public Skills() {
   }

   public Skills(String skill) {
      this.skill = skill;
   }

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public String getSkill() {
      return skill;
   }

   public void setSkill(String skill) {
      this.skill = skill;
   }

   @Override
   public String toString() {
      return "Skills{" +
            "id=" + id +
            ", skill='" + skill + '\'' +
            '}';
   }
}
