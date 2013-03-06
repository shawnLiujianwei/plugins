(function($){
  $.placeholder =  {
		isPlaceholder:function(){
			 return 'placeholder' in document.createElement('input');  
		},
		init:function(){
			$("input[placeholder]").each(function(index,item){
				item = $(item);
				var parent = item.parent(), placeholder = item.attr("placeholder"),type = item.attr("type");
				if(type == 'text') {
					item.val(placeholder);
					item.css("color","gray");
					item.focus(function(){
						var val = item.val();
						if(val == placeholder) {
							item.val("").css("color","black");
						}
					});
					item.blur(function(){
						var val = item.val();
						if(val == '') {
							item.val(placeholder).css("color","gray");
						}
					});
				} else if(type == 'password') {
					item.one("blur",function(){
						blur($(this));
					}).trigger("blur");
				}
			});
			function focus(obj) {
				var id = obj.attr("id"),outerHTML = obj.parent().html();
				if(outerHTML.indexOf("type=\"text\"") != -1) {
					outerHTML = outerHTML.replace("type=\"text\"","type=\"password\"");
				} else if(outerHTML.indexOf("type='text'") != -1) {
					outerHTML = outerHTML.replace("type='text'","type='password'");
				} else if(outerHTML.indexOf("type=text") != -1) {
					outerHTML = outerHTML.replace("type=text","type=password");
				}
				outerHTML = $(outerHTML);
				outerHTML.css("color","black").one("blur",function(){
					blur($(this));
				});
				obj.parent().append(outerHTML);
				obj.remove();
				var passwordInput = $("#"+id);
				passwordInput.focus();
				if(obj.val() == obj.attr("placeholder")) {
					passwordInput.val("");
				} else {
					passwordInput.val(obj.val());
				}
			};
			function blur(obj){
				var value = obj.val(),id = obj.attr("id"),placeholder = obj.attr("placeholder");
				if(value == undefined || value == "" || value == placeholder) {
					var outerHTML = obj.parent().html();
					if(outerHTML.indexOf("type=\"password\"") != -1) {
						outerHTML = outerHTML.replace("type=\"password\"","type=\"text\"");
					} else if(outerHTML.indexOf("type='password'") != -1) {
						outerHTML = outerHTML.replace("type='password'","type='text'");
					}else if(outerHTML.indexOf("type=password") != -1) {
						outerHTML = outerHTML.replace("type=password","type=text");
					}
					outerHTML = $(outerHTML);
					outerHTML.val(placeholder).css("color","gray").one("focus",function(){
						focus($(this));
					});
					obj.parent().append(outerHTML);
					obj.remove();
					$("#"+id).blur();
				} else {
					obj.one("focus",function(){
						focus($(this));
					});
				}
			}
		}
	};
})(jQuery);

$(document).ready(function(){
	if(!$.placeholder.isPlaceholder()){
		$.placeholder.init();
	}
});
