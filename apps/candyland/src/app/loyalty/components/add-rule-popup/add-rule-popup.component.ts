import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cl-add-rule-popup',
  templateUrl: './add-rule-popup.component.html',
  styleUrls: ['./add-rule-popup.component.scss']
})
export class AddRulePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRulePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
  }

}
