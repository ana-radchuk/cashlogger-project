package com.radchuk.cashlogger.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Type {
    INCOME("Income"),
    EXPENSE("Expense");

    private final String displayType;

    public static Type convertToType(String displayType) {
        for (Type type : values()) {
            if (type.getDisplayType().equalsIgnoreCase(displayType)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid Type: " + displayType);
    }
}