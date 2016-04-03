import Ember from 'ember';
import SplashscreenMixin from 'ember-cordova/mixins/device/splashscreen';

export default Ember.Route.extend(SplashscreenMixin, {
    beforeModel() {
        this.get('splashscreen').show();
        // Check to see if it's a new user
        return this.get('database').checkDatabase().then(newUser => {
            if(newUser) {
                this.transitionTo('intro');
            } else {
                this.get('database').getUser().then(user => {
                    if(!user) this.transitionTo('intro');
                });
            }
        });
    }
});
