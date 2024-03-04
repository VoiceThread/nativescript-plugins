/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Application } from '@nativescript/core';
import { initializeCustomRotors } from '@voicethread/nativescript-custom-rotors';
initializeCustomRotors();

Application.run({ moduleName: 'app-root' });
