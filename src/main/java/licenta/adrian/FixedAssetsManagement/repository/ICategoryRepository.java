package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICategoryRepository extends JpaRepository<Category, String> {

    void deleteCategoryById(String id);
    Optional<Category> findCategoryById(String id);
}
