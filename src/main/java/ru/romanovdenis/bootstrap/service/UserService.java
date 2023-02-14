package ru.romanovdenis.bootstrap.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.romanovdenis.bootstrap.model.User;

import java.util.List;
import java.util.Optional;


public interface UserService extends UserDetailsService {

    List<User> getAllUsers();
    User save(User user);
    void removeUser(Long id);
    Optional<User> findById(Long id);

}
