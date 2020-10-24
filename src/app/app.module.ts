import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/home/nav-bar/nav-bar.component';
import { FeaturedComponentComponent } from './components/home/featured-component/featured-component.component';
import { SearchComponentComponent } from './components/home/search-component/search-component.component';
import { FoodDisplayComponentComponent } from './components/home/food-display-component/food-display-component.component';
import { FoodListComponentComponent } from './components/home/food-list-component/food-list-component.component';
import { FoodItemComponentComponent } from './components/home/food-item-component/food-item-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    NavBarComponent,
    FeaturedComponentComponent,
    SearchComponentComponent,
    FoodDisplayComponentComponent,
    FoodListComponentComponent,
    FoodItemComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
