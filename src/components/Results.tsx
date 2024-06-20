import React, { useEffect, useState } from "react";
import { getAllResults, createResult, getAllParticipants, getAllDisciplines } from "../services/apiFacade";
import { Result, Participant, Discipline } from "../services/entityFacade";

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [newResult, setNewResult] = useState<Partial<Result>>({
    resultValue: "",
    resultType: "",
    date: "",
    participantId: undefined,
    disciplineId: undefined,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resultData = await getAllResults();
      setResults(resultData);

      const participantData = await getAllParticipants();
      setParticipants(participantData);

      const disciplineData = await getAllDisciplines();
      setDisciplines(disciplineData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateResult = async () => {
    try {
      if (newResult.participantId && newResult.disciplineId && newResult.resultValue && newResult.resultType && newResult.date) {
        const createdResult = await createResult(newResult as Result);
        setResults([...results, createdResult]);
        setNewResult({
          resultValue: "",
          resultType: "",
          date: "",
          participantId: undefined,
          disciplineId: undefined,
        });
      } else {
        console.error("All fields must be filled in.");
      }
    } catch (error) {
      console.error("Error creating result:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2">Participant</th>
            <th className="w-1/4 px-4 py-2">Discipline</th>
            <th className="w-1/4 px-4 py-2">Result</th>
            <th className="w-1/4 px-4 py-2">Type</th>
            <th className="w-1/4 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td className="border px-4 py-2">{participants.find((p) => p.id === result.participantId)?.name}</td>
              <td className="border px-4 py-2">{disciplines.find((d) => d.id === result.disciplineId)?.name}</td>
              <td className="border px-4 py-2">{result.resultValue}</td>
              <td className="border px-4 py-2">{result.resultType}</td>
              <td className="border px-4 py-2">{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold my-4">Create New Result</h2>
      <div className="mb-4">
        <label className="block mb-2">Participant</label>
        <select value={newResult.participantId} onChange={(e) => setNewResult({ ...newResult, participantId: Number(e.target.value) })} className="border rounded px-2 py-1">
          <option value="">Select Participant</option>
          {participants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Discipline</label>
        <select value={newResult.disciplineId} onChange={(e) => setNewResult({ ...newResult, disciplineId: Number(e.target.value) })} className="border rounded px-2 py-1">
          <option value="">Select Discipline</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Result Value</label>
        <input type="text" value={newResult.resultValue} onChange={(e) => setNewResult({ ...newResult, resultValue: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Result Type</label>
        <input type="text" value={newResult.resultType} onChange={(e) => setNewResult({ ...newResult, resultType: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input type="date" value={newResult.date} onChange={(e) => setNewResult({ ...newResult, date: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <button onClick={handleCreateResult} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Result
      </button>
    </div>
  );
};

export default Results;
