import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectProposalService } from '../project.proposal.service';

@Component({
  selector: 'app-project-proposal-editor',
  templateUrl: './project-proposal-editor.component.html',
  styleUrls: ['./project-proposal-editor.component.css']
})
export class ProjectProposalEditorComponent implements OnInit{
  public mode = 'Add'; //default mode
  private id: any; //proposal ID
  private proposal: any;
  capstoneForm = this.fb.group({
    section1: this.fb.group({
    contactName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    contactEmail: ['', Validators.required],
    contactPhone: ['', Validators.required],
    orgName: ['', Validators.required],
    orgAddress: this.fb.group({
      orgStreet: ['', Validators.required],
      orgZip: ['', Validators.required],
      orgCity: ['', Validators.required],
      orgState: ['', Validators.required]
    }),    
    orgWebsite: ['', Validators.required],
    }),    
    section2: this.fb.group({
      projectTitle: [''],
      projectDescription: [''],
      techSkills: [''],
      duties: [''],
      studentBenefits: [''],
      companyProvidings: ['']
    }),
  });

  constructor(private fb: FormBuilder, private _myService: ProjectProposalService, private router:Router, public route: ActivatedRoute) { }

 
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id')){
            this.mode = 'Edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');

             //request student info based on the id
            this._myService.getProposal(this.id).subscribe(
                data => { 
                    //read data and assign to private variable student
                    this.proposal = data;
                    
                    //console.log("dataaaa"+ data.valueOf());
                    //populate the firstName and lastName on the page
                    //notice that this is done through the two-way bindings
                    this.capstoneForm.patchValue({
                      section1:{
                        contactName: this.proposal.section1[0].contactName,
                        jobTitle: this.proposal.section1[0].jobTitle,
                        contactEmail: this.proposal.section1[0].contactEmail,
                        contactPhone: this.proposal.section1[0].contactPhone,
                        orgName: this.proposal.section1[0].orgName,
                        orgAddress:{
                          orgStreet: this.proposal.section1[0].orgAddress[0].orgStreet,
                          orgZip: this.proposal.section1[0].orgAddress[0].orgZip,
                          orgCity: this.proposal.section1[0].orgAddress[0].orgCity,
                          orgState: this.proposal.section1[0].orgAddress[0].orgState,
                        },   
                      orgWebsite: this.proposal.section1[0].orgWebsite,
                      },    
                      section2: {
                        projectTitle: this.proposal.section2[0].projectTitle,
                        projectDescription: this.proposal.section2[0].projectDescription,
                        techSkills: this.proposal.section2[0].techSkills,
                        duties: this.proposal.section2[0].duties,
                        studentBenefits: this.proposal.section2[0].studentBenefits,
                        companyProvidings: this.proposal.section2[0].companyProvidings 
                      }
                    }); 
                      //this.lastName = this.proposal.lastName;
                  },
                  err => console.error(err),
                  () => console.log('finished loading')
              );
          } 
          else {
              this.mode = 'Add';
              this.id = null; 
          }
      });
  }

    onZipChange(): void{
      let entryZip= this.capstoneForm?.get('section1.orgAddress.orgZip')?.value;
      this.capstoneForm.patchValue({
        section1:{
          orgAddress:{
            orgCity: this.getCityByZip(entryZip)
          }
        }
        
      });
    
  }

  getCityByZip(zip: string): string{
    
    var zipCodes={
      "Kennesaw": ["30144", "30152", "30156", "30160"],
      "Marietta": ["30006", "30007", "30008", "30060", "30061", "30062", "30063", "30064", "30065", "30066", "30067", "30068", "30069"],
      "Woodstock": ["30188", "30189"]
      //"Roswell": ["30075","30076","30077"]
    }

    if(zipCodes.Kennesaw.includes(zip))
      return "Kennesaw";
    
    else if(zipCodes.Marietta.includes(zip))
    return "Marietta";

    else if(zipCodes.Woodstock.includes(zip))
    return "Woodstock";

    else
    return '';
  }

  
  //method called OnInit
  saveForm() { 
    //console.log("test msg from ts"+ this.proposalDetails);
    if (this.mode == 'Add')
    this._myService.addProposal(this.capstoneForm.value);
    if (this.mode == 'Edit')
    this._myService.updateProposal(this.id, this.capstoneForm.get('section1')?.value, this.capstoneForm.get('section2')?.value);      
    this.router.navigate(['/listPropsal']);
  }

}
