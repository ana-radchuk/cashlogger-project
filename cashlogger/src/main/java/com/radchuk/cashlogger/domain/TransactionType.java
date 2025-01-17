package com.radchuk.cashlogger.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransactionType {
    INCOME("Income"),
    EXPENSE("Expense");

    private final String displayName;
}
