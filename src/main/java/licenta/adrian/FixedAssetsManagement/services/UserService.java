package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.UserNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class UserService {

    private final IUserRepository userRepository;

    @Autowired
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
    public void deleteUser(String id){
        userRepository.deleteUserById(id);
    }
}
