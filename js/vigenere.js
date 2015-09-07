$( document ).ready(function() {

	$("#crypt").click(function(){
		var plaintext = $("#plaintext").val()
		var key = $("#cipher_key").val();
		var valid = true;
		var ciphertext;
		if(plaintext==""){
			valid = false;
			alert("Por favor, escribe un texto para ser cifrado");
		}else if(key == ""){
			valid = false;
			alert("Por favor, escribe una clave para que el texto pueda ser cifrado");
		}else{
			var matches = key.match(/\d+/g);
			if (matches != null) {
				valid = false;
    			alert('La clave es invalida');
			}
		}
		
		if(valid){
			ciphertext = uncrypt.vigenere.crypt(plaintext,key)
			$("#ciphertext").val(ciphertext);
			$("#decipher_key").val("");
		}

	})

	$("#decrypt").click(function(){
		var ciphertext = $("#ciphertext").val()
		var key = $("#decipher_key").val();
		var valid = true;
		var plaintext;
		if(ciphertext==""){
			valid = false;
			alert("Por favor, escribe un texto para ser cifrado");
		}else if(key == ""){
			valid = false;
			alert("Por favor, escribe una clave para que el texto pueda ser descifrado");
		}else{
			var matches = key.match(/\d+/g);
			if (matches != null) {
				valid = false;
    			alert('La clave es invalida');
			}
		}
		
		if(valid){
			plaintext = uncrypt.vigenere.decrypt(ciphertext,key)
			$("#plaintext").val(plaintext);
			$("#cipher_key").val("");
		}
	})
});