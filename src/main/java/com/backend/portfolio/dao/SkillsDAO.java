package com.backend.portfolio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.portfolio.entity.Skills;

public interface SkillsDAO extends JpaRepository<Skills,Integer> {

}
