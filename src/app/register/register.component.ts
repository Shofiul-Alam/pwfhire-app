import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Page} from '../models/ViewModel/Page';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

    public status = '';
    public emp = true ;
    public cli = false;
    public page: Page = new Page();

    constructor(
        // config: NgbDatepickerConfig
    ) {
        // config.minDate = {year: 1950, month: 1, day: 1};
        // config.maxDate = {year: 2099, month: 12, day: 31};
    }

    ngOnInit() {
    }

    client() {
        this.cli = true;
        this.emp = false;
    }
    employee() {
        this.emp = true;
        this.cli = false;
    }

    ngAfterViewInit() {
        $(function() {
            $('.preloader').fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip();
        });
        $('#to-recover').on('click', function() {
            $('#loginform').slideUp();
            $('#recoverform').fadeIn();
        });
    }

}
