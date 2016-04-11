/*创建自己的AJAX库*/

function ajax(url,fnsucc,fnfail)
{
	//1.创建XMLHttpRequest对象
	var OAjax=null;
	if(window.XMLHttpRequest)
	{
		OAjax=new XMLHttpRequest();
	}
	else
	{
		OAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//2.获取路径
	OAjax.open('POST',url,true);//参数分别是，获得方法，文件路径，是否异步方式获取
	
	//3.发送建立链接
	OAjax.send();
	
	//4.判断链接状态
	OAjax.onreadystatechange=function(){
		if(OAjax.readyState==4)//完成？
		{
			if(OAjax.status==200)//成功？
			{
				fnsucc(OAjax.responseText)
			}
			else
			{
				if(fnfail)
				{
					fnfail();
				}
					
			}
		}
	}
}