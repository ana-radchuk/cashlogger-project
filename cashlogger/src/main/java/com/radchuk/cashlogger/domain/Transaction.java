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
    @Getter @Setter
    private Long id;
    private String name;
    private Double amount;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    private Boolean isTagged;
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
