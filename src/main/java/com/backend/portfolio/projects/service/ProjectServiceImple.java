package com.backend.portfolio.projects.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.portfolio.projects.dao.ProjectAdd;
import com.backend.portfolio.projects.dao.ProjectDao;
import com.backend.portfolio.projects.dao.ProjectUpdate;
import com.backend.portfolio.projects.entity.Projects;
import com.backend.portfolio.skills.dao.SkillsAdd;
import com.backend.portfolio.skills.dao.SkillsDAO;
import com.backend.portfolio.skills.entity.Skills;

import jakarta.persistence.EntityManager;

@Service
public class ProjectServiceImple implements ProjectService {
    private final ProjectDao projectDao;
    private final SkillsDAO skillsDAO;
    private final EntityManager entityManager;

    public ProjectServiceImple(ProjectDao projectDao, SkillsDAO skillsDAO, EntityManager entityManager) {
        this.projectDao = projectDao;
        this.skillsDAO = skillsDAO;
        this.entityManager = entityManager;
    }

    public static String capitalize(String value) {
        return value == null || value.isBlank()
                ? value
                : value.trim().substring(0, 1).toUpperCase()
                        + value.trim().substring(1).toLowerCase();
    }

    @Override
    public List<Projects> allProjects() {
        return projectDao.findAll();
    }

    @Override
    public Projects addProjects(ProjectAdd projectAdd) {
        Projects newProjects = new Projects();

        newProjects.setTitle(projectAdd.getTitle());
        newProjects.setDescripion(projectAdd.getDescription());
        newProjects.setCodelink(projectAdd.getCodelink());
        newProjects.setLivelink(projectAdd.getLivelink());

        if (projectAdd.getSkillNames() != null) {
            for (String skillName : projectAdd.getSkillNames()) {
                String trimmedName = skillName.trim();
                Skills existingSkill = skillsDAO.findBySkill(capitalize(trimmedName));

                if (existingSkill != null) {
                    newProjects.getSkills().add(existingSkill);
                } else {
                    Skills newSkill = new Skills();
                    newSkill.setSkill(capitalize(trimmedName));
                    newProjects.getSkills().add(newSkill);
                }
            }
        }
        return projectDao.save(newProjects);
    }

    @Override
    public int countProjects() {
        Long nofprojects = entityManager.createQuery("SELECT COUNT(p.id) FROM Projects p", Long.class)
                .getSingleResult();
        return nofprojects.intValue();
    }

    @Override
    public void deleteProject(int id) {
        Projects project = projectDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        projectDao.delete(project);

    }

    @Override
    public void updateProject(int id, ProjectUpdate projectUpdate) {
        Projects existProjects = projectDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        if (projectUpdate.getCodelink() != null) {
            existProjects.setCodelink(projectUpdate.getCodelink());
        }

        if (projectUpdate.getLivelink() != null) {
            existProjects.setLivelink(projectUpdate.getLivelink());
        }
        existProjects.setCodelink(projectUpdate.getCodelink());
        existProjects.setLivelink(projectUpdate.getLivelink());
        projectDao.save(existProjects);
    }
}
