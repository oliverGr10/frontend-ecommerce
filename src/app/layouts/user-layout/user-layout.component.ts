import { Component } from '@angular/core';
import { SidebarComponent } from '../../user/sidebar/sidebar.component';
import { HeaderComponent } from '../../user/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../user/footer/footer.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,RouterModule,FooterComponent],
  templateUrl: './user-layout.component.html',
  styles: ``
})
export class UserLayoutComponent {

}
