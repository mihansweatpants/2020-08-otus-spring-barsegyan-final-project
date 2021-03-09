package ru.otus.spring.barsegyan.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.otus.spring.barsegyan.domain.AppUser;

import javax.persistence.criteria.Predicate;
import java.util.*;

public interface UserRepository extends JpaSpecificationExecutor<AppUser>, JpaRepository<AppUser, UUID> {
    Optional<AppUser> findByUsername(String username);

    Set<AppUser> findAllByIdIn(List<UUID> userIds);

    default Page<AppUser> findAllBySearchText(String searchText, Pageable pageable) {
        return findAll((Specification<AppUser>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Optional.ofNullable(searchText).ifPresent(text -> {
                String allMatchSearchText = "%" + text.toLowerCase(Locale.ROOT) + "%";

                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(criteriaBuilder.function("TEXT", String.class, root.get("id")), allMatchSearchText),
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), allMatchSearchText),
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), allMatchSearchText)
                        )
                );
            });

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}
