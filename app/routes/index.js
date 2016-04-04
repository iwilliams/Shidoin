import Ember from 'ember';
import SplashscreenMixin from 'ember-cordova/mixins/device/splashscreen';

export default Ember.Route.extend(SplashscreenMixin, {
    model() {
        return this.get('database').getGoals();
    },

    actions: {
        deleteGoals() {
            this.get('database').deleteGoals().then(d => {
                this.refresh();
            });
        }
    }
});
