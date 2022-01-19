/* eslint-disable no-console */
const result = require('dotenv').config({ path: '../backend/.env' });
const authentication = require('./src/authentication');
const fetchData = require('./src/fetch');
// const normalize = require('./src/normalize');

if (result.error) {
  throw result.error;
}

const reporter = {
  panic: (s) => console.error(s),
  info: (s) => console.log(s),
};

const apiURL = 'http://localhost:1337';

const loginData = {
  identifier: process.env.EMAIL,
  password: process.env.PASSWORD,
};

const fetchEntities = async (entityDefinition, ctx) => {
  const entities = await fetchData(entityDefinition, ctx);
  // await normalize.downloadMediaFiles(entities, ctx);

  return entities;
};

const getData = async () => {
  const jwtToken = authentication({ loginData, reporter, apiURL });
  if (!jwtToken) {
    console.log('No token');
    return;
  }
  console.log('Token OK');

  // const entities = await Promise.all(types.map((type) => fetchEntities(type, ctx)));
  const type = {
    endpoint: 'posts',
    api: null,
    // api: { qs: { locale: 'all' } },
  };

  const ctx = {
    queryLimit: 1,
    apiURL,
    jwtToken,
    reporter,
  };

  const entities = await fetchEntities(type, ctx);
  entities.forEach((e) => console.log(e.data));
};

getData();
