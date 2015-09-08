/**
* @fileoverview Library with cryptography functions. It contains encryption, decryption and cracks of some of the most popular
*
* @author Sebastián Alarcón
* @version 0.1
*/

/*
	Some of the functions wasn't written by me. Before a function wasn't written by me I put the corresponding authoringand rights note with name and repository
*/

var uncrypt = {

	inverse : {1:1,	3:9, 5:21, 7:15, 9:3, 11:19, 15:7, 17:23, 19:11, 23:17, 25:25},
	
	trigrams : ["THE", "AND", "ING", "ENT", "ION", "HER", "FOR", "THA", "NTH", "INT", "ERE", "TIO", "TER"],
	
	bigrams : ["TH", "HE", "IN", "ER", "AN", "RE", "ES", "ON", "ST", "NT", "EN", "AT", "ED", "ND", "TO", "OR", "EA", "TI", "AR", "TE"],

	standardFrequency : {
        'A': .082, 'B': .015, 'C': .028, 'D': .043,
        'E': .127, 'F': .022, 'G': .020, 'H': .061,
        'I': .070, 'J': .002, 'K': .008, 'L': .040,
        'M': .024, 'N': .067, 'O': .075, 'P': .019,
        'Q': .001, 'R': .060, 'S': .063, 'T': .091,
        'U': .028, 'V': .010, 'W': .023, 'X': .001,
        'Y': .020, 'Z': .001
    },

	gcd : function(a, b) {
		if ( ! b) {
			return a;
		}

		return uncrypt.gcd(b, a % b);
	},

	solve : function(x1,x2,y1,y2){
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
	},

	countStringOcurrence : function(string, substring){
		var re = new RegExp(substring,"g");
		var count = (string.match(re) || []).length;
		return count;
	},

	sortObject : function(object){
		var sortable = [];
		for (var item in object)
			sortable.push([item, object[item]])
		sortable.sort(function(a, b) {return a[1] - b[1]})
		return sortable.reverse()
	},

	analizeTrigrams : function(string){
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
	},

	analizeBigrams : function(string){
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
	},

	convertStringToCodes : function(plaintext){
		var codes = []
		for(var i = 0; i<plaintext.length; i++){
			codes.push(plaintext.charAt(i).charCodeAt(0)-65)
		}
		return codes;
	},

	convertCodesToString : function(codes){
		var chars = []
		for(var i = 0; i<codes.length; i++){
			chars.push(String.fromCharCode(codes[i]+65));
		}
		return chars.join('');	
	},

	letterFreq : function(string){
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
	},


	indexOfCoincidence : function(frequencyTable) {
        var i, c, idx;

        idx = 0;
        for (i = 0; i < 26; ++i) {
            c = String.fromCharCode(i + 65);
            idx += frequencyTable[c] * uncrypt.standardFrequency[c];
        }
        return idx;
    }, 

    divide : function(str, numGroups) {
		var i, groups;

		groups = [];
		for (i = 0; i < numGroups; ++i) {
			groups.push([]);
		}
		for (i = 0; i < str.length; ++i) {
			groups[i % numGroups].push(str[i]);
		}
		for (i = 0; i < numGroups; ++i) {
			groups[i] = groups[i].join('');
		}
		return groups;
    },

	getFrequencyTable : function(str) {
        var i, charCount, charFrequency;

        // count occurence of each char in the string
        charCount = {};
        for (i = 0; i < 26; ++i) {
            charCount[String.fromCharCode(i + 65)] = 0;
        }
        for (i = 0; i < str.length; ++i) {
            ++charCount[str[i]];
        }

        // frequency of each char in the string
        charFrequency = {};
        for (i = 0; i < 26; ++i) {
            charFrequency[String.fromCharCode(i + 65)] = 
                charCount[String.fromCharCode(i + 65)] / str.length;
        }

        return charFrequency;
    },


	bestCaeserShift : function(ciphertext) {
        var plaintext, shiftAmount, bestShiftAmount, bestOffset, index, 
            difference, bestDifference;

        bestShiftAmount = 0;
        bestDifference = Number.MAX_VALUE;
        for (shiftAmount = 0; shiftAmount < 26; ++shiftAmount) {
            plaintext = uncrypt.displacement.decrypt(ciphertext, shiftAmount);
            index = uncrypt.indexOfCoincidence(uncrypt.getFrequencyTable(plaintext));
            difference = Math.abs(index - 0.065); // 0.065 is the index for natural English
            if (difference < bestDifference) {
                bestDifference = difference;
                bestShiftAmount = shiftAmount;
            }
        }

        return [bestShiftAmount, bestDifference];
    },

	displacement : {
		crypt : function(plaintext, key){
			var cipher_codes = [];
			var ciphertext;
			plaintext = plaintext.trim().replace(/ /g,'').toUpperCase()
			var codes = uncrypt.convertStringToCodes(plaintext)
			
			for(var i = 0; i < codes.length; i++ ){
				cipher_codes.push((codes[i]+key)%26)
			}
			ciphertext = uncrypt.convertCodesToString(cipher_codes);
			return ciphertext;
		},

		decrypt : function(ciphertext, key){
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
	},

	substitution : {
		crypt : function(plaintext, key){
			var ciphertext = "";
			plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
			for(var i=0; i<key.length;i++){
				key[i]=key[i].toUpperCase()	
			}

			for(var i=0;i<plaintext.length;i++){
				ciphertext += key[plaintext.charCodeAt(i)-65]
			}
			
			return ciphertext;
		},
		decrypt : function(ciphertext, key){
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
	},

	affine : {
		crypt : function(plaintext,a,b){
			var ciphertext;
			var cipher_codes = [];
			plaintext = plaintext.trim().replace(/ /g,'').toUpperCase();
			var codes = uncrypt.convertStringToCodes(plaintext)
			for(var i = 0; i < codes.length; i++ ){
				cipher_codes.push((codes[i]*a + b)%26)
			}
			ciphertext = uncrypt.convertCodesToString(cipher_codes);
			return ciphertext;
		},

		decrypt : function(ciphertext,a,b){
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
	},

	vigenere : {
		crypt : function(plaintext, key){
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
		},
		decrypt : function(ciphertext, key){
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
		},


		/*
			This crack function and it's associations (divide, bestCaeserShift, indexOfCoincidence and getFrequencyTable) wasn't written by me. 
			It was written by: Xueqiao (Joe) Xu. GitHub Account: https://github.com/qiao. And it was getting from: https://github.com/qiao/javascript-playground
		*/

		crack: function(ciphertext, maxKeyLength) {
			var i, keyLen,groups, groupIndex, group, info, plaintexts, shiftAmounts, shiftAmount, difference, totalDifference, overall, key;

			overall = [];
			key = [];

			// enumerate key length
			for (keyLen = 1; keyLen <= maxKeyLength; ++keyLen) {
				key = [];
				// get groups
				groups = uncrypt.divide(ciphertext, keyLen);

				totalDifference = 0;
				plaintexts = [];
				
				// enumerate shift amount for each group
				for (groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
					group = groups[groupIndex];

					info = uncrypt.bestCaeserShift(group);
					shiftAmount = info[0];
					difference = info[1];
					totalDifference += difference;
					plaintexts.push(uncrypt.displacement.decrypt(group, shiftAmount));
					key.push(shiftAmount)
				}
				// build plaintext 
				plaintext = [];
				for (i = 0; i < ciphertext.length; ++i) {
					plaintext.push(plaintexts[i % keyLen].charAt(i / keyLen));
				}
				plaintext = plaintext.join('');

				overall.push([totalDifference, plaintext, uncrypt.convertCodesToString(key)]);
			}

			return overall;
		}
	},

	hill : {
		crypt : function(plaintext, matrix){
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
	}
}