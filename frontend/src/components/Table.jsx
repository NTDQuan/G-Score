import React from 'react';
import SUBJECT_LIST from '../data/Subject';

const Table = ({ data, subjects }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  if (!subjects || subjects.length === 0) {
    subjects = [
      ...new Set(data.flatMap((student) => student.scores.map((s) => s.subject.subject))),
    ];
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-[#F5F5F5]">
            <th className="p-3 border">Id</th>
            {subjects.map((subject) => (
              <th className="p-3 border" key={subject.subject}>
                {SUBJECT_LIST[subject.subject] || subject.subject.replace("_", " ").toUpperCase()}
              </th>
            ))}
            <th className="p-3 border">FLC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            const scoresMap = Object.fromEntries(
              student.scores.map((s) => [s.subject.subject, s.score])
            );
            console.log(scoresMap)

            return (
              <tr key={student.student_id}>
                <td className="p-3 border">{student.student_id}</td>
                {subjects.map((subject) => (
                  <td className="p-3 border" key={subject.subject}> 
                    {scoresMap[subject.subject] !== undefined ? scoresMap[subject.subject] : ""}
                  </td>
                ))}
                <td className="p-3 border">{student.language?.language ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;