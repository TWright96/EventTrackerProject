console.log('script.js loaded')
//checks if load has occured and adds a new event listener that will "listen" 
//for the "load event in the future. 
window.addEventListener('load', function(e) {
	console.log('Window loaded, DOM created');
	init();
	addImpulseBuyInit();




});

function init() {
	console.log('In init()');
	getAllEvents();


}

function getAllEvents() {
	//XMLHttpRequest is a java object that is used to send Http 
	//requests to a web server.
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/purchases');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let impulseBuysList = JSON.parse(xhr.responseText);
				console.log(impulseBuysList);
				displayAllImpulseBuys(impulseBuysList);

			} else {
				//TODO: function to show error on page
			}
		}
	};

	xhr.send();
}
function displayAllImpulseBuys(impluseBuysList) {
	let tbody = document.getElementById("impulseBuysListTableBody");
	tbody.textContent = '';
	if (impluseBuysList && Array.isArray(impluseBuysList)) {
		for (let impulseBuy of impluseBuysList) {
			let tr = document.createElement('tr');
			tbody.appendChild(tr);
			let td = document.createElement('td');
			td.textContent = impulseBuy.id;
			tr.appendChild(td);

			td = document.createElement('td');

			td.textContent = impulseBuy.name;
			tr.appendChild(td);

			td = document.createElement('td');
			let img = document.createElement('img');
			img.src = impulseBuy.imageUrl;
			img.className = "image";
			img.width = 150;
			img.height = 150;
			td.appendChild(img);
			tr.appendChild(td);


			tr.addEventListener('click', function(e) {
				let impulseBuyId = impulseBuy.id;
				getBuyDetails(impulseBuyId);

			});

		}
		let totalPrice= extractValue(impluseBuysList, 'price');
		console.log(totalPrice);
		let total = 0;
		for(let i = 0; i < totalPrice.length; i++ ) {
			total += totalPrice[i];
			
		}
		console.log(total);
		let h4 = document.createElement('h4');
		let moneyDiv = document.getElementById('ImpulseBuysListDiv');
		h4.textContent = 'You wasted $' + total + ' on things you dont even need!';
		moneyDiv.appendChild(h4);
		
		
	}


}

function extractValue(arr, prop) {
 let extractedValue = [];
 for (let i = 0; i < arr.length; ++i) {
  extractedValue.push(arr[i][prop]);
 }
 return extractedValue;
}

function addImpulseBuyInit() {
	document.addImpulseBuyForm.addButton.addEventListener('click', function(e) {
		e.preventDefault();
		let addForm = document.addImpulseBuyForm;
		let name = addForm.name.value;
		let imgUrl = addForm.imageUrl.value;
		let price = addForm.price.value;
		let description = addForm.description.value;

		let impulseBuy = { name, imgUrl, price, description };
		addImpulseBuy(impulseBuy);

	});
}

function addImpulseBuy(impulseBuy) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/purchases');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let impulseBuy = JSON.parse(xhr.responseText);
				console.log(impulseBuy);
				displayAllImpulseBuys();

			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);

			}

		}
	};
	let jsonImpulse = JSON.stringify(impulseBuy);
	xhr.send(jsonImpulse);

}

function getBuyDetails(impulseBuyId) {
	// XHR
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/purchases/" + impulseBuyId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let impulseBuy = JSON.parse(xhr.responseText);
				console.log(impulseBuy);
				displayImpulseBuyDetails(impulseBuy);
			}
			else {
				console.err('Impulse Buy does not exist' + xhr.status)
			}
		}
	}
	xhr.send();
}

function displayImpulseBuyDetails(impulseBuy) {
	// display details in DIV
	let buyDetails = document.getElementById('impulseBuyDetails');
	buyDetails.textContent = "";
	let h4 = document.createElement('h4');
	h4.textContent = "WHAT YOU WASTED YOUR HARD EARNED MONEY ON";
	buyDetails.appendChild(h4);

	let h5 = document.createElement('h5');
	h5.textContent = "Item: " + impulseBuy.name;
	buyDetails.appendChild(h5);
	h5 = document.createElement('h5');
	h5.textContent = "Price: " + impulseBuy.price;
	buyDetails.appendChild(h5);
	h5 = document.createElement('h5');
	h5.textContent = "Description: " + impulseBuy.description;
	buyDetails.appendChild(h5);


	let p = document.createElement('p');
	let picture = document.createElement('img');
	picture.src = impulseBuy.imageUrl;
	picture.classList.add('singlePicture');
	picture.height = 150;
	picture.width = 150;
	p.appendChild(picture);
	buyDetails.appendChild(p);




	let updateDiv = document.getElementById('updateImpulseBuys');
	let updateForm = document.createElement('form');
	updateForm.name = 'updateForm';
	buyDetails.appendChild(updateForm);
	let input = document.createElement('input');
	input.type = 'hidden';
	input.name = 'impulseBuyId'
	input.value = 'impulseBuy.id'
	updateForm.appendChild(input);

	let deleteForm = document.createElement('form');
	deleteForm.name = 'deletePurchaseForm';
	buyDetails.appendChild(deleteForm);
	let purchaseIdInput = document.createElement('input');
	purchaseIdInput.type = 'hidden';
	purchaseIdInput.name = 'purchaseId';
	purchaseIdInput.value = impulseBuy.id;
	deleteForm.appendChild(purchaseIdInput);
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'DELETE';
	deleteForm.appendChild(deleteButton);
	deleteButton.classList.add("btn");
	deleteButton.classList.add("btn-danger");

	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		let purchaseId = document.deletePurchaseForm.purchaseId.value;
		console.log('DELETE PURCHASE' + purchaseId);
		deletePurchase(purchaseId);
		purchaseDetails.textContent = '';
		

	});




	let button = document.createElement('button');
	button.textContent = 'UPDATE';
	updateForm.appendChild(button);
	button.classList.add("btn");
	button.classList.add("btn-info");




	button.addEventListener('click', function(e) {
		e.preventDefault();
		let purchaseId = document.updateForm.impulseBuyId.value;
		console.log("in update addEventListener");
		updatePurchaseForm(impulseBuy);



	});




}







function updatePurchase(updatedPurchase) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/purchases/' + updatedPurchase.id);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let purchase = JSON.parse(xhr.responseText);
				console.log("Update successful" + purchase);
				getBuyDetails(purchase.id);
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ": " + xhr.responseText);
			}
		}
	}
	let jsonPurchase = JSON.stringify(updatedPurchase);
	xhr.send(jsonPurchase);
}


function updatePurchaseForm(impulseBuy) {
	//creating update form

	let updateDiv = document.getElementById("updateImpulseBuys");
	let updateForm = document.createElement('form');
	updateForm.name = "updatePurchaseForm";
	updateDiv.appendChild(updateForm);
	let input = document.createElement('input');
	input.type = 'hidden';
	input.id = 'updatePurchase';
	input.value = impulseBuy.id;
	updateForm.appendChild(input);
	input = document.createElement('input');
	
	input.name = 'name';
	input.classList.add('form-control');
	input.type = 'text';
	input.value = impulseBuy.name;
	updateForm.appendChild(input);
	let br = document.createElement('br');
	updateForm.append(br);
	
	input = document.createElement('input');
	input.name = 'price';
	input.classList.add('form-control');
	input.type = 'number';
	input.step = '0.01';
	input.value = impulseBuy.price;	
	updateForm.appendChild(input);
	br = document.createElement('br');
	updateForm.appendChild(br);
	
	input = document.createElement('input');
	input.name = 'imageUrl';
	input.classList.add('form-control');
	input.type = 'text';
	input.value = impulseBuy.imageUrl;
	updateForm.appendChild(input);
	br = document.createElement('br');
	updateForm.appendChild(br);
	
	input = document.createElement('input');
	input.name = 'description';
	input.classList.add('form-control');
	input.type = 'text';
	input.value = impulseBuy.description;
	updateForm.appendChild(input);
	br = document.createElement('br');
	updateForm.appendChild(br);



	// Creating update button
	let button = document.createElement('button');
	button.textContent = 'UPDATE';
	updateForm.appendChild(button);
	button.classList.add("btn");
	button.classList.add("btn-info");
	//event listener for button
	button.addEventListener('click', function(e) {
		e.preventDefault();
		let impulseBuy = document.getElementById('updatePurchase').value;
		console.log("update buy:" + impulseBuy);
		let updatedName = updateForm.name.value;
		let updatedPrice = updateForm.price.value;
		let updatedImage = updateForm.imageUrl.value;
		let updatedDescription = updateForm.description.value;

		let updatedPurchase = {
			id: impulseBuy, name: updatedName, price: updatedPrice, image: updatedImage, description: updatedDescription
		}

		updatePurchase(updatedPurchase);

	});


}

function deletePurchase(purchaseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', "api/purchases/" + purchaseId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				console.log("Purchase deleted. " + xhr.responseText);
				getAllEvents();
			}
			else {
				console.error("Error: " + xhr.status)
			}
		}
	};
	xhr.send();

}



