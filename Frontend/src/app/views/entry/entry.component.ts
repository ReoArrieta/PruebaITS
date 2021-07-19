import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EntryRequest } from '@models/request/entryRequest';
import { EntryResponse } from '@models/response/entryResponse';
import { AuthService } from '@services/auth.service';
import { EntryService } from '@services/entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  public entries: EntryResponse[] | undefined;
  public send: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _entryService: EntryService
  ) {}

  ngOnInit(): void {
    this.read();
    this.readUser();
  }

  formEntry = this._fb.group({
    id: 0,
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    image: ['', Validators.required],
    idState: [1, Validators.required],
    idUser: 0,
  });

  read() {
    this._entryService.read().subscribe((res) => {
      this.entries = res.data;
    });
  }

  readUser() {
    let jwt = this._authService.userData.token;
    this._authService.getUser(jwt).subscribe((res) => {
      localStorage.setItem('id', res.data[0].id);
    });
  }

  productModal() {
    this.send = false;
    this.formEntry.patchValue({
     idUser: Number(localStorage.getItem('id'))
    });
  }

  create(model: EntryRequest) {
    if (this.formEntry.valid) {
      this._entryService.create(model).subscribe((res) => {
        if (res.exito === 1) {
          this.send = true;
        } else alert('Error: ' + res.message);
      });
    }
  }

  closeModal() {
    this.read();
  }
}
