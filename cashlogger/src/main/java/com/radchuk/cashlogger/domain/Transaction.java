package com.radchuk.cashlogger.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double amount;
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Transaction(String name, Double amount, TransactionType transactionType, LocalDateTime createdAt, Category category) {
        this.name = name;
        this.amount = amount;
        this.transactionType = transactionType;
        this.createdAt = createdAt;
        this.category = category;
    }
}