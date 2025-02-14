package com.radchuk.cashlogger.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of transaction", example = "1")
    private Long id;

    @Schema(description = "Name of the transaction", example = "Weekly meal prep")
    private String name;

    @Schema(description = "Amount of transaction", example = "125.50")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Type of transaction", example = "EXPENSE")
    private Type transactionType;

    @Schema(description = "Timestamp when transaction was created", example = "2025-01-16T20:30:00")
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @Schema(description = "Associated category of transaction")
    private Category category;
}