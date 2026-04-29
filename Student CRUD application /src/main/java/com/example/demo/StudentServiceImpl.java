
package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repo;

    public StudentServiceImpl(StudentRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    @Override
    public Student createStudent(Student student) {
        if (repo.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists: " + student.getEmail());
        }
        return repo.save(student);
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Student existing = getStudentById(id);

        // if email changed, check uniqueness
        String newEmail = student.getEmail();
        if (!existing.getEmail().equalsIgnoreCase(newEmail) && repo.existsByEmail(newEmail)) {
            throw new RuntimeException("Email already exists: " + newEmail);
        }

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setDepartment(student.getDepartment());

        return repo.save(existing);
    }

    @Override
    public void deleteStudent(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        repo.deleteById(id);
    }
}