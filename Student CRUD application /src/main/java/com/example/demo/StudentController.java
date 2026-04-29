package com.example.demo;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // LIST
    @GetMapping
    public String listStudents(Model model) {
        model.addAttribute("students", service.getAllStudents());
        return "list";
    }

    // OPEN CREATE FORM
    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("student", new Student());
        return "form";
    }

    // CREATE
    @PostMapping
    public String createStudent(@Valid @ModelAttribute("student") Student student,
                                BindingResult result,
                                Model model) {
        if (result.hasErrors()) return "form";

        try {
            service.createStudent(student);
        } catch (RuntimeException ex) {
            model.addAttribute("emailError", ex.getMessage());
            return "form";
        }

        return "redirect:/students";
    }

    // OPEN EDIT FORM
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        model.addAttribute("student", service.getStudentById(id));
        return "form";
    }

    // UPDATE
    @PostMapping("/{id}")
    public String updateStudent(@PathVariable Long id,
                                @Valid @ModelAttribute("student") Student student,
                                BindingResult result,
                                Model model) {
        if (result.hasErrors()) return "form";

        try {
            service.updateStudent(id, student);
        } catch (RuntimeException ex) {
            model.addAttribute("emailError", ex.getMessage());
            return "form";
        }

        return "redirect:/students";
    }

    // DELETE
    @GetMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return "redirect:/students";
    }
}