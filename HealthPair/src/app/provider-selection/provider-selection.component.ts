import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-selection',
  templateUrl: './provider-selection.component.html',
  styleUrls: ['./provider-selection.component.css']
})
export class ProviderSelectionComponent implements OnInit {

cards = [
    {
      title: 'Joe Bob',
      description: 'SHSL Downtown',
      address: '2737 S. Hudson, Tulsa OK',
      buttonText: 'Select',
      distance: '0.4 miles',
      img: 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png'
    },
    {
      title: 'title',
      description: 'descript',
      address: 'addr',
      buttonText: 'Select',
      distance: '0.1 miles',
      img: 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png'
    },
    {
      title: 'title',
      description: 'descript',
      address: 'addr',
      buttonText: 'Select',
      distance: '0.1 miles',
      img: 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png'
    },
    {
      title: 'title',
      description: 'descript',
      address: 'addr',
      buttonText: 'Select',
      distance: '0.1 miles',
      img: 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png'
    },

  ];


  constructor() { }

  ngOnInit(): void {
  }

}
