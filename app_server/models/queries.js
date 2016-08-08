/**
 * Created by arpit on 7/8/16.
 */

var queries = {
    login: "SELECT * FROM users WHERE username=? AND password=?;",
    register: "INSERT INTO users (firstName, lastName, username, password) VALUES (?,?,?,?);",
    update: "UPDATE users SET password=? WHERE username=? AND password=?;",
    checkIfUsernameExists: "SELECT * FROM users WHERE username=?;",
    allUser: "SELECT * FROM users;", 
    removeUser: "DELETE FROM users WHERE username=?;",
    checkIfUserExists: "SELECT * FROM users WHERE username=? AND password=?;"
};

module.exports = queries;