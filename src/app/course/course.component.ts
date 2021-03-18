import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CourseService } from '../services/courses.secrvice';

interface CourseData {
  course: Observable<Course>,
  lessons: Observable<Lesson[]>
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {


  }

  ngOnInit() {

    const courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));
    const course$ = this.courseService.loadCourseById(courseId)
      .pipe(
        startWith(null)
      );
    const lessons$ = this.courseService.loadLessonsById(courseId)
      .pipe(
        startWith([])
      );

      this.data$ = combineLatest([course$, lessons$])
      .pipe(
          map(([course, lessons]) => {
              return {
                  course,
                  lessons
              }
          }),
          tap(console.log)
      );


  }


}











