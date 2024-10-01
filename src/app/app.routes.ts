
import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminInventoryComponent } from './components/admin/admin-inventory/admin-inventory.component';
import { AdminSalesComponent } from './components/admin/admin-sales/admin-sales.component';
import { AdminSuppliersComponent } from './components/admin/admin-suppliers/admin-suppliers.component';
import { AdminReportsComponent } from './components/admin/admin-reports/admin-reports.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ProductListComponent } from './user/product-list/product-list.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { ShoppingCartComponent } from './user/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';





export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home',component:HomePageComponent },
    {path:'dashboard', component:DashboardComponent},
    {path:'signIn',component:SignInComponent},
    {
      path: 'dashboard-user',
      component: UserLayoutComponent,
      children: [
        { path: 'products', component: ProductListComponent },
        { path: 'products/:id', component: ProductDetailComponent },
        { path: 'cart', component: ShoppingCartComponent},
        { path: 'profile', component: UserProfileComponent }
      ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path:'', redirectTo: 'dashboard-admin',pathMatch: 'full' },
          { path: 'dashboard-admin', component: AdminDashboardComponent },
          { path: 'inventory', component: AdminInventoryComponent },
          { path: 'sales', component: AdminSalesComponent},
          { path: 'suppliers', component: AdminSuppliersComponent },
          { path: 'reports', component: AdminReportsComponent },
        ]
      },
    {path:'**', redirectTo:'home', pathMatch:'full'}
];

