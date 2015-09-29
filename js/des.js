$( document ).ready(function() {
	ip = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7]
	ip_inv = []
	pc1 = [57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,3,45,37,29,21,13,5,28,20,12,4]
	pc2 = [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32]
	pe = [32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1]
	p = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25]
	sboxes = []
	sboxes.push([
		[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],
		[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],
		[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],
		[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]
	])
	sboxes.push([
		[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],
		[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],
		[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],
		[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]
	])
	sboxes.push([
		[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],
		[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],
		[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],
		[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]
	])
	sboxes.push([
		[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],
		[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],
		[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],
		[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]
	])
	sboxes.push([
		[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],
		[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],
		[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],
		[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]
	])
	sboxes.push([
		[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],
		[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],
		[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],
		[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]
	])
	sboxes.push([
		[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],
		[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],
		[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],
		[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]
	])
	sboxes.push([
		[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],
		[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],
		[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],
		[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
	])

	for(i = 0; i<ip.length;i++){
		ip_inv.push(ip.indexOf((i+1))+1)
	}

	$("#ip").html("<h5 class='bold'>Permutación Inicial (IP)</h5>")
	$.each(ip,function(index,value){
		$("#ip").append(value)
		if(index != ip.length - 1){
			$("#ip").append(" ")
		}
	})

	$("#ip_inv").html("<h5 class='bold'>Inversa de Permutación Inicial (IP)<sup>-1</sup></h5>")
	$.each(ip_inv,function(index,value){
		$("#ip_inv").append(value)
		if(index != ip_inv.length - 1){
			$("#ip_inv").append(" ")
		}
	})

	$("#pc1").html("<h5 class='bold'>PC-1</h5>")
	$.each(pc1,function(index,value){
		$("#pc1").append(value)
		if(index != pc1.length - 1){
			$("#pc1").append(" ")
		}
	})

	$("#pc2").html("<h5 class='bold'>PC-2</h5>")
	$.each(pc2,function(index,value){
		$("#pc2").append(value)
		if(index != pc2.length - 1){
			$("#pc2").append(" ")
		}
	})

	$("#pe").html("<h5 class='bold'>Permutación / Expansión</h5>")
	$.each(pe,function(index,value){
		$("#pe").append(value)
		if(index != pe.length - 1){
			$("#pe").append(" ")
		}
	})

	$("#p").html("<h5 class='bold'>Permutación</h5>")
	$.each(p,function(index,value){
		$("#p").append(value)
		if(index != p.length - 1){
			$("#p").append(" ")
		}
	})

	$("#sboxes").html("")
	$.each(sboxes, function(index, box){
		$("#sboxes").append("<h5 class=bold>S<sub>"+index+"=</sub></h5>")
		$.each(box, function(i, value){
			$("#sboxes").append(value.join(" "))
			$("#sboxes").append("<br>");
		})
	})

	$("#show_sboxes").click(function(){
		$("#sboxes").fadeToggle()
		setTimeout(function(){
			if($("#sboxes").is(":visible")){
				$("#show_sboxes").val("Ocultar S-boxes")
			}else{
				$("#show_sboxes").val("Mostrar S-boxes")
			}
		}, 500);

	})

	$("#cipher_key").val(uncrypt.des.generate_key(16))

	$("#generate_key").click(function(){
		$("#cipher_key").val(uncrypt.des.generate_key(16))		
	})



	$("#crypt").click(function(){
		plaintext = $("#plaintext").val()
		key = $("#cipher_key").val()
		if(plaintext == ""){
			alert("Por favor ingresa un texto para ser cifrado")
		}else{
			ciphertext = uncrypt.des.crypt(plaintext, key, ip, pc1, pc2, pe, p, sboxes, ip_inv)
			$("#ciphertext").val("")
			ascii=uncrypt.toAscii(ciphertext.join(""))
			hex = uncrypt.bin2hex(ascii)
			$("#ciphertext").val(hex)
		}

	})

	$("#decrypt").click(function(){
		ciphertext = $("#ciphertext").val()
		key = $("#cipher_key").val()
		if(ciphertext == ""){
			alert("Por favor ingresa un texto para ser decifrado")
		}else{
			plaintext = uncrypt.des.decrypt(ciphertext, key, ip, pc1, pc2, pe, p, sboxes, ip_inv)
			$("#plaintext").val("")
			ascii=uncrypt.toAscii(plaintext.join(""))
			hex = uncrypt.bin2hex(ascii)
			$("#plaintext").val(hex)
		}

	})

});