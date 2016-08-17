/**
 * Created by arpit on 16/8/16.
 */

var stored_procedres = {
    login_proc : 'DROP PROCEDURE IF EXISTS `login_procedure`;' +
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

    create_new_user_proc :  'DROP PROCEDURE IF EXISTS `create_new_user_procedure`;' +
                            'CREATE PROCEDURE `create_new_user_procedure` ( ' +
                            'IN first varchar(25), ' +
                            'IN last varchar(25), ' +
                            'IN user varchar(25), ' +
                            'IN pass varchar(25), ' +
                            'IN country INT, ' +
                            'IN company INT, ' +
                            'OUT result INT ) ' +
                            'BEGIN ' +
                            'SELECT count(*) INTO result FROM user_login_view WHERE username = user; ' +
                            'IF result = 0 THEN ' +
                            'INSERT INTO users (firstName, lastName, username, password, country, company) VALUES (first, last, user, pass, country, company); ' +
                            'END IF; ' +
                            'END',

    all_users_procedure: 'DROP PROCEDURE IF EXISTS `all_users_procedure`;' +
                        'CREATE PROCEDURE `all_users_procedure`(IN com INT, IN cou INT) ' +
                        'BEGIN ' +
                        'SELECT firstName, lastName, coun.countryName, comp.companyName FROM users u ' +
                        'LEFT JOIN company comp ON u.company = comp.id LEFT JOIN country coun ON u.country = coun.id where u.company = com AND u.country = cou; ' +
                        'END'
};

module.exports = stored_procedres;