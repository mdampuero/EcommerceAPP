import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { MoneyPipe } from './money.pipe';

@NgModule({
	declarations: [CapitalizePipe, MoneyPipe],
	exports: [CapitalizePipe, MoneyPipe]
})
export class PipesModule { }

