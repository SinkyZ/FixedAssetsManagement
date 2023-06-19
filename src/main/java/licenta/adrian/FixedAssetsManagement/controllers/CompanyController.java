package licenta.adrian.FixedAssetsManagement.controllers;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import licenta.adrian.FixedAssetsManagement.dto.CompanyDTO;
import licenta.adrian.FixedAssetsManagement.model.Building;
import licenta.adrian.FixedAssetsManagement.model.Company;
import licenta.adrian.FixedAssetsManagement.services.BuildingService;
import licenta.adrian.FixedAssetsManagement.services.CompanyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@SecurityRequirement(name = "bearerAuth")
public class CompanyController {
   @Autowired
   private final CompanyService companyService;
   private final BuildingService buildingService;


    public CompanyController(CompanyService companyService, BuildingService buildingService) {
        this.companyService = companyService;
        this.buildingService = buildingService;
    }

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies(){
        List<Company> allCompanies = companyService.getAllCompanies();
        return new ResponseEntity<>(allCompanies, HttpStatus.OK);
    }
    @GetMapping("companyDetails/{companyId}")
    public ResponseEntity<List<Building>> getBuildingsByCompanyId(@PathVariable("companyId") String companyId) {
        List<Building> allBuildings = buildingService.getBuildingsByCompanyId(companyId);
        return new ResponseEntity<>(allBuildings, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Company> getUniversityId(@PathVariable("id") String id){
        Company company = companyService.getCompanyById(id);
        return new ResponseEntity<>(company, HttpStatus.OK );
    }
    @PostMapping
    public ResponseEntity<Company> addCompany(@RequestBody CompanyDTO companyDTO){
        Company newCompany = new Company();
        newCompany.setName(companyDTO.getName());
        companyService.addCompany(newCompany);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable("id") String id, @RequestBody Company company){
        Company companyToEdit = companyService.getCompanyById(id);
        companyToEdit.setName(company.getName());
        companyService.updateCompany(companyToEdit);
        return new ResponseEntity<>(companyToEdit, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable("id") String id){
        companyService.deleteCompany(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
