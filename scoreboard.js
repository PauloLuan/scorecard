Players = new Mongo.Collection('players');

Meteor.methods({
    updateScore: function (id, score) {
        Players.update(id, {
            $set: {score: score}
        });
    }
});

if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.players.helpers({
        players: function() {
            return Players.find();
        }
    });

    Template.players.events({
        'click #add' : function () {
            var score = Players.findOne(this._id).score;
            Meteor.call('updateScore', this._id, score + 1);
        },

        'click #remove' : function () {
            var score = Players.findOne(this._id).score;
            Meteor.call('updateScore', this._id, score - 1);
        }

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Players.find().count() === 0) {
            Players.insert({
                name: 'Vitor',
                score: 0
            });
            Players.insert({
                name: 'Luan',
                score: 0
            });
        }
    });
}
