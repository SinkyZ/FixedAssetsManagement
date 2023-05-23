package licenta.adrian.FixedAssetsManagement.controllers;

import licenta.adrian.FixedAssetsManagement.dto.CategoryDTO;
import licenta.adrian.FixedAssetsManagement.model.Category;
import licenta.adrian.FixedAssetsManagement.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> allCategories = categoryService.getAllCategories();
        return new ResponseEntity<>(allCategories, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") String id){
        Category category = categoryService.getCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK );
    }
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody CategoryDTO categoryDTO){
        Category newCategory = new Category();
        newCategory.setName(categoryDTO.getName());
        categoryService.addCategory(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") String id, @RequestBody Category category){
        Category categoryToEdit = categoryService.getCategoryById(id);
        categoryToEdit.setName(category.getName());
        categoryService.updateCategory(categoryToEdit);
        return new ResponseEntity<>(categoryToEdit, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") String id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
