import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIventoryComponent } from './delete-iventory.component';

describe('DeleteIventoryComponent', () => {
  let component: DeleteIventoryComponent;
  let fixture: ComponentFixture<DeleteIventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteIventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
