import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptFilepickerComponent } from './nativescript-filepicker.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptFilepickerComponent }])],
  declarations: [NativescriptFilepickerComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptFilepickerModule {}
