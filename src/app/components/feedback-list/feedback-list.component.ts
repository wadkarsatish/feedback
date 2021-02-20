import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFeedbackList } from './../../models/feeback.model';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { EmployeeRoleEnum } from 'src/app/models/role.enum';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  displayedColumns = [];
  employeeColumns: string[] = ['projectName', 'rating', 'comment', 'managerRating', 'managerComment', 'actions'];
  managerColumns: string[] = ['empId', 'empName', 'projectName', 'rating', 'comment', 'managerRating', 'managerComment', 'actions'];
  dataSource: IFeedbackList[] = [];
  role = EmployeeRoleEnum;

  constructor(
    public readonly appService: AppService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.appService.user.role === EmployeeRoleEnum.Employee) {
      this.displayedColumns = this.employeeColumns;
    } else {
      this.displayedColumns = this.managerColumns;
    }
    this.fetctFeedbacks();
  }

  onEdit(feedback: IFeedbackList) {
    this.router.navigate(['feedback', feedback.feedbackId]);
  }

  onDelete(feedback: IFeedbackList) {
    this.appService.deleteFeedback(feedback.feedbackId).subscribe(() => this.fetctFeedbacks());
    // const dialogRef = this.dialog.open(ConfirmationComponent, {
    //   width: '400px',
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.appService.deleteFeedback(feedback.feedbackId).subscribe(() => this.fetctFeedbacks());
    //   }
    // });
  }

  private fetctFeedbacks() {
    this.appService.fetchFeedbacks().subscribe(res => this.dataSource = res);
  }
}