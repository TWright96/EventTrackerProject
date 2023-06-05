package com.skilldistillery.impulsebuys.services;

import java.util.List;

import com.skilldistillery.impulsebuys.entities.Purchase;

public interface PurchaseService {

	List<Purchase> listPurchases();
	Purchase getPurchase(int purchaseId);
	Purchase create(Purchase newPurchase);
	Purchase update(int purchaseId, Purchase purchase);
	boolean delete(int standId);
}
