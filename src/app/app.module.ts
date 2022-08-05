import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from
  '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormRenderComponent } from './form-render/form-render.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { FormGenerateComponent } from './form-generate/form-generate.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { HomeComponent } from './home/home.component';
import { ViewSubmitFormComponent } from './view-submit-form/view-submit-form.component';
import { EligibilityCheckComponent } from './eligibility-check/eligibility-check.component';
import { NotEligibleComponent } from './not-eligible/not-eligible.component';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SubmitEligibilityComponent } from './submit-eligibility/submit-eligibility.component';
@NgModule({
  declarations: [
    AppComponent,
    FormRenderComponent,
    FormCreationComponent,
    FormGenerateComponent,
    FormSubmissionComponent,
    HomeComponent,
    ViewSubmitFormComponent,
    EligibilityCheckComponent,
    NotEligibleComponent,
    SubmitEligibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
