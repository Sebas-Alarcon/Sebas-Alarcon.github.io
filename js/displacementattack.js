$(document).ready(function(){
	$("#attack").click(function(){
		var ciphertext = $("#ciphertext").val();
		var plaintext = [];
		if(ciphertext==""){
			alert("Por favor, escribe un texto para ser descifrado");
		}else{
			console.log(ciphertext)
			for(var i = 0; i<26;i++){
				plaintext.push(uncrypt.displacement.decrypt(ciphertext, i));	
			}
			$("#plaintext").html("")
			for(var i = 0; i<plaintext.length;i++){
				$("#plaintext").append(plaintext[i]+" - Con clave "+i+"<br>")
			}
				
		}
	})
});