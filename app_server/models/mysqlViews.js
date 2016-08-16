/**
 * Created by arpit on 16/8/16.
 */

var mysqlViews = {
    login_view: 'CREATE OR REPLACE VIEW `user_login_view` AS '
                    + 'select `users`.`username` AS `username`,`users`.`password` AS `password` '
                    + 'from `users`'
};

module.exports = mysqlViews;