package com.backend.portfolio.projects.entity;

import java.util.HashSet;
import java.util.Set;

import com.backend.portfolio.skills.entity.Skills;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Projects {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id")
   private Integer id;
   @Column(name = "title")
   private String title;
   @Column(name = "description")
   private String description;
   @Column(name = "live_link")
   private String livelink;
   @Column(name = "code_link")
   private String codelink;
   @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH },fetch = FetchType.EAGER)
   @JoinTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
   private Set<Skills> skills = new HashSet<>();

   public Projects() {
   }

   public Projects(String title, String description, String livelink, String codelink, Set<Skills> skills) {
      this.title = title;
      this.description = description;
      this.livelink = livelink;
      this.codelink = codelink;
      this.skills = skills;
   }

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getDescripion() {
      return description;
   }

   public void setDescripion(String description) {
      this.description = description;
   }

   public String getLivelink() {
      return livelink;
   }

   public void setLivelink(String livelink) {
      this.livelink = livelink;
   }

   public String getCodelink() {
      return codelink;
   }

   public void setCodelink(String codelink) {
      this.codelink = codelink;
   }

   public void addSkill(Skills skill) {
      if (skill == null)
         return;

      this.skills.add(skill);
      skill.getProjects().add(this);
   }

   public void removeSkill(Skills skill) {
      if (skill == null)
         return;

      this.skills.remove(skill);
      skill.getProjects().remove(this);
   }

   public Set<Skills> getSkills() {
      return skills;
   }

   public void setSkills(Set<Skills> skills) {
      this.skills = skills;
   }

   @Override
   public String toString() {
      return "Projects{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", descripion='" + description + '\'' +
            ", livelink='" + livelink + '\'' +
            ", codelink='" + codelink + '\'' +
            '}';
   }

}
