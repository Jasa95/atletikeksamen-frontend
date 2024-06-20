// Here you are supposed to insert your fetch methods. Remember to match them to your backend endpoints.
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { TestData } from "./entityFacade";

const API_URL_EXAMPLE = "http://localhost:8080";
const TEST_URL = API_URL_EXAMPLE + "/api/test";
const USER_URL = API_URL_EXAMPLE + "/api/user";


async function getTestData() {
    return fetch(TEST_URL).then(handleHttpErrors);
}

async function getUserName() {
    return fetch(USER_URL).then(handleHttpErrors);
}

//Replace data with the parameter you want to send just edit the interface and the parameter from entityFacade
async function createTestData(TestData: TestData) {
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

export default {
  getTestData,
  getUserName,
    createTestData,
    editTestData,
    deleteTestData
}