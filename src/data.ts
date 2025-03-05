import { Employee } from './types';

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
];

// Helper function to generate random time between 7:45 and 8:45
function generateRandomTime(): string {
  const start = 7 * 60 + 45; // 7:45 in minutes
  const end = 8 * 60 + 45;   // 8:45 in minutes
  const randomMinutes = Math.floor(Math.random() * (end - start + 1)) + start;
  const hours = Math.floor(randomMinutes / 60);
  const minutes = randomMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const mockData: Employee[] = [
  // Empleado 1: María González
  {
    id: 'EMP001',
    fullName: 'María González',
    department: 'General',
    date: '2025-02-01',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP001',
    fullName: 'María González',
    department: 'General',
    date: '2025-02-04',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP001',
    fullName: 'María González',
    department: 'General',
    date: '2025-02-07',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 2: Carlos Rodríguez
  {
    id: 'EMP002',
    fullName: 'Carlos Rodríguez',
    department: 'General',
    date: '2025-02-01',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP002',
    fullName: 'Carlos Rodríguez',
    department: 'General',
    date: '2025-02-05',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP002',
    fullName: 'Carlos Rodríguez',
    department: 'General',
    date: '2025-02-08',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 3: Ana Martínez
  {
    id: 'EMP003',
    fullName: 'Ana Martínez',
    department: 'General',
    date: '2025-02-02',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP003',
    fullName: 'Ana Martínez',
    department: 'General',
    date: '2025-02-06',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP003',
    fullName: 'Ana Martínez',
    department: 'General',
    date: '2025-02-09',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 4: Luis Sánchez
  {
    id: 'EMP004',
    fullName: 'Luis Sánchez',
    department: 'General',
    date: '2025-02-03',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP004',
    fullName: 'Luis Sánchez',
    department: 'General',
    date: '2025-02-07',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP004',
    fullName: 'Luis Sánchez',
    department: 'General',
    date: '2025-02-10',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 5: Patricia López
  {
    id: 'EMP005',
    fullName: 'Patricia López',
    department: 'General',
    date: '2025-02-04',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP005',
    fullName: 'Patricia López',
    department: 'General',
    date: '2025-02-08',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP005',
    fullName: 'Patricia López',
    department: 'General',
    date: '2025-02-11',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 6: Roberto Torres
  {
    id: 'EMP006',
    fullName: 'Roberto Torres',
    department: 'General',
    date: '2025-02-05',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP006',
    fullName: 'Roberto Torres',
    department: 'General',
    date: '2025-02-09',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP006',
    fullName: 'Roberto Torres',
    department: 'General',
    date: '2025-02-12',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },

  // Empleado 7: Carmen Díaz
  {
    id: 'EMP007',
    fullName: 'Carmen Díaz',
    department: 'General',
    date: '2025-02-06',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP007',
    fullName: 'Carmen Díaz',
    department: 'General',
    date: '2025-02-10',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
  {
    id: 'EMP007',
    fullName: 'Carmen Díaz',
    department: 'General',
    date: '2025-02-13',
    checkIn: generateRandomTime(),
    checkOut: '17:00',
    status: 'present',
  },
];