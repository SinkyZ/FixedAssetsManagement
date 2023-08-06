package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.AssetNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.repository.IAssetRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class AssetService {
    private final IAssetRepository assetsRepository;

    public AssetService(IAssetRepository assetsRepository){
        this.assetsRepository = assetsRepository;
    }

    public Asset addAsset(Asset asset){
        asset.setId(UUID.randomUUID().toString());
        asset.setCode(UUID.randomUUID().toString());
        return assetsRepository.save(asset);
    }

    public List<Asset> getAllAssets(){
        return assetsRepository.findAll();
    }

    public List<Asset> getAssetsByRoomId(String roomId){
        return assetsRepository.findAssetsByRoomId(roomId);
    }
    public Asset updateAsset(Asset asset){
        return assetsRepository.save(asset);
    }
    public Asset getAssetById(String id){
        return assetsRepository.findAssetById(id)
                .orElseThrow(() -> new AssetNotFoundException("Asset by id" + id + "not found"));
    }
    public void deleteAsset(String id){
        assetsRepository.deleteAssetById(id);
    }
}
