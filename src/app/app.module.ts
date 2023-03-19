import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SliderComponent } from './Components/slider/slider.component';
import { FlyoutComponent } from './Components/flyout/flyout.component';
import { HomeComponent } from './Pages/home/home.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { ProductComponent } from './Pages/product/product.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductsOfCategoryComponent } from './Pages/products-of-category/products-of-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorComponent } from './Components/error/error.component';
import { CommonModule } from '@angular/common';

var Routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'category/:id/products', component: ProductsOfCategoryComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SliderComponent,
    FlyoutComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    ProductComponent,
    ProfileComponent,
    ProductsOfCategoryComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot({
      // positionClass: 'toast-bottom-right',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
