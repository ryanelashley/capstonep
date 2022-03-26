import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectProposalEditorComponent } from './project-proposal-editor/project-proposal-editor.component';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectProposalService {

    constructor(private http:HttpClient) {}
    
    addProposal(propDetails: ProjectProposalEditorComponent) {
        console.log(" test values from : "+propDetails);
        return this.http.post('http://localhost:8000/addProposal', propDetails)
        .subscribe((responseData) => {
            console.log("Response object "+responseData.toString());
        }); 
    }  

    deleteProposal(id: string) {
        this.http.delete("http://localhost:8000/deleteProposal/" + id)
            .subscribe(() => {
                console.log('Deleted: ' + id);
            });
    }

    getAllProposal(){
        return this.http.get('http://localhost:8000/getAllProposals');
    }

    getProposal(proposalId: string) {
        return this.http.get('http://localhost:8000/getProposal/'+ proposalId);
    }

    updateProposal(proposalId: string, section1: string, section2:string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/proposal/" + 
        proposalId,{ section1, section2 })
        .subscribe(() => {
            console.log('Updated: ' + proposalId);
        });
    }

}