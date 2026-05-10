/**
 * Central place to load every model and wire Sequelize associations.
 * Import this file (not individual models) when you need includes / nested queries,
 * e.g. `Trip.findAll({ include: [Stop, Expense] })`.
 *
 * CASCADE behavior (matches your product rules):
 * - Delete Trip → cascades to Stops, Expenses, TripNotes (and then StopActivities via Stops).
 * - Delete Stop → cascades to StopActivities; TripNotes with that stop_id get stop_id cleared (SET NULL).
 */

const User = require("./User");
const City = require("./City");
const Activity = require("./Activity");
const Trip = require("./Trip");
const Stop = require("./Stop");
const StopActivity = require("./StopActivity");
const Expense = require("./Expense");
const ChecklistItem = require("./ChecklistItem");
const TripNote = require("./TripNote");
const SavedDestination = require("./SavedDestination");

// ----- User <-> Trip -----
User.hasMany(Trip, {
  foreignKey: "user_id",
});

Trip.belongsTo(User, {
  foreignKey: "user_id",
});

// ----- City <-> Activity -----
City.hasMany(Activity, {
  foreignKey: "city_id",
});

Activity.belongsTo(City, {
  foreignKey: "city_id",
});

// ----- Trip <-> Stop (deleting the trip deletes all its stops) -----
Trip.hasMany(Stop, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

Stop.belongsTo(Trip, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

// ----- City <-> Stop -----
City.hasMany(Stop, {
  foreignKey: "city_id",
});

Stop.belongsTo(City, {
  foreignKey: "city_id",
});

// ----- Stop <-> StopActivity (deleting a stop deletes its planned activities) -----
Stop.hasMany(StopActivity, {
  foreignKey: "stop_id",
  onDelete: "CASCADE",
});

StopActivity.belongsTo(Stop, {
  foreignKey: "stop_id",
  onDelete: "CASCADE",
});

// ----- Activity <-> StopActivity -----
Activity.hasMany(StopActivity, {
  foreignKey: "activity_id",
});

StopActivity.belongsTo(Activity, {
  foreignKey: "activity_id",
});

// ----- Trip <-> Expense (deleting the trip deletes all expenses) -----
Trip.hasMany(Expense, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

Expense.belongsTo(Trip, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

// ----- User <-> ChecklistItem -----
User.hasMany(ChecklistItem, {
  foreignKey: "user_id",
});

ChecklistItem.belongsTo(User, {
  foreignKey: "user_id",
});

// ----- Trip <-> TripNote (deleting the trip deletes all notes on that trip) -----
Trip.hasMany(TripNote, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

TripNote.belongsTo(Trip, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

// ----- Stop <-> TripNote (optional stop_id; removing a stop keeps the trip note, clears stop_id) -----
Stop.hasMany(TripNote, {
  foreignKey: "stop_id",
  onDelete: "SET NULL",
});

TripNote.belongsTo(Stop, {
  foreignKey: "stop_id",
  onDelete: "SET NULL",
});

// ----- User <-> SavedDestination -----
User.hasMany(SavedDestination, {
  foreignKey: "user_id",
});

SavedDestination.belongsTo(User, {
  foreignKey: "user_id",
});

// ----- City <-> SavedDestination -----
City.hasMany(SavedDestination, {
  foreignKey: "city_id",
});

SavedDestination.belongsTo(City, {
  foreignKey: "city_id",
});

module.exports = {
  User,
  City,
  Activity,
  Trip,
  Stop,
  StopActivity,
  Expense,
  ChecklistItem,
  TripNote,
  SavedDestination,
};
