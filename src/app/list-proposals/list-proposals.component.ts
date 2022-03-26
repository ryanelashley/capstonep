import { Component, OnChanges, OnInit } from '@angular/core';
import { ProjectProposalService } from '../project.proposal.service';

@Component({
  selector: 'app-list-proposals',
  templateUrl: './list-proposals.component.html',
  styleUrls: ['./list-proposals.component.css']
})
export class ListProposalsComponent implements OnInit {
  public proposals:any;
  constructor(private _myService: ProjectProposalService) { }

  ngOnInit(): void {
    this.updateTable();
  }  

  updateTable():void{
    this.proposals=null;
    this.getProposals();
  }

  getProposals(){
    this._myService.getAllProposal().subscribe(
      //read data and assign to public variable proposals
      data => { this.proposals = data},
      err => console.error(err),
      () => console.log('finished loading')
  );
  }

  removeProposal(id: string){
    this._myService.deleteProposal(id);
    location.reload();
  }

}
