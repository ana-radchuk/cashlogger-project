package com.radchuk.cashlogger.domain.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "Representation of category response")
public class CategoryResponse {
    @Schema(description = "Unique identifier of category", example = "10")
    private Long id;

    @Schema(description = "Name of category", example = "Groceries")
    private String name;

    @Schema(description = "List of transactions associated with the category")
    private List<TransactionResponse> transactionList;
}
