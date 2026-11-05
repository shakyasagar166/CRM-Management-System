package com.crm.repository;

import com.crm.entity.Task;
import com.crm.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByAssignedToId(Long userId);

    long countByStatus(TaskStatus status);
}
