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

  public barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Average Oil Price' },
  ];

  constructor(private apiService: ApiService) { }

  private avgPrice: any = [];

  async ngOnInit() {
    this.avgPrice = await this.apiService.get();

      let tempLabel:any = [];
      let templatePrice:any = [];

      this.avgPrice.forEach((item:any) => {
        let monthAlfa: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        let monthName: string = monthAlfa[Number(item.month)-1];
        tempLabel.push(monthName);
        templatePrice.push(parseFloat(item.averagePrice).toFixed(2));
      })

      this.barChartLabels = tempLabel;
      this.barChartData = [ { data: templatePrice, label:'Average Oil Price' } ];
  }
}
