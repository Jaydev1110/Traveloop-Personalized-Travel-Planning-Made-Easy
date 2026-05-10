/**
 * Tiny shared runtime flags. `dbConnected` flips to true once
 * `sequelize.authenticate()` succeeds in index.js. Auth code reads it
 * to decide between MySQL and the in-memory fallback store.
 */
const appState = {
  dbConnected: false,
};

function setDbConnected(value) {
  appState.dbConnected = Boolean(value);
}

module.exports = { appState, setDbConnected };
