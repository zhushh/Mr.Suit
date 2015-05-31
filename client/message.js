Template["mesgetNum"].helpers({
	mesnum:function() {
		return 3;
	}
});
Template["Mrsuit"].helpers({
	mesnum:function() {
		return 3;
	}
});

Template['mesmain'].helpers({
	mesT: function () {
      var date = new Date();
      var hehe = {'mesContent':"i'm mescontent", 'mesDate': date,'poster':'Heath',owner:false};
      var hehe2 = {'mesContent':"i'm mescontent", 'mesDate': date,'poster':'Heath',owner:true};
      var mes = [];
      for (var i = 0; i < 3; i++) {mes.push(hehe);}
      for (var i = 0; i < 3; i++) {mes.push(hehe2);}
      var mesT = [];
  	  trytitle = 'just a  try';
  	  for (var i = 0; i < 5; i++) {mesT.push({'mes':mes, 'title':trytitle});}
      return mesT;
    },
    recentReceivers: function () {
    	return [{'name':'张三'},{'name':'李四'},{'name':'王二'}];
    }
});
Template['mesmain'].events({
	'mouseenter .mes': function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}
		t.style.backgroundColor='rgb(210,215,221)';
	},
	'mouseleave .mes': function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}
		t.style.backgroundColor='rgb(247,247,247)';
	},
	'click .ellipsis.horizontal.icon': function(e) {
		var t = e.target;
		t.className='angle up icon';
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='contents') {i++;}
		t[i].style.display='block';
	},
	'click .angle.up.icon':function(e) {
		var t = e.target;
		t.className='ellipsis horizontal icon';
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='contents') {i++;}
		t[i].style.display='none';
	},
	'click .outline.chat.icon':function(e) {
		var t = e.target;
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='reply') {i++;}
		if (t[i].style.display != ''){ 
			t[i].style.display='';
		} else {
			t[i].style.display='block';
		}
	},
	'click .trash.icon':function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}
		var p = t.parentNode;
		p.removeChild(t);
	},
	'mouseenter .namelist':function(e) {
		e.target.style.backgroundColor = 'beige';
	},
	'mouseleave .namelist':function(e) {
		e.target.style.backgroundColor = 'rgb(247,247,247)';
	},
	'click .namelist':function(e) {
		var receiver = document.getElementById('receiver');
		var name = e.target;
		name = name.innerText;
		receiver.value = name;
	}
});

