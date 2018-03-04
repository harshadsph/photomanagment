export class SalesCycle {
    constructor( public name: string) { }
}

export class SalesCampaign {
  constructor(public campaign: string) { }
}

export class SalesParam {
  constructor(
    public dateRange: string,
    public salesCycle: string,
    public salesCampaign: string
  ) {}

}
