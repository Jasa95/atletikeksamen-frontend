import { useEffect, useState } from "react";
import { getAllResults, createResult, updateResult, deleteResult } from "../services/apiFacade";

interface Result {
  id: number;
  participantName: string;
  participantId: number;
  disciplineName: string;
  disciplineId: number;
  resultValue: string;
  resultType: string;
  date: string;
}

const Results = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newResult, setNewResult] = useState<Result>({ id: 0, participantName: "", participantId: 0, disciplineName: "", disciplineId: 0, resultValue: "", resultType: "", date: "" });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getAllResults();
        setResults(response);
      } catch (error) {
        setError("Error fetching results. Please try again later.");
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewResult({ ...newResult, [name]: value });
  };

  const handleCreateResult = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createResult(newResult);
      setResults([...results, newResult]);
      setNewResult({ id: 0, participantName: "", participantId: 0, disciplineName: "", disciplineId: 0, resultValue: "", resultType: "", date: "" });
    } catch (error) {
      setError("Error creating result. Please try again later.");
      console.error("Error creating result:", error);
    }
  };

  const handleUpdateResult = async (id: number) => {
    // Update result logic
  };

  const handleDeleteResult = async (id: number) => {
    try {
      await deleteResult(id);
      setResults(results.filter((result) => result.id !== id));
    } catch (error) {
      setError("Error deleting result. Please try again later.");
      console.error("Error deleting result:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <form onSubmit={handleCreateResult} className="mb-4">
            <input type="text" name="participantName" value={newResult.participantName} onChange={handleInputChange} placeholder="Participant Name" required />
            <input type="number" name="participantId" value={newResult.participantId} onChange={handleInputChange} placeholder="Participant ID" required />
            <input type="text" name="disciplineName" value={newResult.disciplineName} onChange={handleInputChange} placeholder="Discipline Name" required />
            <input type="number" name="disciplineId" value={newResult.disciplineId} onChange={handleInputChange} placeholder="Discipline ID" required />
            <input type="text" name="resultValue" value={newResult.resultValue} onChange={handleInputChange} placeholder="Result Value" required />
            <input type="text" name="resultType" value={newResult.resultType} onChange={handleInputChange} placeholder="Result Type" required />
            <input type="date" name="date" value={newResult.date} onChange={handleInputChange} required />
            <button type="submit" className="btn btn-primary">
              Add Result
            </button>
          </form>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Participant</th>
                <th className="border px-4 py-2">Discipline</th>
                <th className="border px-4 py-2">Result Value</th>
                <th className="border px-4 py-2">Result Type</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center px-4 py-2">
                    No results found
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.id}>
                    <td className="border px-4 py-2">{result.participantName}</td>
                    <td className="border px-4 py-2">{result.disciplineName}</td>
                    <td className="border px-4 py-2">{result.resultValue}</td>
                    <td className="border px-4 py-2">{result.resultType}</td>
                    <td className="border px-4 py-2">{result.date}</td>
                    <td className="border px-4 py-2">
                      <button className="btn btn-warning mr-2" onClick={() => handleUpdateResult(result.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteResult(result.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
