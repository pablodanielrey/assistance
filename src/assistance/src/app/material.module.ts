import { NgModule } from '@angular/core';

import { MatButtonModule,
         MatButtonToggleModule,
         MatIconModule,
         MatInputModule,
         MatCheckboxModule,
         MatListModule,
         MatDialogModule,
         MatStepperModule,
         MatMenuModule,
         MatSidenavModule,
         MatToolbarModule,
         MatDatepickerModule,
         MatCardModule,
         MatSlideToggleModule,
         MatTableModule,
         MatTabsModule,
         MatSortModule,
         MatNativeDateModule,
         MatTooltipModule
       } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
})
export class MyMaterialModule { }
