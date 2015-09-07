$( document ).ready(function() {

	$("#crypt").click(function(){
		var keya = parseInt($("#cipher_keya").val())
		var keyb = parseInt($("#cipher_keyb").val())
		var plaintext = $("#plaintext").val()
		var valid = true;
		var ciphertext;

		if(plaintext==""){
			valid = false;
			alert("Por favor, escribe un texto para ser cifrado");
		}

		if(valid){
			if(isNaN(keya)){
				valid = false;
				alert("Clave a inválida")
				}else if(keya>25){
					keya = 25
					$("#cipher_keya").val(keya)
				}else if(keya<0){
					keya = 0
					$("#cipher_keya").val(keya)
				}	
		}
		
		if(valid){
			if(isNaN(keyb)){
				valid=false;
				alert("Clave b inválida")
			}else if(keyb<0){
				keyb = 0
				$("#cipher_keyb").val(keyb)
			}else if(keyb>25){
				keyb = 25
				$("#cipher_keyb").val(keyb)
			}	
		}
		
		if(valid){
			if(uncrypt.gcd(keya,26) != 1){
				valid = false
				alert("Clave inválida")
			}	
		}

		if(valid){
			ciphertext = uncrypt.affine.crypt(plaintext,keya,keyb);
			$("#ciphertext").val(ciphertext)
			$("#decipher_keya").val("")
			$("#decipher_keyb").val("")
		}
		
	})

	$("#decrypt").click(function(){
		var keya = parseInt($("#decipher_keya").val())
		var keyb = parseInt($("#decipher_keyb").val())
		var ciphertext = $("#ciphertext").val()
		var valid = true;
		var plaintext;

		if(ciphertext==""){
			valid = false;
			alert("Por favor, escribe un texto para ser descifrado");
		}

		if(valid){
			if(isNaN(keya)){
				valid = false;
				alert("Clave a inválida")
				}else if(keya>25){
					keya = 25
					$("#decipher_keya").val(keya)
				}else if(keya<0){
					keya = 0
					$("#decipher_keya").val(keya)
				}	
		}
		
		if(valid){
			if(isNaN(keyb)){
				valid=false;
				alert("Clave b inválida")
			}else if(keyb<0){
				keyb = 0
				$("#decipher_keyb").val(keyb)
			}else if(keyb>25){
				keyb = 25
				$("#decipher_keyb").val(keyb)
			}	
		}
		
		if(valid){
			if(uncrypt.gcd(keya,26) != 1){
				valid = false
				alert("Clave inválida")
			}	
		}

		if(valid){
			plaintext = uncrypt.affine.decrypt(ciphertext,keya,keyb);
			$("#plaintext").val(plaintext)
			$("#cipher_keya").val("")
			$("#cipher_keyb").val("")
		}
	})
});