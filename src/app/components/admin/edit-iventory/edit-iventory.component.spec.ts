import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIventoryComponent } from './edit-iventory.component';

describe('EditIventoryComponent', () => {
  let component: EditIventoryComponent;
  let fixture: ComponentFixture<EditIventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
