package com.backend.portfolio.service;

import java.util.List;

import com.backend.portfolio.dao.SkillsAdd;
import com.backend.portfolio.entity.Skills;

public interface SkillsService {
    List<Skills> allskills();
    Skills findSkills(Integer id);
    Skills addSkills(Skills skills);
    void UpdateSkills(Integer id,SkillsAdd skillsAdd);
    void DeleteSkills(Integer id);
}
