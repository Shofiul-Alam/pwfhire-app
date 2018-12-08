import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {Select2OptionData} from 'ng2-select2';
import {Router} from '@angular/router';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

import {EmployeeService} from '../../../../services/DataService/employee.service';
import {ValidationService} from '../../../../services/form/formValidation.service';
import {UserService} from '../../../../services/DataService/user.service';

import {Pagination} from '../../../../models/ViewModel/Pagination';
import {Employee} from '../../../../models/DataModel/Employee';
import {Response} from '../../../../models/ServiceModel/Response';
import {Filter} from '../../../../models/ViewModel/Filter';
import {Page} from '../../../../models/ViewModel/Page';
import {EmployeeRequest} from '../../../../models/DataModel/DataRequestModel/EmployeeRequest';
import {UserRequest} from '../../../../models/DataModel/DataRequestModel/UserRequest';
import {ErrorResponse} from '../../../../models/ServiceModel/ErrorResponse';
import {APIServices} from '../../../../services/API/apiServices.service';


declare var $: any;

export const ArrayMerge = (arr, obj) => arr && arr.map(t => t.identifier === obj.identifier ? obj : t);

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit, AfterViewInit {

    /** My code started here **/
    public employees: Array<Employee>;
    public employeeRequest: EmployeeRequest;
    public userRequest: UserRequest;
    public pagination: Pagination;
    public filter: Filter;
    public page: Page;
    public options: Select2Options;
    public countriesList: Array<Select2OptionData> = new Array<Select2OptionData>();
    public nationality: string;
    public showMultiSelect = false;
    public error: ErrorResponse;

    public get employee(): Employee {
        return this._employeeService.employee;
    }
    public set employee(value: Employee) {
        this._employeeService.employee = value;
    }

    @ViewChild('address') public searchElement: ElementRef;

    constructor(
        public validationForm: ValidationService,
        private _employeeService: EmployeeService,
        private _userService: UserService,
        private _rootNode: ElementRef,
        private router: Router,
        private apiService: APIServices,
        // private _export: ExportCSV,
        // config: NgbDatepickerConfig,
        // public  commonService: CommonService,

    ) {
        /** My Code started Here **/
        this.employees = new Array<Employee>();
        this.pagination = new Pagination();
        this.filter = new Filter();
        this.page = new Page();
        this.userRequest = new UserRequest();
        this.error = new ErrorResponse();
        // config.minDate = {year: 1950, month: 1, day: 1};
        // config.maxDate = {year: 2099, month: 12, day: 31};

    }

    private init() {
        this.employee = new Employee();
    }

    ngOnInit() {
      this.getAllEmployees(this.filter);
      this.validationForm.getCountriesList().subscribe(
          res => {
              Object.assign(this.countriesList, res);
              this.showMultiSelect = true;
          }
      );
      this.options = {
        multiple: true,
      };
    }

    initEmployee() {
        this.employee = new Employee();
        console.log(this.employee);
        this.nationality = '';
        this.page.edit = false;
        window.sessionStorage.removeItem('address');
    }

    cancelPopUp() {
        this.page.message = 0;
    }

    loadPage(page: number) {
        this.pagination.current_page = page;
        this.getAllEmployees(this.filter);
    }

    getAllEmployees(filter: Filter) {
        this._employeeService.getAllEmployees(this.pagination.current_page, filter).subscribe(
            responseAllEmployee => {
                const employeesRes: Response = new Response();
                Object.assign(employeesRes, responseAllEmployee);
                Object.assign(this.employees, employeesRes.data);
                Object.assign(this.pagination, employeesRes.meta.pagination);
            },
            error => {
                console.log(<any> error);
            }
        );
    }

    sort(orderBy, sort) {
      this.filter.orderBy = orderBy;
      this.filter.sort = sort;
        this.getAllEmployees(this.filter);
    }

    initApproval(emp) {
        this.employee = emp;
        this.page.modals.approve.modal('show');
    }

    employeeApproval(employee: Employee) {
        this.page.loader = true;
        if (employee.approved) {
            this.approve(employee.identifier, 0, 'unapproved');
        } else {
           this.approve(employee.identifier, 1, 'approved');
        }
    }

    approve(id, bool, msg) {
        this._employeeService.approveEmployee(id, bool).subscribe(
            res => {
                this.page.loader = false;
                const employeeRes = new Response();
                Object.assign(employeeRes, res);
                const employee = new Employee();
                Object.assign(employee, employeeRes.data);

                this.page.cssClass = Page.SUCCESS;
                this.page.message = employee.firstName + ' has been successfully ' + msg;
                this.alert();

                this.employees = ArrayMerge(this.employees, employee);
                this.page.modals.approve.modal('hide');
            },
            error => {
                this.page.loader = false;
                Object.assign(this.error, error.error);
                this.errorHandler(this.error);
            }
        );
    }

    editEmployee(employee: Employee) {
        this.showMultiSelect = true;
        this.page.edit = true;
        this.employee = employee;
        const countryCodes = this.employee.nationality.split('|');
        if (countryCodes.length) {
            this.nationality = countryCodes;
        }
        setTimeout(() => {this.validationForm.floatLabel(); }, 100);
        this.employee.dob = this.validationForm.createNgDate(employee.dob);
        this.employee._method = 'PUT';
    }
    updateEmployee(employee: Employee) {
        this.page.loader = true;
        this.employee = employee;
        this.employee.dob = this.validationForm.convertToCustomDate(employee.dob);
        this.employeeRequest = new EmployeeRequest(this.employee);
        this._employeeService.quickUpdateEmployee(this.employeeRequest, this.employeeRequest.identifier). subscribe(
            employeeResponse => {
                const response = new Response();
                Object.assign(response, employeeResponse);
                Object.assign(this.employee, response.data);
                ArrayMerge(this.employees, this.employee);
                this.page.loader = false;
                this.page.modals.employee.modal('hide');

                this.page.cssClass = Page.SUCCESS;
                this.page.message = employee.firstName + ' has been successfully updated';
                this.alert();
            },
            error => {
                this.page.loader = false;
                Object.assign(this.error, error.error);
                this.errorHandler(this.error);
            }
        );
    }

    editLogin(employee: Employee) {
        this.page.modals.employee.modal('hide');
        this.employee = employee;
        Object.assign(this.userRequest, employee.user);
    }

    updateLogin(employee: Employee) {
        this.page.loader = true;
        this.employee = employee;
        Object.assign(this.userRequest, employee.user);
        console.log(this.userRequest);
        this._userService.updateUser(this.userRequest).subscribe(
            res => {
                const response = new Response();
                Object.assign(response, res);
                Object.assign(this.employee.user, response.data);
                ArrayMerge(this.employees, this.employee);
                this.page.loader = false;
                this.page.modals.account.modal('hide');
                this.page.modals.employee.modal('show');
            },
            error => {
                this.page.loader = false;
                Object.assign(this.error, error.error);
                this.validationForm.errorHandler(error);
            }
        );
    }

    showEmployeeForm() {
        this.page.modals.employee.modal('show');
    }

    edit(employee) {
        this.employee = employee;
        this.employee.dob = this.validationForm.createNgDate(employee.dob);
        this.router.navigate(['/edit-employee']);
    }

    ngAfterViewInit() {
        this.page.modals.archive = $(this._rootNode.nativeElement).find('div.modal#archive');
        this.page.modals.approve = $(this._rootNode.nativeElement).find('div.modal#approve');
        this.page.modals.employee = $(this._rootNode.nativeElement).find('div.modal#add');
        this.page.modals.account = $(this._rootNode.nativeElement).find('div.modal#account');
        console.log(this.page.modals);
    }

    initDelete(data) {
        // this.employeeName = data.user.firstName + ' ' + data.user.lastName;
        // this.extra.index = this.employeeList.indexOf(data);
        // this.employee = data;
        // this.employee.archived = true;
    }

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
        setTimeout( () => {
            this.page.cssClass = this.page.message;
            this.page.message = this.page.cssClass;
        }, 2000);

        setTimeout(() => {
            this.page.message = 0;
            this.page.cssClass = null;
        }, 5000);
    }

    getAddress() {
        this.apiService.addressAutoComplete(this.searchElement.nativeElement);
    }

    errorHandler(error: ErrorResponse) {
        if (this.error.error) {
            for (const errItem in error.error) {
                if (error.error.hasOwnProperty(errItem)) {
                    for (const err of error.error[errItem]) {
                        const elem = document.getElementById(errItem);
                        if (elem) {
                            elem.innerHTML = err;
                        }
                    }
                }
            }
        }
    }
    //
    // getCountryList(){
    //     this._empManagementService.getCounrt().subscribe(
    //         res => this.countryList = res
    //     );
    // }
    //
    //
    //
    // downloadCSV(){
    //     let emp = this._empManagementService.formatEmpCSV(this.employeeList);
    //     this._export.downloadCSV({ filename: "Employee-Data-Table.csv", title:'Employee List' }, emp);
    // }
    //
    //
    // categoryShow(data){
    //     if (data == null || data==''){
    //         return "";
    //     }
    //     return data.categoryName;
    // }
    //
    // getEmpAddress(){
    //     let address = JSON.parse(sessionStorage.getItem('address'));
    //     if(address!=null){
    //         this.employee.address = address.address;
    //         this.employee.lattitude = address.lat;
    //         this.employee.longitude = address.lng;
    //     }
    // }
    //
    //
    //

    //
    // onSubmit(f) {
    //     this.getEmpAddress();
    //     let userType = new UserType(0, "employee");
    //     this.employee.user.userType = userType;
    //     this.extra.loader = true;
    //     this._empManagementService.addDataWithAvatar(this.employee,this.avatar, this.userDeclearation).subscribe(
    //         response => {
    //             this.extra.code = response.code;
    //             // console.log(response);
    //             if(response.code != 200) {
    //                 this.validationForm.getResponce(response,this.extra);
    //             } else {
    //                 window.sessionStorage.removeItem('address');
    //                 this.validationForm.successRes(response,f,this.extra);
    //                 this.extra.modalEl.modal('hide');
    //                 this.employee = response.Employee;
    //                 var date = this.validationForm.convertToCustomDate(response.Employee.dob);
    //                 this.employee.dob = date;
    //                 this.router.navigate(['/edit-employee']);
    //             }
    //         },
    //         error => {
    //             console.log(<any> error);
    //             this.validationForm.errorStatus(error,this.extra);
    //         }
    //     );
    // }
    //
    // reset(f){
    //     f.form.reset();
    // }
    //
    //
    //
    //
    // changeApproval (){
    //     this.extra.loader = true;
    //     this.employee.approved = !this.employee.approved;
    //     this._empManagementService.approve(this.employee).subscribe(
    //         response => {
    //             this.extra.code = response.code;
    //             if(response.code==200){
    //                 // console.log(response);
    //                 this.validationForm.getResponce(response,this.extra);
    //                 this.extra.modalEl.modal('hide');
    //             } else this.validationForm.getResponce(response,this.extra);
    //         },
    //         error => {
    //             console.log(<any> error);
    //             this.validationForm.errorStatus(error,this.extra);
    //         }
    //     );
    // }
    //
    //
    // archiveData(){
    //     this.extra.loader = true;
    //     // console.log(this.employeeList.length);
    //     this.employeeList.splice(this.extra.index,1);
    //     // console.log(this.employeeList.length);
    //
    //     this._empManagementService.isArchive(this.employee).subscribe(
    //         response => {
    //             this.extra.code = response.code;
    //             if(response.code == 200){
    //                 this.validationForm.getResponce(response,this.extra);
    //                 // console.log(response);
    //                 this.extra.modalEl.modal('hide');
    //             } else this.validationForm.getResponce(response,this.extra);
    //         },
    //         error => {
    //             console.log(<any> error);
    //             this.validationForm.errorStatus(error,this.extra);
    //         }
    //     );
    // }

    /*********** Advance Filter**************/

    // toggelIcon(){
    //     this.extra.pro = !this.extra.pro;
    // }
    //
    // searchFilterData(){
    //     if(!(this.mainEmployeeList.length>0))
    //         this.mainEmployeeList = this.employeeList;
    //     let searchData = this._empManagementService.formateFilterData(this.empFilter);
    //     // console.log(searchData);
    //     this.employeeList = this._empManagementService.advanceFilter(this.mainEmployeeList,searchData);
    // }
    //
    // resetFilter(){
    //     this.empFilter = new EmpListFilter();
    //     setTimeout(()=>this.validationForm.floatLabel(),100);
    //     if(this.mainEmployeeList.length>0) {
    //         this.employeeList = this.mainEmployeeList;
    //         this.mainEmployeeList = [];
    //     }
    // }


}
