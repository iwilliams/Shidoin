import Database from 'shidoin/services/database';

export function initialize(application) {

    application.deferReadiness();

    document.addEventListener('deviceready', ()=>{
        var db = window.sqlitePlugin.openDatabase({name: "shidoin.db", location: 2}, db => {

            const database = Database.create({
                db: db
            });

            window.database = database;

            // A factory must be registered before it can be injected
            application.register('database:main', database, {instantiate: false});
            application.inject('route', 'database', 'database:main');

            application.advanceReadiness();
        }, error => {
        });

    }, false);
}

export default {
  name: 'sql-lite',
  initialize
};
