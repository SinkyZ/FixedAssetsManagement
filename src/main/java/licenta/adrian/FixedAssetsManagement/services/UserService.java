package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.UserNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.repository.IUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserService {

    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User addUser(User user){
        user.setId(UUID.randomUUID().toString());
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User updateUser(User user){
        return userRepository.save(user);
    }
    public User getUserById(String id){
        return userRepository.findUserById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id" + id + "not found"));
    }

    public User getUserByEmail(String email){
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User by email" + email + "not found"));
    }

    public Optional<User> checkMail(String email){
        return userRepository.findUserByEmail(email);
    }

    public void deleteUser(String id){
        userRepository.deleteUserById(id);
    }
}
