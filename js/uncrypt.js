/**
* @fileoverview Library with cryptography functions. It contains encryption, decryption and cracks of some of the most popular
*
* @author Sebastián Alarcón
* @version 0.1
*/

/*
	Some of the functions wasn't written by me. Before a function wasn't written by me I put the corresponding authoring and rights note with name and repository
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

    randomArray : function(min,max){
		return (new Array(max-min))
		.join(',').split(',')
		.map(function(v,i){ return [Math.random(), min + i]; })
		.sort().map(function(v) { return v[1]; });
	},

	rotate : function( array , times ){
		while( times-- ){
			var temp = array.shift();
			array.push( temp )
		}
		return array;
	},

	apply_permutation : function (original_array, permutation_array){
		var result = []
		for(i = 0; i<permutation_array.length; i++){
			index = parseInt(permutation_array[i])-1
			result.push(original_array[index])
		}
		return result;
	},

	pad : function(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},

	convertBinary : function(input) {
		output = "";
		for (i=0; i < input.length; i++) {
			var e=input[i].charCodeAt(0);var s = "";
			do{
				var a =e%2;
				e=(e-a)/2;
				s=a+s;
        	}while(e!=0);
			while(s.length<8){s="0"+s;}
        	output+=s;
    	}
		return output;
	},
	toAscii: function(bin) {
		return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
			return String.fromCharCode(parseInt(bin, 2))
		})
	},
	hex2bin : function (hex){
		var bytes = [], str;

		for(var i=0; i< hex.length-1; i+=2)
			bytes.push(parseInt(hex.substr(i, 2), 16));

		return String.fromCharCode.apply(String, bytes);    
	},

	bin2hex : function (bin){
		var i = 0, l = bin.length, chr, hex = ''
		for (i; i < l; ++i){
			chr = bin.charCodeAt(i).toString(16)
			hex += chr.length < 2 ? '0' + chr : chr
		}
		return hex
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
	},

	s_des:{
		generate_key : function(){
			var key = []
			for (var i = 0; i<10;i++){
				key.push(Math.floor(Math.random() * (1 - 0 + 1)) + 0);	
			}
			return key;
		},
		calc_key_itinerary : function(key, p10, p8){
			key = key.split(" ")
			p10 = p10.split(" ")
			p8 = p8.split(" ")
			var k1=[];
			var k2=[];
			var left = [];
			var right = []

			k1 = k2 = uncrypt.apply_permutation(key, p10)

			k1_left = k1.slice(0,5)
			k1_right = k1.slice(5,10)
			k1 = []
			k1 = k1.concat(uncrypt.rotate(k1_left, 1));
			k1 = k1.concat(uncrypt.rotate(k1_right, 1));

			k2_left = k1.slice(0,5)
			k2_right = k1.slice(5,10)
			k2 = []
			k2 = k2.concat(uncrypt.rotate(k2_left, 2));
			k2 = k2.concat(uncrypt.rotate(k2_right, 2));

			k1 = uncrypt.apply_permutation(k1, p8)			
			k2 = uncrypt.apply_permutation(k2, p8)			

			return [k1,k2];
		},
		crypt : function(plaintext, key, p10, p8, ip, s0, s1, p4, pe){
			plaintext = plaintext.trim();
			var resultArray = []
			var resultCipher = []
			for (var i = 0; i < plaintext.length; i++) {
				resultCipher.push(uncrypt.convertBinary(plaintext[i]))	
			}

			itinerary = uncrypt.s_des.calc_key_itinerary(key, p10, p8)
			k1 = itinerary[0]
			k2 = itinerary[1]
			ip = ip.split(" ")
			pe = pe.split(" ")
			p4 = p4.split(" ")
			ip_inv = []
			for(i = 0; i<ip.length;i++){
   				ip_inv.push(ip.indexOf(""+(i+1))+1)
			}

			for(i = 0; i<resultCipher.length;i++){
				ciphertext = []
				ciphertext = uncrypt.apply_permutation(resultCipher[i], ip)
				left_temp = ciphertext.slice(0,4)
				right_temp = right_temp2 = ciphertext.slice(4,8)
				right_temp2 = uncrypt.apply_permutation(right_temp2, pe)
				var sum_k1_r = k1.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(right_temp2[idx]))%2
					return sum;
				});
				s0_pos = [""+sum_k1_r[0]+sum_k1_r[3],""+sum_k1_r[1]+sum_k1_r[2]]
				s0_row = parseInt(s0_pos[0], 2)
				s0_col = parseInt(s0_pos[1], 2)

				s1_pos = [""+sum_k1_r[4]+sum_k1_r[7],""+sum_k1_r[5]+sum_k1_r[6]]
				s1_row = parseInt(s1_pos[0], 2)
				s1_col = parseInt(s1_pos[1], 2)

				s0_result =s0[s0_row][s0_col]
				s1_result =s1[s1_row][s1_col]

				ciphertext = uncrypt.pad((parseInt(s0_result)).toString(2),2) + uncrypt.pad((parseInt(s1_result)).toString(2),2)
				ciphertext = uncrypt.apply_permutation(ciphertext,p4)

				ciphertext = ciphertext.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(left_temp[idx]))%2
					return sum.toString();
				});
				ciphertext = ciphertext.concat(right_temp);
				// END FIRST ROUND
				ciphertext = ciphertext.concat(ciphertext.splice(0,4))

				left_temp = ciphertext.slice(0,4)
				right_temp = right_temp2 = ciphertext.slice(4,8)
				right_temp2 = uncrypt.apply_permutation(right_temp2, pe)

				var sum_k1_r = k2.map(function (num, idx) {
				 	sum =(parseInt(num)+ parseInt(right_temp2[idx]))%2
					return sum;
				});
				s0_pos = [""+sum_k1_r[0]+sum_k1_r[3],""+sum_k1_r[1]+sum_k1_r[2]]
				s0_row = parseInt(s0_pos[0], 2)
				s0_col = parseInt(s0_pos[1], 2)
				
				s1_pos = [""+sum_k1_r[4]+sum_k1_r[7],""+sum_k1_r[5]+sum_k1_r[6]]
				s1_row = parseInt(s1_pos[0], 2)
				s1_col = parseInt(s1_pos[1], 2)

				s0_result =s0[s0_row][s0_col]
				s1_result =s1[s1_row][s1_col]

				ciphertext = uncrypt.pad((parseInt(s0_result)).toString(2),2) + uncrypt.pad((parseInt(s1_result)).toString(2),2)
				ciphertext = uncrypt.apply_permutation(ciphertext,p4)
				ciphertext = ciphertext.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(left_temp[idx]))%2
					return sum.toString();
				});

				ciphertext = ciphertext.concat(right_temp);
				ciphertext = uncrypt.apply_permutation(ciphertext, ip_inv)
				resultArray.push(ciphertext.join(""))
			}

			return resultArray
		},

		decrypt : function(ciphertext, key, p10, p8, ip, s0, s1, p4, pe){
			ciphertext = ciphertext.trim();
			var resultArray = []
			var resultCipher = []
			for (var i = 0; i < ciphertext.length; i++) {
				resultCipher.push(uncrypt.convertBinary(ciphertext[i]))	
			}

			itinerary = uncrypt.s_des.calc_key_itinerary(key, p10, p8)
			k1 = itinerary[0]
			k2 = itinerary[1]
			ip = ip.split(" ")
			pe = pe.split(" ")
			p4 = p4.split(" ")
			ip_inv = []
			for(i = 0; i<ip.length;i++){
   				ip_inv.push(ip.indexOf(""+(i+1))+1)
			}

			for(i = 0; i<resultCipher.length;i++){
				plaintext = []
				plaintext = uncrypt.apply_permutation(resultCipher[i], ip)
				left_temp = plaintext.slice(0,4)
				right_temp = right_temp2 = plaintext.slice(4,8)
				right_temp2 = uncrypt.apply_permutation(right_temp2, pe)
				var sum_k1_r = k2.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(right_temp2[idx]))%2
					return sum;
				});
				s0_pos = [""+sum_k1_r[0]+sum_k1_r[3],""+sum_k1_r[1]+sum_k1_r[2]]
				s0_row = parseInt(s0_pos[0], 2)
				s0_col = parseInt(s0_pos[1], 2)

				s1_pos = [""+sum_k1_r[4]+sum_k1_r[7],""+sum_k1_r[5]+sum_k1_r[6]]
				s1_row = parseInt(s1_pos[0], 2)
				s1_col = parseInt(s1_pos[1], 2)

				s0_result =s0[s0_row][s0_col]
				s1_result =s1[s1_row][s1_col]

				plaintext = uncrypt.pad((parseInt(s0_result)).toString(2),2) + uncrypt.pad((parseInt(s1_result)).toString(2),2)
				plaintext = uncrypt.apply_permutation(plaintext,p4)

				plaintext = plaintext.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(left_temp[idx]))%2
					return sum.toString();
				});
				plaintext = plaintext.concat(right_temp);
				// END FIRST ROUND
				plaintext = plaintext.concat(plaintext.splice(0,4))

				left_temp = plaintext.slice(0,4)
				right_temp = right_temp2 = plaintext.slice(4,8)
				right_temp2 = uncrypt.apply_permutation(right_temp2, pe)

				var sum_k1_r = k1.map(function (num, idx) {
				 	sum =(parseInt(num)+ parseInt(right_temp2[idx]))%2
					return sum;
				});
				s0_pos = [""+sum_k1_r[0]+sum_k1_r[3],""+sum_k1_r[1]+sum_k1_r[2]]
				s0_row = parseInt(s0_pos[0], 2)
				s0_col = parseInt(s0_pos[1], 2)
				
				s1_pos = [""+sum_k1_r[4]+sum_k1_r[7],""+sum_k1_r[5]+sum_k1_r[6]]
				s1_row = parseInt(s1_pos[0], 2)
				s1_col = parseInt(s1_pos[1], 2)

				s0_result =s0[s0_row][s0_col]
				s1_result =s1[s1_row][s1_col]

				plaintext = uncrypt.pad((parseInt(s0_result)).toString(2),2) + uncrypt.pad((parseInt(s1_result)).toString(2),2)
				plaintext = uncrypt.apply_permutation(plaintext,p4)
				plaintext = plaintext.map(function (num, idx) {
					sum =(parseInt(num)+ parseInt(left_temp[idx]))%2
					return sum.toString();
				});

				plaintext = plaintext.concat(right_temp);
				plaintext = uncrypt.apply_permutation(plaintext, ip_inv)
				resultArray.push(plaintext.join(""))
			}

			return resultArray
		}

	},

	des : {
		keys_left : [],
		keys_right : [],
		keys : [],
		left : [],
		right: [],
		calc_key_itinerary : function(key, pc1, pc2){
			prime_key = uncrypt.apply_permutation(key, pc1)
			var left = prime_key.slice(0,28)
			var right = prime_key.slice(28,56)
			uncrypt.des.keys_left.push(left.slice(0))
			uncrypt.des.keys_right.push(right.slice(0))

			for(i = 1; i<=16;i++){
				if(i == 1 || i == 2 || i == 9 || i == 16){
				 	left = uncrypt.rotate(left, 1)
				 	right = uncrypt.rotate(right,1)

				 	uncrypt.des.keys_left.push(left.slice(0))
				 	uncrypt.des.keys_right.push(right.slice(0))
				}else{
				 	left = uncrypt.rotate(left, 2)
				 	right = uncrypt.rotate(right,2)
					
				 	uncrypt.des.keys_left.push(left.slice(0))
					uncrypt.des.keys_right.push(right.slice(0))
				}
			}

			for(var i = 1 ; i < uncrypt.des.keys_left.length; i++){
				var key1 = uncrypt.des.keys_left[i].concat(uncrypt.des.keys_right[i])
				var key_permutted = uncrypt.apply_permutation(key1,pc2)
				uncrypt.des.keys.push(key_permutted)
			}
		},
		generate_key: function(length){
			var ret = "";
			while (ret.length < length) {
				ret += Math.random().toString(16).substring(2);
			}
			return ret.substring(0,length);
		},
		rounds : function(left, right, index, pe, sboxes, p){
			uncrypt.des.left = right;
			right = uncrypt.apply_permutation(right, pe)


			var sum_kn_r = uncrypt.des.keys[index].map(function (num, idx) {
				sum =(parseInt(num)+ parseInt(right[idx]))%2
				return sum;
			});

			s = 0;
			provisional_ciphertext = "";
			for(var i=0; i<48; i+=6){
				b_n = sum_kn_r.slice(i,i+6)
				sn_pos = [""+b_n[0]+b_n[5],""+b_n[1]+b_n[2]+b_n[3]+b_n[4]]
				sn_row = parseInt(sn_pos[0],2)
				sn_col = parseInt(sn_pos[1],2)
				provisional_ciphertext += uncrypt.pad((parseInt(sboxes[s][sn_row][sn_col])).toString(2),4)
				s++;
			}
			provisional_ciphertext = uncrypt.apply_permutation(provisional_ciphertext, p)
			

			uncrypt.des.right = left.map(function (num, idx) {
				sum =(parseInt(num)+ parseInt(provisional_ciphertext[idx]))%2
				return sum;
			});			
		},
		crypt : function(plaintext, key, ip, pc1, pc2, pe, p, sboxes , ip_inv){
			ascii = uncrypt.hex2bin(plaintext)
			ascii_key = uncrypt.hex2bin(key)
			binary = uncrypt.convertBinary(ascii)
			binary_key = uncrypt.convertBinary(ascii_key)
			ciphertext = uncrypt.apply_permutation(binary, ip)
			uncrypt.des.calc_key_itinerary(binary_key, pc1, pc2)
			uncrypt.des.left = ciphertext.slice(0,32)
			uncrypt.des.right = ciphertext.slice(32,64)
			for(var i=0;i<15;i++){
				uncrypt.des.rounds(uncrypt.des.left, uncrypt.des.right, i,pe, sboxes,p)
			}
			ciphertext = uncrypt.des.right.concat(uncrypt.des.left)
			ciphertext = uncrypt.apply_permutation(ciphertext, ip_inv)
			return ciphertext;
		},
		decrypt : function(ciphertext, key, ip, pc1, pc2, pe, p, sboxes , ip_inv){
			ascii = uncrypt.hex2bin(ciphertext)
			ascii_key = uncrypt.hex2bin(key)
			binary = uncrypt.convertBinary(ascii)
			binary_key = uncrypt.convertBinary(ascii_key)
			plaintext = uncrypt.apply_permutation(binary, ip)
			uncrypt.des.calc_key_itinerary(binary_key, pc1, pc2)
			uncrypt.des.left = plaintext.slice(0,32)
			uncrypt.des.right = plaintext.slice(32,64)
			for(var i=15;i>0;i--){
				uncrypt.des.rounds(uncrypt.des.left, uncrypt.des.right, i,pe, sboxes,p)
			}
			plaintext = uncrypt.des.right.concat(uncrypt.des.left)
			plaintext = uncrypt.apply_permutation(plaintext, ip_inv)
			return plaintext;
		}
	}
}