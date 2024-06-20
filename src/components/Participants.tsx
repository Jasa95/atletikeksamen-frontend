import React, { useEffect, useState } from "react";
import { getAllParticipants, createParticipant, deleteParticipant } from "../services/apiFacade";
import { Participant } from "../services/entityFacade";

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState<Partial<Participant>>({
    name: "",
    age: undefined,
    gender: "",
    club: "",
  });

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const data = await getAllParticipants();
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleCreateParticipant = async () => {
    try {
      if (newParticipant.name && newParticipant.age && newParticipant.gender && newParticipant.club) {
        const createdParticipant = await createParticipant(newParticipant as Participant);
        setParticipants([...participants, createdParticipant]);
        setNewParticipant({
          name: "",
          age: undefined,
          gender: "",
          club: "",
        });
      } else {
        console.error("All fields must be filled in.");
      }
    } catch (error) {
      console.error("Error creating participant:", error);
    }
  };

  const handleDeleteParticipant = async (id: number) => {
    try {
      await deleteParticipant(id);
      setParticipants(participants.filter((participant) => participant.id !== id));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      <ul className="list-disc pl-4">
        {participants.map((participant) => (
          <li key={participant.id}>
            Name: {participant.name}, Age: {participant.age}, Gender: {participant.gender}, Club: {participant.club}
            <button onClick={() => handleDeleteParticipant(participant.id)} className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold my-4">Create New Participant</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input type="text" value={newParticipant.name} onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Age</label>
        <input type="number" value={newParticipant.age} onChange={(e) => setNewParticipant({ ...newParticipant, age: Number(e.target.value) })} className="border rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Gender</label>
        <input type="text" value={newParticipant.gender} onChange={(e) => setNewParticipant({ ...newParticipant, gender: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Club</label>
        <input type="text" value={newParticipant.club} onChange={(e) => setNewParticipant({ ...newParticipant, club: e.target.value })} className="border rounded px-2 py-1" />
      </div>
      <button onClick={handleCreateParticipant} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Participant
      </button>
    </div>
  );
};

export default Participants;
