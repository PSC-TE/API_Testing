import qa from '../config/qa';
const supertest = require ('supertest');
const request = supertest(qa.baseUrl);
// const request = supertest(qa.baseUrl_2);

export default request;