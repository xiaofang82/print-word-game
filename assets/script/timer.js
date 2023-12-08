$step = 1;
$loops = Math.round(100 / $step);
$increment = 360 / $loops;
$half = Math.round($loops / 2);
$barColor = '#ec366b';
$backColor = '#feeff4';

	

clock={
	interval:null,
	init:function(){
		//$('.input-btn').click(function(){
			/*switch($(this).data('action')){
				case'start':
					clock.stop();
					clock.start(99);
				break;
				case'stop':
					clock.stop();
				break;
			}*/
            clock.start(15);
		//});
	},
	start:function(t){
		var pie = 0;
		var num = 0;
		var min = t?t:1;
		var sec = t;
		var lop = sec;
		$('.count').text(t);
		if(min>0){
			$('.count').addClass('min')
		}else{
			$('.count').addClass('sec')
		}
		clock.interval = setInterval(function(){
			sec = sec-1;
			
			pie = pie+(100/(lop));
			
			if(pie>=101){ pie = 1; }
			num = (sec).toFixed(2).slice(0,-3);
			
			if(sec < 10)
				sec = '0' + sec;
			$('.count').removeClass('min').addClass('sec').text(sec);
			
			//$('.clock').attr('class','clock pro-'+pie.toFixed(2).slice(0,-3));
			//console.log(pie+'__'+sec);
			$i = (pie.toFixed(2).slice(0,-3))-1;
			if($i < $half){
				$nextdeg = (90 + ( $increment * $i ))+'deg';
				$('.clock').css({'background-image':'linear-gradient(90deg,'+$backColor+' 50%,transparent 50%,transparent),linear-gradient('+$nextdeg+','+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
			}else{
				$nextdeg = (-90 + ( $increment * ( $i - $half ) ))+'deg';
				$('.clock').css({'background-image':'linear-gradient('+$nextdeg+','+$barColor+' 50%,transparent 50%,transparent),linear-gradient(270deg,'+$barColor+' 50%,'+$backColor+' 50%,'+$backColor+')'});
			}
			if(sec==0){
				clearInterval(clock.interval);
				$('.count').text('00');
				//$('.clock').removeAttr('class','clock pro-100');
				$('.clock').removeAttr('style');
				/*
				displayEnd();
				const model = $('#model');
				const modalContainer = $('.modal-container');
				modalContainer.addClass('model_show');
           		model.addClass('modal-transform');
				*/
			}
		},1000);
	},
	stop:function(){
		clearInterval(clock.interval);
		$('.count').text('-  -');
		$('.clock').removeAttr('style');
	}
}