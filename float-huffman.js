var floatCompress = {
	order   : '0123456789.,-*[]'.split(''),
	library : ['000', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '11110', '11111'],
	encode : function(value){
		var output = [];
		var counts = {};
		var values = (value + '*').split('');

		for(var valueIndex in values){
			var key = values[valueIndex];

			if(!counts[key]){
				counts[key] = 1;
			}else{
				counts[key]++;
			}
		}

		for(var valueIndex in values){
			var key = values[valueIndex];
			var keyOrder = this.order.indexOf(key.toString());

			output.push(this.library[keyOrder]);
		}

		var binaryForm   = output.join('');
		var binaryLength = binaryForm.length;
		var binaryDiff   = 8 - (binaryLength % 8);

			binaryForm   = this.padR(binaryForm, binaryDiff);
			binaryForm   = this.binaryAgent(binaryForm);

		return binaryForm;
	},
	binaryAgent : function(str) {
		var binString = '';
		var ascString = str;

		ascString.match(/.{8}/g).map(function(bin) {
			binString += String.fromCharCode(parseInt(bin, 2));
		});

		return binString;
	},
	text2Binary : function(text) {
		var length = text.length,
		    output = [];
		for (var i = 0;i < length; i++) {
		    var bin = text[i].charCodeAt().toString(2);
		    output.push(Array(8-bin.length+1).join("0") + bin);
		} 

		return output.join('');
	},
	padR : function(number, width) {
		return (number + '0'.repeat(width));
	},
	padL : function(){

	},
	decodePart : function(value, bag){
		var found = false;

		for(var libraryIndex in this.library){
			var libraryItem = this.library[libraryIndex];

			if(value.length > 0 && value.substring(0, libraryItem.length) == libraryItem){
				bag.push(this.order[libraryIndex]);

				value = value.substring(libraryItem.length, value.length);
				found = true;
			}
		}

		if(found){
			this.decodePart(value, bag);
		}
	},
	decode : function(value){
		var bag   = [];
		var value = this.text2Binary(value);
		
		this.decodePart(value, bag);
		var jsonString = bag.join('');
			jsonString = jsonString.split('*');
			jsonString = jsonString[0];
		
		return jsonString;
	}
};