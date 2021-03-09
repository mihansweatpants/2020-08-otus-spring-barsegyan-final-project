package ru.otus.spring.barsegyan.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.request.CreateUserDto;
import ru.otus.spring.barsegyan.exception.NotFoundException;
import ru.otus.spring.barsegyan.repository.UserRepository;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class AppUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public AppUser getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User with %s not found", username));
    }

    @Transactional
    public AppUser create(CreateUserDto createUserDto) {
        AppUser appUser = new AppUser()
                .setUsername(createUserDto.getUsername())
                .setEmail(createUserDto.getEmail())
                .setPassword(passwordEncoder.encode(createUserDto.getPassword()));

        return userRepository.save(appUser);
    }

    @Transactional(readOnly = true)
    public Page<AppUser> search(String searchText, Pageable pageable) {
        return userRepository.findAllBySearchText(searchText, pageable);
    }
}
