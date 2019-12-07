/*
 *	Version:	jQuery JavaScript Library v1.6.2
 *	Author:		Alex Lin
 *	Date:		04/Aug/2011
 * 	Function:	
 * 
 */
var index = 0;
var topNavi;
var subNavi;
var curTop;
var curSub;
var showSub = 0;
var name="";


//<script type="text/javascript">

function init(){
	$(".SubNavi").hide();
	imgPreload();
}

function imgPreload(){
	var image1 = $('<img />').attr('src', '/imgs/Homebg.jpg');
	var image2 = $('<img />').attr('src', '/imgs/Culturebg.jpg');
	var image3 = $('<img />').attr('src', '/imgs/Shoppingbg.jpg');
	var image4 = $('<img />').attr('src', '/imgs/Eventsbg.jpg');
	var image5 = $('<img />').attr('src', '/imgs/Restaurantsbg.jpg');
	var image6 = $('<img />').attr('src', '/imgs/Hotelsbg.jpg');
	var image7 = $('<img />').attr('src', '/imgs/TravelPointsbg.jpg');
	var image8 = $('<img />').attr('src', '/imgs/Transports.jpg');
}

function setNavi(current){
	curTop = current;
	$("#BodyContainer").css("background-image","url(/imgs/"+current+"bg.jpg)");
	$("li:contains('"+current+"')").addClass("CurrentNav");
}

function setSub(current){
	curSub = current;
	$("li:contains('"+current+"')").addClass("CurrentSub");
}

function setCurrentPos(current){
	$("#CurrentPos p").html(current);
}


function naviEvent(){
		$(".ParentNavi").hover(
			function(){
				index = $(".ParentNavi").index(this);
				subNavi = $(".SubNavi").get(index);
				if( $(".active").length != 0)
				{
					$(".active").removeClass("active").slideUp("fast");
				}
			
				$(subNavi).addClass("active").slideDown();
				//$("#BodyContainer").css({'background-image':'url(/imgs/'+$(this).text()+'bg.jpg)', 'opacity':'0'}).animate("opacity:1","fast");
				$("#BodyContainer").css("background-image","url(/imgs/"+$(this).text()+"bg.jpg)");
				showSub = 1;
			},
			function(){
				//	$(".active").removeClass("active").slideUp("fast");
				showSub = 0;
		});
			
		$(".SubNavi").hover(	function(){	showSub = 1;},
								function(){	showSub = 0;});
			
		$("body").mousemove(function(e){
			if (showSub == 0)
			{
				$(".active").removeClass("active").slideUp("fast");
				$("#BodyContainer").css("background-image","url(/imgs/"+$(".CurrentNav").text()+"bg.jpg)");
			//	$("#BodyContainer").css({'background-image':'url(/imgs/'+$(this).text()+'bg.jpg)', 'opacity':'0'}).animate("opacity:1","fast");
			}
		});

/*		$(".Navigation ul li").click(function(){
			$(".CurrentNav").removeClass("CurrentNav");
			$(".CurrentSub").removeClass("CurrentSub");
			$(this).addClass("CurrentNav");
		});

		$(".SubNavi ul li").click(function(){
			$(".CurrentNav").removeClass("CurrentNav");
			$(".CurrentSub").removeClass("CurrentSub");
			index = $(".SubNavi").index(this);
			$(".ParentNavi").get(index).addClass("CurrentNav");
			$(this).addClass("CurrentSub");
		});*/
}

function setSideNavi(current, ifSubDown)
{
	$(".side_trigger a:contains('"+current+"')").parent().css("background-color","skyblue");
	if (ifSubDown)
	{
		$(".side_trigger a:contains('"+current+"')").parent().next().show();
	}
}

function setTrigger(triname)
{
	name = triname;
	$('.'+name+'_container').hide(); //Hide/close all containers
	//$('.acc_trigger:first').addClass('acc_active').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
	
	//On Click
	$('.'+name+'_trigger').click(function(){
			if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
				$('.'+name+'_trigger').removeClass('.'+name+'_active').next().slideUp(); //Remove all "active" state and slide up the immediate next container
				$(this).toggleClass('.'+name+'_active').next().slideDown(); //Add "active" state to clicked trigger and slide down the immediate next container
			}
			else
			{
				$(this).removeClass('.'+name+'_active').next().slideUp();
			}
			
			return false; //Prevent the browser jump to the link anchor
	});
}

function setExtend(triname)
{
	name = triname;
	$('#ExtendBT').click(function(){
		if ($('#ExtendBT').hasClass('extend_active')){
			$('.'+name+'_trigger').removeClass('.'+name+'_active').next().slideUp();
			$(this).removeClass('extend_active').html('Extend All +');
		}
		else
		{
			$(this).addClass('extend_active').html('Fold All -');
			if( $('.'+name+'_trigger').next().is(':hidden') ) { //If immediate next container is closed...
				$('.'+name+'_trigger').toggleClass('.'+name+'_active').next().slideDown(); //Add "active" state to clicked trigger and slide down the immediate next container
			}
		}
			
			return false; //Prevent the browser jump to the link anchor
	});
}

function extendAll(triname)
{
	name = triname;
	$('.'+name+'_container').toggleClass('.'+name+'_active').next().slideDown(); //Add "active" state to clicked trigger and slide down the immediate next container
}

function foldAll(triname)
{
	name = triname;
	$('.'+name+'_container').hide(); //Hide/close all containers
}

//</script>
/*
	sliderIntervalID = setInterval(function(){
		doMove(panelWidth, tooFar);
	}, delayLength);
	
	$("#slider-stopper").click(function(){
		if ($(this).text() == "Stop") {
			clearInterval(sliderIntervalID);
		 	$(this).text("Start");
		}
		else {
			sliderIntervalID = setInterval(function(){
				doMove(panelWidth, tooFar);
			}, delayLength);
		 	$(this).text("Stop");
		}
*/