import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection("tasks");
console.log(Mongo);
