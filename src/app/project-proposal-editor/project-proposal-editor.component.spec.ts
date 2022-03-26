import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalEditorComponent } from './project-proposal-editor.component';

describe('ProjectProposalEditorComponent', () => {
  let component: ProjectProposalEditorComponent;
  let fixture: ComponentFixture<ProjectProposalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
