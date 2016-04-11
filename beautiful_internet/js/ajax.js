/*�����Լ���AJAX��*/

function ajax(url,fnsucc,fnfail)
{
	//1.����XMLHttpRequest����
	var OAjax=null;
	if(window.XMLHttpRequest)
	{
		OAjax=new XMLHttpRequest();
	}
	else
	{
		OAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//2.��ȡ·��
	OAjax.open('POST',url,true);//�����ֱ��ǣ���÷������ļ�·�����Ƿ��첽��ʽ��ȡ
	
	//3.���ͽ�������
	OAjax.send();
	
	//4.�ж�����״̬
	OAjax.onreadystatechange=function(){
		if(OAjax.readyState==4)//��ɣ�
		{
			if(OAjax.status==200)//�ɹ���
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