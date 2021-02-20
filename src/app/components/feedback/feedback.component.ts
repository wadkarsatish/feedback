import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProject } from './../../models/project.model';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IFeedback } from 'src/app/models/feeback.model';
import { EmployeeRoleEnum } from 'src/app/models/role.enum';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  fbForm: FormGroup;
  $projects: Observable<IProject[]>;
  id: number;
  isManager = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isManager = this.appService.user.role === EmployeeRoleEnum.Manager;

    this.fbForm = this.fb.group({
      empName: [{ value: this.appService.user.empName, disabled: this.isManager }, Validators.required],
      empId: [{ value: this.appService.user.empId, disabled: this.isManager }, Validators.required],
      projectId: [{ value: '', disabled: this.isManager }],
      rating: '',
      comment: [{ value: '', disabled: this.isManager }],
      managerRating: '',
      managerComment: ''
    });

    this.id = null;
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // fetch feedback details
      this.appService.fetchFeedback(this.id).subscribe((res) => {
        this.updateFormValues(res);
      });
      // In a real app: dispatch action to load the details here.
    });

    this.$projects = this.appService.fetchProjects();
  }

  submit() {
    if (!this.fbForm.valid) {
      return;
    }
    console.log(this.fbForm.getRawValue());
    const feedback: IFeedback = { ...this.fbForm.getRawValue() };
    if (this.isManager) {
      feedback.isManagerFeedbackAdded = true;
    }

    feedback.feedbackId = this.id;

    this.appService.saveFeedback(feedback).subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      } else {
        console.log('save failed');
      }
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }

  private updateFormValues(feedback: IFeedback): void {
    this.fbForm.patchValue({ ...feedback });
  }
}
