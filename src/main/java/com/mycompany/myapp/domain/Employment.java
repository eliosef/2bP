package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employment.
 */
@Entity
@Table(name = "employment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employment_employee",
               joinColumns = @JoinColumn(name = "employments_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employees_id", referencedColumnName = "id"))
    private Set<Employee> employees = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employment_manager",
               joinColumns = @JoinColumn(name = "employments_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "managers_id", referencedColumnName = "id"))
    private Set<Employee> managers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public Employment position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Employment employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Employment addEmployee(Employee employee) {
        this.employees.add(employee);
        return this;
    }

    public Employment removeEmployee(Employee employee) {
        this.employees.remove(employee);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Employee> getManagers() {
        return managers;
    }

    public Employment managers(Set<Employee> employees) {
        this.managers = employees;
        return this;
    }

    public Employment addManager(Employee employee) {
        this.managers.add(employee);
        return this;
    }

    public Employment removeManager(Employee employee) {
        this.managers.remove(employee);
        return this;
    }

    public void setManagers(Set<Employee> employees) {
        this.managers = employees;
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
        Employment employment = (Employment) o;
        if (employment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employment{" +
            "id=" + getId() +
            ", position='" + getPosition() + "'" +
            "}";
    }
}
