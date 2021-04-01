import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-wordlists',
  templateUrl: './edit-wordlists.component.html',
  styleUrls: ['./edit-wordlists.component.scss']
})
export class EditWordlistsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
