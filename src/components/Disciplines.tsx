import React, { useEffect, useState } from "react";
import { getAllDisciplines } from "../services/apiFacade";
import { Discipline } from "../services/entityFacade";

const Disciplines: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    fetchDisciplines();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const data = await getAllDisciplines();
      setDisciplines(data);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Disciplines</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/3 px-4 py-2">Discipline</th>
            <th className="w-1/3 px-4 py-2">Results Type</th>
            <th className="w-1/3 px-4 py-2">Participants</th>
          </tr>
        </thead>
        <tbody>
          {disciplines.map((discipline) => (
            <tr key={discipline.id}>
              <td className="border px-4 py-2">{discipline.name}</td>
              <td className="border px-4 py-2">{discipline.resultsType}</td>
              <td className="border px-4 py-2">{discipline.participantNames && discipline.participantNames.length > 0 ? discipline.participantNames.join(", ") : "No participants"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Disciplines;
