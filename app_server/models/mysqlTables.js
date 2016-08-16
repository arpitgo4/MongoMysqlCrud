/**
 * Created by arpit on 16/8/16.
 */

var mysqlTables = {
    user_table :   "DROP TABLE IF EXISTS users;" +
                    "CREATE TABLE users (" +
                    "id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY," +
                    "firstName VARCHAR(25)," +
                    "lastName VARCHAR(25)," +
                    "username VARCHAR(25)," +
                    "password VARCHAR(25), " +
                    "country INT," +
                    "company INT" + ")",
    
    company_table : "DROP TABLE IF EXISTS company;" +
                        "CREATE TABLE IF NOT EXISTS company (" +
                        "id INT(1) NOT NULL PRIMARY KEY, " +
                        "companyName VARCHAR(25)" + ")",
    
    country_table :  "DROP TABLE IF EXISTS country;" +
                        "CREATE TABLE IF NOT EXISTS country (" + 
                        "id INT(1) NOT NULL PRIMARY KEY, " +
                        "countryName VARCHAR(25)" + ")",

    country_table_data: "INSERT INTO country VALUES (1, 'India');" +
                        "INSERT INTO country VALUES (2, 'USA');" +
                        "INSERT INTO country VALUES (3, 'Japan');" +
                        "INSERT INTO country VALUES (4, 'France');",

    company_table_data: "INSERT INTO company VALUES (1, 'Facebook');" +
                        "INSERT INTO company VALUES (2, 'Google');" +
                        "INSERT INTO company VALUES (3, 'Twitter');" +
                        "INSERT INTO company VALUES (4, 'Xiaomi');"

};

module.exports = mysqlTables;