import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './notfound/not-found.component';
import {MainComponent} from './main/main.component';
import {DynamicComponent} from './dynamic/dynamic.component';
import {DynamicPathGuard} from './guards/dynamic-path.guard';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        MainComponent,
        DynamicComponent
    ],
    providers: [DynamicPathGuard],
    bootstrap: [AppComponent],
    entryComponents: [DynamicComponent]
})
export class AppModule {
}
