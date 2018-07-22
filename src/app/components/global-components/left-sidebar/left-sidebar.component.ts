import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {LeftSidebarMenu} from '../../../models/ViewModel/LeftSidebarMenu';

declare var $: any;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})


export class LeftSidebarComponent implements OnInit, AfterViewInit {

  public role: any;
  public leftMenu: any;

  constructor(
      private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.role = this._authService.getAccessLevel();
    this.leftMenu = LeftSidebarMenu.getMenu(this.role);
  }

  ngAfterViewInit() {

        $(function () {
            const url = window.location.toString();
            let element = $('ul#sidebarnav li a').filter(function () {
                const a = <HTMLAnchorElement>this;
                return (a.href === url ? true : false);
            }).addClass('active').parent().addClass('active');
            while (true) {
                if (element.is('li')) {
                    element.parent().prev().addClass('arrow-down');
                    element.parent().addClass('show');
                    element.parent().slideDown(500);
                    element = element.parent().addClass('in').parent().addClass('active');
                } else {
                    break;
                }
            }
            // (<any>$('#sidebarnav')).metisMenu();
        });

        $('.has-arrow').click(function(e) {
            e.preventDefault();

            $('.has-arrow').removeClass('li-active');
            const $this = $(this);

            if ($this.next().hasClass('show')) {
                $('.has-arrow').removeClass('arrow-down');
                $this.next().removeClass('show');
                $this.next().slideUp(500);
            } else {
                $('.has-arrow').removeClass('arrow-down');
                $this.addClass('li-active');
                $this.parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(500);
                $this.addClass('arrow-down');
                $this.next().toggleClass('show');
                $this.next().slideToggle(500);
            }
        });



        $('ul#sidebarnav li').click(() => {
            $('ul#sidebarnav li a').removeClass('active').parent().removeClass('active');
            $('ul#sidebarnav li.emp-dash a').children().removeClass('tab-active');
            $('ul#sidebarnav li.emp-job a').children().removeClass('tab-active');
        });

    }

}
