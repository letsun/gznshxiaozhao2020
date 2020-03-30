//弹出层封装
$.dialog = {
	openSimple : function(title, url, width, height) {
		var index = layer.open({
			type : 2,
			title : title,
			icon : 1,
			area : [ width + 'px', height + 'px' ],
			shade : 0.3,
			maxmin : true,
			content : url
		});
		return index;
	},	
	openContent : function(title, url, width, height) {
		layer.open({
			type : 2,
			title : title,
			icon : 1,
			area : [ width + 'px', height + 'px' ],
			shade : 0.3,
			maxmin : true,
			content : url,
			btn : ['关闭'],
			btn2 : function(index, layero) {
				layero.close();
			}
		});
		return false;
	},
	openCallback : function(title, url, width, height,callBack) {
		layer.open({
			type : 2,
			title : title,
			icon : 1,
			area : [ width + 'px', height + 'px' ],
			shade : 0.3,
			maxmin : true,
			content : url,
			btn : [ '确认', '取消' ],
			yes : function() {
				callBack();
			},
			no : function() {
				layer.close();
			}
		});
		return false;
	}
}

//数据表格[搜索、重置]事件处理
$.table = {
	search : function() {
		layui.table.reload('layui-table', {
			page : {
				curr : 1
			},
			where : $(".layui-form").serializeObject()
		});
		return false;
	},
	reload : function() {
		$('.layui-form')[0].reset();
		layui.table.reload('layui-table', {
			page : {
				curr : 1
			}
		});
		return false;
	}
}

//表单提交
$.form = {
	ajaxSubmit : function(url,data) {
		$.ajax({
			url : url,
			data : data,
			type : "post",
			dataType : "json",
			success : function(_data) {
				if (_data.type.toUpperCase() == "SUCCESS") {
					parent.layer.closeAll();
					parent.$.table.reload();
				}
				parent.layer.msg(_data.content, {
					icon : 1,
					time : 1000
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				layer.msg('保存发生错误');
			}
		});
	}
}

//数据表格[详情、编辑、删除]事件处理
layer.ready(function() {
	var table = layui.table;
	table.on('tool(layui-table-filter)', function(obj) {
		var data = obj.data;
		//详情
		if (obj.event === 'detail') {
			$.dialog.openContent('详情','detail?id='+data.id,800,500);
			return;
		}
		//编辑
		if (obj.event === 'edit') {
			$.dialog.openSimple('编辑','edit?id='+data.id,800,500);
			return;
		}
		//删除
		if (obj.event === 'del') {
			layer.confirm('真的要删除么?', function(index) {
				$.form.ajaxSubmit('delete',{id:data.id});
				layer.close(index);
			});
			return;
		} 
	});
	
	//监听iframe子页面表单提交，lay-filter="layui-form-btn"名字要一致
	layui.form.on('submit(layui-form-btn)', function(data){
		$.form.ajaxSubmit(data.form.action,data.field);
	   	return false;
	 });
});

//插件扩展
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}
