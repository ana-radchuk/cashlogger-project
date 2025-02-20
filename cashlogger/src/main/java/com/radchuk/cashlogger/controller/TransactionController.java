package com.radchuk.cashlogger.controller;

import com.radchuk.cashlogger.domain.Transaction;
import com.radchuk.cashlogger.domain.request.TransactionRequest;
import com.radchuk.cashlogger.service.TransactionService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

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
                                    schema = @Schema(implementation = Transaction.class)
                            )
                    )
            }
    )
    public Transaction createTransaction(
            @RequestParam(required = true) Long categoryId,
            @RequestBody TransactionRequest transactionRequest) {
        return transactionService.saveTransaction(transactionRequest, categoryId);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Update transaction",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Transaction updated",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Transaction.class)
                            )
                    )
            }
    )
    public Transaction updateTransaction(
            @PathVariable("id") Long id,
            @RequestParam(required = true) Long categoryId,
            @RequestBody TransactionRequest transactionRequest) {
        return transactionService.updateTransaction(id, categoryId, transactionRequest);
    }

    @GetMapping
    @Operation(
            summary = "Get all transactions",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Transactions retrieved",
                            content = @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = Transaction.class))
                            )
                    )
            }
    )
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get transaction by id",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Transaction retrieved",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Transaction.class)
                            )
                    )
            }
    )
    public Transaction getTransactionById(
            @PathVariable("id") Long transactionId) {
        return transactionService.getTransactionById(transactionId);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete transaction by id",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Transaction deleted"
                    )
            }
    )
    public void deleteTransactionById(
            @PathVariable("id") Long transactionId) {
        transactionService.deleteTransactionById(transactionId);
    }
}