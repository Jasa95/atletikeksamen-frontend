// Here you are supposed to insert your fetch methods. Remember to match them to your backend endpoints.
import { handleHttpErrors } from "./fetchUtils";

const LOCALHOST = "http://localhost:8080";
const PARTICIPANTS_URL = LOCALHOST + "/api/participants";
const RESULTS_URL = LOCALHOST + "/api/results";
const DISCIPLINES_URL = LOCALHOST + "/api/discipline";

async function getAllParticipants() {
  return fetch(PARTICIPANTS_URL).then(handleHttpErrors);
}

async function getAllResults() {
  return fetch(RESULTS_URL).then(handleHttpErrors);
}

async function getAllDisciplines() {
  return fetch(DISCIPLINES_URL).then(handleHttpErrors);
}
/*
//Replace data with the parameter you want to send just edit the interface and the parameter from entityFacade
async function create() {
    const options = makeOptions("POST", TestData);
    return fetch(TEST_URL, options).then(handleHttpErrors);
}

//Replace data with the parameter you want to send just edit the interface and the parameter from entityFacade
async function editTestData(TestData: TestData) {
    const options = makeOptions("PUT", TestData);
    return fetch(TEST_URL + "/" + TestData.id, options).then(handleHttpErrors);
}

//Replace data with the parameter you want to send just edit the interface and the parameter from entityFacade
async function deleteTestData(id: number) {
    const options = makeOptions("DELETE", null);
    return fetch(TEST_URL + "/" + id, options).then(handleHttpErrors);
}
*/
export { getAllParticipants, getAllResults, getAllDisciplines };
