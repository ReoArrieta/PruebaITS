import { Component, OnInit } from '@angular/core';
import { OutputRequest } from '@models/request/outputRequest';
import { OutputService } from '@services/output.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  public outputs: OutputRequest[] | undefined;

  constructor(private _outputService: OutputService) { }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this._outputService.read().subscribe((res) => {
      this.outputs = res.data;
    });
  }

}
