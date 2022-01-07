import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true
  }

  //public barChartLabels: any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Average Oil Price' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private apiService: ApiService) { }

  private avgPrice: any = [];

  async ngOnInit() {
    this.avgPrice = await this.apiService.get();

      let tempLabel:any = [];
      let templatePrice:any = [];

      this.avgPrice.forEach((item:any) => {
        //console.log(`item:: ${JSON.stringify(item.month)}`);      
        //this.barChartLabels.push(item.month); <-- this does not bind!!!
        //let monthAlfa: string = '';
        let monthAlfa: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        let monthName: string = monthAlfa[Number(item.month)-1];
        // switch (item.month){
        //   case '01': { monthAlfa = 'Jan'; break; }
        //   case '02': { monthAlfa = 'Feb'; break; }
        //   case '03': { monthAlfa = 'Mar'; break; }
        //   case '04': { monthAlfa = 'Apr'; break; }
        //   case '05': { monthAlfa = 'May'; break; }
        //   case '06': { monthAlfa = 'Jun'; break; }
        //   case '07': { monthAlfa = 'Jul'; break; }
        //   case '08': { monthAlfa = 'Ago'; break; }
        //   case '09': { monthAlfa = 'Sep'; break; }
        //   case '10': { monthAlfa = 'Oct'; break; }
        //   case '11': { monthAlfa = 'Nov'; break; }
        //   case '12': { monthAlfa = 'Dec'; break; }
        // }
        //tempLabel.push(item.month); --> works
        //tempLabel.push(monthAlfa); --> works better
        tempLabel.push(monthName); // --> works much better
        templatePrice.push(parseFloat(item.averagePrice).toFixed(2));
      })

      this.barChartLabels = tempLabel; // THIS BINDS!!
      this.barChartData = [ { data: templatePrice, label:'Average Oil Price' } ];
  }
}
