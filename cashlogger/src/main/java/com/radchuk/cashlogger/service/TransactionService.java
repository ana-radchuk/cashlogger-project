package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.TransactionType;
import com.radchuk.cashlogger.domain.request.TransactionRequest;
import com.radchuk.cashlogger.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryService categoryService;

    public Transaction saveTransaction(TransactionRequest transactionRequest, Long categoryId) {
        Transaction transaction = new Transaction();
        transaction.setName(transactionRequest.getName());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setTransactionType(TransactionType.convertToTransactionType(transactionRequest.getType()));
        transaction.setCreatedAt(LocalDateTime.now());

        Category category = categoryService.getCategoryById(categoryId);
        transaction.setCategory(category);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository
                .findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));
    }

    public void deleteTransactionById(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }
}