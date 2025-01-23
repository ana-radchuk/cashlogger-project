package com.radchuk.cashlogger.domain.response;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.TransactionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Representation of transaction response")
public class TransactionResponse {
    @Schema(description = "Unique identifier of transaction", example = "1")
    private Long id;

    @Schema(description = "Name of the transaction", example = "Weekly meal prep")
    private String name;

    @Schema(description = "Amount of transaction", example = "100.50")
    private double amount;

    @Schema(description = "Type of transaction", example = "EXPENSE")
    private TransactionType type;

    @Schema(description = "Timestamp when transaction was created", example = "2025-01-16T20:30:00")
    private LocalDateTime createdAt;

    @Schema(description = "Associated category of transaction", example = "Groceries")
    private Category category;
}
