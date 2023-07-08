import { Component, Input, OnInit } from '@angular/core';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent {



   @Input() data!: string;
   px2mmFactor!: number;
  ngOnInit() {


    this.px2mmFactor = this.calcPx2MmFactor();
    JsBarcode('#barcode', this.data.substring(0,this.data.length/2), {
      format: 'code128', // default
      height: 20 * this.px2mmFactor,
      width: 1.3,
      displayValue: false,
      background: 'rgba(0,0,0,0.0)',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 6,
      lineColor: 'black',
      margin: 0 ,
      textMargin: 0 
    });
  }

  private calcPx2MmFactor() {
    let e = document.createElement('div');
    e.style.position = 'absolute';
    e.style.width = '100mm';
    document.body.appendChild(e);
    let rect = e.getBoundingClientRect();
    document.body.removeChild(e);
    return rect.width / 100;
  }
}