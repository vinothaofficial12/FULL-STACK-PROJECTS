package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class employeeContoller {
@Autowired
private employeeRepository repo;
@GetMapping("/")
public String home() {
	return "home";
}
@GetMapping("/employee")
public String getemployee(@RequestParam("id")int id,Model model) {
	employee emp = repo.findById(id);
	if (emp == null) {
		model.addAttribute("error","Employee not found for Id:"+ id);
		return "employee";
	}
	model.addAttribute("emp",emp);
	return "employee";
}
}
