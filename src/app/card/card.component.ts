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

  cardowner!: string;    

  form = 
  {
    formEdit: new FormGroup
    (
      {
        id: new FormControl('', [Validators.required]),
        cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-z A-Z]+$/)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.pattern(/^[0-9]+$/)]),
        expirationDate: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)])
      }
    )
  }

  constructor(private cardService: CardService) { }

  get Id()
  {
    return this.form.formEdit.get('id')
  }

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
    this.cardService.updateData(this.cardobj, this.card_id).subscribe((res)=>
    {
      console.log(res)
      alert(`Card Data Successfully Edited`)
      let c = document.getElementById('canceledit')
      c?.click()
      this.form.formEdit.reset()
      this.getAllData()
      location.reload()
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

  getRandomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  reset()
  {
    this.form.formEdit.reset()
  }

  Search()
  {
    if(this.cardowner != "")
    {
      this.cardTable = this.cardTable.filter(res => 
      {
        return res.cardOwnerName.toLocaleLowerCase().match(this.cardowner.toLocaleLowerCase())
      })
    }
    else if(this.cardowner == "")
    {
      this.ngOnInit()
    }
  }

}
