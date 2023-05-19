import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptCustomRotorsComponent } from './nativescript-custom-rotors.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptCustomRotorsComponent }])],
  declarations: [NativescriptCustomRotorsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptCustomRotorsModule {}
