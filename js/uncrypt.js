var uncrypt = {}
uncrypt.displacement = {}
uncrypt.substitution = {}

uncrypt.convertStringToCodes = function(plaintext){
	var codes = []
	for(var i = 0; i<plaintext.length; i++){
		codes.push(plaintext.charAt(i).charCodeAt(0)-65)
	}
	return codes;
}

uncrypt.convertCodesToString = function(codes){
	var chars = []
	for(var i = 0; i<codes.length; i++){
		chars.push(String.fromCharCode(codes[i]+65));
	}
	return chars.join('');	
}

uncrypt.displacement.crypt = function(plaintext, key){
	var cipher_codes = [];
	var cipher_text;
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase()
	var codes = uncrypt.convertStringToCodes(plaintext)
	
	for(var i = 0; i < codes.length; i++ ){
		cipher_codes.push((codes[i]+key)%26)
	}
	cipher_text = uncrypt.convertCodesToString(cipher_codes);
	return cipher_text;
}

uncrypt.displacement.decrypt = function(ciphertext, key){
	var codes = [];
	var plaintext;
	ciphertext = ciphertext.trim().replace(/ /g,'').toUpperCase();
	var cipher_codes = uncrypt.convertStringToCodes(ciphertext);

	for(var i = 0; i<cipher_codes.length;i++){
		value = cipher_codes[i]-key
		codes.push(((value%26)+26)%26)
	}
	plaintext = uncrypt.convertCodesToString(codes);
	return plaintext;
}

uncrypt.substitution.crypt = function(plaintext, key){
	var ciphertext = "";
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
	for(var i=0; i<key.length;i++){
		key[i]=key[i].toUpperCase()	
	}

	for(var i=0;i<plaintext.length;i++){
		ciphertext += key[plaintext.charCodeAt(i)-65]
	}
	
	return ciphertext;
}

uncrypt.substitution.decrypt = function(ciphertext, key){
	var plaintext = "";
	ciphertext = ciphertext.trim().replace(/ /g,'').toUpperCase();
	cipher_codes = []
	for(var i=0; i<key.length;i++){
		key[i]=key[i].toUpperCase()	
	}

	for(var i=0;i<ciphertext.length;i++){
		cipher_codes.push(key.indexOf(ciphertext.charAt(i)))
	}

	ciphertext = uncrypt.convertCodesToString(cipher_codes);
	return ciphertext
}