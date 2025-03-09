import React, { useState, useEffect } from "react";
import StatisticChart from "../components/StatisticChart";
import APIService from "../Service/APIService";
import Table from "../components/Table";

const SUBJECT_LIST = [
  "math", "literature", "physics", "foreign_language",
  "chemistry", "biology", "history", "geography", "civic_education"
];

const Reports = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [data, setData] = useState(null);
  const [topStudentData, setTopStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTopStudents, setLoadingTopStudents] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await APIService.getStatisticBySubject(selectedSubject);
      setData(response);
      setLoading(false);
    };

    fetchData();
  }, [selectedSubject]);

  useEffect(() => {
    const fetchATopStudents = async () => {
      setLoadingTopStudents(true);
      try {
        const response = await APIService.getATopStudent();
        setTopStudentData(response);
      } catch (error) {
        console.error("Error fetching top students:", error);
      }
      setLoadingTopStudents(false);
    };

    fetchATopStudents();
  }, []);

  console.log(data)

  const response = {
    subject: "math",
    lv4: 198392,
    lv3: 505836,
    lv2: 258654,
    lv1: 82731,
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-5 text-center sm:text-left">Statistic</h1>

      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 flex-1 min-h-0">
        <div className="shadow-md p-5 w-full md:w-1/2 border border-none rounded-lg bg-white flex flex-col">
          <label className="text-lg font-semibold mb-2">Choose a subject:</label>
          <select
            className="p-2 border rounded-md mb-5 w-full md:w-1/2"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {SUBJECT_LIST.map((subject) => (
              <option key={subject} value={subject}>
                {subject.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>

          <div className="flex-1 flex items-center justify-center h-full">
            {loading ? <p>Loading...</p> : data ? <StatisticChart data={data} /> : <p>No data available</p>}
          </div>
        </div>

        <div className="shadow-md p-5 w-full md:w-1/2 border border-none rounded-lg bg-white flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Top Students from group A</h2>
          <div className="flex-1 overflow-auto h-full">
            {loadingTopStudents ? <p>Loading...</p> : <Table data={topStudentData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;