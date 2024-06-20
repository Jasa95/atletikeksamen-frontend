import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Discipline, Participant, Result } from "./entityFacade";

const LOCALHOST = "http://localhost:8080";
const PARTICIPANTS_URL = LOCALHOST + "/api/participants";
const RESULTS_URL = LOCALHOST + "/api/results";
const DISCIPLINES_URL = LOCALHOST + "/api/disciplines";

async function getAllParticipants(): Promise<Participant[]> {
  return fetch(PARTICIPANTS_URL).then(handleHttpErrors);
}

async function createParticipant(participant: Participant): Promise<Participant> {
  const options = makeOptions("POST", participant);
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function deleteParticipant(id: number): Promise<void> {
  const options = makeOptions("DELETE");
  return fetch(`${PARTICIPANTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function getAllResults(): Promise<Result[]> {
  return fetch(RESULTS_URL).then(handleHttpErrors);
}

async function createResult(result: Result): Promise<Result> {
  const options = makeOptions("POST", result);
  return fetch(RESULTS_URL, options).then(handleHttpErrors);
}

async function updateResult(id: number, result: Result): Promise<Result> {
  const options = makeOptions("PUT", result);
  return fetch(`${RESULTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function deleteResult(id: number): Promise<void> {
  const options = makeOptions("DELETE");
  return fetch(`${RESULTS_URL}/${id}`, options).then(handleHttpErrors);
}

async function getAllDisciplines(): Promise<Discipline[]> {
  return fetch(DISCIPLINES_URL).then(handleHttpErrors);
}

export { getAllParticipants, createParticipant, deleteParticipant, getAllResults, createResult, updateResult, deleteResult, getAllDisciplines };
