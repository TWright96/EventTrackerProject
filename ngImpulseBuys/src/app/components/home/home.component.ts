import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  purchaseList: Purchase[] = [];
  newPurchase: Purchase = new Purchase();
  editPurchase: Purchase | null = null;
  viewPurchase: Purchase | null = null;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadPurchases();
  }


  loadPurchases() {
    this.purchaseService.index().subscribe({
      next: (pList) => {
        this.purchaseList = pList;
      },
      error: (error) => {
        console.error('HomeComponent');
        console.error(error);
      },
    });
  }

  createPurchase(newPurchase: Purchase) {
    this.purchaseService.create(newPurchase).subscribe({
      next: ()=> {
        this.loadPurchases()
      },
      error:(error) => {
        console.error('HomeComponent.createPurchase()' + error);
      }
    });
  }

  updatePurchase(editPurchase: Purchase) {
    this.purchaseService.update(editPurchase).subscribe({
      next: (editpurchase) => {
        this.editPurchase = editpurchase;
        this.loadPurchases();
      },
      error: (error) => {
        console.error('HomeComponent');
        console.error(error);
      },
    });
  }

  showPurchase(viewPurchase: Purchase) {
    this.purchaseService.show(viewPurchase).subscribe({
      next: (viewPurchase) => {
        this.viewPurchase = viewPurchase;
      },
      error: (error) => {
        console.error('HomeComponent');
        console.error(error);
      },
    });
  }

  destroyPurchase(purchaseId: number) {
    this.purchaseService.destroy(purchaseId).subscribe({
      next: () => {
        this.loadPurchases();
      },
      error: (error) => {
        console.error('DestroyPurchase()' + error);
      },
    });
  }
}
