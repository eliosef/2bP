package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Employment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Employment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {

    @Query(value = "select distinct employment from Employment employment left join fetch employment.employees left join fetch employment.managers",
        countQuery = "select count(distinct employment) from Employment employment")
    Page<Employment> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct employment from Employment employment left join fetch employment.employees left join fetch employment.managers")
    List<Employment> findAllWithEagerRelationships();

    @Query("select employment from Employment employment left join fetch employment.employees left join fetch employment.managers where employment.id =:id")
    Optional<Employment> findOneWithEagerRelationships(@Param("id") Long id);

}
