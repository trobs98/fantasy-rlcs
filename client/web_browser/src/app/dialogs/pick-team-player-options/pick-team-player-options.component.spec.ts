import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTeamPlayerOptionsComponent } from './pick-team-player-options.component';

describe('PickTeamPlayerOptionsComponent', () => {
  let component: PickTeamPlayerOptionsComponent;
  let fixture: ComponentFixture<PickTeamPlayerOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickTeamPlayerOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTeamPlayerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
