package com.radchuk.cashlogger.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransactionType {
    INCOME("Income"),
    EXPENSE("Expense");

    private final String displayType;

    public static TransactionType convertToTransactionType(String displayType) {
        for (TransactionType type : values()) {
            if (type.getDisplayType().equalsIgnoreCase(displayType)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid TransactionType: " + displayType);
    }
}