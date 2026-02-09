package com.backend.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.portfolio.dao.SkillsAdd;
import com.backend.portfolio.dao.SkillsDAO;
import com.backend.portfolio.entity.Skills;

@Service
public class SkillsServiceImpl implements SkillsService {
    private final SkillsDAO skillsDAO;

    public SkillsServiceImpl(SkillsDAO skillsDAO) {
        this.skillsDAO = skillsDAO;
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
        return skillsDAO.save(skills);
    }

    @Override
    public void UpdateSkills(Integer id, SkillsAdd skillsAdd) {
        Skills skills = skillsDAO.findById(id).get();
        if (skills == null) {
            throw new RuntimeException("Id not found");
        }
        skills.setSkill(skillsAdd.getSkill());
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
