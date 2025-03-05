import { Employee } from '../types';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export const exportToExcel = (data: Employee[]) => {
  const formattedData = data.map(record => ({
    'Nombre Empleado': record.fullName,
    'Fecha': format(new Date(record.date), 'dd/MM/yyyy'),
    'Hora Entrada': record.checkIn,
    'Hora Salida': record.checkOut,
    'Estado': record.status.charAt(0).toUpperCase() + record.status.slice(1)
  }));

  const ws = utils.json_to_sheet(formattedData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Asistencia');
  writeFile(wb, 'registro_asistencia.xlsx');
};

export const exportToPDF = (data: Employee[]) => {
  const doc = new jsPDF();
  
  autoTable(doc, {
    head: [['Nombre Empleado', 'Fecha', 'Hora Entrada', 'Hora Salida', 'Estado']],
    body: data.map(row => [
      row.fullName,
      format(new Date(row.date), 'dd/MM/yyyy'),
      row.checkIn,
      row.checkOut,
      row.status.charAt(0).toUpperCase() + row.status.slice(1)
    ]),
  });

  doc.save('registro_asistencia.pdf');
};