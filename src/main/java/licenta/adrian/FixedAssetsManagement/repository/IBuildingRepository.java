package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface IBuildingRepository extends JpaRepository<Building, String> {

    void deleteBuildingById(String id);
    List<Building> findBuildingsByCompanyId(String companyId);
    Optional<Building> findBuildingById(String id);
}
