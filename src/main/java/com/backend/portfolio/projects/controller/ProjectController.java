package com.backend.portfolio.projects.controller;



import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.portfolio.projects.dao.ProjectAdd;
import com.backend.portfolio.projects.dao.ProjectUpdate;
import com.backend.portfolio.projects.entity.Projects;
import com.backend.portfolio.projects.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;






@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectService projectService;
    public  ProjectController(ProjectService projectService){
        this.projectService=projectService;
    }
    @GetMapping
    public List<Projects> getallProjects() {
        return projectService.allProjects();
    }
    @GetMapping("/count")
    public Map<String,Integer> getprojectscount() {
        int value=projectService.countProjects();
        return Map.of("projects",value);
    }
    
    @PostMapping
    public Projects addProjects(@RequestBody ProjectAdd projectAdd) {
        return projectService.addProjects(projectAdd);
    }

    @DeleteMapping("/{id}")
    public Map<String,Integer> deleteproject(@PathVariable int id){
        projectService.deleteProject(id);
        return Map.of("delete_project",id);
    }
    @PutMapping("/{id}")
    public Map<String,Integer> updateprojectlink(@PathVariable int id, @RequestBody ProjectUpdate projectUpdate) {
        projectService.updateProject(id, projectUpdate);
        return Map.of("update_project",id);
    }
    


}
