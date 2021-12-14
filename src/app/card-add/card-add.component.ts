import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

  cardobj!: Card
  cardTable: Card[]=[]

  form = 
  {
    formAdd: new FormGroup
    (
      {
        cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-z A-Z]+$/)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.pattern(/^[0-9]+$/)]),
        expirationDate: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)])
      }
    )
  }
  

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  get CardOwnerName()
  {
    return this.form.formAdd.get('cardOwnerName')
  }

  get CardNumber()
  {
    return this.form.formAdd.get('cardNumber')
  }

  get ExpirationDate()
  {
    return this.form.formAdd.get('expirationDate')
  }

  get SecurityCode()
  {
    return this.form.formAdd.get('securityCode')
  }

  postCard()
  {
    this.cardobj = this.form.formAdd.value
    this.cardService.postUser(this.cardobj).subscribe((res)=>
    {
      console.log(res)
      alert(`Card Data Added Successfully`)
      let c = document.getElementById('cancel')
      c?.click()
      this.form.formAdd.reset()
      location.reload()
    },
    (err)=>
    {
      alert(`Something went wrong`)
    })
  }

  reset()
  {
    this.form.formAdd.reset()
  }

}