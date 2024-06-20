import { handleHttpErrors } from "./fetchUtils";

const LOCALHOST = "http://localhost:8080";
const PARTICIPANTS_URL = LOCALHOST + "/api/participants";
const RESULTS_URL = LOCALHOST + "/api/results";
const DISCIPLINES_URL = LOCALHOST + "/api/disciplines";

async function getAllParticipants() {
  return fetch(PARTICIPANTS_URL).then(handleHttpErrors);
}

async function getAllResults() {
  return fetch(RESULTS_URL).then(handleHttpErrors);
}

async function getAllDisciplines() {
  return fetch(DISCIPLINES_URL).then(handleHttpErrors);
}

async function createResult(result) {
  return fetch(RESULTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  }).then(handleHttpErrors);
}

async function updateResult(id, result) {
  return fetch(`${RESULTS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  }).then(handleHttpErrors);
}

async function deleteResult(id) {
  return fetch(`${RESULTS_URL}/${id}`, {
    method: "DELETE",
  }).then(handleHttpErrors);
}

export { getAllParticipants, getAllResults, getAllDisciplines, createResult, updateResult, deleteResult };
