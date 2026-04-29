/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Employee } from '../types';
import { Component, Autowired } from '../di';
import { EmployeeRepository } from '../repository/EmployeeRepository';

console.log('EmployeeService.ts executing...');

/**
 * EmployeeService
 * Handles business logic for employee management.
 */
@Component('employeeService')
export class EmployeeService {
  @Autowired('employeeRepository')
  private repository!: EmployeeRepository;

  addEmployee(employee: Employee): void {
    if (!employee.id || !employee.name || !employee.department) {
      throw new Error('Employee details are incomplete.');
    }
    this.repository.addEmployee(employee);
  }

  getAllEmployees(): Employee[] {
    return this.repository.getAllEmployees();
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.repository.getEmployeeById(id);
  }

  deleteEmployee(id: string): void {
    this.repository.deleteEmployee(id);
  }
}
