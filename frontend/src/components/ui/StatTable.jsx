import React from "react";

function StatTable({ columns, data, title }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto border border-gray-200">
      {title && (
        <h2 className="text-2xl font-semibold text-navy-900 font-roboto mb-5">
          {title}
        </h2>
      )}

      <table className="min-w-full text-base text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase tracking-wide">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 whitespace-nowrap font-open-sans">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500 font-open-sans">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap font-open-sans">
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