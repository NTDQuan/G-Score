import React, { useState, useEffect } from "react";
import StatisticChart from "../components/StatisticChart";
import APIService from "../Service/APIService";
import Table from "../components/Table";
import SUBJECT_LIST from "../data/Subject";
const Reports = () => {
  const [selectedSubject, setSelectedSubject] = useState();
  const [data, setData] = useState(null);
  const [topStudentData, setTopStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTopStudents, setLoadingTopStudents] = useState(false);
  const [error, setError] = useState(null);
  const [topStudentsError, setTopStudentsError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await APIService.getAllSubject();
        setSubjects(response);
        if (response.length > 0) {
          setSelectedSubject(response[0]);
        }
      } catch (e) {
        console.error("Error fetching subjects:", e);
        setSubjects([]);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubject) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await APIService.getStatisticBySubject(selectedSubject.id);
        setData(response);
      } catch (e) {
        console.error("Error fetching subject statistics:", e);
        setError("Failed to load statistics. Please try again later.");
        setData(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedSubject]);

  useEffect(() => {
    const fetchTopStudents = async () => {
      setLoadingTopStudents(true);
      setTopStudentsError(null);
      try {
        const response = await APIService.getATopStudent();
        setTopStudentData(response);
      } catch (e) {
        console.error("Error fetching top students:", e);
        setTopStudentsError("Failed to load top students. Please try again later.");
        setTopStudentData(null);
      }
      setLoadingTopStudents(false);
    };

    fetchTopStudents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-5 text-center sm:text-left">Statistic</h1>

      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 flex-1 min-h-0">
        {/* Subject Selection & Statistic Chart */}
        <div className="shadow-md p-5 w-full md:w-1/2 border rounded-lg bg-white flex flex-col">
          <label className="text-lg font-semibold mb-2">Choose a subject:</label>
          <select
            className="p-2 border rounded-md mb-5 w-full md:w-1/2"
            value={selectedSubject ? selectedSubject.id : ""}
            onChange={(e) => {
              const subject = subjects.find((subject) => subject.id === parseInt(e.target.value));
              setSelectedSubject(subject);
            }}
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {SUBJECT_LIST[subject.subject] || subject.subject.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>

          <div className="flex-1 flex items-center justify-center h-full">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : data ? (
              <StatisticChart data={data} />
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>

        {/* Top Students */}
        <div className="shadow-md p-5 w-full md:w-1/2 border rounded-lg bg-white flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Top Students from group A</h2>
          <div className="flex-1 flex overflow-auto h-full items-center justify-center">
            {loadingTopStudents ? (
              <p>Loading...</p>
            ) : topStudentsError ? (
              <p className="text-red-500">{topStudentsError}</p>
            ) : (
              <Table data={topStudentData} subjects={subjects}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
