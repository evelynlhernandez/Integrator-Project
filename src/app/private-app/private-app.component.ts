import { Component, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-private-app-root',
  templateUrl: './private-app.component.html',
  styleUrls: ['./private-app.component.scss']
})
export class PrivateAppComponent  implements AfterViewInit {
  opened = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
    this.cdRef.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
