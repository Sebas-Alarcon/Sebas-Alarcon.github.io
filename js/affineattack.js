$( document ).ready(function() {
	var analysis = false;
	$("#attack").click(function(){
		var ciphertext = $("#ciphertext").val()
		var freq_analysis;
		var bigram_analysis;
		var trigram_analysis;

		if(ciphertext==""){
			alert("Por favor ingrese un texto para ser descifrado")
		}else{
			freq_analysis = uncrypt.letterFreq(ciphertext)
			$("#freq_analysis").html("<h5 class='mayus bold'>Frecuencia de caracteres</h5>")
			for(var i= 0; i < freq_analysis.length; i++){
				$("#freq_analysis").append("El caracter "+freq_analysis[i][0]+" ocurre "+freq_analysis[i][1]+" veces.<br>")
			}

			$("#freq_analysis").append("<br>")

			bigram_analysis = uncrypt.analizeBigrams(ciphertext);
			if(bigram_analysis.length>0){
				$("#bigram_analysis").html("<h5 class='mayus bold'>Frecuencia de Bigramas</h5>")
				for(var i= 0; i < bigram_analysis.length; i++){
					$("#bigram_analysis").append("El bigrama "+bigram_analysis[i][0]+" ocurre "+bigram_analysis[i][1]+" veces.<br>")
				}
				$("#bigram_analysis").append("<br>")
			}else{
				$("#bigram_analysis").html("")
			}
			

			trigram_analysis = uncrypt.analizeTrigrams(ciphertext)
			if(trigram_analysis.length>0){
				$("#trigram_analysis").html("<h5 class='mayus bold'>Frecuencia de Trigramas</h5>")
				for(var i= 0; i < trigram_analysis.length; i++){
					$("#trigram_analysis").append("El trigrama "+trigram_analysis[i][0]+" ocurre "+trigram_analysis[i][1]+" veces.<br>")
				}
				$("#trigram_analysis").append("<br>")
			}else{
				$("#trigram_analysis").html("")
			}
			analysis = true;
		}
		
	});
	

	$("#solve").click(function(){
		var ciphertext = $("#ciphertext").val()
		var x1 = parseInt($("#a1").val())
		var x2 = parseInt($("#a2").val())
		var y1 = parseInt($("#b1").val())
		var y2 = parseInt($("#b2").val())
		var solution;
		var a;
		var b;
		var control = true;
		var plaintext;
		$("#key").html("")
		$("#plaintext").html("")
		if(!analysis){
			var r = confirm("No ha realizado el análisis de frecuencias, seguro que desea continuar?");
			if(r==false){
				control = false;
			}
		}
		
		if(control){
			if(isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)){
				alert("Por favor ingrese el sistema de congruencias completo")
			}else{
				x1 = ((x1%26)+26)%26
				x2 = ((x2%26)+26)%26
				y1 = ((y1%26)+26)%26
				y2 = ((y2%26)+26)%26
				solution = uncrypt.solve(x1,x2,y1,y2)
				if(solution == false){
					alert("El sistema no pudo ser resuelto")
				}else{
					a = solution[0]
					b = solution[1]
					$("#key").append("a = "+a+"<br>")
					$("#key").append("b = "+b)
					if(uncrypt.gcd(a,26) != 1){
						alert("La clave obtenida es inválida")
					}else{
						var c = confirm("Desea descifrar usando la clave obtenida?\n(a="+a+", b="+b+")");
						if(c==true){
							if(ciphertext==""){
								alert("Por favor ingrese un texto para ser descifrado")
							}else{
								plaintext = uncrypt.affine.decrypt(ciphertext,a,b);
								$("#plaintext").html(plaintext)
							}
							
						}
					}
				}
			}
		}
		
	})

});