import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alertify',
  templateUrl: './alertify.component.html',
  styleUrls: ['./alertify.component.css']
})
export class AlertifyComponent implements OnInit {
  @Input() alert:boolean = false;
@Input() body: any = {
  message: '',
  type: '',
};

  constructor() { }

  ngOnInit() {
  }

}
