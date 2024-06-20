import { useEffect, useState } from "react";
import { getAllResults } from "../services/apiFacade";

interface Result {
  id: number;
  participantName: string;
  disciplineName: string;
  resultValue: string;
  resultType: string;
  date: string;
}

const Results = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getAllResults();
        setResults(response);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Participant</th>
            <th className="px-4 py-2">Discipline</th>
            <th className="px-4 py-2">Result Value</th>
            <th className="px-4 py-2">Result Type</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td className="border px-4 py-2">{result.participantName}</td>
              <td className="border px-4 py-2">{result.disciplineName}</td>
              <td className="border px-4 py-2">{result.resultValue}</td>
              <td className="border px-4 py-2">{result.resultType}</td>
              <td className="border px-4 py-2">{result.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
