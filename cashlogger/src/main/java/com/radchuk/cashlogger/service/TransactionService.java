package com.radchuk.cashlogger.service;

import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Create or Update a Transaction
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Retrieve All Transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Retrieve a Transaction by ID
    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    // Delete a Transaction by ID
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}