import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiSesrvice: ApiService) { }

  avgOilPrice:any = [];

  async ngOnInit() {
    const data:any = await this.apiSesrvice.get();
    this.avgOilPrice = data;
  }

}
