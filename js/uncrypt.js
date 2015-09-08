var uncrypt = {}
uncrypt.displacement = {}
uncrypt.substitution = {}
uncrypt.affine = {}
uncrypt.vigenere = {}
uncrypt.hill = {}

// Utilities

uncrypt.inverse = {
	1:1,
	3:9,
	5:21,
	7:15,
	9:3,
	11:19,
	15:7,
	17:23,
	19:11,
	23:17,
	25:25
}

uncrypt.trigrams = ["THE", "AND", "ING", "ENT", "ION", "HER", "FOR", "THA", "NTH", "INT", "ERE", "TIO", "TER"]
uncrypt.bigrams = ["TH", "HE", "IN", "ER", "AN", "RE", "ES", "ON", "ST", "NT", "EN", "AT", "ED", "ND", "TO", "OR", "EA", "TI", "AR", "TE"]

uncrypt.countStringOcurrence = function(string, substring){
	var re = new RegExp(substring,"g");
	var count = (string.match(re) || []).length;
	return count;
}

uncrypt.analizeTrigrams = function(string){
	string = string.trim().replace(/ /g,'').toUpperCase()
	var freq = {}
	var freq_sorted = []
	var count =0

	for(var i = 0; i<uncrypt.trigrams.length; i++){
		count = uncrypt.countStringOcurrence(string, uncrypt.trigrams[i]);
		if(count > 0){
			freq[uncrypt.trigrams[i]] = count;
		}
	}
	freq_sorted = uncrypt.sortObject(freq);
	return freq_sorted
}

uncrypt.analizeBigrams = function(string){
	string = string.trim().replace(/ /g,'').toUpperCase()
	var freq = {}
	var freq_sorted = []
	var count =0
	for(var i = 0; i<uncrypt.bigrams.length; i++){
		count = uncrypt.countStringOcurrence(string, uncrypt.bigrams[i]);
		if(count > 0){
			freq[uncrypt.bigrams[i]] = count;
		}
		
	}
	freq_sorted = uncrypt.sortObject(freq);
	return freq_sorted
}

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

uncrypt.gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return uncrypt.gcd(b, a % b);
}

uncrypt.sortObject = function(object){
	var sortable = [];
	for (var item in object)
		sortable.push([item, object[item]])
	sortable.sort(function(a, b) {return a[1] - b[1]})
	return sortable.reverse()
}


uncrypt.letterFreq = function(string){
	string = string.trim().replace(/ /g,'').toUpperCase()
	var freq = {};
	var freq_sorted = [];
	for (var i=0; i<string.length;i++) {
		var character = string.charAt(i);
		if (freq[character]) {
			freq[character]++;
		}else {
			freq[character] = 1;
		}
	}

	freq_sorted = uncrypt.sortObject(freq);
	return freq_sorted;
}

uncrypt.solve = function(x1,x2,y1,y2){
	var inverseTemp1;
	var a;
	var b;
	var temp1 = x1-x2
	var temp2 = y1-y2
	
	temp1 = ((temp1%26)+26)%26
	temp2 = ((temp2%26)+26)%26

	inverseTemp1 = uncrypt.inverse[temp1]
	if(inverseTemp1 === undefined){
		return false;
	}else{
		a = temp2 * inverseTemp1
		a = ((a%26)+26)%26
		temp3 = x1 * a
		temp3 = ((temp3%26)+26)%26
		b = y1 - temp3
		b = ((b%26)+26)%26
	}
	return [a,b]
}

// Displacement system

uncrypt.displacement.crypt = function(plaintext, key){
	var cipher_codes = [];
	var ciphertext;
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase()
	var codes = uncrypt.convertStringToCodes(plaintext)
	
	for(var i = 0; i < codes.length; i++ ){
		cipher_codes.push((codes[i]+key)%26)
	}
	ciphertext = uncrypt.convertCodesToString(cipher_codes);
	return ciphertext;
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


// Substitution system

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
	codes = []
	for(var i=0; i<key.length;i++){
		key[i]=key[i].toUpperCase()	
	}

	for(var i=0;i<ciphertext.length;i++){
		codes.push(key.indexOf(ciphertext.charAt(i)))
	}

	ciphertext = uncrypt.convertCodesToString(codes);
	return ciphertext
}


// Affine system

uncrypt.affine.crypt = function(plaintext,a,b){
	var ciphertext;
	var cipher_codes = [];
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
	var codes = uncrypt.convertStringToCodes(plaintext)
	for(var i = 0; i < codes.length; i++ ){
		cipher_codes.push((codes[i]*a + b)%26)
	}
	ciphertext = uncrypt.convertCodesToString(cipher_codes);
	return ciphertext;
}

uncrypt.affine.decrypt = function(ciphertext,a,b){
	var plaintext;
	var codes = [];
	ciphertext = ciphertext.trim().replace(/ /g,'').toUpperCase();
	var cipher_codes = uncrypt.convertStringToCodes(ciphertext)

	for(var i = 0; i < cipher_codes.length; i++ ){
		value = uncrypt.inverse[a]*(cipher_codes[i]-b)
		codes.push(((value%26)+26)%26)	
	}
	plaintext = uncrypt.convertCodesToString(codes)
	return plaintext;
}

// Vigenere system

uncrypt.vigenere.crypt = function(plaintext, key){
	var ciphertext = "";
	var cipher_codes = [];
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
	key = key.trim().replace(/ /g,'').toUpperCase();
	var codes = uncrypt.convertStringToCodes(plaintext)
	var key_codes = uncrypt.convertStringToCodes(key)
	var keylength = key_codes.length;

	for(var i = 0; i < codes.length; i++ ){
		cipher_codes.push( (codes[i] +  key_codes[i%keylength]) % 26 )
	}
	ciphertext = uncrypt.convertCodesToString(cipher_codes);
	return ciphertext;
}	

uncrypt.vigenere.decrypt = function(ciphertext, key){
	var plaintext = "";
	var codes = [];
	ciphertext = ciphertext.trim().replace(/ /g,'').toUpperCase();
	key = key.trim().replace(/ /g,'').toUpperCase();
	var cipher_codes = uncrypt.convertStringToCodes(ciphertext)
	var key_codes = uncrypt.convertStringToCodes(key)
	var keylength = key_codes.length;
	for(var i = 0; i < cipher_codes.length; i++ ){
		value = cipher_codes[i] - key_codes[i%keylength]
		codes.push(((value%26)+26)%26)	
	}
	plaintext = uncrypt.convertCodesToString(codes)
	return plaintext;
}

// Hill system

uncrypt.hill.crypt = function(plaintext, matrix){
	var ciphertext;
	var cipher_codes = []
	plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
	var codes = uncrypt.convertStringToCodes(plaintext)
	var partition = matrix.size()[0]
	for(var i = 0 ; i<codes.length ; i=i+partition){
		row = codes.slice(i, i+partition)
		result = math.multiply(row, matrix);
		result.map(function (value, index, matrix) {
			return cipher_codes.push(((value%26)+26)%26)
		})
	}
	ciphertext = uncrypt.convertCodesToString(cipher_codes);
	return ciphertext
}