import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        newGoal(goal) {
            this.get('database').newGoal(goal).then(newGoal => {
                this.transitionTo('index');
            });
        }
    }
});
