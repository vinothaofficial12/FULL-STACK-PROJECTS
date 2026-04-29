/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Users, Search, Trash2, Building2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpringApplicationContext } from './SpringApplicationContext';
import { EmployeeService } from './service/EmployeeService';
import { Employee } from './types';

// Initialize the Spring Application Context
const context = new SpringApplicationContext('/src/spring-config.xml');

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', id: '', department: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Get the EmployeeService bean from the Spring context
  const employeeService = useMemo(() => context.getBean<EmployeeService>('employeeService'), []);

  // Initial load and adding at least two employees as requested
  useEffect(() => {
    try {
      // Add initial employees only if they don't already exist
      if (!employeeService.getEmployeeById('E001')) {
        employeeService.addEmployee({ id: 'E001', name: 'John Doe', department: 'Engineering' });
      }
      if (!employeeService.getEmployeeById('E002')) {
        employeeService.addEmployee({ id: 'E002', name: 'Jane Smith', department: 'Product' });
      }
      
      // Refresh the list
      setEmployees(employeeService.getAllEmployees());
    } catch (err) {
      console.error('Error adding initial employees:', err);
    }
  }, [employeeService]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!newEmployee.id || !newEmployee.name || !newEmployee.department) {
        throw new Error('All fields are required.');
      }
      
      // Use the service to add the employee
      employeeService.addEmployee({ ...newEmployee });
      
      // Refresh the list
      setEmployees(employeeService.getAllEmployees());
      
      // Reset the form
      setNewEmployee({ name: '', id: '', department: '' });
    } catch (err: any) {
      setError(err.message || 'An error occurred while adding the employee.');
    }
  };

  const handleDeleteEmployee = (id: string) => {
    try {
      employeeService.deleteEmployee(id);
      setEmployees(employeeService.getAllEmployees());
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Users size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Employee Manager <span className="text-indigo-600 text-sm font-medium ml-2 px-2 py-0.5 bg-indigo-50 rounded-full border border-indigo-100">Spring Core (TS)</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg text-sm transition-all w-64 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Employee Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="text-indigo-600" size={20} />
                <h2 className="text-lg font-semibold">Add New Employee</h2>
              </div>

              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Employee ID</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. E101"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={newEmployee.id}
                      onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Alice Johnson"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Engineering"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    />
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Register Employee
                </button>
              </form>
            </div>
          </div>

          {/* Employee List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">Employee Records</h2>
                <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                  {filteredEmployees.length} Total
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Employee</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode="popLayout">
                      {filteredEmployees.map((emp) => (
                        <motion.tr
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={emp.id}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                              {emp.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                {emp.name.charAt(0)}
                              </div>
                              <span className="font-medium text-slate-700">{emp.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                              <Building2 size={14} />
                              {emp.department}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleDeleteEmployee(emp.id)}
                              className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Delete Employee"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Users size={48} strokeWidth={1} />
                            <p className="text-sm">No employees found matching your search.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architectural Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">IoC Container</h3>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  The <code className="bg-indigo-100 px-1 rounded">SpringApplicationContext</code> loads the XML configuration and manages bean lifecycles. Components are registered via the <code className="bg-indigo-100 px-1 rounded">@Component</code> decorator.
                </p>
              </div>
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Dependency Injection</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  The <code className="bg-emerald-100 px-1 rounded">EmployeeService</code> receives its <code className="bg-emerald-100 px-1 rounded">EmployeeRepository</code> dependency automatically via the <code className="bg-emerald-100 px-1 rounded">@Autowired</code> decorator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
