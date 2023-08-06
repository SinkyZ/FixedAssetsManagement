package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.BuildingNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.Building;
import licenta.adrian.FixedAssetsManagement.repository.IBuildingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class BuildingService {
    private final IBuildingRepository buildingRepository;

    public BuildingService(IBuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public Building addBuilding(Building building){
        building.setId(UUID.randomUUID().toString());
        return buildingRepository.save(building);
    }

    public List<Building> getBuildingsByCompanyId(String companyId){
        return buildingRepository.findBuildingsByCompanyId(companyId);
    }
    public Building updateBuilding(Building building){
        return buildingRepository.save(building);
    }
    public Building getBuildingById(String id){
        return buildingRepository.findBuildingById(id)
                .orElseThrow(() -> new BuildingNotFoundException("Building by id" + id + "not found"));
    }
    public void deleteBuildingById(String id){
        buildingRepository.deleteBuildingById(id);
    }
}
