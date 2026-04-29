/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Employee } from '../types';
import { Component } from '../di';

console.log('EmployeeRepository.ts executing...');

/**
 * EmployeeRepository
 * Stores employee data in memory.
 */
@Component('employeeRepository')
export class EmployeeRepository {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    if (this.getEmployeeById(employee.id)) {
      console.warn(`Employee with ID ${employee.id} already exists. Skipping.`);
      return;
    }
    this.employees.push(employee);
  }

  getAllEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
