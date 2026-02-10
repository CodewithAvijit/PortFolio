package com.backend.portfolio.skills.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.portfolio.skills.entity.Skills;

public interface SkillsDAO extends JpaRepository<Skills, Integer> {
    Skills findBySkill(String skill);
}
