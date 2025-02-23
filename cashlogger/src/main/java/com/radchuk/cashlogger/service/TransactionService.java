package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.Type;
import com.radchuk.cashlogger.domain.request.TransactionRequest;
import com.radchuk.cashlogger.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
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
        transaction.setTransactionType(Type.convertToType(transactionRequest.getType()));
        transaction.setCreatedAt(OffsetDateTime.parse(transactionRequest.getCreatedAt()));

        Category category = categoryService.getCategoryById(categoryId);
        transaction.setCategory(category);

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Long categoryId, TransactionRequest transactionRequest) {
        Transaction transaction = getTransactionById(id);
        transaction.setName(transactionRequest.getName());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setTransactionType(Type.convertToType(transactionRequest.getType()));
        transaction.setCreatedAt(OffsetDateTime.parse(transactionRequest.getCreatedAt()));

        Category category = categoryService.getCategoryById(categoryId);
        transaction.setCategory(category);

        return transactionRepository.save(transaction);
    }

    public Page<Transaction> getAllTransactions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return transactionRepository.findAll(pageable);
    }

    public List<Transaction> getTransactionsByMonth(int year, int month) {
        return transactionRepository.findByMonthAndYear(year, month);
    }

    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository
                .findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));
    }

    public void deleteTransactionById(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    private List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}