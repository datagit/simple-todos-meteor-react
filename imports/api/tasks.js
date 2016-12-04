import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
    //this code only run on the Server
    Meteor.publish('tasks', function taskPublication(){
        return Tasks.find();
    });
}

//add methods for add, remove, update task
Meteor.methods({
   'tasks.insert'(text) {
       check(text, String);
       //make sure the user is loggined in before insertng a task
       if (! this.userId) {
           throw new Meteor.Error('not-authorized');
       }
       Tasks.insert({
           text,
           createdAt: new Date(),
           owner: this.userId,
           username: Meteor.users.findOne(this.userId).username,
       });

   },
    'tasks.remove'(taskId) {
        check(taskId, String);
        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        Tasks.update(taskId, {$set: {checked: setChecked}});
    },
    'setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },

});



