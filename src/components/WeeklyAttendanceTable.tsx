import React from 'react';
import { Employee } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface WeeklyAttendanceTableProps {
  data: Employee[];
}

interface GroupedAttendance {
  [employeeId: string]: {
    fullName: string;
    attendance: {
      [date: string]: {
        checkIn: string;
        checkOut: string;
      };
    };
  };
}

export function WeeklyAttendanceTable({ data }: WeeklyAttendanceTableProps) {
  // Get unique dates and sort them
  const dates = [...new Set(data.map(record => record.date))].sort();

  // Group attendance data by employee
  const groupedData: GroupedAttendance = data.reduce((acc, record) => {
    if (!acc[record.id]) {
      acc[record.id] = {
        fullName: record.fullName,
        attendance: {},
      };
    }
    acc[record.id].attendance[record.date] = {
      checkIn: record.checkIn,
      checkOut: record.checkOut,
    };
    return acc;
  }, {} as GroupedAttendance);

  const formatDateHeader = (date: string) => {
    const dateObj = new Date(date);
    const dayName = format(dateObj, 'EEEE', { locale: es });
    const formattedDate = format(dateObj, 'dd/MM/yyyy');
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}-${formattedDate}`;
  };

  const getTimeStatus = (time: string) => {
    if (time === '--:--') return null;
    
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    if (totalMinutes >= 496 && totalMinutes <= 525) { // 8:16 - 8:45
      return 'late';
    } else if (totalMinutes >= 480 && totalMinutes <= 495) { // 8:00 - 8:15
      return 'warning';
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Nombre Empleado
            </th>
            {dates.map(date => (
              <th key={date} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={2}>
                {formatDateHeader(date)}
              </th>
            ))}
          </tr>
          <tr>
            <th className="border-r"></th>
            {dates.map(date => (
              <React.Fragment key={`header-${date}`}>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                  Entrada
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                  Salida
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(groupedData).map(([employeeId, employee]) => (
            <tr key={employeeId}>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {employee.fullName}
              </td>
              {dates.map(date => {
                const attendance = employee.attendance[date] || { checkIn: '--:--', checkOut: '17:00' };
                const timeStatus = getTimeStatus(attendance.checkIn);
                
                return (
                  <React.Fragment key={`${employeeId}-${date}`}>
                    <td className="px-3 py-4 whitespace-nowrap text-center border-r relative">
                      {attendance.checkIn}
                      {timeStatus && (
                        <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                          timeStatus === 'late' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-center border-r">
                      {attendance.checkOut}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}