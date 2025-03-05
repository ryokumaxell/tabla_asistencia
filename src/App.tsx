import React from 'react';
import { FileSpreadsheet, File as FilePdf, Plus, Search, Upload } from 'lucide-react';
import { WeeklyAttendanceTable } from './components/WeeklyAttendanceTable';
import { Modal } from './components/Modal';
import { ImportModal } from './components/ImportModal';
import { EmployeeForm } from './components/EmployeeForm';
import { Employee, FilterState, AttendanceStatus } from './types';
import { mockData, departments } from './data';
import { exportToExcel, exportToPDF } from './utils/export';
import { importFromFile } from './utils/import';

function App() {
  const [employees, setEmployees] = React.useState<Employee[]>(mockData);
  const [filters, setFilters] = React.useState<FilterState>({
    date: '',
    department: '',
    status: '',
    search: '',
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(
    null
  );

  const filteredEmployees = React.useMemo(() => {
    return employees.filter((employee) => {
      const matchesDate = !filters.date || employee.date === filters.date;
      const matchesDepartment =
        !filters.department || employee.department === filters.department;
      const matchesStatus =
        !filters.status || employee.status === filters.status;
      const matchesSearch =
        !filters.search ||
        employee.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.id.toLowerCase().includes(filters.search.toLowerCase());

      return matchesDate && matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [employees, filters]);

  const handleSubmit = (employee: Employee) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
      setEmployees((prev) => [...prev, employee]);
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    if (
      window.confirm(
        `¿Está seguro que desea eliminar el registro de ${employee.fullName}?`
      )
    ) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id));
    }
  };

  const handleFileImport = async (file: File) => {
    try {
      const importedEmployees = await importFromFile(file);
      if (
        window.confirm(
          `Se encontraron ${importedEmployees.length} registros. ¿Desea importarlos?`
        )
      ) {
        setEmployees((prev) => [...prev, ...importedEmployees]);
        setIsImportModalOpen(false);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al importar el archivo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[95%] mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Asistencia de Empleados
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </button>
                  <button
                    onClick={() => exportToExcel(filteredEmployees)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Exportar Excel
                  </button>
                  <button
                    onClick={() => exportToPDF(filteredEmployees)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FilePdf className="h-4 w-4 mr-2" />
                    Exportar PDF
                  </button>
                  <button
                    onClick={() => {
                      setEditingEmployee(null);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Registro
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por nombre o ID..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <select
                    value={filters.department}
                    onChange={(e) =>
                      setFilters({ ...filters, department: e.target.value })
                    }
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Todos los Departamentos</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        status: e.target.value as AttendanceStatus,
                      })
                    }
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Todos los Estados</option>
                    <option value="present">Presente</option>
                    <option value="absent">Ausente</option>
                    <option value="late">Tardanza</option>
                    <option value="permission">Permiso</option>
                  </select>
                </div>

                <div>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters({ ...filters, date: e.target.value })
                    }
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <WeeklyAttendanceTable data={filteredEmployees} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        title={editingEmployee ? 'Editar Registro' : 'Agregar Nuevo Registro'}
      >
        <EmployeeForm
          employee={editingEmployee || {}}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
        />
      </Modal>

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleFileImport}
      />
    </div>
  );
}

export default App;