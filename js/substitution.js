$( document ).ready(function() {
	$("#crypt").click(function(){
		var key = $("#cipher_key").val()
		var plaintext = $("#plaintext").val();
		var ciphertext;
		array_key = key.split(",")
		valid = true;
		if(plaintext==""){
			alert("Por favor, escribe un texto para ser cifrado");
		}else if(array_key.length<26 || array_key.length>26){
			valid = false;
		}else{
			for(var i=0; i<array_key.length;i++){
				if(array_key[i].trim()== ""){
					valid = false;
				}
			}
		}

		if(valid==false){
			alert("La clave no es válida")
		}else{
			for(var i=0; i<array_key.length;i++){
				array_key[i] = array_key[i].trim()
			}
			ciphertext = uncrypt.substitution.crypt(plaintext,array_key)
			$("#ciphertext").val(ciphertext)
			$("#decipher_key").val("")
		}
	})

	$("#decrypt").click(function(){
		var key = $("#decipher_key").val()
		var ciphertext = $("#ciphertext").val();
		var plaintext;

		array_key = key.split(",")
		valid = true;

		if(ciphertext==""){
			alert("Por favor, escribe un texto para ser cifrado");
		}else if(array_key.length<26 || array_key.length>26){
			valid = false;
		}else{
			for(var i=0; i<array_key.length;i++){
				if(array_key[i].trim()== ""){
					valid = false;
				}
			}
		}

		if(valid==false){
			alert("La clave no es válida")
		}else{
			for(var i=0; i<array_key.length;i++){
				array_key[i] = array_key[i].trim()
			}
			plaintext = uncrypt.substitution.decrypt(ciphertext,array_key)
			$("#plaintext").val(plaintext)
			$("#cipher_key").val("")
		}
	})
});