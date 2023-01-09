package myspringportfolio.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import myspringportfolio.model.User;
import java.util.Optional;
import java.util.Map;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom methods go here...

    Optional<User> findByEmail(String email);
    void updateUser(Map<String, Object> updateFields, Long id);
}

@Transactional
public void updateUser(Map<String, Object> updateFields, String whereField, Object whereValue) {
    StringBuilder updateQuery = new StringBuilder("UPDATE users SET ");

    // Iterate through the updateFields map and append the field names and values to the update query
    Iterator<Map.Entry<String, Object>> iterator = updateFields.entrySet().iterator();
    while (iterator.hasNext()) {
        Map.Entry<String, Object> entry = iterator.next();
        String field = entry.getKey();
        Object value = entry.getValue();
        updateQuery.append(field).append(" = :").append(field);
        if (iterator.hasNext()) {
            updateQuery.append(", ");
        }
    }

    // Append the WHERE clause to the update query
    updateQuery.append(" WHERE {whereField} = :whereValue");

    // Execute the update query using the updateFields map as the named parameters
    entityManager.createNativeQuery(updateQuery.toString())
        .setParameter("whereValue", whereValue)
        .setParameterMap(updateFields)
        .executeUpdate();
}
