$(document).ready(function(){

    var canvas=$("#canvas")[0];      //获得画布元素
	var ctx=canvas.getContext("2d");//构建绘图环境
	var c_color=$("#current-color");
	
	/*获得变量*/
	var save=$("#save");
	var c_panel=$("#clear");
	
	
	/*获得工具变量*/
	var Brush=$("#Brush");        //获得刷子
	var Eraser=$("#Eraser");      //获得橡皮
	var Paint=$("#Paint");        //获得油漆桶
	var Straw=$("#Straw");        //获得吸管
	var textw=$("#text");         //获得文本编辑
	var Magnifier=$("#Magnifier");//获得放大镜
	
	
	/*获得图形变量*/
	var line=$("#line");
	var arc=$("#arc");
	var rect=$("#rect");
	var poly=$("#poly");
	var arcfill=$("#arcfill");
	var rectfill=$("#rectfill");
	
	
	/*获得线条粗细*/
	var line1=$("#1px");
	var line3=$("#3px");
	var line5=$("#5px");
	var line8=$("#8px");
	
	
	/*获得颜色值*/
	var red=$("#red");
	var green=$("#green");
	var blue=$("#blue");
	var yellow=$("#yellow");
	var pink=$("#pink");
	var purple=$("#purple");
	var black=$("#black");
	var orange=$("#orange");
	var cyan=$("#cyan");
	var white=$("#white");
	
	
	/*获得画布的宽高*/
	var w=canvas.width;
	var h=canvas.height;
	
	//清空画布
	c_panel.click(function(){  
		    ctx.clearRect(0,0,w,h);//这样写的作用是清除画布
	});
	
	
	//因为工具和形状不可同时选中，故将其放在同一个数组中
	ArrTool=[Brush,Eraser,Paint,Straw,textw,Magnifier,line,arc,rect,poly,arcfill,rectfill];
	//颜色也不可以同时选择几个
    color=[red,green,blue,yellow,pink,purple,black,orange,cyan,white];
	//因为不可以同时选择多个线条，所以把所有的线条放在一个数组中
    lineWidth=[line1,line3,line5,line8];
	
	//设置绘画初始状态
	drawBrush();            /*设置刷子*/
	setColor(black,6);      /*设置颜色默认为黑色*/
	setLineWidth(line1,0); /*设置默认线宽为1px*/
	
	/*利用函数声明提升*/
   var funArr=[drawBrush,setEraser,setPaint,setStraw,setTextw,setMagnifier,setLine,setArc,setRect,setPoly,setArcfill,setRectfill];
	//设置刷子状态
	for(var tool=0;tool<ArrTool.length;tool++)
	{
		ArrTool[tool][0].index=tool;
		ArrTool[tool].click(
		       function(){
				   funArr[this.index]();
			   }).mouseover(function(){
		           $(this).css("border","1px solid red");
	           }).mouseleave(function(){
		           $(this).css("border","1px solid black");
	          });
	}

   
   //设置线条
   function setLineWidth(obj,num)
   {
	   setState(lineWidth,num,1);
	   ctx.lineWidth=parseInt(obj.id);
   }
   
   for(var i=0;i<lineWidth.length;i++)
   {
	   lineWidth[i][0].index=i;/*lineWidth[i]是jquery对象转变成js对象*/
	   lineWidth[i].click(function(){
		   setLineWidth(this,this.index);
	   }).mouseover(function(){
         $(this).css("border","1px solid red");
	   }).mouseleave(function(){
       $(this).css("border","");
      })
   }
   
  //设置颜色
  function setColor(obj,num)
  {
	    setState(color,num,0);
	    ctx.strokeStyle=obj.id;
	    ctx.fillStyle=obj.id; 
        c_color.css("background",ctx.strokeStyle);	
		c_color.css("background", ctx.fillStyle);	
  }

  for(var j=0;j<color.length;j++)
  {
	  color[j][0].index=j;
	  color[j].click(function(){
      setColor(this,this.index);
      });
  }
  
  
  //设置状态函数
	function setState(Arr,num,type1)
	{
	         for(var i=0;i<Arr.length;i++)
			    {
				    if(i==num)
					{
					    if(type1==1)
						   Arr[i].css("background","yellow");	
						else
						   Arr[i].css("border","1px solid #fff");	
					}
					else
					{
						if(type1==1)
						   Arr[i].css("background","#eee");
						else
						   Arr[i].css("border","1px solid black");	   
					}
		        }
	}
	
/*注意此函数中设置开始和结束路径的位置，不然会出现路径一直是开启的状态。必须要在下一次点击时开始路径画图*/
	function drawBrush()
	{
		    setState(ArrTool,0,1);	
	        var flag=0;
			canvas.onmousedown=function(ev)
			{
				    var e=ev||event;
					var startX=e.pageX-this.offsetLeft;
					var startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
					ctx.beginPath();
					ctx.moveTo(startX,startY);
					flag=1;//判断鼠标别点下
			}
			canvas.onmousemove=function(ev)
			{
				    var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					if(flag)
					{
						ctx.lineTo(conX, conY);
						ctx.stroke();
					}	   
			}
			ctx.closePath();
			canvas.onmouseup=canvas.onmouseout=function()
			{
					flag=0;
			}  
	}

		   
 //设置橡皮功能
   function setEraser()
    {
		  setState(ArrTool,1,1);
		  var flag=0;
			canvas.onmousedown=function(ev)
			{
				    var e=ev||event;
					var startX=e.pageX-this.offsetLeft;
					var startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
					ctx.beginPath();
					ctx.clearRect(startX,startY,ctx.lineWidth*2,ctx.lineWidth*2); 
					//	HTML5中 canvas的clearRect()的方法是擦除一个指定的矩形单元，并且用一个透明的颜色填充他。
					flag=1;//判断鼠标别点下
			}
			canvas.onmousemove=function(e)
			{
				    var eve=e||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					if(flag)
					{
						ctx.clearRect(conX,conY,ctx.lineWidth*2,ctx.lineWidth*2);
						ctx.stroke();
					}	   
			}
			ctx.closePath();
			canvas.onmouseup=canvas.onmouseout=function()
			{
					flag=0;	
			} 
	}
	
 
   //设置油漆桶的功能
   function setPaint()
   {
	   setState(ArrTool,2,1);
	   var flag=0;
			canvas.onmousedown=function(ev)
			{
				    var e=ev||event;
					var startX=this.offsetLeft;
					var startY=this.offsetTop;  //获得鼠标点击在画布上的位置
					var w=this.width;
					var h=this.height;
					flag=1;
					if(flag)
					{
						ctx.beginPath();
						ctx.rect(0,0,w,h);
						ctx.fill();
						//油漆桶就是给画布填充一个与画布同等大小的矩形。（注意rect的矩阵坐标是相对于画布本身而言，所以是0，0，
						//而鼠标点击事件的坐标是相对于整个网页，所以要想获得目标点击点相对于画布的坐标，还要减去画布左上角在页面中的坐标）
					}
					//判断鼠标别点下
			}
			canvas.onmouseup=function(){
				 ctx.closePath();	
				}
			canvas.onmouseout=function(){
				   flag=0;
			  }  
   }	
   
   
   //设置吸管工具的功能
   function setStraw()
   {
	   setState(ArrTool,3,1);
			canvas.onmousedown=function(ev)
			{  
				    var e=ev||event;
					var startX=e.pageX-this.offsetLeft;
					var startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
				    var image1=ctx.getImageData(startX,startY,1,1);//getImageData()函数是复制画布上指定矩形的像素
					var color="rgb("+image1.data[0]+","+image1.data[1]+","+image1.data[2]+")";//获得RGB三种颜色值
					ctx.strokeStyle=color;
					ctx.fillStyle=color;
					c_color.css("background",ctx.strokeStyle);	
		            c_color.css("background", ctx.fillStyle);	
					drawBrush(0);
			}	
				/*obj.data=[
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度，
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度,
			红,绿,蓝色,透明度,
			]//多像素的数据
		*/
			canvas.onmousemove=null;	
          	canvas.onmouseup=null;
			canvas.onmouseout=null;
   }
   
   
   //设置文本功能
   function setTextw()
   {
	    setState(ArrTool,4,1);
		canvas.onmousedown=function(ev)
		{
			var e=ev||event;
			var word=window.prompt("请在这里输入文字：","");
			var startX=e.pageX-this.offsetLeft;
			var startY=e.pageY-this.offsetTop;
			if(word!=null)
			 {
			  ctx.fillText(word,startX,startY);
			 }
		}
		canvas.onmouseup=null;
		canvas.onmouseout=null;
		canvas.onmousemove=null;
   }
   
   //设置方大器功能
   function setMagnifier()
   {
	   setState(ArrTool,5,1);
	   var multiple=prompt("请输入方大倍数：","1");
	   var new_w=w*multiple;
	   var new_h=h*multiple;
	   canvas.style.width=parseInt(new_w)+"px";
	   canvas.style.height=parseInt(new_h)+"px";
   }
   
   
   //设置线条功能
   function setLine()
   {
	     setState(ArrTool,6,1); 
	     var flag=0;
	     canvas.onmousedown=function(ev)
		 {
			 var e=ev||event;
	         var startX=e.pageX-this.offsetLeft;
			 var startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 ctx.moveTo(startX,startY);
			 flag=1;//判断鼠标别点下
		}   
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					if(flag)
					{
					ctx.lineTo(conX, conY);
					ctx.stroke();	
		            }
		 ctx.closePath();
		 canvas.onmouseout=function()
		   {
				   flag=0;
		   }    
	     }  
    }
	
	
	//设置画空心圆的功能
   function setArc(){
	   setState(ArrTool,7,1);
	   var flag=0;
	   var startX;
	   var startY;
	     canvas.onmousedown=function(ev)
		 {
			 var e=ev||event;
	         startX=e.pageX-this.offsetLeft;
			 startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 flag=1;//判断鼠标别点下
		}  
        			
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					var detaX=conX-startX;
					var detaY=conY-startY;
					if(flag){
					ctx.arc(startX,startY,Math.sqrt(detaX*detaX+detaY*detaY),0,2*Math.PI,true);
					ctx.stroke();	
		}
		 ctx.closePath();
		 canvas.onmouseout=function()
		 {
				   flag=0;
		 }    
	     }   
   }
   
    //设置画空心矩形的功能
   function setRect(){
	   setState(ArrTool,8,1);
	   var flag=0;
	   var startX;
	   var startY;
	     canvas.onmousedown=function(ev){
			 var e=ev||event;
	         startX=e.pageX-this.offsetLeft;
			 startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 flag=1;//判断鼠标别点下
				}  
        			
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
			  		var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					var detaX=conX-startX;
					var detaY=conY-startY;
					if(flag){
					ctx.rect(startX,startY,detaX,detaY);
					ctx.stroke();	
		}
		 ctx.closePath();
		 canvas.onmouseout=function()
		 {
				   flag=0;
		}    
	     }  
   }
   
   //设置画三角形
    function setPoly(){
	     setState(ArrTool,9,1); 
	     var flag=0;
		 var startX ;
		 var startY;
	     canvas.onmousedown=function(ev)
		 {
			 var e=ev||event;
	         startX=e.pageX-this.offsetLeft;
			 startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 ctx.moveTo(startX,startY);
			 flag=1;//判断鼠标别点下
		}   
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					var detaX=conX-startX;
					var detaY=conY-startY;
					if(flag){
					ctx.lineTo(conX, conY);
                    ctx.lineTo(conX-2*detaX, conY);
					ctx.closePath();	
					ctx.stroke();
                    				
				}
		 
		 canvas.onmouseout=function()
		 {
				   flag=0;
		}    
	     }  
    }
	
	//设置画实心圆的功能
    function setArcfill(){
	   setState(ArrTool,10,1);
	   var flag=0;
	   var startX;
	   var startY;
	     canvas.onmousedown=function(ev)
		 {
			 var e=ev||event;
	         startX=e.pageX-this.offsetLeft;
			 startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 flag=1;//判断鼠标别点下
		}  
        			
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					var detaX=conX-startX;
					var detaY=conY-startY;
					if(flag){
					ctx.arc(startX,startY,Math.sqrt(detaX*detaX+detaY*detaY),0,2*Math.PI,true);
					ctx.fill();	
		}
		 ctx.closePath();
		 canvas.onmouseout=function()
		      {
				   flag=0;
			  }    
	     }  
   }
   
   //设置画实心矩形的功能
    function setRectfill(){
	   setState(ArrTool,11,1);
	   var flag=0;
	   var startX;
	   var startY;
	     canvas.onmousedown=function(ev)
		 {
			 var e=ev||event;
	         startX=e.pageX-this.offsetLeft;
			 startY=e.pageY-this.offsetTop;  //获得鼠标点击在画布上的位置
			 ctx.beginPath();
			 flag=1;//判断鼠标别点下
		}  
        			
		 canvas.onmouseup=function(ev)
		 {
			        var e=ev||event;
					var conX=e.pageX-this.offsetLeft;
					var conY=e.pageY-this.offsetTop;
					var detaX=conX-startX;
					var detaY=conY-startY;
					if(flag){
					ctx.rect(startX,startY,detaX,detaY);
					ctx.fill();	
		}
		 ctx.closePath();
		 canvas.onmouseout=function(){
				   flag=0;
			  }    
	     }  
   }
  
  
  
  
  
  //更换背景
          var body =$("#body");
		  var bgcolor1=$("#bg-color");
		  var bordercolor1=$("#border-color");
		  var container=$("#container");
		  var div2=$("#div2");
		  var set_img=$("#img_set");
		  var setbox=$("#setting");
		  var num=0;
		  var defult=$("#Default");
		  //设置默认按钮的颜色变化
		       defult.click(function(){
			      body.css("background","#ADD8E6");  
                  container.css("border","12px solid #8FBC8F");
                  div2.css("borderTop","12px solid #8FBC8F");				  
			   })
			   
			//设置背景颜色的变化
		      bgcolor1.change(function(){ 
			      body.css("background",this.value);
			   })
			   
			   
			 //设置border颜色的变化
			   bordercolor1.change(function(){
			      container.css("border","12px solid "+this.value);
                  div2.css("borderTop","12px solid"+ this.value);	
			   });
			  

            //设置鼠标放在设置装置上的变化	
              set_img.mouseover(function(){
			      this.src="images/options_button_hover.png";
			  }	).mouseleave(function(){
			      this.src="images/options_button.png";
			  }	).click(function(){
			    num++;
				if(num%2!=0)
				{
				     setTimeout(function(){
					 setbox.css("left","0px");
					 },30);
				}
				else
				{
				     setTimeout(function(){
					 setbox.css("left","-168px");
					// setbox.style.left="-168px";
					 },30);
				}
			  }	);		
 
});