package com.radchuk.cashlogger.domain.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class CategoryRequest {

    @Schema(description = "Name of category", example = "Groceries", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Transaction IDs", example = "[1]", nullable = true)
    private List<Long> transactionIDs;
}