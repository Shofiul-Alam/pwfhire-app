import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-alart',
  templateUrl: 'alart.component.html',
  styleUrls: ['alart.component.css']
})

export class AlartComponent  {
  @Input('code') code = 0 ;
  @Input('status') status = '' ;

  cancelPopUp() {
        this.code = 0;
  }

}

