package com.example.demo.asset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    @Query("SELECT a FROM Asset a WHERE a.name = ?1 AND a.type = ?1")
    Optional<Asset> findAssetByNameAndType(String name, String type);
}

