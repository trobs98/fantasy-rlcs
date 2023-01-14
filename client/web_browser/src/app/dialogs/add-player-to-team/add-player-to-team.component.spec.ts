import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerToTeamComponent } from './add-player-to-team.component';

describe('AddPlayerToTeamComponent', () => {
  let component: AddPlayerToTeamComponent;
  let fixture: ComponentFixture<AddPlayerToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayerToTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
