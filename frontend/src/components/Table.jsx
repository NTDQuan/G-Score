import React from 'react';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-[#F5F5F5]">
            <th className="p-3 border">Id</th>
            <th className="p-3 border">Math</th>
            <th className="p-3 border">Literature</th>
            <th className="p-3 border">Physics</th>
            <th className="p-3 border">Foreign Language</th>
            <th className="p-3 border">Chemistry</th>
            <th className="p-3 border">Biology</th>
            <th className="p-3 border">History</th>
            <th className="p-3 border">Geography</th>
            <th className="p-3 border">Civic Education</th>
            <th className="p-3 border">FLC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border">{item.id}</td>
              <td className="p-3 border">{item.math ?? "N/A"}</td>
              <td className="p-3 border">{item.literature ?? "N/A"}</td>
              <td className="p-3 border">{item.physics ?? "N/A"}</td>
              <td className="p-3 border">{item.foreign_language ?? "N/A"}</td>
              <td className="p-3 border">{item.chemistry ?? "N/A"}</td>
              <td className="p-3 border">{item.biology ?? "N/A"}</td>
              <td className="p-3 border">{item.history ?? "N/A"}</td>
              <td className="p-3 border">{item.geography ?? "N/A"}</td>
              <td className="p-3 border">{item.civic_education ?? "N/A"}</td>
              <td className="p-3 border">{item.foreign_language_code ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;