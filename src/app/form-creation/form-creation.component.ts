import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.scss']
})
export class FormCreationComponent implements OnInit {

  form!: FormGroup;
  createdFormData: any;
  formList: any;
  validatorList: any;
  showForm = true;
  showPreview = false;
  formId: any;
  selectedFormData: any;
  isCreateDynamicFormOperation: boolean = true;

  controlTypeList: string[] = ['EDIT_TEXT', 'EDIT_TEXT_PHONE', 'DROPDOWN', 'DATE_PICKER', 'RADIO', 'AUTOCOMPLETE', 'CHECKBOX', 'IMAGE_PICKER']

  constructor(private formbuilder: FormBuilder, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formbuilder.group(
      {
        name: ['', Validators.required],
        eligibility: false,
        nextFormId: "",
        status: "enabled",
        sections: this.formbuilder.array([]),
      }
    );
  }

  sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  newSection(): FormGroup {
    return this.formbuilder.group({
      sectionTitle: "",
      subSection: this.formbuilder.array([])
    });

  }

  addSection() {
    this.sections().push(this.newSection());
  }

  removeSection(sectionIndex: number) {
    this.sections().removeAt(sectionIndex);
  }

  subSection(sectionIndex: number): FormArray {
    return this.sections()
      .at(sectionIndex)
      .get('subSection') as FormArray;
  }

  newSubSection(): FormGroup {
    return this.formbuilder.group({
      subSectionTitle: "",
      rows: this.formbuilder.array([])
    });

  }

  addSubSection(sectionIndex: number) {
    this.subSection(sectionIndex).push(this.newSubSection());
  }

  removeSubSection(sectionIndex: number, subSectionindex: number) {
    this.subSection(sectionIndex).removeAt(subSectionindex);
  }

  rows(sectionIndex: number, subSectionindex: number): FormArray {
    return this.subSection(sectionIndex)
      .at(subSectionindex)
      .get('rows') as FormArray;
  }

  newRow(): FormGroup {
    return this.formbuilder.group({
      fields: this.formbuilder.array([])
    });
  }

  addRow(sectionIndex: number, subSectionindex: number) {
    this.rows(sectionIndex, subSectionindex).push(this.newRow());
  }

  removeRow(sectionIndex: number, subSectionindex: number, rowIndex: number) {
    this.rows(sectionIndex, subSectionindex).removeAt(rowIndex);
  }

  fields(sectionIndex: number, subSectionindex: number, rowIndex: number): FormArray {
    return this.rows(sectionIndex, subSectionindex)
      .at(rowIndex)
      .get('fields') as FormArray;
  }

  newField(): FormGroup {
    return this.formbuilder.group({
      type: "",
      title: "",
      minLength: 0,
      maxLength: 0,
      validationType: null,
      required: false,
      row: false,
      childField: null,
      widgetData: this.formbuilder.array([]),
    });
  }

  addNewField(sectionIndex: number, subSectionindex: number, rowIndex: number) {
    this.fields(sectionIndex, subSectionindex, rowIndex).push(this.newField());
  }

  removeField(sectionIndex: number, subSectionindex: number, rowIndex: number, fieldIndex: number) {
    this.fields(sectionIndex, subSectionindex, rowIndex).removeAt(fieldIndex);
  }

  widgetData(sectionIndex: number, subSectionindex: number, rowIndex: number, fieldIndex: number): FormArray {
    return this.fields(sectionIndex, subSectionindex, rowIndex)
      .at(fieldIndex)
      .get('widgetData') as FormArray;
  }

  newWidgetData(): FormGroup {
    return this.formbuilder.group({
      title: '',
      value: '',
      isSelected: false,
    });
  }

  addWidgetData(sectionIndex: number, subSectionindex: number, rowIndex: number, childFieldIndex: number) {
    this.widgetData(sectionIndex, subSectionindex, rowIndex, childFieldIndex).push(this.newWidgetData());
  }

  removeWidgetData(sectionIndex: number, subSectionindex: number, rowIndex: number, childFieldIndex: number, widgetDataIndex: number) {
    this.widgetData(sectionIndex, subSectionindex, rowIndex, childFieldIndex).removeAt(widgetDataIndex);
  }

  onSave() {
    this.createdFormData = this.form.value;
    console.log(this.createdFormData);
    this.http.post("http://localhost:3000/posts",this.createdFormData).subscribe(res => {
      console.log(res);
    })
    
  }
}