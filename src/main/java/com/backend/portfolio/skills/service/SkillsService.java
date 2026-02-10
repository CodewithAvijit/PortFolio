package com.backend.portfolio.skills.service;

import java.util.List;

import com.backend.portfolio.skills.dao.SkillsAdd;
import com.backend.portfolio.skills.entity.Skills;

public interface SkillsService {
    List<Skills> allskills();
    Skills findSkills(Integer id);
    Skills addSkills(Skills skills);
    void UpdateSkills(Integer id,SkillsAdd skillsAdd);
    void DeleteSkills(Integer id);
}
