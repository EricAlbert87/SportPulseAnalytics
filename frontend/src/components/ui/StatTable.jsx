// frontend/src/components/ui/StatTable.jsx

import React from "react";

function StatTable({ columns, data, title }) {
  return (
    <div className="bg-white dark:bg-secondary shadow-lg rounded-2xl p-4 w-full overflow-x-auto">
      {title && (
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {title}
        </h2>
      )}

      <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase tracking-wider">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StatTable;
