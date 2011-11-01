;(function ( $, window, document, undefined ) {

    var pluginName = 'vulsaiSlider',
        defaults = {
            transition: "fade",
			thumb_list_id: "#thumbs",
			prev: "#prev",
			next: "#next",
			nav_opacity: 0.3,
			fade_opacity: 0.2			
        };

    function vulsaiSlider( element, options ) {
        this.element = element;
		this.width_amount = $(element).parent().width();

        this.current_slide = 0;
		this.slide_num = $(this.element).children('li').length;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;

        this.init();

    }

    vulsaiSlider.prototype.init = function () {
		
		this.initThumbs();

		switch ( this.options.transition ) {
			case "slide" :
				this.initSlide();
				break;
		   
		 	case "fade" :
				this.initFade();
				break;
			
			default :
				break;
		}             
		
    };

	vulsaiSlider.prototype.initThumbs = function () {
	                
		var self = this;
	
		$(this.options.thumb_list_id).find('ul li:first-child').addClass('currentNumber');
		$(this.options.prev).css('opacity',this.options.nav_opacity);
		   

		$(this.options.thumb_list_id).find('li').click(function(e){
		   			
		   self.changeThumb(this);

			e.preventDefault();
		 
		});
		
	};
	
	vulsaiSlider.prototype.changeThumb = function (elem) {

		$(elem).siblings().removeClass();
		$(elem).addClass('currentNumber');
	    
		this.transition( $(elem).index() );
		
	};  	
    
	vulsaiSlider.prototype.initFade = function () {                   
		
		var self = this;
        
		$(this.element).css('position','relative');
		
		
		// need to fix this
		$(this.element).children('li').css({'position':'absolute','z-index':3,'top':0,'left':0});
		$(this.element).children('li:first-child').css({'z-index':4});

		$(this.options.prev).click(function(e){
			
			if (self.current_slide > 0) {

				self.current_slide--;
                
                $(self.options.thumb_list_id).find('li').eq(self.current_slide).addClass('currentNumber').siblings().removeClass();

				$(self.element).animate({'opacity': self.options.fade_opacity}, 400, function(){
					$(this).children('li').eq(self.current_slide).css('z-index',4).siblings().css('z-index',3);
					$(self.element).animate({'opacity':1},400);				   					
				});
				
			}

			if (self.current_slide === self.slide_num - 2) {

				$(self.options.next).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
				
			}
			
			if (self.current_slide === 0) {

				$(this).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});
						    				
			}
		
			e.preventDefault();
			
		});
             

		$(this.options.next).click(function(e){
			

		   if (self.current_slide < self.slide_num - 1) {
                
			   self.current_slide++;

               $(self.options.thumb_list_id).find('li').eq(self.current_slide).addClass('currentNumber').siblings().removeClass();

				
			   $(self.element).animate({'opacity': self.options.fade_opacity }, 400, function(){
				   $(this).children('li').eq(self.current_slide).css('z-index',4).siblings().css('z-index',3);
			       $(self.element).animate({'opacity':1},400);				   					
			   });
			
		   }
		
			if (self.current_slide === 1) {

				$(self.options.prev).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
				
			}

		   if (self.current_slide === self.slide_num - 1) {
            
				$(this).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});

		   }
		    
			
		
			e.preventDefault();
			
		});
		
		this.transition = this.fadeTransition;
		
	};

	vulsaiSlider.prototype.initSlide = function () {

		var self = this;
        
		$(this.element).css('position','relative');
		
		
		$(this.options.prev).click(function(e){
			
			if (self.current_slide > 0) {

				self.current_slide--;
                
                $(self.options.thumb_list_id).find('li').eq(self.current_slide).addClass('currentNumber').siblings().removeClass();

			    $(self.element).animate({left: '+=' + self.width_amount + ''}, 800);
				
			}

			if (self.current_slide === self.slide_num - 2) {

				$(self.options.next).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
				
			}
			
			if (self.current_slide === 0) {

				$(this).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});
						    				
			}
		
			e.preventDefault();
			
		});
             

		$(this.options.next).click(function(e){
			

		   if (self.current_slide < self.slide_num - 1) {
                
			   self.current_slide++;

               $(self.options.thumb_list_id).find('li').eq(self.current_slide).addClass('currentNumber').siblings().removeClass();
				
			   $(self.element).animate({left: '-=' + self.width_amount + ''}, 800);			
		   }
		
			if (self.current_slide === 1) {

				$(self.options.prev).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
				
			}

		   if (self.current_slide === self.slide_num - 1) {
            
				$(this).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});

		   }
		    
			
		
			e.preventDefault();
			
		});

		this.transition = this.slideTransition;
		
	};

	vulsaiSlider.prototype.fadeTransition = function ( to ) {
		var self = this;
		
		$(self.element).animate({'opacity': self.options.fade_opacity}, 400, function(){
			$(this).children('li').eq(to).css('z-index',4).siblings().css('z-index',3);
			$(self.element).animate({'opacity':1},400);				   					
		});                                                             
		
		if (to === 0) {
			$(self.options.prev).animate({opacity: self.options.nav_opacity}, 500, function() {
			    $(this).css('display', 'block');
			});
			$(self.options.next).animate({opacity: 1}, 500, function() {
			    $(this).css('display', 'block');
			});			
			
		} else if(to === self.slide_num - 1 ) {
			$(self.options.next).animate({opacity: self.options.nav_opacity}, 500, function() {
			    $(this).css('display', 'block');
			});			
			$(self.options.prev).animate({opacity: 1}, 500, function() {
			    $(this).css('display', 'block');
			});
		}
		
		else {
			$(self.options.prev).animate({opacity: 1}, 500, function() {
			    $(this).css('display', 'block');
			});
			$(self.options.next).animate({opacity: 1}, 500, function() {
			    $(this).css('display', 'block');
			});			
			
		}
		
		self.current_slide = to;
	};
	
	vulsaiSlider.prototype.slideTransition = function ( to ) {
			var self = this;

			if(to > self.current_slide) {
		    	$(self.element).animate({left: '-=' + (to - self.current_slide)*self.width_amount + ''}, 800);				
			} else {
		    	$(self.element).animate({left: '+=' + (self.current_slide - to)*self.width_amount + ''}, 800);								
			}                                                                      
		   
                                                             

			if (to === 0) {
				$(self.options.prev).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});
				$(self.options.next).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});			

			} else if(to === self.slide_num - 1 ) {
				$(self.options.next).animate({opacity: self.options.nav_opacity}, 500, function() {
				    $(this).css('display', 'block');
				});			
				$(self.options.prev).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
			}

			else {
				$(self.options.prev).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});
				$(self.options.next).animate({opacity: 1}, 500, function() {
				    $(this).css('display', 'block');
				});			

			}

			self.current_slide = to;

	};
    
	
    vulsaiSlider.prototype.transition = function () {
	};


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new vulsaiSlider( this, options ));
            }
        });
    }

})( jQuery, window, document );