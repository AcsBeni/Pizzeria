import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passmod } from './passmod';

describe('Passmod', () => {
  let component: Passmod;
  let fixture: ComponentFixture<Passmod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passmod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passmod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
