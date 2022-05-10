import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactShowDialogComponent } from './contact-show-dialog.component';

describe('ContactShowDialogComponent', () => {
  let component: ContactShowDialogComponent;
  let fixture: ComponentFixture<ContactShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactShowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
