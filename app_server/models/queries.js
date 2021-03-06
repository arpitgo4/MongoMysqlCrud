/**
 * Created by arpit on 7/8/16.
 */
/**
 * Module for defining SQL queries.
 */
var queries = {
    login: "SELECT * FROM users WHERE username=? AND password=?;",
    register: "INSERT INTO users (firstName, lastName, username, password) VALUES (?,?,?,?);",
    update: "UPDATE users SET password=? WHERE username=? AND password=?;",
    checkIfUsernameExists: "SELECT * FROM users WHERE username=?;",
    allUser: "SELECT * FROM users;", 
    removeUser: "DELETE FROM users WHERE username=?;",
    checkIfUserExists: "SELECT * FROM users WHERE username=? AND password=?;",

    loginSP: "CALL login_procedure(?, ?, @result); SELECT @result;",
    createUserSP: "CALL create_new_user_procedure(?, ?, ?, ?, ?, ?, @result); SELECT @result;",
    usersWithFilterSP: "CALL all_users_procedure(?, ?);",

    allCompaniesAndCountries: "SELECT * FROM country coun LEFT JOIN company comp ON country_id = company_id;"
};

module.exports = queries;