import { Component, OnInit } from '@angular/core';
import { SpacexService } from './../services/spacex.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  launches = [];
  loaderStatus: boolean = true;
  // sidebar code
  yearList = [];
  filterOptions = {
    qYear: '',
    qLaunch: '',
    qLand: ''
  }
  currentYear: string;
  currLanuchStatus: string;
  currLandingStatus: string;
  launchSuccess = ['true', 'false'];
  landingSuccess = ['true', 'false'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spxservice: SpacexService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.yearList = this.listOfYear(2006);
    this.getFilteredData();


  }

  getFilteredData() {
    this.route.queryParamMap.subscribe((queryParams) => {
      if (queryParams.has('launch_success')) {
        this.filterOptions.qLaunch = queryParams.get('launch_success');
      }
      if (queryParams.has('land_success')) {
        this.filterOptions.qLand = queryParams.get('land_success');
      }
      if (queryParams.has('launch_year')) {
        this.filterOptions.qYear = queryParams.get('launch_year');
      }

      if (this.filterOptions.qLaunch != '' || this.filterOptions.qLand != '' || this.filterOptions.qYear != '') {
        this.loaderStatus = true
        this.currLandingStatus = this.filterOptions.qLand;
        this.currLanuchStatus = this.filterOptions.qLaunch;
        this.currentYear = this.filterOptions.qYear;
        this.spxservice.getDataOnFilter(this.filterOptions.qLaunch, this.filterOptions.qLand, this.filterOptions.qYear).subscribe((newdata) => {
          this.launches = newdata;
          // console.log('newdata-->', newdata);
          this.loaderStatus = false;

        })
      }

    })
    if (this.filterOptions.qLaunch == '' && this.filterOptions.qLand == '' && this.filterOptions.qYear == '') {
      this.spxservice.getDashboardData().subscribe(data => {
        this.launches = data;
        this.loaderStatus = false;
      })
    }
  }

  
  listOfYear(startYear) {
    let yearsList = [];
    startYear = startYear || 2006;
    let currentYear = new Date().getFullYear();
    while (startYear <= currentYear) {
      yearsList.push(startYear++);
    }
    return yearsList;
  }

  getYear(year: string) {
    this.filterOptions.qYear = year;
    this.router.navigate([], {

      queryParams: { 'launch_year': year },
      queryParamsHandling: 'merge'
    })
  }

  getLaunch(launch: string) {
    this.filterOptions.qLaunch = launch
    this.router.navigate([], {

      queryParams: { 'launch_success': launch },
      queryParamsHandling: 'merge'
    })
  }

  getLanding(landing: string) {
    // this.currLandingStatus = landing;
    this.filterOptions.qLand = landing;
    this.router.navigate([], {
      queryParams: { 'land_success': landing },
      queryParamsHandling: 'merge'
    })
  }



}
