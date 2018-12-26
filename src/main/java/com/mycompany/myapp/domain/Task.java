package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * Task entity.
 * @author Eliosef.
 */
@ApiModel(description = "Task entity. @author Eliosef.")
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "assigned_date", nullable = false)
    private Instant assignedDate;

    @NotNull
    @Column(name = "due_date", nullable = false)
    private Instant dueDate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Employment employment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Task title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getAssignedDate() {
        return assignedDate;
    }

    public Task assignedDate(Instant assignedDate) {
        this.assignedDate = assignedDate;
        return this;
    }

    public void setAssignedDate(Instant assignedDate) {
        this.assignedDate = assignedDate;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public Task dueDate(Instant dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Employment getEmployment() {
        return employment;
    }

    public Task employment(Employment employment) {
        this.employment = employment;
        return this;
    }

    public void setEmployment(Employment employment) {
        this.employment = employment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", assignedDate='" + getAssignedDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            "}";
    }
}
