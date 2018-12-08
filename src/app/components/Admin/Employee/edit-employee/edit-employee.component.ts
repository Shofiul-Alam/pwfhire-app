import {AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MapsAPILoader, AgmMarker} from '@agm/core';
import {Router} from '@angular/router';
import {Select2OptionData} from 'ng2-select2';
import {} from '@types/googlemaps';

import {Employee} from '../../../../models/DataModel/Employee';
import {EmployeeService} from '../../../../services/DataService/employee.service';
import {Page} from '../../../../models/ViewModel/Page';
import {Filter} from '../../../../models/ViewModel/Filter';
import {ValidationService} from '../../../../services/form/formValidation.service';
import {UserRequest} from '../../../../models/DataModel/DataRequestModel/UserRequest';
import {APIServices} from '../../../../services/API/apiServices.service';
import {Location} from '../../../../models/ViewModel/Location';
import {UploadService} from '../../../../services/DataService/upload.service';
import {Response} from '../../../../models/ServiceModel/Response';
import {ArrayMerge} from '../all-employee/all-employee.component';
import {EmployeeRequest} from '../../../../models/DataModel/DataRequestModel/EmployeeRequest';
import {url} from '../../../../models/Global/Global';
import {Qualification} from '../../../../models/DataModel/Qualification';
import {QualificationDocumentService} from '../../../../services/DataService/qualificationDocument.service';
import {Pagination} from '../../../../models/ViewModel/Pagination';
import {ImagePopUpService} from '../../../../services/function/imagePopUp.service';
import {QualificationService} from '../../../../services/DataService/qualification.service';
import {Skill} from '../../../../models/DataModel/Skill';
import {QualificationRequest} from '../../../../models/DataModel/DataRequestModel/QualificationRequest';
import {EmployeeInduction} from '../../../../models/DataModel/EmployeeInduction';
import {Induction} from '../../../../models/DataModel/Induction';
import {EmployeeInductionRequest} from '../../../../models/DataModel/DataRequestModel/EmployeeInductionRequest';
import {InductionDocumentService} from '../../../../services/DataService/inductionDocument.service';
import {InductionService} from '../../../../services/DataService/induction.service';




@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, AfterViewInit {

    public nationality: string;
    public page: Page;
    public options: Select2Options;
    public countriesList: Array<Select2OptionData> = new Array<Select2OptionData>();
    public showMultiSelect = false;
    public userRequest: UserRequest;
    public empUpload: any = null;
    public qualificationList: Array<Skill> = new Array<Skill>();
    public employeeQualifications: Array<Qualification> = new Array<Qualification>();
    public employeeDocument: Qualification = new Qualification();
    public inductionList: Array<Induction> = new Array<Induction>();
    public employeeInductions: Array<EmployeeInduction> = new Array<EmployeeInduction>();
    public employeeInduction: EmployeeInduction = new EmployeeInduction();
    public pagination: Pagination;
    public filter: Filter = new Filter();
    public url = url;


    public get employee(): Employee {
        return this._employeeService.employee;
    }
    public set employee(value: Employee) {
        this._employeeService.employee = value;
    }

    @ViewChild('address') public searchElement: ElementRef;

    @ViewChild(AgmMap) private map: any;

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
        this.redrawMap();
    }



  constructor(
      private _employeeService: EmployeeService,
      private _qualification: QualificationService,
      private _qualificationDocument: QualificationDocumentService,
      private _inductionService: InductionService,
      private _inductionDocument: InductionDocumentService,
      private _uploadService: UploadService,
      public validationForm: ValidationService,
      public imagePopUp: ImagePopUpService,
      private router: Router,
      private _rootNode: ElementRef,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private apiService: APIServices ) {

      if (!this.employee.identifier) {
          this.router.navigate(['/employees']);
      }

      this.userRequest = new UserRequest();
      this.pagination = new Pagination();

      this.page = new Page();
      this.page.edit = true;

    }

    ngOnInit() {
      this.validationForm.getCountriesList().subscribe(
          res => {
              Object.assign(this.countriesList, res);
              this.showMultiSelect = true;
          }
      );
      this.employee.daysWithUs = this.validationForm.getDays(this.employee.user.creationDate);
      this.getEmployeeQualifications();
      this.getAllQualifications();
      this.getAllInductions();
      this.getEmployeeInductions();
    }

    getAllQualifications() {
        this._qualification.getAllQualifications(this.pagination.current_page, this.filter)
            .subscribe(qualificationsResponse => {
                const newQualificationList = new Response();
                Object.assign(newQualificationList, qualificationsResponse);
                Object.assign(this.qualificationList, newQualificationList.data);
                console.log(this.qualificationList);
            }, error => {
                this.initError(error);
            });
    }

    getEmployeeQualifications() {
        this._qualificationDocument.getQualificationsByEmployee(this.pagination.current_page, this.filter, this.employee.identifier)
            .subscribe(qualificationDocumentResponse => {
            const documentResponse = new Response();
            Object.assign(documentResponse, qualificationDocumentResponse);
            Object.assign(this.employeeQualifications, documentResponse.data);
            console.log(this.employeeQualifications);
        }, error => {
            this.initError(error);
        });
    }

    getAllInductions() {
        this._inductionService.getAllInductions(this.pagination.current_page, this.filter)
            .subscribe(inductionListResponse => {
                const newInductionList = new Response();
                Object.assign(newInductionList, inductionListResponse);
                Object.assign(this.inductionList, newInductionList.data);
                console.log(this.inductionList);
            }, error => {
                this.initError(error);
            });
    }

    getEmployeeInductions() {
        this._inductionDocument.getEmployeeInductions(this.pagination.current_page, this.filter, 1)
            .subscribe(empInductionsResponse => {
                const documentResponse = new Response();
                Object.assign(documentResponse, empInductionsResponse);
                Object.assign(this.employeeInductions, documentResponse.data);
                console.log(this.employeeInductions);
            }, error => {
                this.initError(error);
            });
    }


    editLogin(employee: Employee) {
        this.employee = employee;
        Object.assign(this.userRequest, employee.user);
        setTimeout(() => {this.validationForm.floatLabel(); }, 100);
    }

    getAddress() {
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    // console.log(place);
                    this.getEmpAddress(place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng());
                });
            });
        });
    }

    getEmpAddress(address, lat, lng) {
        this.employee.address = address;
        this.employee.lat = lat;
        this.employee.long = lng;
        // this.apiService.redrawMap(this.map, this.employee.latitude, this.employee.longitude);
    }



    updateEmployee(employee) {
        // this.setPositions(this.employee.positions);
        const employeeRequest = new EmployeeRequest(this.employee);
        Object.assign(this.employee, employeeRequest);
        employeeRequest.dob = this.validationForm.convertToCustomDate(employee.dob);
        this.page.loader = true;

        const formData: any = new FormData();
        formData.append('_method', 'PUT');
        for ( const key in employeeRequest ) {
            if (employeeRequest[key]) {
                formData.append(key, employeeRequest[key]);
            }
        }

        this._employeeService.updateEmployee(formData, employeeRequest.identifier).subscribe(
            employeeResponse => {
                console.log(employeeResponse);
                const response = new Response();
                Object.assign(response, employeeResponse);
                Object.assign(this.employee, response.data);
                this.employee.dob = this.validationForm.createNgDate(this.employee.dob);
                this.page.loader = false;

                this.page.message = this.employee.firstName + ' has been successfully updated';
                this.page.cssClass = Page.SUCCESS;

                this.alert();
                this.cancelAvatarClick();
            },
            error => {
                this.page.error = true;
                this.validationForm.errorHandler(error);
                this.page.cssClass = Page.DANGER;
                this.page.loader = false;
                this.alert();
            }
        );


    }

    ngAfterViewInit() {
        this.page.modals.account = $(this._rootNode.nativeElement).find('div.modal#account');
        this.page.modals.qualification = $(this._rootNode.nativeElement).find('div.modal#addSkill');
        this.page.modals.delete = $(this._rootNode.nativeElement).find('div.modal#deleteData');
        this.page.modals.induction = $(this._rootNode.nativeElement).find('div.modal#uploadInduction');
        console.log(this.page.modals);
    }

/** Functions are used in this component **/

    countryChange(data: {value: string[]}) {
        setTimeout(() => {
            let selectedCountriesCode = '';
            for (const countryCode of data.value) {
                selectedCountriesCode += countryCode + '|';
            }
            this.employee.nationality = selectedCountriesCode;
        }, 100);
    }

    alert() {

        setTimeout(() => {
            this.page.message = 0;
            this.page.cssClass = null;
            this.page.error = false;
        }, 10000);
    }

    /** Documents Tab Functionality - Tab (Documents) **/
    initQualification($event) {
        this.empUpload = true;
        this.employeeDocument = new Qualification();
        this.clearFile();
        this.page.fileUpload = false;
    }

    addQualification(employeeQualification: Qualification) {
        this.page.loader = true;
        const empQualificationRequestObj = new QualificationRequest(employeeQualification);
            empQualificationRequestObj.employeeIdentifier = this.employee.identifier;
            empQualificationRequestObj.issuedBy = this.validationForm.convertToCustomDate( empQualificationRequestObj.issuedBy);
            empQualificationRequestObj.expireOn = this.validationForm.convertToCustomDate( empQualificationRequestObj.expireOn);

        const formData: any = new FormData();
        for ( const key in empQualificationRequestObj ) {
            if (empQualificationRequestObj[key]) {
                formData.append(key, empQualificationRequestObj[key]);
            }
        }
        this._qualificationDocument.addQualification(formData).subscribe(
            qualificationDocumentResponse => {
                const qualificationDocResponse = new Response();
                const newQualification = new Qualification();
                Object.assign(qualificationDocResponse, qualificationDocumentResponse);
                Object.assign(newQualification, qualificationDocResponse.data);
                this.employeeQualifications.push(newQualification);
                this.page.cssClass = Page.SUCCESS;
                this.page.message = 'Document for the ' + newQualification.skill.name + ' has been successfully Added';
                this.page.loader = false;
                this.page.modals.qualification.modal('hide');
                this.alert();
            }, error => {
                this.initError(error);
            });
    }

    editDocument (data) {
        this.empUpload = null;
        this.employeeDocument = data;
        this.employeeDocument.issuedBy = this.validationForm.createNgDate(this.employeeDocument.issuedBy);
        this.employeeDocument.expireOn = this.validationForm.createNgDate(this.employeeDocument.expireOn);
        setTimeout(() => this.validationForm.floatLabel(), 100);
    }
    undoQualificaiton() {
        this.employeeDocument.issuedBy = this.validationForm.convertToCustomDate(this.employeeDocument.issuedBy);
        this.employeeDocument.expireOn = this.validationForm.convertToCustomDate(this.employeeDocument.expireOn);
    }

    updateQualification(employeeQualification: Qualification) {
        this.page.loader = true;
        const empQualificationRequestObj = new QualificationRequest(employeeQualification);
        empQualificationRequestObj.employeeIdentifier = this.employee.identifier;
        empQualificationRequestObj.issuedBy = this.validationForm.convertToCustomDate( empQualificationRequestObj.issuedBy);
        empQualificationRequestObj.expireOn = this.validationForm.convertToCustomDate( empQualificationRequestObj.expireOn);

        const formData: any = new FormData();
        formData.append('_method', 'PUT');
        for ( const key in empQualificationRequestObj ) {
            if (empQualificationRequestObj[key]) {
                formData.append(key, empQualificationRequestObj[key]);
            }
        }
        this._qualificationDocument.updateQualification(formData, empQualificationRequestObj.identifier).subscribe(
            qualificationUpdateResponse => {
                const qualificationDocResponse = new Response();
                const updatedQualification = new Qualification();
                Object.assign(qualificationDocResponse, qualificationUpdateResponse);
                Object.assign(updatedQualification, qualificationDocResponse.data);

                const i = this.employeeQualifications.findIndex(o => o.identifier === updatedQualification.identifier);
                if (this.employeeQualifications[i]) {
                    this.employeeQualifications[i] = updatedQualification;
                } else {
                    this.employeeQualifications.push(updatedQualification); }

                this.page.loader = false;
                this.page.cssClass = Page.SUCCESS;
                this.page.message = 'Document for the ' + updatedQualification.skill.name + ' has been successfully updated';
                this.alert();
                this.page.modals.qualification.modal('hide');
            }, error => {
                this.initError(error);
            });
    }
    initDelete(qualification: Qualification) {
        this.employeeDocument = qualification;
    }

    deleteQualification() {
        const qualification = this.employeeDocument;
        this.page.loader = true;
        this._qualificationDocument.deleteQualification(qualification.identifier).subscribe(() => {
            const i = this.employeeQualifications.findIndex(o => o.identifier === qualification.identifier);
            if (this.employeeQualifications[i]) {
                this.employeeQualifications.splice(i);
            }

            this.page.loader = false;
            this.page.cssClass = Page.DANGER;
            this.page.message = 'Document for the ' + qualification.skill.name + ' has been successfully deleted';
            this.alert();
            this.page.modals.delete.modal('hide');
            this.employeeDocument = null;
        }, error => {
            this.initError(error);
        });
    }


    qualificationChanged(data: {value: string}) {
        setTimeout(() => {
            this.employeeDocument.skillIdentifier = data.value;
        }, 100);
    }


    setPositions(positions: Array<any>) {
        let positionsIds = '';
        if (typeof positions !== 'undefined' && positions.length > 0) {
            for (const index in positions) {
                if (positions.length > 1 && positions.length.toString() !== (index + 1).toString() ) {
                    positionsIds += positions[index].identifier + '|';
                } else if (positions.length.toString() === (index + 1).toString()) {
                    positionsIds += positions[index].identifier;
                } else {
                    positionsIds = positions[index].identifier;
                }
            }
            this.employee.positionsIdentifier = positionsIds;
        }
    }



    /** Induction Upload and Inductioin Tabs*****************************************/

    initInduction($event) {
        this.empUpload = true;
        this.employeeInduction = new EmployeeInduction();
        this.employeeInduction.employeeIdentifier = this.employee.identifier;
        this.employeeInduction.formIdentifier = this.inductionList[0].id;
        this.clearFile();
        this.page.fileUpload = false;
    }

    addInduction(employeeInduction: EmployeeInduction) {
        this.page.loader = true;
        const empInductionRequest = new EmployeeInductionRequest(employeeInduction);
        empInductionRequest.employeeIdentifier = this.employee.identifier;

        const formData: any = new FormData();
        for ( const key in empInductionRequest ) {
            if (empInductionRequest[key]) {
                formData.append(key, empInductionRequest[key]);
            }
        }
        this._inductionDocument.addEmployeeDocument(formData).subscribe(
            inductionDocumentResponse => {
                const inductionDocResponse = new Response();
                const newInduction = new EmployeeInduction();
                Object.assign(inductionDocResponse, inductionDocumentResponse);
                Object.assign(newInduction, inductionDocResponse.data);
                this.employeeInductions.push(newInduction);
                this.page.cssClass = Page.SUCCESS;
                this.page.message = 'Document for the ' + newInduction.form.inductionName + ' has been successfully Added';
                this.page.loader = false;
                this.page.modals.induction.modal('hide');
                this.alert();
            }, error => {
                this.initError(error);
            });
    }

    editInduction (data) {
        this.empUpload = null;
        this.employeeInduction = data;
        setTimeout(() => this.validationForm.floatLabel(), 100);
    }

    updateInduction(employeeInduction: EmployeeInduction) {
        this.page.loader = true;
        const empInductionRequestObj = new EmployeeInductionRequest(employeeInduction);
        empInductionRequestObj.employeeIdentifier = this.employee.identifier;

        const formData: any = new FormData();
        formData.append('_method', 'PUT');
        for ( const key in empInductionRequestObj ) {
            if (empInductionRequestObj[key]) {
                formData.append(key, empInductionRequestObj[key]);
            }
        }
        this._qualificationDocument.updateQualification(formData, empInductionRequestObj.identifier).subscribe(
            inductionUpdateResponse => {
                const inductionDocResponse = new Response();
                const updatedInduction = new Qualification();
                Object.assign(inductionDocResponse, inductionUpdateResponse);
                Object.assign(updatedInduction, inductionDocResponse.data);

                const i = this.employeeQualifications.findIndex(o => o.identifier === updatedInduction.identifier);
                if (this.employeeQualifications[i]) {
                    this.employeeQualifications[i] = updatedInduction;
                } else {
                    this.employeeQualifications.push(updatedInduction); }

                this.page.loader = false;
                this.page.cssClass = Page.SUCCESS;
                this.page.message = 'Document for the ' + updatedInduction.skill.name + ' has been successfully updated';
                this.alert();
                this.page.modals.updatedInduction.modal('hide');
            }, error => {
                this.initError(error);
            });
    }
    initDeleteInduction(employeeInduction: EmployeeInduction) {
        this.employeeInduction = employeeInduction;
    }

    deleteInduction() {
        const employeeInduction = this.employeeInduction;
        this.page.loader = true;
        this._inductionDocument.deleteEmployeeDocument(employeeInduction.identifier).subscribe(() => {
            const i = this.employeeQualifications.findIndex(o => o.identifier === employeeInduction.identifier);
            if (this.employeeQualifications[i]) {
                this.employeeQualifications.splice(i);
            }

            this.page.loader = false;
            this.page.cssClass = Page.DANGER;
            this.page.message = 'Document for the ' + employeeInduction.form.inductionName + ' has been successfully deleted';
            this.alert();
            this.page.modals.delete.modal('hide');
            this.employeeDocument = null;
        }, error => {
            this.initError(error);
        });
    }

    cancleFile() {
        this.empUpload = null;
        $('.dropify-clear').trigger('click');
    }

    inductionChanged(data: {value: string}) {
        setTimeout(() => {
            this.employeeInduction.formIdentifier = data.value;
        }, 100);
    }
    /** Functions required in Template**/

    initError(error) {
        this.page.error = true;
        this.validationForm.errorHandler(error);
        this.page.cssClass = Page.DANGER;
        this.page.loader = false;
        this.alert();
    }

    redrawMap() {
        // this.map.triggerResize()
        //     .then(() => this.map._mapsWrapper.setCenter({lat: this.loc.lat, lng: this.loc.lng}));
    }

    checkPdf(a) {
        let x;
        if (a) {
            if (a.indexOf('/') === -1) {
                x = this.validationForm.picIcon(a);
            } else {
                const n = a.indexOf('/');
                x = this.validationForm.picIcon(a.slice(n + 1));
            }
            if (x === 'pdf') {return 1; }
            return 0;
        }
    }

    validAddbutton() {
        if (this.empUpload === null) {return true; }
        return false;
    }

    parseInFloat(number: any) {
        return parseFloat(number);
    }

    cancelPopUp() {
        this.page.message = 0;
        this.page.error = false;
    }

    clearFile() {
        this.page.fileUpload = true;
        this.empUpload = true;

        $('.dropify-clear').trigger('click');
        setTimeout(() => {
            this._uploadService.avatarUpload();
        }, 100);
    }

    removeFile() {
        this.empUpload = null;
        const file: any =  $(this._rootNode.nativeElement).find('.dropify');
        const a = file.dropify();
        a.on('dropify.afterClear', () => {
            console.log('cancel Upload');
        });
    }

    cancelAvatarClick() {
        this.page.fileUpload = false;
        $('.dropify-clear').trigger('click');
        this.empUpload = null;
    }

    fileChangeEvent(fileInput: any, obj: any) {
        console.log(obj);
        this.page.fileLoad = true;
        this.empUpload = <Array<File>>fileInput.target.files;
        obj.image = this.empUpload[0];
        console.log(obj);
    }
    checkExpiry(data) {
        return this.validationForm.checkExpiryDate(data);
    }

}
