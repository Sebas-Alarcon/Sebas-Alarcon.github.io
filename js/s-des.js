$( document ).ready(function() {

	$("#generate_button_p10").click(function(){
		result = uncrypt.randomArray(1,11)
		$("#p10_input").val("")
		input_value = ""
		$.each(result,function(index,value){
			input_value += value
			if(index != result.length - 1){
				input_value += " "
			}
		})
		$("#p10_input").val(input_value)
	})


	$("#generate_button_p8").click(function(){
		result = uncrypt.randomArray(1,9)
		$("#p8_input").val("")
		input_value = ""
		$.each(result,function(index,value){
			input_value += value
			if(index != result.length - 1){
				input_value += " "
			}
		})
		$("#p8_input").val(input_value)
	})


	$("#generate_key").click(function(){
		result = uncrypt.s_des.generate_key();
		$("#cipher_key").val("")
		input_value = ""
		$.each(result,function(index,value){
			input_value += value
			if(index != result.length - 1){
				input_value += " "
			}
		})
		$("#cipher_key").val(input_value)
	})

	$("#generate_button_p4").click(function(){
		result = uncrypt.randomArray(1,5)
		$("#p4_input").val("")
		input_value = ""
		$.each(result,function(index,value){
			input_value += value
			if(index != result.length - 1){
				input_value += " "
			}
		})
		$("#p4_input").val(input_value)
	})

	$("#generate_ip").click(function(){
		result = uncrypt.randomArray(1,9)
		$("#ip_input").val("")
		input_value = ""
		$.each(result,function(index,value){
			input_value += value
			if(index != result.length - 1){
				input_value += " "
			}
		})
		$("#ip_input").val(input_value)
	})


	$("#generate_s0").click(function(){
		for(i = 0; i < 4; i++){
			result = uncrypt.randomArray(0,4)
			for(j = 0; j<4;j++){
				$("input[name='s0["+i+"]["+j+"]']").val(result[j])
			}
		}
	})

	$("#generate_s1").click(function(){
		for(i = 0; i < 4; i++){
			result = uncrypt.randomArray(0,4)
			for(j = 0; j<4;j++){
				$("input[name='s1["+i+"]["+j+"]']").val(result[j])
			}
		}
	})

	$("#set_settings").click(function(){
		p10 = $("#p10_input").val()
		p8 = $("#p8_input").val()
		key = $("#cipher_key").val()
		key_itinerary = uncrypt.s_des.calc_key_itinerary(key, p10, p8)
		$(".key_itinerary div").html("")
		$.each(key_itinerary,function(index,value){
			$(".key_itinerary div").append("k<sub>"+(index+1)+"</sub> = ")
			$.each(value, function(index, val){
				$(".key_itinerary div").append(val+" ")
			})
			$(".key_itinerary div").append("<br>")
		})
	})

	$("#crypt").click(function(){
		p10 = $("#p10_input").val()
		p8 = $("#p8_input").val()
		key = $("#cipher_key").val()
		p4 = $("#p4_input").val()
		ip = $("#ip_input").val()
		pe = $("#pe_input").val()
		s0 = []
		s1 = []
		valid = true;
		plaintext = $("#ciphertext").val()
		for(i = 0; i < 4; i++){
			rowS0 = []
			rowS1 = []
			for(j = 0; j<4;j++){
				rowS0.push($("input[name='s0["+i+"]["+j+"]']").val())
				rowS1.push($("input[name='s1["+i+"]["+j+"]']").val())
			}
			s0.push(rowS0)
			s1.push(rowS1)
		}

		$(".crypt_wrapper input, .crypt_wrapper textarea#ciphertext").each(function(){
			var self = $(this),
			thisVal = self.val();
			if($.trim(thisVal) === "" || thisVal.length === 0){
				valid = false;
			}
		});

		if($(".crypt_wrapper textarea#ciphertext").val() == ""){
			valid = false;
		}

		if(valid){
			ciphertext = uncrypt.s_des.crypt(plaintext, key, p10, p8, ip, s0, s1, p4, pe);
			$("#deciphertext").val("")
			cipher_value = ""	
			$.each(ciphertext,function(index,value){
				cipher_value += uncrypt.toAscii(value) 
			})
			$("#deciphertext").val(cipher_value)
		}else{
			alert("Debe definir todos los campos correctamente para poder encriptar el texto")
		}
		
	})


	$("#decrypt").click(function(){
		p10 = $("#p10_input").val()
		p8 = $("#p8_input").val()
		key = $("#cipher_key").val()
		p4 = $("#p4_input").val()
		ip = $("#ip_input").val()
		pe = $("#pe_input").val()
		s0 = []
		s1 = []
		valid = true;
		ciphertext = $("#deciphertext").val()
		for(i = 0; i < 4; i++){
			rowS0 = []
			rowS1 = []
			for(j = 0; j<4;j++){
				rowS0.push($("input[name='s0["+i+"]["+j+"]']").val())
				rowS1.push($("input[name='s1["+i+"]["+j+"]']").val())
			}
			s0.push(rowS0)
			s1.push(rowS1)
		}

		$(".crypt_wrapper input, .crypt_wrapper textarea#deciphertext").each(function(){
			var self = $(this),
			thisVal = self.val();
			if($.trim(thisVal) === "" || thisVal.length === 0){
				valid = false;
			}
		});

		if($(".decrypt_wrapper textarea#deciphertext").val() == ""){
			valid = false;
		}

		if(valid){
			plaintext = uncrypt.s_des.decrypt(ciphertext, key, p10, p8, ip, s0, s1, p4, pe);
			$("#ciphertext").val("")
			plain_value = ""
			$.each(plaintext,function(index,value){
				plain_value += uncrypt.toAscii(value)
			})

			$("#ciphertext").val(plain_value)
		}else{
			alert("Debe definir todos los campos correctamente para poder encriptar el texto")
		}
		
	})
});