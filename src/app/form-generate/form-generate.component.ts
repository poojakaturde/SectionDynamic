import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-form-generate',
  templateUrl: './form-generate.component.html',
  styleUrls: ['./form-generate.component.scss']
})
export class FormGenerateComponent implements OnInit {

  formList: any;
  formData: any;
  formData1: any;
  submitForm!: FormGroup;
  sendForm!: FormGroup;
  sentForm!: FormGroup;
  widgetDataForm!: FormGroup;
  result: any;
  result1: any;
  sampleForm!: FormGroup;
  selectedForm: any;
  formId: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private shared: SharedService) {
  }

  ngOnInit(): void {
    this.formId = this.shared.getNextFormId();
    this.getSelectedForm();
    this.submitForm = this.formBuilder.group({});
  }

  formValidation() {
    const group: any = {};
    for (var list of this.formData1.sections) {
      for (var subSec of list.subSection) {
        for (var l of subSec.rows) {
          for (var f of l.fields) {
            if (f.type == 'EDIT_TEXT') {
              if (f.required) {
                group[f.title] = new FormControl(f.title);
              }
              else {
                group[f.title] = new FormControl();
              }
            } else if (f.type == 'EDIT_TEXT_PHONE') {
              if (f.required) {
                group[f.title] = new FormControl(f.title || '', [
                  Validators.required, Validators.minLength(f.minLength), Validators.maxLength(f.maxLength), Validators.pattern(f.validationType.regex)
                ]);
              }
              else {
                group[f.title] = new FormControl();
              }
            } else if (f.type == 'AUTOCOMPLETE') {
              if (f.required) {
                group[f.title] = new FormControl(f.title || '', [
                  Validators.required, Validators.pattern(f.validationType.regex)
                ]);
              }
              else {
                group[f.title] = new FormControl();
              }
            } else if (f.type == 'DROPDOWN') {
              if (f.required) {
                group[f.title] = new FormControl(f.title || '', [
                  Validators.required, Validators.pattern(f.validationType.regex)
                ]);
              }
              else {
                group[f.title] = new FormControl();
              }
            } else if (f.type == 'RADIO') {
              if (f.required) {
                group[f.title] = new FormControl(false, [
                  Validators.required
                ]);
              }
              else {
                group[f.title] = new FormControl(false);
              }
            } else if (f.type == 'DATE_PICKER') {
              if (f.required) {
                group[f.title] = new FormControl(f.title || '', [
                  Validators.required
                ]);
              }
              else {
                group[f.title] = new FormControl();
              }
            } else if (f.type == 'CHECKBOX') {
              if (f.required) {
                group[f.title] = new FormControl(Validators.required);
              }
              else {
                group[f.title] = new FormControl();
              }
            }
          }
        }
      }
    }
    this.submitForm = new FormGroup(group);
  }

  getSelectedForm() {
    this.http.get("http://localhost:3000/posts/" + "1").subscribe((res) => {
      this.formData1 = res;
      this.formValidation();
    })

  }


  onSubmit() {

    this.result = this.submitForm.value;
    console.log(this.result);
    this.submitFormData();
    console.log(this.result1);
    this.postSubmitForm();

  }


  postSubmitForm() {

    const sectionChildMap: any = {};
    const subSectionMap: any = {};
    var childItem: any = {};
    let keys = Array.from(this.result1.keys())
    for (var key of keys) {
      var name = String(key)
      var Temp = this.result1.get(key);
      let subKeys = Array.from(Temp.keys())
      for (var subKey of subKeys) {
        var subName = String(subKey)
        var Temp1 = Temp.get(subKey)
        childItem = {};
        Temp1.forEach((val: string, key: string) => {
          childItem[key] = val;
        })
        subSectionMap[subName] = childItem
      }
      sectionChildMap[name] = subSectionMap;
    }

    console.log(sectionChildMap)
  }

  submitFormData() {
    let childItem = new Map<string, string>();
    let subSecItem = new Map<string, Map<string, string>>();
    let sectionMap = new Map<string, Map<string, Map<string, string>>>();

    for (var list of this.formData1.sections) {
      for (var subSec of list.subSection) {
        childItem = new Map<string, string>();
        for (var row of subSec.rows) {
          for (var fields of row.fields) {
            childItem.set(fields.title, this.result[fields.title])
          }
        }
        subSecItem.set(subSec.subSectionTitle, childItem)
      }
      sectionMap.set(list.sectionTitle, subSecItem)
      this.result1 = sectionMap;
    }
  }

}
