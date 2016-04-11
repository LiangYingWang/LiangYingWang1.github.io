$(document).ready(function(){
   $("#nav ul li a").click(function(){
	       
		   //高亮显示
		  $("#nav ul li a").each(function(){
			  $(this).removeClass("current")
		  })
		  $(this).addClass("current");
		   
		
	      var toload=$(this).attr("href")+" #left";
		  $("#left").hide("fast",loadleft);
		  
		  /*正在加载……*/
		

		   $("#load").remove();//移除id=load的对象；
		   $("#left").append("<span id='load'>正在加载……</span>");
		   $("#load").fadeIn('fast');
		  
		  /*动态加载内容到网页*/
		  function loadleft(){
			  $("#left").load(toload);
			  $("#left").show('normal');
			 // $("#load").fadeOut('normal');
		  }
		 return false;
	  
   });
   
});