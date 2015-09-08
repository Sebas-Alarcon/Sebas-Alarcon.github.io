$( document ).ready(function() {
	$("#attack").click(function(){
		var ciphertext = $("#ciphertext").val()
		var key = parseInt($("#keylength").val())
		var plaintext;
		if(ciphertext == ""){
			alert("Por favor, escribe un texto para ser descifrado");
		}else if(isNaN(key)){
			alert("Por favor, escribe una longitud máxima para la clave");
		}else{
			$("#plaintext").html("")
			plaintext = uncrypt.vigenere.crack(ciphertext,key)
			for(var i = 0; i<plaintext.length; i++){
				$("#plaintext").append("<h5 class='mayus bold'>Longitud de la clave: "+(i+1)+"</h5>")
				$("#plaintext").append("<h5 class='mayus bold'>Texto en claro:</h5>")
				$("#plaintext").append("<i>"+plaintext[i][1]+"</i>")
				$("#plaintext").append("<br>")
				$("#plaintext").append("<h5 class='mayus bold'>Clave: </h5>")
				$("#plaintext").append("<i>"+plaintext[i][2]+"</i>")
				$("#plaintext").append("<br><br><br>");
			}
		}
	})

})