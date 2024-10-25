import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenUrlComponent } from './imagen-url.component';

describe('ImagenUrlComponent', () => {
  let component: ImagenUrlComponent;
  let fixture: ComponentFixture<ImagenUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
