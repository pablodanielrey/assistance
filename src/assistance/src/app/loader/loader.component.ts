import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderHeader: string;
  loaderLogo: string;
  loaderFooter1: string;
  loaderFooter2: string;

  constructor(private router: Router) {
    this.loaderHeader= environment.loaderHeader;
    this.loaderLogo= environment.loaderLogo;
    this.loaderFooter1= environment.loaderFooter1;
    this.loaderFooter2= environment.loaderFooter2;
    
  }

  ngOnInit() {
  }

  acceder() {
    this.router.navigate(['/oauth2']);
  }

}
