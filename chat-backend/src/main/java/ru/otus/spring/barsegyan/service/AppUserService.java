package ru.otus.spring.barsegyan.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.domain.AuthProvider;
import ru.otus.spring.barsegyan.dto.rest.request.CreateUserDto;
import ru.otus.spring.barsegyan.exception.NotFoundException;
import ru.otus.spring.barsegyan.repository.UserRepository;

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
    public AppUser getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with email %s not found", email));
    }

    @Transactional
    public AppUser create(CreateUserDto createUserDto) {
        AppUser appUser = new AppUser()
                .setUsername(createUserDto.getUsername())
                .setEmail(createUserDto.getEmail())
                .setPassword(passwordEncoder.encode(createUserDto.getPassword()))
                .setAuthProvider(AuthProvider.LOCAL);

        return userRepository.save(appUser);
    }

    @Transactional(readOnly = true)
    public Page<AppUser> search(String searchText, Pageable pageable) {
        return userRepository.findAllBySearchText(searchText, pageable);
    }
}
