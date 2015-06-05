package com.bp3.seed.model;

import java.util.Date;

/**
 * @author dparish
 */
public class Document {
    private Long id;
    private String name;
    private String description;
    private Date createDate;

    public Long getId() {
        return id;
    }

    public Document setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Document setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Document setDescription(String description) {
        this.description = description;
        return this;
    }

    public Date getCreateDate() {
        return createDate == null ? null : new Date(createDate.getTime());
    }

    public Document setCreateDate(Date createDate) {
        this.createDate = createDate == null ? null : new Date(createDate.getTime());
        return this;
    }
}
