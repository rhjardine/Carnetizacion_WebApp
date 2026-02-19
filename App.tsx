import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UploadPortal } from './components/UploadPortal';
import { IDEditor } from './components/IDEditor';
import { Employee, ViewState, Status } from './types';
import { INITIAL_EMPLOYEES } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(INITIAL_EMPLOYEES[0]);

  const handleUpdateStatus = (id: string, status: Status) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, status } : emp
    ));
  };

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    setCurrentView('editor');
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {currentView === 'dashboard' && (
          <Dashboard 
            employees={employees} 
            onSelectEmployee={handleSelectEmployee}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
        
        {currentView === 'upload' && (
          <UploadPortal />
        )}

        {currentView === 'editor' && (
          <IDEditor employee={selectedEmployee} />
        )}
      </main>
    </div>
  );
}