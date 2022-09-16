import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formData: any;
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  deleteFormId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myControl: FormControl = new FormControl();

  filteredOptions: any;
  options= [];

  constructor(private http: HttpClient, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.getFormList();
    this.getForms()
    this.initForm();
  }

  initForm() {
  
    this.myControl.valueChanges
      .pipe()
      .subscribe(response => {
        console.log('entered data is ', response);
        if (response) {
          this.filterData(response);
        } else {
          this.filteredOptions= this.options;
        }
      })
  }

  filterData(enteredData: string) {

    this.filteredOptions = this.options.filter((item:any) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormList() {
    this.http.get("http://localhost:3000/posts").subscribe((res: any) => {
      this.formData = res;
      this.dataSource = new MatTableDataSource(this.formData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  getForms() {
    this.http.get("http://localhost:3000/posts").pipe(map((response: any) => response.map((item: any) => item['name']))).subscribe((data: any) => {
      this.options= data;
      this.filteredOptions = data;
    })
  }

  createForm() {
    this.router.navigate(['formCreate'])
  }

  viewForm(data: any) {
    this.shared.sendPreviewFormData(data);
    this.router.navigate(['formPreview'])
  }

  editForm(data: any) {
    this.shared.sendEditFormData(data);
    this.router.navigate(['formCreate'])
  }


  deleteForm(data: any) {
    this.http.delete("http://localhost:3000/posts/" + data.id).subscribe((res) => {
      console.log(res);
      this.getFormList();
    })
  }

  createEligibilityForm() {
    this.router.navigate(['eligibilityCheck'])
  }

}

