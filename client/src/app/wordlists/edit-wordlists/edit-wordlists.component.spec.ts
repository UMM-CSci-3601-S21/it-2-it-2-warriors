import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordlistsComponent } from './edit-wordlists.component';

describe('EditWordlistsComponent', () => {
  let component: EditWordlistsComponent;
  let fixture: ComponentFixture<EditWordlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWordlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
