import { useEffect, useState } from "react";
import { getAllParticipants } from "../services/apiFacade";

interface Participant {
  id: number;
  name: string;
  age: number;
  gender: string;
  club: string;
}

const Participants = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllParticipants();
        console.log("Response:", response);
        if (response) {
          console.log("Fetched data:", response);
          setParticipants(response);
        } else {
          console.log("No data received");
          setParticipants([]);
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
        setParticipants([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-full">
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      {participants.length === 0 ? (
        <div className="text-red-500">No participants found</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Age</th>
              <th className="text-left py-3 px-4">Gender</th>
              <th className="text-left py-3 px-4">Club</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant: Participant) => (
              <tr key={participant.id}>
                <td className="border py-4 px-8">{participant.name}</td>
                <td className="border py-4 px-8">{participant.age}</td>
                <td className="border py-4 px-8">{participant.gender}</td>
                <td className="border py-4 px-8">{participant.club}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Participants;
