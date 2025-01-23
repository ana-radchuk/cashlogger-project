package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.request.CategoryRequest;
import com.radchuk.cashlogger.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    private TransactionService transactionService;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());

        if (categoryRequest.getTransactionIDs() != null) {
            List<Transaction> transactionList = new ArrayList<>();
            for (Long transactionId : categoryRequest.getTransactionIDs()) {
                Transaction transaction = transactionService
                        .getTransactionById(transactionId)
                        .orElseThrow(() -> new RuntimeException("Transaction not found with ID: " + transactionId));
                transaction.setCategory(category);
                transactionList.add(transaction);
            }
            category.setTransactionList(transactionList);
        }
        Category savedCategory = categoryRepository.save(category);

        for (Transaction transaction : category.getTransactionList()) {
            transactionService.saveTransaction(transaction);
        }

        return savedCategory;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category findCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Category not found with name: " + name));
    }
}