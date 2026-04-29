package com.example.demo;

import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class employeeRepository {

    private final Map<Integer, employee> store = Map.of(
        101, new employee(101, "Anand", "CSE"),
        102, new employee(102, "Divya", "ECE"),
        103, new employee(103, "Ravi", "IT")
    );

    public employee findById(int id) {
        return store.get(id);
    }
}