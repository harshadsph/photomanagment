import { Component, OnInit } from '@angular/core';
import { SalesParam } from '../navbar/salescycle.component';

import { DataService } from '../data.service';
import { ImagePanel } from './ImagePanel';

@Component({
  selector: 'app-imagepanel',
  templateUrl: './imagepanel.component.html',
  styleUrls: ['./imagepanel.component.css']
})

export class ImagepanelComponent implements OnInit {
  imagePanel: ImagePanel[];

  ngOnInit(): void {
   this._data.cast.subscribe(imagePanel => this.imagePanel = imagePanel);
  }
  constructor(private _data: DataService) { }

  public getSerachResult(salesParam: SalesParam) {
    this._data.getSearchResultRefresh();
  }

}
