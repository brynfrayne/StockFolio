package myspringportfolio.repository;
import myspringportfolio.model.Asset;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class AssetRepositoryImpl implements AssetRepository {
    private final EntityManager entityManager;
    public AssetRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public List<Asset> findAll() {
        return entityManager.createQuery("SELECT a FROM Portfolio", Asset.class).getResultList();
    }
    @Override
    public Asset findByName(String name, long userId) {
        String tableName = "Portfolio_" + userId;
        return entityManager.createQuery("SELECT a FROM " + tableName + " WHERE a.name = :name", Asset.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public Asset update(Asset asset) {
        return entityManager.merge(asset);
    }
    @Override
    public Asset save(Asset asset) {
        entityManager.persist(asset);
        return asset;
    }
    @Override
    public void delete(Asset asset) {
        entityManager.remove(asset);
    }
}
