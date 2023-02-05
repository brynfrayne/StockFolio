package com.example.demo.sampleportfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/sample")
public class SampleAssetController {

    @Autowired
    private final SampleAssetService sampleAssetService;

    public SampleAssetController(SampleAssetService sampleAssetService) {
        this.sampleAssetService = sampleAssetService;
    }

    @GetMapping
    public List<SampleAsset> getSampleAssets() {
        return sampleAssetService.getSampleAssets();
    }

    @PostMapping
    public void addNewSampleAsset(@RequestBody SampleAsset sampleAsset) {
        sampleAssetService.addNewSampleAsset(sampleAsset);
    }

    @DeleteMapping(path = "{sampleAssetId}")
    public void deleteSampleAsset(@PathVariable("sampleAssetId") Long sampleAssetId) {
        sampleAssetService.deleteSampleAsset(sampleAssetId);
    }

    @PutMapping(path = "{sampleAssetId}")
    public void updateSampleAsset(
            @PathVariable("sampleAssetId") Long sampleAssetId,
            @RequestParam(required = false) Integer sampleAssetQuantity,
            @RequestParam() String name) {
        sampleAssetService.updateSampleAsset(sampleAssetId,sampleAssetQuantity, name);
    }
}
