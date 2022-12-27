package myspringportfolio.repository;

public class UserRepository {

}



// below is a suggestion on how to use the StringSubstitutor class to replace template params in a query string
// Assume you have a User model with fields id, firstName, and lastName
User user = new User(1, "John", "Doe");

// Create a Map of template params
Map<String, Object> templateParams = new HashMap<>();
templateParams.put("tableName", "users");
templateParams.put("field1", "first_name");
templateParams.put("value1", user.getFirstName());
templateParams.put("field2", "last_name");
templateParams.put("value2", user.getLastName());
templateParams.put("whereField", "id");
templateParams.put("whereValue", user.getId());

// Use the template params in the update query
String updateQuery = "UPDATE {tableName} SET {field1} = {value1}, {field2} = {value2} WHERE {whereField} = {whereValue}";
updateQuery = StringSubstitutor.replace(updateQuery, templateParams);

// Execute the update query using JDBC or your preferred method
