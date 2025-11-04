import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lostpass } from './lostpass';

describe('Lostpass', () => {
  let component: Lostpass;
  let fixture: ComponentFixture<Lostpass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lostpass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lostpass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
