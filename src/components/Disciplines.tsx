import { useEffect, useState } from "react";
import { getAllDisciplines } from "../services/apiFacade";

interface Discipline {
  id: number;
  name: string;
  resultsType: string;
  participantNames: string[];
  resultValues?: string[];
}

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await getAllDisciplines();
        setDisciplines(response);
      } catch (error) {
        console.error("Error fetching disciplines:", error);
      }
    };

    fetchDisciplines();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Disciplines</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Discipline</th>
            <th className="px-4 py-2">Results Type</th>
            <th className="px-4 py-2">Participants</th>
            <th className="px-4 py-2">Results</th>
          </tr>
        </thead>
        <tbody>
          {disciplines.map((discipline) => (
            <tr key={discipline.id}>
              <td className="border px-4 py-2">{discipline.name}</td>
              <td className="border px-4 py-2">{discipline.resultsType}</td>
              <td className="border px-4 py-2">
                {discipline.participantNames.length > 0 ? (
                  <ul>
                    {discipline.participantNames.map((participant, index) => (
                      <li key={index}>{participant}</li>
                    ))}
                  </ul>
                ) : (
                  "No participants"
                )}
              </td>
              <td className="border px-4 py-2">
                {discipline.resultValues && discipline.resultValues.length > 0 ? (
                  <ul>
                    {discipline.resultValues.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                ) : (
                  "No results"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Disciplines;
