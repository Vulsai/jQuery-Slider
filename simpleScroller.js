// Simple Scroller Plugin 1.0 by Vulsai.
(function($){
	$.fn.extend({ 
		simpleScroller: function(options) {
			var object = $(this);
			var defaults = {
				getPosition: 0,
				getChildrenNum: object.children().length,
				getWidthAmount: object.parent().width(),
				getPrevId: '#prev',
				getNextId: '#next',
				getThumbsId: '#thumbs',
				navOpacity: 0.3,
				fadeOpacity: 0.1,
				transition: 'slide'
			};
			var options = $.extend(defaults, options),
			old_position;		
			object.parent().parent().find('#thumbs ul li').eq(options.getPosition).addClass('currentNumber');
			
			object.css('position', 'relative');
				
    		return this.each(function(){

				var o = options;
				if(o.transition === 'fade'){
					object.children('ul').eq(0).css({'position':'absolute','z-index':3,'top':0,'left':0});
					object.children('li').css({'position':'absolute','z-index':3});
					object.children('li').eq(0).css({'z-index':4});
				}	
					
		
				$(o.getPrevId).animate({opacity: o.navOpacity}, 500, function() {
				    $(o.getPrevId).css('display', 'block');
				});
				
				
				$(o.getPrevId).click(function(e){
					e.preventDefault();

				    if (o.getPosition > 0) {
				        o.getPosition --;

				        object.parent().parent().find('#thumbs ul li').removeClass();				        
				        object.parent().parent().find('#thumbs ul li').eq(options.getPosition).addClass('currentNumber');
						
						if(o.transition === 'slide'){
							object.animate({left: '+=' + o.getWidthAmount + ''}, 800);
						}	

						else if(o.transition === 'fade'){
							object.animate({'opacity': o.fadeOpacity}, 400, function(){
								object.children('li').eq(o.getPosition + 1).css('z-index',3);
								object.children('li').eq(o.getPosition).css('z-index',4);
								object.animate({'opacity':1},400);				   					
							});
						}							
				        
				        $(o.getNextId).animate({opacity: 1}, 500, function(){
				            $(o.getNextId).css('display', 'block');
				        });
				    }
				    
					 if (o.getPosition == 0) {										
						$(o.getPrevId).animate({opacity: o.navOpacity}, 500, function() {
						    $(o.getPrevId).css('display', 'block');
						});
					}
				});
				$(o.getNextId).click(function(e){
					e.preventDefault();    
					$(this).parent().addClass('currentNumber');
					$(this).parent().siblings().removeClass();

					if (o.getPosition < o.getChildrenNum -1) {
				   		o.getPosition ++;
				   		object.parent().parent().find('#thumbs ul li').removeClass();				        
				   		object.parent().parent().find('#thumbs ul li').eq(options.getPosition).addClass('currentNumber');
				   		
				   		if(o.transition === 'slide'){
				   			object.animate({left: '-=' + o.getWidthAmount + ''}, 800);
				   		}
				   		else if(o.transition === 'fade'){
				   			object.animate({'opacity': o.fadeOpacity}, 400, function(){
				   				object.children('li').eq(o.getPosition + 1).css('z-index',3);
				   				object.children('li').eq(o.getPosition).css('z-index',4);
				   				object.animate({'opacity':1},400);				   					
				   			});
				   		}
				   		
				   		$(o.getPrevId).animate({opacity: 1}, 500, function(){
				   			$(o.getNextId).css('display', 'block');
				   		});
				   		
					}
					if (o.getPosition == o.getChildrenNum -1) {
						
						$(o.getNextId).animate({opacity: o.navOpacity}, 500, function(){
						    $(o.getNextId).css('display', 'block');
						});
					}
				});
					
				$(o.getThumbsId).find('li a').each(function(i){
					var getThumbNum = i;
					$(this).click(function(e){
						old_position =o.getPosition;
						o.getPosition = i; 
						e.preventDefault();

						if(o.transition === 'slide'){
							object.animate({left: '-' + (o.getWidthAmount * i)}, 800);
						}	

						else if(o.transition === 'fade'){
							object.animate({'opacity': o.fadeOpacity}, 400, function(){
								object.children('li').eq(old_position).css('z-index',3);
								object.children('li').eq(o.getPosition).css('z-index',4);
								object.animate({'opacity':1},400);				   					
							});
						}							
						$(this).parent().addClass('currentNumber');
						$(this).parent().siblings().removeClass();
						$(o.getPrevId).animate({opacity: 1}, 500);
						$(o.getNextId).animate({opacity: 1}, 500);
					});
				});
				
				var $firstThumb = $(o.getThumbsId).find('li:first a');
					$lastThumb = $(o.getThumbsId).find('li:last a');
					
				$firstThumb.click(function(){
					o.getPosition == 0;
					$(o.getPrevId).animate({opacity: o.navOpacity}, 500);
				});
				
				$lastThumb.click(function(){
					o.getPosition == o.getChildrenNum -1;
					$(o.getNextId).animate({opacity: o.navOpacity}, 500);
				});
				
    		});
    	}
	});
})(jQuery);