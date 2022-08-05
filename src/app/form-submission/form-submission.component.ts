import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit {

  submittedFormData: any;
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private http: HttpClient, private router: Router,private shared: SharedService) { 
    this.getFormList();
  }

  ngOnInit(): void {
    this.getFormList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormList() {
    this.http.get("http://localhost:3000/comments").subscribe((res) => {
      this.submittedFormData = res;
      this.dataSource = new MatTableDataSource(this.submittedFormData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewForm(data: any) {
    this.shared.sendPreviewFormData(data);
    this.router.navigate(['viewSubmitForm'])
  }
  
  deleteForm(data: any) {
    console.log(data)
    this.http.delete("http://localhost:3000/comments/" + data.id).subscribe((res) => {
      console.log(res);
      this.getFormList();
    })
  }
}
