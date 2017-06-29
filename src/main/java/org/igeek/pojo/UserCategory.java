package org.igeek.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class UserCategory {
    private Integer id;

    private String title;

    @JsonIgnore
    private Integer status;

    @JsonIgnore
    private Date created;

    @JsonIgnore
    private Date modified;

    public UserCategory(Integer id, String title, Integer status, Date created, Date modified) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.created = created;
        this.modified = modified;
    }

    public UserCategory() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }
}