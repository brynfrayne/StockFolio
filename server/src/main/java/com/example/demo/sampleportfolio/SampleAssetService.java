package com.example.demo.sampleportfolio;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.List;
@Service
public class SampleAssetService {

    private final SampleAssetRepository sampleAssetRepository;

    @Autowired
    public SampleAssetService(SampleAssetRepository sampleAssetRepository) {
        this.sampleAssetRepository = sampleAssetRepository;
    }

    public List<SampleAsset> getSampleAssets() {
        return sampleAssetRepository.findAll();
    }

    public void addNewSampleAsset(SampleAsset sampleAsset) {
        sampleAssetRepository.save(sampleAsset);
    }

    public void deleteSampleAsset(Long sampleAssetId) {
        boolean exists = sampleAssetRepository.existsById(sampleAssetId);
        if (!exists) {
            throw new IllegalStateException(
                    "sample asset with id " + sampleAssetId + " does not exist");
        }
        sampleAssetRepository.deleteById(sampleAssetId);
    }

    @Transactional
    public void updateSampleAsset(Long sampleAssetId, Integer sampleAssetQuantity, String name) {
        SampleAsset sampleAsset = sampleAssetRepository.findById(sampleAssetId)
                .orElseThrow(()->new IllegalStateException(
                        "sample asset with id " + sampleAssetId + " does not exist"));

        if (sampleAssetQuantity != null &&
                sampleAssetQuantity > 0 &&
                !Objects.equals(sampleAsset.getAssetQuantity(), sampleAssetQuantity)) {
            sampleAsset.setAssetQuantity(sampleAssetQuantity);
        }
    }
}
