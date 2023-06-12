package com.skilldistillery.impulsebuys.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.impulsebuys.entities.Purchase;
import com.skilldistillery.impulsebuys.repositories.PurchaseRepository;
@Service
public class PurchaseServiceImpl implements PurchaseService{

	@Autowired
	private PurchaseRepository purchaseRepo;
	
	
	@Override
	public List<Purchase> listPurchases() {		
		return purchaseRepo.findAll();	
	}

	@Override
	public Purchase getPurchase(int purchaseId) {
		Purchase purchase = null;
		Optional<Purchase> purchaseOpt = purchaseRepo.findById(purchaseId);
		if(purchaseOpt.isPresent()) {
			purchase = purchaseOpt.get();
		}
		return purchase;	
	}

	@Override
	public Purchase create(Purchase newPurchase) {
	 Purchase purchase = purchaseRepo.saveAndFlush(newPurchase);
		return purchase;
	}

	@Override
	public Purchase update(int purchaseId, Purchase purchase) {
		Optional <Purchase> managedOpt = purchaseRepo.findById(purchaseId);
		Purchase managed = managedOpt.get();
		if(managed != null) {
			managed.setName(purchase.getName());
			managed.setImageUrl(purchase.getImageUrl());	
			managed.setPrice(purchase.getPrice());
			managed.setDescription(purchase.getDescription());
		}		
		return purchaseRepo.saveAndFlush(managed);
	}

	@Override
	public boolean delete(int purchaseId) {
		//Optional Purchase is equal to the purchase that I found by using the purchaseId from the parameters.
		//We use Optional because we cannot delete an object that is not there. So we're checking to see if the 
		//Optional Purchase (purchaseOpt) found by purchaseId, has a null value or not before we delete the purchase.
		Optional <Purchase> purchaseOpt = purchaseRepo.findById(purchaseId);
		if(purchaseOpt.isPresent()) { 
			Purchase purchase = purchaseOpt.get();
			//Deleting purchase
			purchaseRepo.delete(purchase);	
		}
			return false;	
	    // Why do we return false?
	}		
}
