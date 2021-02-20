import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input('rating') rating: number = 0;
  @Input('starCount') starCount: number = 5;
  @Input('readonly') readonly: boolean = false;
  @Input('color') color: string = 'primary';
  @Input('disabled') disabled = false;

  @Output() ratingUpdated = new EventEmitter();

  ratingArr = [];

  constructor() { }

  ngOnInit() {
    const startCount = this.readonly ? this.rating : this.starCount;
    for (let index = 0; index < startCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    return this.rating >= index + 1 ? 'star' : 'star_border';
  }

}
