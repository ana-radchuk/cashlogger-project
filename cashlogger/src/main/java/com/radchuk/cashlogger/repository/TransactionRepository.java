package com.radchuk.cashlogger.repository;

import com.radchuk.cashlogger.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

//    @Query("SELECT t FROM Transaction t WHERE YEAR(t.createdAt) = :year AND MONTH(t.createdAt) = :month")
//    List<Transaction> findByMonthAndYear(@Param("year") int year, @Param("month") int month);

}
