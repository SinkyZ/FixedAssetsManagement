package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, String> {

    void deleteUserById(String id);
    Optional<User> findUserById(String id);
    Optional<User> findUserByEmail(String email);
}
