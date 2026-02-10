package com.backend.portfolio.skills.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.portfolio.skills.dao.SkillsAdd;
import com.backend.portfolio.skills.dao.SkillsDAO;
import com.backend.portfolio.skills.entity.Skills;

@Service
public class SkillsServiceImpl implements SkillsService {
    private final SkillsDAO skillsDAO;

    public SkillsServiceImpl(SkillsDAO skillsDAO) {
        this.skillsDAO = skillsDAO;
    }

    public static String capitalize(String value) {
        return value == null || value.isBlank()
                ? value
                : value.trim().substring(0, 1).toUpperCase()
                        + value.trim().substring(1).toLowerCase();
    }

    @Override
    public List<Skills> allskills() {
        return skillsDAO.findAll();
    }

    @Override
    public Skills findSkills(Integer id) {
        return skillsDAO.findById(id).get();
    }

    @Override
    public Skills addSkills(Skills skills) {
        skills.setSkill(capitalize(skills.getSkill()));
        return skillsDAO.save(skills);
    }

    @Override
    public void UpdateSkills(Integer id, SkillsAdd skillsAdd) {
        Skills skills = skillsDAO.findById(id).get();
        if (skills == null) {
            throw new RuntimeException("Id not found");
        }
        skills.setSkill(capitalize(skillsAdd.getSkill()));
        skillsDAO.save(skills);
    }

    @Override
    public void DeleteSkills(Integer id) {
        Skills skills = skillsDAO.findById(id).get();
        if (skills == null) {
            throw new RuntimeException("Id not found");
        }
        skillsDAO.delete(skills);
    }

}
