package myspringportfolio.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import myspringportfolio.model.Portfolio;
import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    // Custom methods go here...

    List<Portfolio> findAllByOrderByNameAsc();
    List<Portfolio> findAllByOrderByCurrentTotalValueAsc();
    List<Portfolio> findAllByOrderByCurrentTotalValueDesc();
    Portfolio findByName(String name);
    void deleteByName(String name);
}
