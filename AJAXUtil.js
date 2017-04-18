function AJAXUtil(obj) {
	obj = obj || {};
	obj.method = obj.method.toUpperCase() || 'POST';
	obj.url = obj.url || '';
	obj.async = obj.async || true;
	obj.type = obj.type || "text";
	obj.data = obj.data || null;
	obj.success = obj.success || function() {};
	obj.error = obj.error || function() {};
	obj.before = obj.before || function() {};

	//解析要传送的数据
	var params = [];
	for(var key in obj.data) {
		params.push(key + '=' + obj.data[key]);
	}
	var postData = params.join('&');

	//兼容浏览器
	var xmlhttp;
	if(window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	//监听状态
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				if(obj.type == "xml") {
					obj.success(xmlhttp.responseXML);
				} else {
					obj.success(xmlhttp.responseText);
				}
			} else {
				obj.error("出错啦!\n错误码:" + xmlhttp.status + " 错误信息:" + xmlhttp.statusText);
			}
		} else {
			obj.before();
		}
	}

	//判断发送方式
	if(obj.method.toLowerCase() === "post") {
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlhttp.open(obj.method, obj.url, obj.async);
		xmlhttp.send(postData);
	} else if(obj.method.toLowerCase() === "get") {
		xmlhttp.open(obj.method, obj.url + "?" + postData, obj.async);
		xmlhttp.send();
	}
}