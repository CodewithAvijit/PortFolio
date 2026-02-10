package com.backend.portfolio.projects.dao;

public class ProjectUpdate {
    private String livelink;
    private String codelink;

    public ProjectUpdate() {
    }

    public String getLivelink() {
        return livelink;
    }

    public void setLivelink(String livelink) {
        this.livelink = livelink;
    }

    public String getCodelink() {
        return codelink;
    }

    public void setCodelink(String codelink) {
        this.codelink = codelink;
    }
}
