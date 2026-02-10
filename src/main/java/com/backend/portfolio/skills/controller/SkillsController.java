package com.backend.portfolio.skills.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.portfolio.skills.service.SkillsService;
import com.backend.portfolio.skills.dao.SkillsAdd;
import com.backend.portfolio.skills.entity.Skills;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "*")
public class SkillsController {
    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    @GetMapping
    public List<Skills> getallSkills() {
        return skillsService.allskills();
    }

    @GetMapping("/{id}")
    public Skills getSkills(@PathVariable Integer id) {
        return skillsService.findSkills(id);
    }

    @PostMapping
    public Skills skills(@RequestBody SkillsAdd skillsAdd) {
        Skills skills = new Skills();
        skills.setSkill(skillsAdd.getSkill());
        return skillsService.addSkills(skills);
    }

    @PutMapping("/{id}")
    public Map<String, String> updateskills(@PathVariable Integer id, @RequestBody SkillsAdd skillsAdd) {
        skillsService.UpdateSkills(id, skillsAdd);
        return Map.of("process", "updated");
    }

    @DeleteMapping("/{id}")
    public Map<Integer, String> deleteskills(@PathVariable Integer id) {
        skillsService.DeleteSkills(id);
        return Map.of(id, "deleted");
    }

}
