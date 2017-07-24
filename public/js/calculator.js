 var calculator = { left: false, right: false, result: 0, operator: '+' };
 var leftBuffer = '';
 var rightBuffer = '';
 var  logData = '';
 var alllogData = '';
 var result = false;
 var lastkey = '';
 var lastresult = '';
 var multipleOperation = false;

 var calc ={
 	//do operation based on key press
 	calculate:function(){
 		calculator.result = eval(calculator.left + calculator.operator + calculator.right);
 		$('#calculator .result').text(calculator.result);
 		logData +=' = ' + calculator.result;
 		$('#calculator .no-log-text').hide();
 		$('#calculator .logs').prepend('<div class="log-text">'+logData+'</div>');
 		(alllogData.length > 0)?alllogData +=','+logData:alllogData +=logData;
 		logData = '';
 		calculator.left = null;
 		calculator.right = null;
 		leftBuffer = '';
 		rightBuffer = '';
 		lastresult = calculator.result;
 		(calculator.result == 'Infinity')?calc.clearData():true;
 		result = true;
 	},
 	//check key is digit or not
 	isDigit:function(key){
 		var digits = "0123456789";
 		var digit = false;
 		if(digits.indexOf(key) != -1)
 			digit = true;
 		return digit;
 	},
 	// for keyborad allow check key
 	isValidchar : function(key){
 		var digits = "0123456789.+-*/=÷×";
 		var digit = false;
 		if(digits.indexOf(key) != -1)
 			digit = true;
 		return digit;
 	},
 	//check user has not press continue operation key
 	isOperation : function(key){
 		var digits = "+-*/÷×";
 		var digit = false;
 		if(digits.indexOf(key) != -1)
 			digit = true;
 		return digit;	
 	},
 	clearData:function(){
 		lastkey = '';
 		lastresult = '';
 		logData = '';
 		leftBuffer = '';
 		rightBuffer = '';
 		result = false;
 		calculator = { left: false, right: false, result: 0, operator: '+' };
 		$('#calculator .result').text(calculator.result);
 	},
 	//save log data
 	saveLogData:function(name){
 		$.ajax({
 			method: 'get',
 			url: window.config.baseUrl + '/calculator/saveUserLog',
 			data: { "logs" :alllogData,"name" : name},
 			dataType: 'json',
 			success: function(response){
 				calc.resetLogData();
 				$('#log-name').modal('hide');
 				$('.logs').html('');
 			}
 		});
 	},
 	//reset log data
 	resetLogData:function(){
 		alllogData = '';
 		logData = '';
 		leftBuffer = '';
 		rightBuffer = '';
 		lastkey = '';
 		lastresult = '';
 		calculator = { left: false, right: false, result: 0, operator: '+' };
 		$('#calculator .result').text(calculator.result);	
 	},
 	//get log data based on log name selected
 	getLogData:function(logid){
 		$.ajax({
 			method: 'get',
 			url: window.config.baseUrl + '/calculator/getUserLog',
 			data: {"id" : logid},
 			dataType: 'json',
 			success: function(data){
 				$('.logs-data').show();
 				var logs = data.logs[0]['logs'];
 				var logs_array = logs.split(',');
 				for(var i = 0; i < logs_array.length; i++) {
 					$('.logs-data').append('<div class="log-text">'+logs_array[i]+'</div>');
 				}
 				$('.loader').hide();
 			}
 		});  
 	},
 	//call when digit click
 	digtsClick:function(key){
 		if(leftBuffer.indexOf('.') != '-1' && key == '.' && rightBuffer == ''){
 			return false;
 		}
 		if(rightBuffer.indexOf('.') != '-1' && key == '.'){
 			return false;
 		}
 		if(calculator.left && rightBuffer && calc.isOperation(key) && key != '='){
 			multipleOperation = true;
 			calculator.right = rightBuffer;
 			var newresult = eval(calculator.left + calculator.operator + calculator.right);
 			(newresult == 'Infinity')?calc.clearData():true;
 			//$('#calculator .result').text(newresult);
 			calculator.left = null;
 			calculator.right = null;
 			leftBuffer = '';
 			rightBuffer = '';
 			lastresult = newresult;
 			result = true;
 		}

 		if(calc.isOperation(key) && calc.isOperation(lastkey) && lastkey != ''){
 			var logData1 = logData.slice(0,-1);
 			logData1+=key;        
 			logData =logData1;
 			calculator.operator = key;
 			$('#calculator .result').text(logData);
 			(alllogData.length > 0)?alllogData +=','+logData:alllogData +=logData;
 			return false;
 		}
 		if(key == '=' && calc.isOperation(lastkey) && lastkey != ''){
 			var logData1 = logData.slice(0,-1);
 			var lastChar = logData1.substr(logData1.length - 1);
 			var newresult = eval(calculator.left + calculator.operator + calculator.right);
 			(newresult == 'Infinity')?calc.clearData():true;
 			if(lastChar != newresult){
 				$('#calculator .result').text(newresult);
 				logData1 +=' = ' + newresult;
 				$('#calculator .logs').prepend('<div class="log-text">'+logData1+'</div>');
 				logData = '';
 				calculator.left = null;
 				calculator.right = null;
 				leftBuffer = '';
 				rightBuffer = '';
 				lastresult = newresult;
 				result = true;
 				lastkey = '';
 				multipleOperation = false;
 				return false;

 			}
 		}
 		lastkey = key;
 		if(result){
 			if(calc.isOperation(key) || key == '='){
 				if(!multipleOperation){
 					logData =lastresult;
 				}
 				calculator.left = '';
 				leftBuffer = lastresult +'';
 			}
 			multipleOperation = false;
 			result = false;
 			lastresult = '';
 		}
 		if(key != '='){
 			logData +=key;
 		}
 		$('#calculator .result').text(logData);
 		if(calc.isDigit(key)) {
 			if(calculator.left) {
 				rightBuffer += key.toString();
            //  $('#calculator .result').text(rightBuffer);
        } else {
        	leftBuffer += key.toString();
            //  $('#calculator .result').text(leftBuffer);
        }

    } else if(key != '=' && key != '.') {
    	switch(key) {
    		case '÷': key = '/'; break;
    		case '×': key = '*'; break;
    	}
    	calculator.operator = key;
    	calculator.left = leftBuffer;
    } else if(key == '.') {
    	if(calculator.left) {
    		rightBuffer += '.';
            //  $('#calculator .result').text(rightBuffer);
        } else {
        	leftBuffer += '.';
            //  $('#calculator .result').text(leftBuffer);
        }
    } else {
    	if(calculator.left){
    		calculator.right = rightBuffer;
    		if(calculator.left.substring(calculator.left.length-1, 1) == '.')
    			calculator.left += '0';
    		if(calculator.right.substring(calculator.right.length-1, 1) == '.')
    			calculator.right += '0';
    		calc.calculate();
    	}
    }
}
}
jQuery(function($) {
	var digits = $('#calculator .digits .digit');
	var clear = $('#calculator .clear');
	var saveLog = $('.save-log');
	var nameModel = $('#log-name');
	var saveLogname = $('.save-log-name');
	var logName = $('#log-name');
	clear.click(function() {
		calc.clearData();
	});
	$(document).bind('keyup',function(e){
		if(e.keyCode == 8  || e.keyCode == 46 ){
			calc.clearData();	
		}
	});
	$(document).bind('keypress',function(e){
		var key = String.fromCharCode(e.which);
		if (e.keyCode == 13 ){
			key = '=';
		}
		if(calc.isValidchar(key)){
			calc.digtsClick(key);
		}
	});
	digits.click(function() {
		var key = $(this).text();
		calc.digtsClick(key);
	});
	saveLog.on('click',function(){
		if(alllogData.length > 0){
			nameModel.modal('show');
		}
		else{
			alert('no log available');
		}
	});
	saveLogname.on('click',function(){
		if($('#name').val() != ''){
			calc.saveLogData($('#name').val());
		}
		else{
			alert('please enter name');
		}
	});
	logName.on('change',function(){
		if(logName.val() != ''){
			$('.logs-data').html('');
			$('.loader').show();
			calc.getLogData(logName.val());			
		}
	});
});