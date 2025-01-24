package com.radchuk.cashlogger.domain.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TransactionRequest {

    @Schema(description = "Name of transaction", example = "Weekly meal prep")
    private String name;

    @Schema(description = "Amount of transaction", example = "125.50")
    private double amount;

    @Schema(description = "Type of transaction: Income or Expense", example = "Expense")
    private String type;
}