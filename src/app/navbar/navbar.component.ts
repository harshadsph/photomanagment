import { Component, OnInit, NgZone } from '@angular/core';
import { SalesCycle } from './salescycle.component';
import {SalesCampaign} from './salescycle.component';
import {SalesParam} from './salescycle.component';
import { DataService } from '../data.service';
import { ImagepanelComponent } from '../imagepanel/imagepanel.component';
import { NavbarServerData } from './NavbarServerData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  submitted = false;
  model = new SalesParam ('', '-1', '-1');
  selectedSalesCycle = ' ';
  selectedSalesCampaign = ' ';

  constructor(private _data: DataService) { }

  salescycle = [
    new SalesCycle('MT 1st rollout' ),
    new SalesCycle('MT 2017 Sales 8' ),
    new SalesCycle('MT 2017 Sales 10' ),
    new SalesCycle('TW_Cycles_Poya_四月份_2017'),
    new SalesCycle('TW_Cycle_MHT_201701')
  ];

  salescampaign = [

    new SalesCampaign('S9 Watson Neutrogena FF 2D GE'),
    new SalesCampaign('S9 WEL JB Tri-pack 2D GE'),
    new SalesCampaign('2017 WAT JB Shiny Drop Shelf Strip'),
    new SalesCampaign('2017 WAT Listerine Short Product Tray'),
    new SalesCampaign('[Drug]OliveYoung_Campaign_Sep17'),
    new SalesCampaign('[Drug]Watsons_Campaign_Jul17')

  ];

  navbarSalesCampaignData: string[];

  // event handler for the select element's change event
  selectSalesCycleChangeHandler (event: any) {
    // update the ui
    this.selectedSalesCycle = event.target.value;
    console.log(this.selectedSalesCycle);
    this.salescampaign = [];
    this.model.salesCampaign = '-1';
    this._data.getSelectCampaignData(this.selectedSalesCycle)
    .subscribe(navbarServerData => this.navbarSalesCampaignData = navbarServerData);

   }

   // event handler for the select element's change event
   selectSalesCampaignChangeHandler (event: any) {
    // update the ui
    this.selectedSalesCampaign = event.target.value;
    console.log(this.selectedSalesCampaign);
  }

  searchForm() {
    this.submitted = true;
    new ImagepanelComponent(this._data).getSerachResult(this.model);
  }

  // tslint:disable-next-line:member-ordering
  navbarSalesCycleData: string[];

  getSelectCycleData(): void {
    this._data.getSelectCycleData().subscribe(navbarServerData => this.navbarSalesCycleData = navbarServerData);

  }

  ngOnInit(): void {
     this.getSelectCycleData();
   }



}

