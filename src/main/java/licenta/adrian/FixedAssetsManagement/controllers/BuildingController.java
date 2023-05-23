package licenta.adrian.FixedAssetsManagement.controllers;

import licenta.adrian.FixedAssetsManagement.dto.BuildingDTO;
import licenta.adrian.FixedAssetsManagement.model.Building;
import licenta.adrian.FixedAssetsManagement.services.BuildingService;
import licenta.adrian.FixedAssetsManagement.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies/building")
public class BuildingController {

    @Autowired
    private final BuildingService buildingService;
    @Autowired
    private final CompanyService companyService;


    public BuildingController(BuildingService buildingService, CompanyService companyService) {
        this.buildingService = buildingService;
        this.companyService = companyService;
    }

    @GetMapping("company/{companyId}")
    public ResponseEntity<List<Building>> getBuildingsByCompanyId(@PathVariable("companyId") String companyId) {
        List<Building> allBuildings = buildingService.getBuildingsByCompanyId(companyId);
        return new ResponseEntity<>(allBuildings, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Building> getBuildingId(@PathVariable("id") String id) {
        Building building = buildingService.getBuildingById(id);
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Building> addBuilding(@RequestBody BuildingDTO buildingDTO) {
        Building newBuilding = new Building();
        newBuilding.setName(buildingDTO.getName());
        newBuilding.setAddress(buildingDTO.getAddress());
        newBuilding.setCompany(companyService.getCompanyById(buildingDTO.getCompanyId()));
        buildingService.addBuilding(newBuilding);
        return new ResponseEntity<>(newBuilding, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Building> updateBuilding(@PathVariable("id") String id, @RequestBody Building building) {
        Building buildingToUpdate = buildingService.getBuildingById(id);
        buildingToUpdate.setName(building.getName());
        buildingToUpdate.setAddress(building.getAddress());
        buildingService.updateBuilding(buildingToUpdate);
        return new ResponseEntity<>(buildingToUpdate, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteBuilding(@PathVariable("id") String id) {
        buildingService.deleteBuildingById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
