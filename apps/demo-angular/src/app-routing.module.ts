import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nativescript-custom-rotors', loadChildren: () => import('./plugin-demos/nativescript-custom-rotors.module').then((m) => m.NativescriptCustomRotorsModule) },
  { path: 'nativescript-downloader', loadChildren: () => import('./plugin-demos/nativescript-downloader.module').then((m) => m.NativescriptDownloaderModule) },
  { path: 'nativescript-filepicker', loadChildren: () => import('./plugin-demos/nativescript-filepicker.module').then((m) => m.NativescriptFilepickerModule) },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
