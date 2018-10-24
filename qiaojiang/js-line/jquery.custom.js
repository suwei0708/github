jQuery_New(document).ready(function($) {

	//SET LAST ELEMENTS IN WEBSITE
	$("#content div.portfolio-one-column-circle:last").addClass("portfolio-one-column-circle-last");
	$("#content div.portfolio-one-column-slideshow:last").addClass("portfolio-one-column-slideshow-last");
	$("#content div.portfolio-one-column-full:last").addClass("portfolio-one-column-full-last");
	$("#toptoolbar .menu-toptoolbar ul li a:last").addClass("last-child");
	$("#tour ul li:last").addClass("last-child");
	$(".menu-header ul li:first").addClass("first-child");
	$(".menu-header ul li:last-child").addClass("last-child");
	$("#sub-footer .menu-footer ul li:last").addClass("last-child");
	$("#footer-tabs .tab:last").addClass("tab-last-child");
	$("#front-page-botton-widgets div.column li.widget-container:last").addClass("last-child");
	$("#front-page-presentation-row-4 ul li.widget-container:last-child").addClass("last-child");
	$("#front-page-business #front-page-botton-widgets div.column:last-child").addClass("last-child");

	//MAIN MENU SUB MENUS EFFECTS
    $('.menu-header ul').superfish({
        delay:       500,
        animation:   {opacity:'show',height:'show'},
        speed:       'fast',
        autoArrows:  true,
        dropShadows: false
    });

	//FORM REPLACEMENT
	$("#content form").jqTransform();

	//CONTENT SCROLLERS CALL
	if ( $('#bottom-content-scroll ul li').size() > 0 ) { $("#bottom-content-scroll ul").bxSlider({mode: 'fade', infiniteLoop: true, pager: true, controls: false, auto: true, autoHover: true, speed: '800', pause:'3000'}); }
	if ( $('#footer-partners ul li').size() > 0 ) { $("#footer-partners ul").bxSlider({infiniteLoop: true, pager: false, controls: true, auto: true, autoHover: true, speed: '800', pause:'3000',displaySlideQty: 5,moveSlideQty: 1 }); }
	if ( $('#front-page-presentation-row-5 ul li').size() > 0 ) { $("#front-page-presentation-row-5 ul").bxSlider({infiniteLoop: true, pager: false, controls: true, auto: true, autoHover: true, speed: '800', pause:'4000',displaySlideQty: 4,moveSlideQty: 1 }); }

	//BLOG ACCORDION CALL
	$("#blog-accordion").accordion({autoHeight: false});

	//REWORK jQuery UI TABS FOR TOUR
	$('#tour').tabs();
	$('#tour li a').click(function() {
			$('#tour li').removeClass('ui-tabs-before-active');
			$('#tour .ui-state-active').prevAll('li').addClass('ui-tabs-before-active');
	});

	//ADD TOOLTIPS TO FRONT PAGE NEWS BOTTOM POSTS AND TO CONTENT
	$('#bottom-posts a[title]').tooltip({ 'effect':'slide', 'offset':[-6, 70],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});
	$('#sharing a[title]').tooltip({ 'effect':'slide', 'offset':[-20,100],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});
	$('#related a[title]').tooltip({ 'effect':'slide', 'offset':[-2,70],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});
	$('#content a.gototooltip[title]').tooltip({ 'effect':'slide', 'offset':[-6, 70],'layout': '<div><div class="content"></div><span class="arrow"></div>'});
	$('#content a.tooltip-title[title]').tooltip({ 'effect':'slide', 'offset':[90, 70],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});
	$('#tour a.tour-page-title[title]').tooltip({ 'effect':'slide', 'offset':[-6, 110],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});
	$('#front-page-presentation-row-5 a.move-to-tooltip[title]').tooltip({ 'effect':'slide', 'offset':[-6, 110],'layout': '<div><div class="content"></div><span class="arrow"></span></div>'});

	//ADD STYLE CLASSES TO TABLES
	$("#content table tr:even").addClass("alternative");
	$("#content table tr td:last-child").addClass("last");
	$("#content table tr th:last-child").addClass("last");
	$("#content table.pricing tr td").removeClass("last");
	$("#content table.pricing tr").removeClass("alternative");
	$("#content table.pricing tr.buttons td:first-child").addClass("first")
	$("#content table.pricing tr.buttons td:last-child").addClass("last");
	$("#content table.pricing tr.content td:first-child").addClass("first");

	//PORTFOLIOS PAGE PEAL
	$(".pageflip").each(function(){
		$(this).hover(function() {
			$(this).find('img.flip').stop()
				.animate({width: '60px', height: '60px'}, 400);
			$(this).find('.icon').stop()
				.animate({width: '60px', height: '60px'}, 400);
			} , function() {
			$(this).find('img.flip').stop()
				.animate({width: '20px', height: '20px'}, 220);
			$(this).find('.icon').stop()
				.animate({width: '20px', height: '20px'}, 200);
		});
	});

	//SOCIAL ICONS HOVER EFFECT
	if(!$.browser.msie && $.browser.version.substring(0, 2) != "8.")
	{
		$("#toolbar-sharing a").each(function(){
			if ( $.browser.msie && parseInt($.browser.version, 10) == '8') {
				$(this).css('filter', 'alpha(opacity=50)');
			} else {
				$(this).css('opacity', '0.5');
			}
			$(this).hover(
				function(){
					if ( $.browser.msie && parseInt($.browser.version, 10) == '8') {
						$(this).stop().animate({'filter': 'alpha(opacity=100)'}, 300);
					} else {
						$(this).stop().animate({'opacity': '1'}, 300);
					}

				},
				function(){
					if ($.browser.msie && parseInt($.browser.version, 10) == '8') {
						$(this).stop().animate({'filter': 'alpha(opacity=50)'}, 300);
					} else {
						$(this).stop().animate({'opacity': '0.5'}, 300);
					}
				}
			)
		});
	}

	//PROTFOLIO CIRLCE HOVER EFFECT
	$("#content span.portfolio-icon").each(function(){
		$(this).css('opacity', '0.0');
		$(this).hover(
			function(){
				$(this).stop().animate({'opacity': '1.0'}, 300);
				$(this).next('.blackandwhite').stop().animate({'opacity': '0.0'}, 300);
			},
			function(){
				$(this).stop().animate({'opacity': '0.0'}, 300);
				$(this).next('.blackandwhite').stop().animate({'opacity': '1.0'}, 300);
			}
		)
	});

	//MODAL WINDOWS CALLS
	$(".gallery-icon a").attr('rel','gallery[modal]');
	$("img.alignnone, img.aligncenter, img.alignleft, img.alignright").parent().attr('rel','single-modal');
	$("div.alignnone a, div.aligncenter a, div.alignleft a, div.alignright a").attr('rel','single-modal');
	$("a[rel^='gallery[modal]'],a[rel^='minigallery[modal]'],a[rel^='single-modal'],a[rel^='portfolio[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

	//OTHER CALLS
	$('.tabs,.sidebar-tabs').tabs()
	$('.accordion').accordion({autoHeight: false, active:-1, collapsible: true });
	$("#content .accordion .ui-accordion-content p:last-child").addClass("no-padding-bottom");
	$("#content .tabs .ui-tabs-panel p:last-child").addClass("no-padding-bottom");
	$("#table-of-content ul li:even").addClass("alternative");

	//FORM VALIDATION
	$("#commentform").validate();
	$("#contactform").submit(function() {
		if ( $("#contactform input[name=name]").val() == 'Name:' ) $("#contactform input[name=name]").val('');
		if ( $("#contactform input[name=email]").val() == 'E-mail:' ) $("#contactform input[name=email]").val('');
		if ( $("#contactform input[name=subject]").val() == 'Subject:' ) $("#contactform input[name=subject]").val('');
		if ( $("#contactform textarea[name=message]").val() == 'Message:' ) $("#contactform textarea[name=message]").val('');
	})
	$("#contactform").validate();
	function showLoader () { $('#contact-form-loader').fadeIn(); }
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#contact-form-loader').fadeOut();
		$('#contact-confirmation-message').html(responseText);
		$('#contact-confirmation-message').fadeIn();
	}
    var contactformoptions = {
        beforeSubmit:  showLoader,  // pre-submit callback
        success:       showResponse  // post-submit callback
    };
	$('#contactform').ajaxForm(contactformoptions);



});
jQuery_New(window).load(function () {
	//COLUMNS HEIGHTS
	function equalHeight(){
		var maxHeight = 0;
		$("#front-page-presentation-row-1 div ul").each(function(index){
			if ($(this).height() > maxHeight) maxHeight = $(this).height();
		});
		$("#front-page-presentation-row-1 div.sep").height(maxHeight);
	}
	equalHeight();
});