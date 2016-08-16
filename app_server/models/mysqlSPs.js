/**
 * Created by arpit on 16/8/16.
 */

var stored_procedres = {
    login_proc : 'DROP PROCEDURE `login_procedure`;' +
                'CREATE PROCEDURE `login_procedure` (' +
                'IN user varchar(25), ' +
                'IN pass varchar(25), ' +
                'OUT result INT) ' +
                'BEGIN '+
                'SELECT COUNT(*) INTO result FROM user_app.user_login_view WHERE username = user ' +
                'AND password = pass; ' +
                'IF result = 1 THEN ' +
                'SET result = 0; ' +
                'ELSE SET result = 1; ' +
                'END IF; ' +
                'END',

    create_new_user_proc :  'DROP PROCEDURE `create_new_user_procedure`;' +
                            'CREATE PROCEDURE `create_new_user_procedure` ( ' +
                            'IN first varchar(25), ' +
                            'IN last varchar(25), ' +
                            'IN user varchar(25), ' +
                            'IN pass varchar(25), ' +
                            'OUT result INT ) ' +
                            'BEGIN ' +
                            'SELECT count(*) INTO result FROM user_login_view WHERE username = user; ' +
                            'IF result = 0 THEN ' +
                            'INSERT INTO users (firstName, lastName, username, password) VALUES (first, last, user, pass); ' +
                            'END IF; ' +
                            'END'
};

module.exports = stored_procedres;