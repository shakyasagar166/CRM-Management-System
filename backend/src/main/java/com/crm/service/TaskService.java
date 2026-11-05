package com.crm.service;

import com.crm.entity.Task;
import com.crm.enums.TaskStatus;
import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
    List<Task> getTasksByStatus(TaskStatus status);
    List<Task> getTasksByAssignedUserId(Long userId);
}
