import Ember from 'ember';

export default Ember.Controller.extend({
    newGoal: {
        name: ''
    },

    actions: {
        setName(e) {
            this.set('newGoal.name', e.target.value);
            console.log(this.get('newGoal.name'));
        }
    },

    disableSave: Ember.computed('newGoal.name', function() {
        console.log(this.get('newGoal.name'));
        return this.get('newGoal.name').length < 1;
    })
});
