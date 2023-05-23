package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.AssetNotFoundException;
import licenta.adrian.FixedAssetsManagement.exception.CategoryNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Category;
import licenta.adrian.FixedAssetsManagement.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CategoryService {

    private final ICategoryRepository categoryRepository;

    @Autowired
    public CategoryService(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category addCategory(Category category){
        category.setId(UUID.randomUUID().toString());
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    public Category updateCategory(Category category){
        return categoryRepository.save(category);
    }
    public Category getCategoryById(String id){
        return categoryRepository.findCategoryById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category by id" + id + "not found"));
    }
    public void deleteCategory(String id){
        categoryRepository.deleteCategoryById(id);
    }

}
