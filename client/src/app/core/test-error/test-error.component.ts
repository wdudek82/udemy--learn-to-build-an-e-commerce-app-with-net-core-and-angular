import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/badrequest/one').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.validationErrors = error.errors;
      },
    );
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/notfound').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
