import React from 'react';
import { Upload, Download, X } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    // Create template data matching the desired format
    const template = [
      {
        ID: '9',
        Nombre: 'JUAN',
        Apellido: 'DE LA CRUZ',
        Fecha: '15/02/2025',
        'Día de la Semana': 'Sábado',
        'Hora de registro': '12:01'
      },
      {
        ID: '9',
        Nombre: 'JUAN',
        Apellido: 'DE LA CRUZ',
        Fecha: '15/02/2025',
        'Día de la Semana': 'Sábado',
        'Hora de registro': '08:06'
      }
    ];

    // Create workbook and worksheet
    const ws = utils.json_to_sheet(template);

    // Set column widths
    ws['!cols'] = [
      { wch: 8 },  // ID
      { wch: 15 }, // Nombre
      { wch: 15 }, // Apellido
      { wch: 12 }, // Fecha
      { wch: 20 }, // Día de la Semana
      { wch: 15 }  // Hora de registro
    ];

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Registros');
    writeFile(wb, 'plantilla_asistencia.xlsx');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Importar Registros de Asistencia
              </h3>
              <button
                onClick={onClose}
                className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Cómo importar registros:
                </h4>
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Descarga la plantilla</li>
                  <li>Llena los registros de asistencia</li>
                  <li>Guarda el archivo y súbelo de nuevo</li>
                </ol>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={downloadTemplate}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Plantilla
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImport(file);
                    }
                  }}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Archivo
                </button>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                <p>Formatos soportados: .xlsx, .xls, .csv</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}