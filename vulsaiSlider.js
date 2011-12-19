;(function ( $, window, document, undefined ) {

  var defaults = {
    transition: 'fade'
    , thumb_list_id: '#thumbs'
    , prev: '#prev'
    , next: '#next'
    , nav_opacity: .3
    , fade_opacity: .2
    , infinite: false
    , automatic: false
    , interval: 6000
    , width: 800
  };

  function vulsaiSlider(element, options){
    this.options = $.extend({}, defaults, options);
    this.el = $(element);
    this.slides = this.el.children('li').length;
    this.full_width = (this.el.parent().width() != 0) ? this.el.parent().width() : this.options.width;
    this.current_slide = 0;
    this.init();
  };
  
  vulsaiSlider.prototype.init = function(){
    this.activeThumb();
    this.preventArrows();
    this.startTransitions();
    var self = this;
    if(self.options.automatic == true)
      self.interval_id = setInterval(function(){ $(self.options.next).click(); },self.options.interval);
 };

  vulsaiSlider.prototype.interval_func = function(){
    $(this.options.next).click();
  };

  vulsaiSlider.prototype.activeThumb = function() {
    $(this.options.thumb_list_id).find('li').eq(this.current_slide).addClass('currentNumber').siblings().removeClass('currentNumber');  
    var self = this;
  };

  vulsaiSlider.prototype.preventArrows = function(){
 console.log(this.current_slide);
 console.log(this.slides);
    var nav_opacity = this.options.nav_opacity;
    if(!this.options.infinite && this.current_slide == 0){
      $(this.options.prev).animate({opacity: nav_opacity}, 800);
    }
    if(!this.options.infinite && this.current_slide == 1){
      $(this.options.prev).animate({opacity: 1}, 800);
    }
    if(!this.options.infinite && this.current_slide == this.slides - 1){
      $(this.options.next).animate({opacity: nav_opacity}, 800);
    }
    if(!this.options.infinite && this.current_slide == this.slides - 2){
      $(this.options.next).animate({opacity: 1}, 800);
    }

    if(this.slides < 2){
      $(this.options.next).hide();
      $(this.options.prev).hide();
    }  
  };

  vulsaiSlider.prototype.startTransitions = function(){
    var self = this;
    $(this.options.thumb_list_id).find('li').click(function(e){
      e.preventDefault();
      
      if(self.options.automatic == true && self.interval_id){
        clearInterval(self.interval_id);
        self.interval_id = setInterval(function(){ $(self.options.next).click(); },self.options.interval);
      }

      self.current_slide = $(this).index();
      self.activeThumb();
      self.preventArrows();
      self.transition();
    });

    this.transitions();
  };

  vulsaiSlider.prototype.transitions = function(){
    var self = this;

    this.transition = this.options.transition == 'fade' ? this.fade : this.slide;
    this.el.css('position','relative');
    if(this.options.transition == 'fade')
      this.el.children('li').css({'position':'relative','z-index':3,'top':0,'left':0}).eq(0).css('z-index',4);

    $(this.options.prev).click(function(e){
      if(self.current_slide == 0 && self.options.infinite == false)
        return false
 
      e.preventDefault();
      if(self.current_slide == 0)
        self.current_slide = self.slides - 1;
      else
        self.current_slide = self.current_slide - 1;

      if(self.options.automatic == true && self.interval_id){
        clearInterval(self.interval_id);
        self.interval_id = setInterval(function(){ $(self.options.next).click(); },self.options.interval);
      }

      self.activeThumb();
      self.preventArrows();
      self.transition();
    });

     $(self.options.next).click(function(e){
      e.preventDefault();

      if(self.current_slide == self.slides - 1 && self.options.infinite == false)
        return false
 

      if(self.current_slide == self.slides - 1)
        self.current_slide = 0;
      else
        self.current_slide = self.current_slide + 1;

      if(self.options.automatic == true && self.interval_id){
        clearInterval(self.interval_id);
        self.interval_id = setInterval(function(){ $(self.options.next).click(); },self.options.interval);
      }

      self.activeThumb();
      self.preventArrows();
      self.transition();   

   });
 };

  vulsaiSlider.prototype.slide = function(){
    var self = this;
    this.el.animate({left: '-' + self.current_slide * self.full_width}, 800);
  };

  vulsaiSlider.prototype.fade = function(){
    var self = this;
    this.el.animate({'opacity': self.options.fade_opacity}, 400, 
      function(){
        $(this).children('li').eq(self.current_slide).css('z-index',4).siblings().css('z-index',3);
        self.el.animate({'opacity':1},400);
      }
    );	 
  };

  $.fn.vulsaiSlider = function ( options ) {
    return this.each(function () {
      if(!$.data(this, 'plugin_vulsaiSlider')) {
        $.data(this, 'plugin_vulsaiSlider', new vulsaiSlider(this, options));
      }
    });
  };

})(jQuery, window, document);
