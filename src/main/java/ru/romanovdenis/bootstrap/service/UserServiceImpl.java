package ru.romanovdenis.bootstrap.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.romanovdenis.bootstrap.model.User;
import ru.romanovdenis.bootstrap.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @Override
    public void removeUser(Long id){
        userRepository.deleteById(id);
    }
    @Override
    public User save (User user){
        userRepository.save(user);
        return user;
    }
    @Override
    public Optional<User> findById(Long id){
       return userRepository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUserName(username);
        if(user == null)
            throw new UsernameNotFoundException("User not found");
        return user;
    }
}
