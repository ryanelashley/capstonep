import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectProposalEditorComponent } from './project-proposal-editor/project-proposal-editor.component';
import {ListProposalsComponent} from './list-proposals/list-proposals.component';
import {NotFoundComponent} from './not-found/not-found.component';

import { ProjectProposalService } from './project.proposal.service';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: ListProposalsComponent
}, {
  path: 'addProposal',   
  component: ProjectProposalEditorComponent
}, {
  path: 'listPropsal',  
  component: ListProposalsComponent
}, {
  path: 'editProposal/:_id',  
  component: ProjectProposalEditorComponent 
},{
  path: '**',  //when path cannot be found
  component: NotFoundComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectProposalEditorComponent,
    ListProposalsComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [ProjectProposalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
