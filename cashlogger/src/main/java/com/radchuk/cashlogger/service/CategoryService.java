package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.Type;
import com.radchuk.cashlogger.domain.request.CategoryRequest;
import com.radchuk.cashlogger.exception.ItemAlreadyExistsException;
import com.radchuk.cashlogger.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category saveCategory(CategoryRequest categoryRequest) {
        Optional<Category> existingCategory =
                categoryRepository.findByName(categoryRequest.getName());
        if (existingCategory.isPresent()) {
            throw new ItemAlreadyExistsException("Category with this name already exists.");
        }

        Category category = new Category();
        category.setName(categoryRequest.getName());
        category.setCategoryType(Type.convertToType(categoryRequest.getType()));
        if (categoryRequest.getEmoji() != null) {
            category.setEmoji(categoryRequest.getEmoji());
        }

        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryRequest categoryRequest) {
        Optional<Category> existingCategory =
                categoryRepository.findByName(categoryRequest.getName());
        if (existingCategory.isPresent()) {
            throw new ItemAlreadyExistsException("Category with this name already exists.");
        }

        Category category = getCategoryById(id);
        category.setName(categoryRequest.getName());
        category.setCategoryType(Type.convertToType(categoryRequest.getType()));
        category.setEmoji(categoryRequest.getEmoji());

        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
    }

    public void deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}