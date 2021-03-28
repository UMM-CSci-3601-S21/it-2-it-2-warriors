import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordlistsComponent } from './add-wordlists.component';

describe('AddWordlistsComponent', () => {
  let component: AddWordlistsComponent;
  let fixture: ComponentFixture<AddWordlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWordlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
