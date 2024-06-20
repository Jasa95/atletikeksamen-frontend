import { useEffect, useState } from "react";
import { getAllDisciplines } from "../services/apiFacade";

interface Discipline {
  id: number;
  name: string;
  resultsType: string;
  participantNames: string[];
}

const Disciplines = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await getAllDisciplines();
        setDisciplines(response);
      } catch (error) {
        console.error("Error fetching disciplines:", error);
        setError("Failed to fetch disciplines");
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Disciplines</h1>
      {disciplines.length === 0 ? (
        <div>No disciplines found</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Discipline</th>
              <th className="py-2">Results Type</th>
              <th className="py-2">Participants</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((discipline) => (
              <tr key={discipline.id}>
                <td className="border px-4 py-2">{discipline.name}</td>
                <td className="border px-4 py-2">{discipline.resultsType}</td>
                <td className="border px-4 py-2">
                  {discipline.participantNames?.length === 0 ? (
                    <div>No participants</div>
                  ) : (
                    <ul>
                      {discipline.participantNames?.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Disciplines;
