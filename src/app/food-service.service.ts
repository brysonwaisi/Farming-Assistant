import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './components/home/food';

@Injectable({
  providedIn: 'root',
})
export class FoodServiceService {
  private _foodList = './components/home/foods.json';

  constructor(private httpClient: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.httpClient.get(this._foodList).map((food) => <Food>food.json());
  }
}
