$( document ).ready(function() {


	$("#set_partition").click(function(){
		var plaintext = $("#plaintext").val().trim().replace(/ /g,'')
		var partition = parseInt($("#mpartition").val());
		if(plaintext != "" && plaintext.length % partition != 0){
			alert("Atención: El texto no se puede dividir exactamente en la longitud especificada por la partición")
		}

		$("#cipher_matrix").html("")
		width = 100/partition - 2
		for(var i = 0; i<partition;i++){
			for(var j = 0; j<partition; j++){
				$("#cipher_matrix").append("<input type='number' name='matrix_in["+i+"]["+j+"]' style='display: inline-block;width:"+width+"%; margin-right: 1%'>")
			}
		}
	})


	$("#de_set_partition").click(function(){
		var ciphertext = $("#ciphertext").val().trim().replace(/ /g,'')
		var partition = parseInt($("#dempartition").val());
		if(ciphertext != "" && ciphertext.length % partition != 0){
			alert("Atención: El texto no se puede dividir exactamente en la longitud especificada por la partición")
		}

		$("#decipher_matrix").html("")
		width = 100/partition - 2
		for(var i = 0; i<partition;i++){
			for(var j = 0; j<partition; j++){
				$("#decipher_matrix").append("<input type='number' name='dematrix_in["+i+"]["+j+"]' style='display: inline-block;width:"+width+"%; margin-right: 1%'>")
			}
		}
	})

	$("#crypt").click(function(){
		var keymatrix = []
		var partition = parseInt($("#mpartition").val());
		var plaintext = $("#plaintext").val().trim().replace(/ /g,'')
		var valid = true;
		var ciphertext;
		if(plaintext==""){
			valid = false;
			alert("Por favor ingrese un texto para ser cifrado")
		}

		if(plaintext != "" && plaintext.length % partition != 0){
			valid = false
			alert("El texto no se puede dividir exactamente en la longitud especificada por la partición")
		}

		if(valid){
			for(var i = 0; i<partition; i++){
				row = []
				$('input[name^="matrix_in['+i+']"]').each(function(i, selected){ 
  					row.push(parseInt($(selected).val())%26); 
				});
				keymatrix.push(row);
			}
			keymatrix = math.matrix(keymatrix);
			det = math.det(keymatrix)
			det = ((det%26)+26)%26
			if(uncrypt.gcd(det,26) != 1){
				valid = false;
				alert("La clave no es válida")
			}
		}

		if(valid){
			ciphertext = uncrypt.hill.crypt(plaintext,keymatrix)
			$("#ciphertext").val(ciphertext)
			$("$decipher_matrix").html("")
			$("#dempartition").val(2)
		}

	})

	/*
	$("#decrypt").click(function(){
		var keymatrix = []
		var partition = parseInt($("#dempartition").val());
		var ciphertext = $("#ciphertext").val().trim().replace(/ /g,'')
		var valid = true;
		var plaintext;
		if(ciphertext==""){
			valid = false;
			alert("Por favor ingrese un texto para ser cifrado")
		}

		if(ciphertext != "" && ciphertext.length % partition != 0){
			valid = false
			alert("El texto no se puede dividir exactamente en la longitud especificada por la partición")
		}

		if(valid){
			for(var i = 0; i<partition; i++){
				row = []
				$('input[name^="dematrix_in['+i+']"]').each(function(i, selected){ 
  					row.push(parseInt($(selected).val())); 
				});
				keymatrix.push(row);
			}
			keymatrix = math.matrix(keymatrix);
			det = math.det(keymatrix)
			det = ((det%26)+26)%26
			if(uncrypt.gcd(det,26) != 1){
				valid = false;
				alert("La clave no es válida")
			}
		}

		if(valid){
			plaintext = uncrypt.hill.decrypt(ciphertext,keymatrix)
			$("#plaintext").val(plaintext)
			$("$cipher_matrix").html("")
			$("#mpartition").val(2)
		}
	})
	*/
});