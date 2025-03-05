import { read, utils } from 'xlsx';
import { Employee, AttendanceStatus } from '../types';

export const importFromFile = (file: File): Promise<Employee[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        const employees: Employee[] = jsonData.map((row: any) => {
          // Convert the date from DD/MM/YYYY to YYYY-MM-DD
          const dateParts = row.Fecha?.split('/');
          const formattedDate = dateParts ? 
            `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}` : 
            new Date().toISOString().split('T')[0];

          return {
            id: row.ID?.toString() || '',
            fullName: `${row.Nombre || ''} ${row.Apellido || ''}`.trim(),
            department: 'General', // Default department since it's not in the template
            date: formattedDate,
            checkIn: row['Hora de registro'] || '--:--',
            checkOut: '--:--', // Default value since it's not in the template
            status: 'present' as AttendanceStatus, // Default status
          };
        });

        resolve(employees);
      } catch (error) {
        reject(new Error('Error al procesar el archivo. Por favor, verifica el formato.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsBinaryString(file);
  });
};