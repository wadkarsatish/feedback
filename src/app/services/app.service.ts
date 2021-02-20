import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEmployee } from './../models/employee.mode';
import { IProject } from './../models/project.model';
import mockEmpData from '../mock/employee.mock';
import mockPorjectData from '../mock/project.mock';
import { Contants } from './../constants';
import { IFeedback, IFeedbackList } from './../models/feeback.model';
import { tap } from 'rxjs/operators';
import { EmployeeRoleEnum } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public get user(): IEmployee {
    return JSON.parse(localStorage.getItem(Contants.USER)) as IEmployee;
  }

  public set user(v: IEmployee) {
    localStorage.setItem(Contants.USER, JSON.stringify(v));
  }

  constructor() { }

  login(empName: string): Observable<IEmployee> {
    const employee = mockEmpData.find((emp) => emp.empName.toLowerCase() === empName.toLowerCase());

    if (employee) {
      return of(employee as IEmployee).pipe(
        tap((emp) => this.user = emp)
      );
    }

    this.user = null;
    return of(null);
  }

  fetchProjects(): Observable<IProject[]> {
    return of(mockPorjectData);
  }

  saveFeedback(feedback: IFeedback): Observable<boolean> {
    return of(this.save(feedback));
  }

  fetchFeedbacks(): Observable<IFeedbackList[]> {
    const feedbackList = this.getFeedbacks();
    const projects = mockPorjectData;
    let feedbacks: IFeedback[] = [];

    if (feedbackList && feedbackList.length) {
      if (this.user.role === EmployeeRoleEnum.Employee) {
        feedbacks = feedbackList.filter(x => Number(x.empId) === Number(this.user.empId));
      } else {
        const empList = mockEmpData.filter(mock => mock.managerId === this.user.empId);
        feedbacks = feedbackList.filter(fb => empList.some((emp) => Number(emp.empId) === Number(fb.empId)));
      }

      return of(feedbacks.map((feedback) => {
        const project = projects.find(x => x.projectId === feedback.projectId);

        const fb: IFeedbackList = {
          ...feedback,
          projectName: (project && project.projectName) ? project.projectName : ''
        };

        return fb;
      }));
    }

    return of([]);
  }

  fetchFeedback(id: number): Observable<IFeedback> {
    const feedbackList = this.getFeedbacks();

    return of(feedbackList.find(x => Number(x.feedbackId) === id));
  }

  deleteFeedback(id: number): Observable<boolean> {
    const feedbacks = this.getFeedbacks();
    const filteredFeedback = feedbacks.filter((fb) => fb.feedbackId !== id);
    localStorage.setItem(Contants.FEEDBACK, JSON.stringify(filteredFeedback));
    return of(true);
  }

  isAuthenticated(): boolean {
    return this.user !== null && this.user !== undefined;
  }

  private getFeedbacks(): IFeedback[] {
    return JSON.parse(localStorage.getItem(Contants.FEEDBACK)) as IFeedback[];
  }

  private save(feedback: IFeedback): boolean {
    const feedbacks = this.getFeedbacks();
    if (feedback.feedbackId) {
      const feedbackIndex = feedbacks.findIndex(x => Number(x.feedbackId) === Number(feedback.feedbackId));
      if (feedbackIndex !== -1) {
        feedbacks.splice(feedbackIndex, 1, feedback);
      }
      localStorage.setItem(Contants.FEEDBACK, JSON.stringify(feedbacks));
    } else {
      feedback.feedbackId = this.createNewFeedbackId();

      if (feedbacks && feedbacks.length) {
        feedbacks.push(feedback);
        localStorage.setItem(Contants.FEEDBACK, JSON.stringify(feedbacks));
      } else {
        localStorage.setItem(Contants.FEEDBACK, JSON.stringify([feedback]));
      }
    }

    return true;
  }

  private createNewFeedbackId(): number {
    const feedbacks = this.getFeedbacks();
    if (feedbacks && feedbacks.length) {
      let newId = Math.max(...feedbacks.map(x => x.feedbackId));
      if (isNaN(newId)) {
        return 1;
      }
      return newId + 1;
    }
    return 1;
  }
}
