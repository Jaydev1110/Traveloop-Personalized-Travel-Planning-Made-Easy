/** Updated after MySQL `sequelize.authenticate()` runs in index.js */
export const appState = {
  dbConnected: false,
};

export function setDbConnected(value) {
  appState.dbConnected = Boolean(value);
}
