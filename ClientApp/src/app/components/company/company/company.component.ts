import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  constructor(private companyService: CompanyService) { }

  companyList!: Observable<Company[]>;
  companyIdToDelete: any;
  companyId: any;

  ngOnInit(): void {
    this.refreshCompanyList();
  }

  addCompanyForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
  });

  editCompanyFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
  });
  
  displayAddModal: boolean = false;
  displayDeleteModal: boolean = false;
  displayEditModal: boolean = false;

  addCompany() {
    var newCompany = new Company();
    newCompany.name = this.addCompanyForm.controls.nameControl.value!
    this.companyService.addCompany(newCompany).subscribe(() => {
      this.refreshCompanyList();
    });
    this.hideAddDialog();
  }

  refreshCompanyList() {
    this.companyList = this.companyService.getAllCompanies()
      .pipe(
        tap((companies) => {
        })
      );
  }

  deleteCompany(id?: string)
  {
    if(id!==undefined) 
    {
      this.companyService.deleteCompany(id).subscribe(()=>{this.refreshCompanyList();});
    }
    this.hideDeleteDialog();
  }

  updateCompany()
  {
    console.log(this.companyId);
    var company ={
      id: this.companyId,
      name: this.editCompanyFormGroup.controls.nameControl.value!,
    }
    console.log(company);
    this.companyService.updateCompany(this.companyId, company).subscribe(()=>{this.refreshCompanyList();});
    this.hideEditDialog();
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
    //this.getTLs();
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }
  showDeleteDialog(company: Company) {
    this.displayDeleteModal = true;
    if(company.id){
      this.companyIdToDelete = company.id;
    }
  }

  hideDeleteDialog(){
    this.displayDeleteModal = false;
  }

  showEditDialog(company: Company){
    this.displayEditModal = true;
    if(company.id)
    {
      this.companyId=company.id;
    }
    console.log(company);
    this.editCompanyFormGroup.controls.nameControl.setValue(company.name);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }
}
