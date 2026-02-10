package com.backend.portfolio.projects.service;

import java.util.List;

import com.backend.portfolio.projects.dao.ProjectAdd;
import com.backend.portfolio.projects.dao.ProjectUpdate;
import com.backend.portfolio.projects.entity.Projects;

public interface ProjectService {
    List<Projects> allProjects();
    Projects addProjects(ProjectAdd projectAdd);
    int countProjects();
    void deleteProject(int id);
    void updateProject(int id,ProjectUpdate projectUpdate);
    // void UpdateSkills(Integer id,SkillsAdd skillsAdd);
    // void DeleteSkills(Integer id);
}
