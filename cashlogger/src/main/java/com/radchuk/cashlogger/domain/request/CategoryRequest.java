package com.radchuk.cashlogger.domain.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CategoryRequest {

    @Schema(description = "Name of category", example = "Groceries", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Emoji of category", example = "🛒")
    private String emoji;
}