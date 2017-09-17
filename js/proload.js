//图片预加载
;(function($){
	function PreLoad(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;//如果只传一个图片，则将它转成数组形式
        this.opts = $.extend({},PreLoad.DEFAULTS,options);
       if(this.opts.order === 'ordered'){
	    	    this._ordered();
	    }else{
	    	    this._unordered();//无序加载方法，加_表示在内部使用，不接受外部调用	    
	    }
	};
	PreLoad.DEFAULTS = {
		order: "unordered",//无序预加载
		each : null,//每一张图片加载完毕后执行
		all : null//所有图片加载完成后执行
		
		
	};
	PreLoad.prototype._ordered = function (){//有序加载
	        var imgs = this.imgs,
	            opts = this.opts,
	            count = 0,
	            len = imgs.length;
	      load();
	      //有序加载
	      function load(){
	      	  var imgObj = new Image();
	      	  $(imgObj).on("load error",function(){
	      	  	   opts.each &&opts.each(count);
	      	  	   if(count >= len){
	      	  	   	 //所有图片已经加载完毕
	      	  	   	 opts.all &&opts.all();
	      	  	   }else{
	      	  	   	  load();
	      	  	   }
	      	  	   count++;
	      	  });
	      	  imgObj.src = imgs[count];
	      }
	       
	}
	PreLoad.prototype._unordered = function (){//无序加载
	        var imgs = this.imgs,
	            opts = this.opts,
	            count = 0,
	            len = imgs.length;
	        $.each(imgs,function(i,src){
	        	    if(typeof src !="string")return;
	        	    var imgObj = new Image();
	        	    $(imgObj).on("load error",function(){
	        	    	    opts.each &&opts.each(count);
	        	    	    if(count >= len-1){
	        	    	    	  opts.all&&opts.all(len)
	        	    	    }
	        	    	    count++;
	        	    });
	        	    imgObj.src =src;
	        })
	       
	}
	$.extend({
	       	   preload:function(imgs,opts){
	       	       	new  PreLoad(imgs,opts)
	       	   }
	})
	
})(jQuery)
