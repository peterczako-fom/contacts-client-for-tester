import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreateDialogComponent } from './contact-create-dialog.component';

describe('ContactCreateDialogComponent', () => {
  let component: ContactCreateDialogComponent;
  let fixture: ComponentFixture<ContactCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
