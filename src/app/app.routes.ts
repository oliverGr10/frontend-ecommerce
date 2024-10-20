
import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminInventoryComponent } from './components/admin/admin-inventory/admin-inventory.component';
import { AdminSalesComponent } from './components/admin/admin-sales/admin-sales.component';
import { AdminSuppliersComponent } from './components/admin/admin-suppliers/admin-suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminGuard } from './components/auth/guard-admin/admin.guard';




export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home',component:HomePageComponent },
    {path:'signIn',component:SignInComponent},
    {path:'productos', component: ProductsComponent},

    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            { path:'', redirectTo: 'dashboard-admin',pathMatch: 'full' },
          { path: 'dashboard-admin', component: AdminDashboardComponent },
          { path: 'inventory', component: AdminInventoryComponent },
          { path: 'sales', component: AdminSalesComponent},
          { path: 'suppliers', component: AdminSuppliersComponent },
        ]
      },
    {path:'**', redirectTo:'home', pathMatch:'full'}
];

