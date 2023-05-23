package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IAssetRepository extends JpaRepository<Asset, String> {
    void deleteAssetById(String id);
    Optional<Asset> findAssetById(String id);
}
