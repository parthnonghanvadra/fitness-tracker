import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private db : AngularFirestore) { }

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises : Exercise[] = []
  private runningExercise !: Exercise;
  private fbSubs: Subscription[] = [];

  fetchAvailableExercises(){
    this.fbSubs.push(this.db.collection('AvailableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((doc : any) => {
            return  {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
      }))
      .subscribe((exercises : Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises])
      }));
  }

  startExercise(selectedId : string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId) as Exercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExercise, date : new Date(), state : 'completed'});
    this.runningExercise = null as any;
    this.exerciseChanged.next(null as any);
  }

  cancelExercise(progress : number){
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date : new Date(), 
      state : 'cancelled'});
    this.runningExercise = null as any;
    this.exerciseChanged.next(null as any);
  }

  getRunningExercise(){
    return {...this.runningExercise}
  }

  fetchCompletedOrCancelledExercise() {
    this.fbSubs.push(this.db
      .collection('finishedExercise')
      .valueChanges()
      .subscribe((exercises : any) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise : Exercise) {
    this.db.collection('finishedExercise').add(exercise);
  }
}
