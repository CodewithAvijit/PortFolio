package com.backend.portfolio.projects.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.portfolio.projects.entity.Projects;

public interface ProjectDao extends JpaRepository<Projects,Integer> {

}
