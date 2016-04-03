import Ember from 'ember';

export default Ember.Service.extend({
    /**
     * Get User
     */
    getUser() {
        let db = this.get('db');

        return new Ember.RSVP.Promise((res, rej) => {
            db.executeSql('SELECT * FROM user', [], data => {
                console.log(data);
                if(data.rows.length > 0) {
                    res(data.rows.item(0));
                } else {
                    res(false);
                }
            },
            error => {
                console.log(error.message);
                rej(error);
            });
        });
    },

    /*
     * Get all goals
     */
    getGoals() {
        let db = this.get('db');

        return new Ember.RSVP.Promise((res, rej) => {
            db.executeSql('SELECT * FROM goal', [], data => {
                let goals = [];
                for(let i = 0; i < data.rows.length; i++) {
                    goals.pushObject(data.rows.item(i));
                }
                res(goals);
            },
            error => {
                rej(error);
            });
        });
    },

    /*
     * New Goal
     */
    newGoal(goal) {
        let db = this.get('db');

        return new Ember.RSVP.Promise((res, rej) => {
            db.executeSql('INSERT INTO goal (name) VALUES (?)', [goal.name], data => {
                db.executeSql('SELECT * FROM goal WHERE goal_id=?', [data.insertId], data2 => {
                    res(data2.rows.item(0));
                });
            },
            error => {
                rej(error.message);
            });
        });
    },

    /**
     * Make sure the database is all set up and ready to go
     */
    checkDatabase() {
        let db = this.get('db');
        // See if there is a version table
        return new Ember.RSVP.Promise((res, rej) => {
            db.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name=?;", ['version'], data => {
                res(data.rows.length)
            }, error => {
                rej(error.message);
            });
        })
        // If version deos exist, check the number for migrations, else set up db
        .then(versionExists => {
            console.log(versionExists);
            if(versionExists) {
                return false;
            } else {
                console.log('setup db');
                return this._setupDatabase();
            }
        });
    },

    /**
     * Set up the database from scratch
     */
    _setupDatabase() {
        let db = this.get('db');

        return new Ember.RSVP.Promise((res, rej) => {
            console.log('setting up db');
            // Check if goal table exists
            db.sqlBatch([
                    'DROP TABLE IF EXISTS version',
                    `CREATE TABLE IF NOT EXISTS version (
                        version TEXT NOT NULL
                    )`,
                    ['INSERT INTO version VALUES (?)', ['1.0.0']],
                    'DROP TABLE IF EXISTS goal',
                    `CREATE TABLE IF NOT EXISTS goal (
                        goal_id INTEGER NOT NULL PRIMARY KEY,
                        name TEXT NOT NULL
                    )`,
                    'DROP TABLE IF EXISTS user',
                    `CREATE TABLE IF NOT EXISTS user (
                        name TEXT NOT NULL
                    )`
                ], data => {
                    res(true);
                }, error => {
                    console.log(error.message);
                    rej(error.message);
                }
            );
        });
    }
});
