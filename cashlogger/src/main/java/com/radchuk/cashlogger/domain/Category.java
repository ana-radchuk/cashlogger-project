package com.radchuk.cashlogger.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of category", example = "1")
    private Long id;

    @Schema(description = "Name of category", example = "Groceries")
    private String name;

    @Schema(description = "Emoji of category", example = "🛒")
    private String emoji;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Type of category", example = "EXPENSE")
    private Type categoryType;

    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnore
    private List<Transaction> transactionList = new ArrayList<>();
}