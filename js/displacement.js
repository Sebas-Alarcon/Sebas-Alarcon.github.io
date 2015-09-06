$( document ).ready(function() {
    $("input[type='number']").prop('min',0);
   	$("input[type='number']").prop('max',25);

	$("#crypt").click(function(){
		var plaintext = $("#plaintext").val();
		var key = $("#cipher_key").val();
		var ciphertext;
		if(plaintext==""){
			alert("Por favor, escribe un texto para ser cifrado");
		}else if(key==""){
			alert("Por favor, escribe una clave para que el texto pueda ser cifrado");
		}else{
			if(parseInt(key)<0){
				key = 0
				$("#cipher_key").val(key)
			}else if(parseInt(key)>25){
				key = 25
				$("#cipher_key").val(key)
			}
			ciphertext = uncrypt.displacement.crypt(plaintext,parseInt(key));
			$("#ciphertext").val(ciphertext)
			$("#decipher_key").val("")
		}
	})

	$("#decrypt").click(function(){
		var ciphertext = $("#ciphertext").val();
		var key = $("#decipher_key").val();
		var plaintext;
		if(ciphertext==""){
			alert("Por favor, escribe un texto para ser descifrado");
		}else if(key==""){
			alert("Por favor, escribe una clave para que el texto pueda ser descifrado");
		}else{
			if(parseInt(key)<0){
				key = 0
				$("#decipher_key").val(key)
			}else if(parseInt(key)>25){
				key = 25
				$("#decipher_key").val(key)
			}
			plaintext = uncrypt.displacement.decrypt(ciphertext,parseInt(key));
			$("#plaintext").val(plaintext)
			$("#cipher_key").val("")
		}
	})
});