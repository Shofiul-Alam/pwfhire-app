import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public showHide: boolean;
  constructor(
      private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.showHide = true;
  }

  changeShowStatus() {
      this.showHide = !this.showHide;
  }
  logout() {
      this._authService.logout();
  }

  ngAfterViewInit() {
      $(function () {
          $('.preloader').fadeOut();
      });

      const set = function () {
          const width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
          const topOffset = 0;
          if (width < 1170) {
              $('body').addClass('mini-sidebar');
              $('.navbar-brand span').hide();
              $('.sidebartoggler i').addClass('ti-menu');
          } else {
              $('body').removeClass('mini-sidebar');
              $('.navbar-brand span').show();
          }

          let height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
          height = height - topOffset;
          if (height < 1) { height = 1; }
          if (height > topOffset) {
              $('.page-wrapper').css('min-height', (height) + 'px');
          }

      };
      $(window).ready(set);
      $(window).on('resize', set);

      $(document).on('click', '.mega-dropdown', function (e) {
          e.stopPropagation();
      });

      $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
          $('.app-search').toggle(200);
      });

      (<any>$('.scroll-sidebar, .right-sidebar, .message-center')).perfectScrollbar();

      $('body').trigger('resize');
  }

}
