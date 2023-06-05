package com.skilldistillery.impulsebuys.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.impulsebuys.entities.Purchase;

//
public interface PurchaseRepository extends JpaRepository<Purchase, Integer>{

	
	
}
 