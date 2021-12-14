import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cardTable: Card[]=[]
  card_id!: number
  cardobj!: number

  form = 
  {
    formEdit: new FormGroup
    (
      {
        cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
        expirationDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(5)])
      }
    )
  }

  constructor(private cardService: CardService) { }

  get CardOwnerName()
  {
    return this.form.formEdit.get('cardOwnerName')
  }

  get CardNumber()
  {
    return this.form.formEdit.get('cardNumber')
  }

  get ExpirationDate()
  {
    return this.form.formEdit.get('expirationDate')
  }

  get SecurityCode()
  {
    return this.form.formEdit.get('securityCode')
  }

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData()
  {
    this.cardService.getData().subscribe((res) => 
    {
      this.cardTable = res
    })
  }
  
  onEdit(data: any)
  {
    this.card_id = data.id;
    this.form.formEdit.controls['cardOwnerName'].setValue(data.cardOwnerName)
    this.form.formEdit.controls['cardNumber'].setValue(data.cardNumber)
    this.form.formEdit.controls['expirationDate'].setValue(data.expirationDate)
    this.form.formEdit.controls['securityCode'].setValue(data.securityCode)
  }

  editCard()
  {
    this.cardobj = this.form.formEdit.value
    this.cardService.updateData(this.cardobj, this.card_id).subscribe((res)=>{
      console.log(res)
      alert(`Card Data Successfully Edited`)
      let c = document.getElementById('canceledit')
      c?.click()
      this.form.formEdit.reset()
      this.getAllData()
    },
    (err)=>{
      alert(`Something went wrong`)
    })
  }

  deleteCard(data: any)
  {
    var result = confirm("Are you sure want to delete this user?")
    
    if(result)
    {
      this.cardService.deleteData(data.id).subscribe
      ((res)=>
        {
          alert(`Data has been deleted`)
          this.getAllData()
        }
      )
    }
  }

}
