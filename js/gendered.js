var allow_arrow_trigger = true;
var module_inner_link_clicked = false;

$(document).ready(function() {
    
    setup_arrows();
    
    setup_breadcrumb_links();
    
    setup_inner_module_links();

});

function setup_inner_module_links()
{
	
	$('.module-inner-link').on('click', function(e){
		
		var link = $(this);
		
		var href = link.attr('data-link-to');
		
		allow_arrow_trigger = true;
		module_inner_link_clicked = true;
		
		if(href == 'next')
		{
			$('.next-arrow').trigger('click');
			
		}
		else if(href == 'prev')
		{
			$('.prev-arrow').trigger('click');
		}
		else
		{
			$('.breadcrumb-links').eq(Number(href-1)).trigger('click');
		}
		
		e.preventDefault();
	
	});
}

function setup_arrows()
{
	$(".main-arrows").on("click", function(e){
    	
    	if(allow_arrow_trigger||!module_inner_link_clicked)
    	{
    		allow_arrow_trigger = false;
    		
    		setTimeout( function(){ 
    			module_inner_link_clicked = false; 
  			}  , 1000 );
  
			var arrow = $(this);
		
			var all_content = $(".main-module-content");
			var current_active = $(".main-module-content.content-active");
			var next = current_active.next();
			var prev = current_active.prev();
		
		
			if(arrow.hasClass("prev-arrow"))
			{
				if(content_exists(prev)) 
				{
					change_content(all_content, prev);
				
					var indexOfNewContent = Number(prev.attr("data-breadcrumb-number")-1);
				
					var newBreadcrumb = $(".breadcrumb-holder .breadcrumb-links").eq(indexOfNewContent);
				
					change_breadcrumbs($(".breadcrumb-links"), newBreadcrumb);
				}
			}
			else
			{
				if(content_exists(next)) 
				{
					change_content(all_content, next);
				
					var indexOfNewContent = Number(next.attr("data-breadcrumb-number")-1);
				
					var newBreadcrumb = $(".breadcrumb-holder .breadcrumb-links").eq(indexOfNewContent);
				
					change_breadcrumbs($(".breadcrumb-links"), newBreadcrumb);
				}
			}
		}
    	
    	e.preventDefault();
    });
}

function setup_breadcrumb_links()
{
	$(".breadcrumb-links").on("click", function(e){
		
		var link = $(this);
		
		var indexOfBreadcrumb = Number($(".breadcrumb-holder .breadcrumb-links").index(link) + 1);
		
		if(!link.hasClass("disabled-links"))
		{
			var all_breadcrumbs = $(".breadcrumb-links");
			
			change_breadcrumbs(all_breadcrumbs, link);
			
			var new_content = $(".main-module-content-row .main-module-content[data-breadcrumb-number='" + indexOfBreadcrumb + "']").first();
			
			if(content_exists(new_content))
			{
				change_content($(".main-module-content"), new_content);
			}
			
		}
		
		e.preventDefault();
		
	});
}

function change_breadcrumbs(all_breadcrumbs, new_breadcrumb)
{
			
	all_breadcrumbs.removeClass("disabled-links");
			
	new_breadcrumb.addClass("disabled-links");
}

function change_content(all_content, content)
{
	all_content.removeClass("content-active");
	content.addClass("content-active");
	
	var next_content = content.next();
	var prev_content = content.prev();
	
	if(content_exists(next_content))
	{
		$(".main-arrows.next-arrow").addClass("arrow-active");
	}
	else
	{
		$(".main-arrows.next-arrow").removeClass("arrow-active");
	}
	
	if(content_exists(prev_content))
	{
		$(".main-arrows.prev-arrow").addClass("arrow-active");
	}
	else
	{
		$(".main-arrows.prev-arrow").removeClass("arrow-active");
	}
}

function content_exists(content)
{
	if(content.length>0&&content.hasClass("main-module-content"))
	{
		return true;
	}
	else
	{
		return false;
	}
}