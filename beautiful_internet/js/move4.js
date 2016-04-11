/*完美运动流程------可以实现各种运动*/

 function getStyle(obj,arr){
		       if(obj.currentStyle)
			   {
			      //运用这些方法返回的样式值是一个字符串
				  return obj.currentStyle[arr];//IE
			   }
			  else
			   {
			       return getComputedStyle(obj,false)[arr];//FF	
			   } 
		   }
		   

 function startMove(obj,json,fn){
		          
		  clearInterval(obj.timer);
		  obj.timer=setInterval(
		   
			 function()
				{
					  
				 var arr;
				 var bStop=true;//判断是不是所有的运动都停止，初始值为所有的运动都停止	 
				  for(arr in json)
					  {
						//1.获得当前属性值  
						  var currStyle=0;
						  if(arr=="opacity")
						  {
						   
							currStyle= parseInt(parseFloat(getStyle(obj,arr))*100);//这样做的目的是程序中要尽量避免小数。
						  }
						  else
						  {
							currStyle=parseInt(getStyle(obj,arr));//获得样式值
						  }
						  
					     //2.设置速度值
						  var ispeed=(json[arr]-currStyle)/8;
						  if(ispeed>0)
							 {
								ispeed=Math.ceil(ispeed);//向上取整
							 }	
						  else
							 {
								ispeed=Math.floor(ispeed);//向下取整
							 }
							 
						 //3.判断停止条件 
						   if(currStyle!=json[arr])
						   {
							   bStop=false;//判断如果存在当前值还没有达到目标，定时器就不停止
						   }
						 
							
						   if(arr=="opacity")
						   {
							obj.style.filter='alpha(opacity:'+(currStyle+ispeed)+')';
							obj.style.opacity=(currStyle+ispeed)/100;
						   }
						   else{
						   obj.style[arr]=currStyle+ispeed+'px';//注意区别
						   }
								   
								   
					    if(bStop)//如果所有的运动都结束了，就停止计时器
						{
						   clearInterval(obj.timer);
						   //当前一个运动停止时调用下一个运动
						   if(fn)//判断fn参数是否被传入，如果传入就执行fn函数
						   {
							   fn();
						   }
						} 
						      
						}
					}

				  ,30)
                  				  
		   }