;(function($){var isMobile=false;var isiPhoneiPad=false;if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){isMobile=true;}
if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){isiPhoneiPad=true;}
var defaults={data:[],tag:'img',mode:'display',LS_Variable:'__hongo_hotspot_local',hiddenClass:'hidden',interactivity:'hover',done_btnId:'hongo_addons_done',remove_btnId:'hongo_addons_remove',sync_btnId:'hongo_addons_server',done_btnClass:'btn btn-success hongo_addons_done',remove_btnClass:'btn btn-danger hongo_addons_remove',sync_btnClass:'btn btn-info hongo_addons_server',hotspotClass:'hongo_addons_hotspot',hotspotAuxClass:'hongo_addons_inc',hotspotOverlayClass:'hongo_addons_overlay',dataStuff:[{'property':'Product ID','default':'Product Title'}]};function Hotspot(element,options){this.config=$.extend(true,{},defaults,options);this.element=element;this.imageEl=element.find(this.config.tag);this.imageParent=this.imageEl.parent();this.broadcast='';var widget=this;$.each(this.config,function(index,val){if(typeof val==='function'){widget.element.on(index+'.hotspot',function(){val(widget.broadcast);});};});this.init();};Hotspot.prototype.init=function(){this.getData();};Hotspot.prototype.getData=function(){if(($(this.config.LS_Variable).val()==''||$(this.config.LS_Variable).val())===null&&this.config.data.length==0){return;}
this.beautifyData();$('body').trigger('hongo-hotspot-initialized');};Hotspot.prototype.beautifyData=function(){var widget=this;if(this.config.data.length!=0){var raw=this.config.data;}
var obj=JSON.parse(raw);for(var i=obj.length-1;i>=0;i--){var el=obj[i];if(this.config.interactivity==='none'){var htmlBuilt=$('<div><i class="ti-close close-item Default-close"></i></div>');}else{var tooltip_class=[];$.each(el,function(index,val){if(typeof val==="string"){var product_position=hongoHotspotFrontend.products_position;$.each(product_position,function(key,value){if(key==val){tooltip_class=val;}});};});tooltip_class='hongo-hotspot-common hongo-hotspot-'+tooltip_class;var htmlBuilt=$('<div class="'+tooltip_class+'"><i class="ti-close close-item Default-close"></i></div>').addClass(this.config.hiddenClass);}
$.each(el,function(index,val){if(typeof val==="string"){productHtml='';var productsData=hongoHotspotFrontend.products_json;$.each(productsData,function(key,value){if(key==val){productHtml+='<div class="product-info-hotspot-wrap woocommerce">';productHtml+='<div class="product-image">'+value.product_image;if(value.rating===null){productHtml+='<div class="product-rating">'+value.rating+'</div>';}
productHtml+='</div>';productHtml+='<div class="product-title"><a target="_blank" class="product-title-link'+value.title_class+'" href="'+value.page_url+'">'+value.title+'</a></div>';productHtml+='<div class="product-price'+value.price_class+'">'+value.price_html+'</div>';productHtml+='<p class="product-description'+value.content_class+'">';if(value.description.length>120){productHtml+=value.description.substring(0,120)+'...';}else{productHtml+=value.description;}
productHtml+='</p>';productHtml+='<div class="product-btn">'+value.button+'</div>';productHtml+='</div>';}});$('<div/>',{html:productHtml}).addClass('Hotspot_'+index).appendTo(htmlBuilt);};});var div=$('<div/>',{html:htmlBuilt}).css({'top':el.y+'%','left':el.x+'%'}).addClass(this.config.hotspotClass).appendTo(this.element);if(widget.config.interactivity==='click'||widget.config.interactivity==='hover'){widget.addEvents(div);}else{htmlBuilt.removeClass(this.config.hiddenClass);}
if(this.config.interactivity==='none'){htmlBuilt.css('display','block');}};};Hotspot.prototype.addEvents=function($el){var self=this;$(window).on('load resize',function(){var realAction=self.config.interactivity;if(self.config.interactivity==='hover'){realAction='mouseover';}
if(self.config.interactivity==='hover'&&typeof $(window).width()!='undefined'&&(isMobile||isiPhoneiPad)){realAction='click';}
$el.off().on(realAction,function(event){if(!$(this).hasClass('active')){$(this).parent().find('.active').removeClass('active').children('div').addClass(self.config.hiddenClass);$(this).addClass('active').children('div').removeClass(self.config.hiddenClass);}else{if(event.target!==this){return;}else{$('.hongo_addons_hotspot').removeClass('active').children('div').addClass(self.config.hiddenClass);}}});});};$.fn.hotspot=function(options){new Hotspot(this,options);return this;};$(document).ready(function(){$(document).on('click','.hongo-hotspot-image-cover img',function(){$(this).parent().find('.active').removeClass('active').children('div').addClass('hidden');});$(document).on('mouseover','.hongo-action-hover img',function(){$(this).parent().find('.active').removeClass('active').children('div').addClass('hidden');});var initOffsets=function(){$('.hongo-hotspot-wrapper').each(function(){$(this).find('.hongo_addons_hotspot').each(function(index){var $self=$(this);if(!$self.hasClass('animation-done')){$self.css('opacity','0');}
if(!$self.hasClass('animation-done')){$self.addClass('animation-done').stop().delay(index*500).animate({display:'block',opacity:'1'},300)}});});$i=0;$('.hongo-hotspot-wrapper .hongo_addons_hotspot').each(function(index){var $self=$(this),$tooltip=$self.find('> div'),selfWidth=$tooltip.outerWidth(),selfOffset=$tooltip.offset();if($(window).width()<768){var $windowWidth=$(window).outerWidth(),$boxWidth=selfWidth,$selfmain=$self.offset(),$selfLeftPostion=$selfmain.left,$details=$windowWidth-$selfLeftPostion;if(selfOffset.left<0){var $mainSection=($boxWidth/2)-($selfLeftPostion);$left=$mainSection+10;$tooltip.css('left',$left);}else if(selfOffset.left+selfWidth>$windowWidth){$left=$windowWidth-$selfLeftPostion;var $mainSection=($boxWidth/2)-($left)+10;$tooltip.css('left',-($mainSection));}}else{if(selfOffset.left<=0&&selfOffset.left+selfWidth>$(window).width()){$tooltip.addClass('hongo-overlay-outsite');}else if(selfOffset.left<=0){$tooltip.addClass('hongo-overlay-right');}else if(selfOffset.left+selfWidth>$(window).width()){$tooltip.addClass('hongo-overlay-left');}}});};$('.hongo-hotspot-wrapper').each(function(){var $self=$(this),hotspotClass=$self.data('hotspot-class')?$self.data('hotspot-class'):'hongo_addons_hotspot',hotspotContent=$self.data('hotspot-content')?$self.data('hotspot-content'):'',action=$self.data('action')?$self.data('action'):'hover';if(hotspotContent!=''&&!$self.find('.hongo-hotspot-image-cover').hasClass('hongo-hotspot-initialized')){$self.find('.hongo-hotspot-image-cover').addClass('hongo-hotspot-initialized').hotspot({hotspotClass:hotspotClass,interactivity:action,data:decodeURIComponent(hotspotContent)});}});$('body').on('hongo-hotspot-initialized',initOffsets);initOffsets();$(window).on('resize',initOffsets);});}(jQuery));