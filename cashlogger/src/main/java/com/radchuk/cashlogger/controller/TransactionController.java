package com.radchuk.cashlogger.controller;

import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.request.TransactionRequest;
import com.radchuk.cashlogger.domain.response.TransactionResponse;
import com.radchuk.cashlogger.service.TransactionService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = "api/v1/transactions")
@Tag(name = "Transactions", description = "API for managing transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    @Operation(
            summary = "Create transaction",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Transaction created",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = TransactionResponse.class)
                            )
                    )
            }
    )
    public Transaction createTransaction(@RequestBody TransactionRequest transactionRequest) {
        return transactionService.saveTransaction(transactionRequest);
    }

    @GetMapping
    @Operation(summary = "Get all transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get transaction by ID")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete transaction by ID")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransactionById(id);
    }
}