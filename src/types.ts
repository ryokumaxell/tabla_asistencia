export type AttendanceStatus = 'present' | 'absent' | 'late' | 'permission';

export interface Employee {
  id: string;
  fullName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

export interface FilterState {
  date: string;
  department: string;
  status: AttendanceStatus | '';
  search: string;
}