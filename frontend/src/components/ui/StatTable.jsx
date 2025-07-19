import React from "react";

function StatTable({ title, columns, data }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-navy-900 mb-4 font-roboto">{title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="bg-navy-900 text-white p-2 border">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-2 border">{row[col.key] || 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatTable;