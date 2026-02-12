package com.backend.portfolio.projects.dao;

import java.util.List;

public class ProjectAdd {
    private String title;
    private String description;
    private String codelink; 
    private String livelink;
    private List<String> skillNames; 

    public ProjectAdd() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCodelink() { return codelink; }
    public void setCodelink(String codelink) { this.codelink = codelink; }

    public String getLivelink() { return livelink; }
    public void setLivelink(String livelink) { this.livelink = livelink; }

    public List<String> getSkillNames() { return skillNames; }
    public void setSkillNames(List<String> skillNames) { this.skillNames = skillNames; }
}