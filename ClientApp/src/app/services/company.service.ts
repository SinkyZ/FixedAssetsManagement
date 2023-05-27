import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
import { Building } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = 'companies';

  constructor(private httpClient: HttpClient) { }

  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getBuildingsByCompanyId(companyId: string): Observable<Building[]> {
    return this.httpClient.get<Building[]>(`${environment.apiUrl}/${this.url}/companyDetails/${companyId}`);
  }
  public getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${environment.apiUrl}/${this.url}`, company);
  }
  public deleteCompany(id: string): Observable<Company> {
    return this.httpClient.delete<Company>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public updateCompany(id: string, company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${environment.apiUrl}/${this.url}/${id}`, company);
  }
}