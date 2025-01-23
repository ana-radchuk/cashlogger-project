package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.TransactionType;
import com.radchuk.cashlogger.domain.request.TransactionRequest;
import com.radchuk.cashlogger.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    private CategoryService categoryService;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction saveTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        transaction.setName(transactionRequest.getName());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setTransactionType(TransactionType.convertToTransactionType(transactionRequest.getType()));
        transaction.setCreatedAt(LocalDateTime.now());

        if (!transactionRequest.getCategory().isEmpty()) {
            Category category = categoryService.findCategoryByName(transactionRequest.getCategory());
            transaction.setCategory(category);
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public void deleteTransactionById(Long id) {
        transactionRepository.deleteById(id);
    }
}