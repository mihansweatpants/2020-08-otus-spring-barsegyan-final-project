package ru.otus.spring.barsegyan.service.security.oauth;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.domain.AuthProvider;
import ru.otus.spring.barsegyan.exception.OAuth2AuthenticationProcessingException;
import ru.otus.spring.barsegyan.repository.UserRepository;
import ru.otus.spring.barsegyan.service.security.oauth.user.OAuth2UserInfo;
import ru.otus.spring.barsegyan.type.UserPrincipal;

import java.util.Locale;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception e) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User loadedOAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.create(
                oAuth2UserRequest.getClientRegistration().getClientName(),
                loadedOAuth2User.getAttributes()
        );

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Received empty email from OAuth2 provider");
        }

        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getClientName().toUpperCase(Locale.ROOT));
        Optional<AppUser> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

        if (userOptional.isPresent()) {
            AppUser appUser = userOptional.get();
            if (!appUser.getAuthProvider().equals(authProvider)) {
                throw new OAuth2AuthenticationProcessingException("Already signed up with another provider: " + appUser.getAuthProvider());
            }

            appUser = updateExistingUser(appUser, oAuth2UserInfo);
            return UserPrincipal.of(appUser, loadedOAuth2User.getAttributes());
        } else {
            AppUser newUser = createNewUser(authProvider, oAuth2UserInfo);
            return UserPrincipal.of(newUser, loadedOAuth2User.getAttributes());
        }
    }

    private AppUser updateExistingUser(AppUser user, OAuth2UserInfo oAuth2UserInfo) {
        return userRepository.save(
                user
                        .setUsername(oAuth2UserInfo.getName())
                        .setAvatarUrl(oAuth2UserInfo.getAvatarUrl())
        );
    }

    private AppUser createNewUser(AuthProvider provider, OAuth2UserInfo oAuth2UserInfo) {
        return userRepository.save(
                new AppUser()
                        .setUsername(oAuth2UserInfo.getName())
                        .setEmail(oAuth2UserInfo.getEmail())
                        .setAvatarUrl(oAuth2UserInfo.getAvatarUrl())
                        .setAuthProvider(provider)
        );
    }
}
