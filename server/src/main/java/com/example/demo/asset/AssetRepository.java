package com.example.demo.asset;

import com.example.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    @Query("SELECT a FROM Asset a WHERE a.name = ?1")
    Optional<Asset> findAssetByName(String name);

    @Query("SELECT a FROM Asset a WHERE a.user = ?1")
    List<Asset> findAllByUser(Optional<User> user);
}

