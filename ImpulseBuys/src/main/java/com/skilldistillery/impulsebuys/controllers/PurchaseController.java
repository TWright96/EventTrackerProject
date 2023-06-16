package com.skilldistillery.impulsebuys.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.impulsebuys.entities.Purchase;
import com.skilldistillery.impulsebuys.services.PurchaseService;
@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class PurchaseController {
	@Autowired
	private PurchaseService purchaseService;

	@GetMapping("purchases")
	public List<Purchase> listAllPurchases() {
		return purchaseService.listPurchases();
	}

	@GetMapping("purchases/{purchaseId}")
	public Purchase getPurchase(@PathVariable Integer purchaseId, HttpServletResponse res) {
		Purchase purchase = purchaseService.getPurchase(purchaseId);
		if (purchase == null) {
			res.setStatus(404);
		}
		return purchase;
	}

	@PostMapping("purchases")
	// Request Body is the information that is being created/saved to the body of the request.
	// HttpServletResponse is the response that the request gives
	// HttpServletRequest is the URL
	public Purchase create(@RequestBody Purchase newPurchase, HttpServletResponse res, HttpServletRequest req) {
		//purchase is set to purchaseService.create, which creates a new object from the create method in PurchaseServiceImpl
		Purchase purchase = purchaseService.create(newPurchase);
		res.setStatus(200);
		// String buffer is adding/appending to URL
		StringBuffer url = req.getRequestURL();
		url.append("/").append(newPurchase.getId());
		res.setHeader("purchase", url.toString());

		return purchase;
	}

	@PutMapping("purchases/{purchaseId}")
	public Purchase updatePurchase(@PathVariable int purchaseId, @RequestBody Purchase purchase,
			HttpServletResponse res) {
		Purchase updatedPurchase = purchaseService.update(purchaseId, purchase);
		return updatedPurchase;
	}

	@DeleteMapping("purchases/{purchaseId}")
	public boolean deletePurchase(@PathVariable int purchaseId, HttpServletResponse res) {
		boolean deleted = purchaseService.delete(purchaseId);
		if (deleted) {
			res.setStatus(200);
		}
		return deleted;
	}

}
