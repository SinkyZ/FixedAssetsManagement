package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.CompanyNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.Company;
import licenta.adrian.FixedAssetsManagement.repository.ICompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CompanyService {

    private final ICompanyRepository companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        this.companyRepository = companyRepository;
    }

    public Company addCompany(Company company){
        company.setId(UUID.randomUUID().toString());
        return companyRepository.save(company);
    }
    public List<Company> getAllCompanies(){
        return companyRepository.findAll();
    }
    public Company updateCompany(Company company){
        return companyRepository.save(company);
    }
    public Company getCompanyById(String id){
        return companyRepository.findCompanyById(id)
                .orElseThrow(() -> new CompanyNotFoundException("Company by id" + id + "not found"));
    }
    public void deleteCompany(String id){
        companyRepository.deleteCompanyById(id);
    }
}
