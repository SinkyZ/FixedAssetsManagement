package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IAssetRepository extends JpaRepository<Asset, String> {
    void deleteAssetById(String id);
    List<Asset> findAssetsByRoomId(String roomId);
    Optional<Asset> findAssetById(String id);
}
