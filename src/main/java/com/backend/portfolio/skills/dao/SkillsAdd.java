package com.backend.portfolio.skills.dao;

public class SkillsAdd {
    private String skill;

    public SkillsAdd() {
    }

    public SkillsAdd(String skill) {
        this.skill = skill;
    }

  public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }
    @Override
    public String toString() {
        return "SkillsAdd{" +
                "skills='" + skill + '\'' +
                '}';
    }
    
}
