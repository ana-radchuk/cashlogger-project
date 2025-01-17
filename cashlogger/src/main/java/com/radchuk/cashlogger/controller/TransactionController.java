package com.radchuk.cashlogger.controller;

import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = "api/v1")
@Tag(name = "Transactions", description = "API for managing transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping(path = "/hello")
    public String hello() {
        return "Hello there!";
    }

    // Create or Update a Transaction
    @PostMapping
    @Operation(summary = "Create a new transaction", description = "Creates a new transaction")
    public Transaction createOrUpdateTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    // Get All Transactions
    @GetMapping
    @Operation(summary = "Get all transactions", description = "Fetches a list of all transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Get a Transaction by ID
    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    // Delete a Transaction by ID
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}
