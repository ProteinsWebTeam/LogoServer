/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/*! hmm_logo 2014-04-30 */
/** @license
 * HMM logo
 * https://github.com/Janelia-Farm-Xfam/hmm_logo_js
 * Copyright 2013, Jody Clements.
 * Licensed under the MIT License.
 * https://github.com/Janelia-Farm-Xfam/hmm_logo_js/blob/master/LICENSE.txt
 */
!function(a){"use strict";function b(){if(!f){var a=document.createElement("canvas");f=!(!a.getContext||!a.getContext("2d"))}return f}function c(a,b){b=b||{},this.value=a,this.width=parseInt(b.width,10)||100,"W"===this.value&&(this.width+=30*this.width/100),this.height=parseInt(b.height,10)||100,this.color=b.color||"#000000",this.fontSize=b.fontSize||138,this.scaled=function(){},this.draw=function(a,b,c,d,e,f){var g=b/this.height,h=c/this.width,i=a.font;a.transform(h,0,0,g,d,e),a.fillStyle=f||this.color,a.textAlign="center",a.font="bold "+this.fontSize+"px Arial",a.fillText(this.value,0,0),a.setTransform(1,0,0,1,0,0),a.fillStyle="#000000",a.font=i}}function d(){function a(a,b){var c=".",d=0,e=null,f=null,g=null,h={".":20,h:11,"+":3,"-":2,o:2,p:2};for(e in b)b.hasOwnProperty(e)&&b[e]>=a&&(f=h[e]||1,g=h[c]||1,g>f?(c=e,d=b[e]):f===g&&b[e]>d&&(c=e,d=b[e]));return c}this.grey="#7a7a7a",this.check_PG=function(a,b,c){return c[a].P="#ffff11",c[a].G="#ff7f11",1},this.check_R=function(a,b,c){c[a].R=this.grey;var d="#FF9999",e=["Q","K","R"],f=0;for(f=0;f<e.length;f++)if(b[.85][a]===e[f])return c[a].R=d,1;return"+"===b["0.60"][a]||"R"===b["0.60"][a]||"K"===b["0.60"][a]?(c[a].R=d,1):1},this.check_Q=function(a,b,c){c[a].Q=this.grey;var d="#99FF99",e=["Q","T","K","R"],f=0;if("b"===b["0.50"][a]||"E"===b["0.50"][a]||"Q"===b["0.50"][a])return c[a].Q=d,1;for(f=0;f<e.length;f++)if(b[.85][a]===e[f])return c[a].Q=d,1;return"+"===b["0.60"][a]||"K"===b["0.60"][a]||"R"===b["0.50"][a]?(c[a].Q=d,1):1},this.check_N=function(a,b,c){c[a].N=this.grey;var d="#99FF99";return"N"===b["0.50"][a]?(c[a].N=d,1):"D"===b[.85][a]?(c[a].N=d,1):1},this.check_K=function(a,b,c){c[a].K=this.grey;var d="#FF9999",e=["K","R","Q"],f=0;if("+"===b["0.60"][a]||"R"===b["0.60"][a]||"K"===b["0.60"][a])return c[a].K=d,1;for(f=0;f<e.length;f++)if(b[.85][a]===e[f])return c[a].K=d,1;return 1},this.check_E=function(a,b,c){c[a].E=this.grey;var d="#FF9999",e=["D","E"],f=0;if("+"===b["0.60"][a]||"R"===b["0.60"][a]||"K"===b["0.60"][a])return c[a].E=d,1;for(f=0;f<e.length;f++)if(b[.85][a]===e[f])return c[a].E=d,1;return"b"===b["0.50"][a]||"E"===b["0.50"][a]||"Q"===b["0.50"][a]?(c[a].E=d,1):1},this.check_D=function(a,b,c){c[a].D=this.grey;var d="#FF9999",e=["D","E","N"],f=0;if("+"===b["0.60"][a]||"R"===b["0.60"][a]||"K"===b["0.60"][a])return c[a].D=d,1;for(f=0;f<e.length;f++)if(b[.85][a]===e[f])return c[a].D=d,1;return"-"===b["0.50"][a]||"E"===b["0.60"][a]||"D"===b["0.60"][a]?(c[a].D=d,1):1},this.check_ACFILMVW=function(a,b,c){var d=["A","C","F","L","I","M","V","W"],e=["A","C","F","H","I","L","M","V","W","Y","P","Q","h"],f=0,g=0;for(f=0;f<d.length;f++)for(c[a][d[f]]=this.grey,g=0;g<e.length;g++)b["0.60"][a]===e[g]&&(c[a][d[f]]="#9999FF");return 1},this.check_ST=function(a,b,c){c[a].S=this.grey,c[a].T=this.grey;var d=["A","C","F","H","I","L","M","V","W","Y","P","Q"],e=0;if("a"===b["0.50"][a]||"S"===b["0.50"][a]||"T"===b["0.50"][a])return c[a].S="#99FF99",c[a].T="#99FF99",1;for(e=0;e<d.length;e++)if(b[.85][a]===d[e])return c[a].S="#99FF99",c[a].T="#99FF99",1},this.check_HY=function(a,b,c){c[a].H=this.grey,c[a].Y=this.grey;var d=["A","C","F","H","I","L","M","V","W","Y","P","Q","h"],e=0,f="#99FFFF";if("h"===b["0.60"][a])return c[a].H=f,c[a].Y=f,1;for(e=0;e<d.length;e++)if(b[.85][a]===d[e])return c[a].H=f,c[a].Y=f,1;return 1},this.color_map=function(b){var c=["0.50","0.60","0.80","0.85"],d={W:1,L:1,V:1,I:1,M:1,A:1,F:1,C:1,Y:1,H:1,P:1},e={Q:1,N:1},f={K:1,R:1,H:1},g={S:1,T:1},h={E:1,D:1},i={},j=[],k=0,l=0,m=0,n=0,o=[],p=null,q={},r=null,s=null;for(l=0;l<b.length;l++)for(p=b[l],m=0;m<c.length;m++){for(s=c[m],q={p:0,o:0,"-":0,"+":0,h:0},n=0;n<p.length;n++)o=[],o=p[n].split(":"),q[o[0]]=parseFloat(o[1],10),e[o[0]]?q.p=q.p+parseFloat(o[1],10):g[o[0]]?q.o=q.o+parseFloat(o[1],10):h[o[0]]?q["-"]=q["-"]+parseFloat(o[1],10):(f[o[0]]&&(q["+"]=q["+"]+parseFloat(o[1],10)),d[o[0]]&&(q.h=q.h+parseFloat(o[1],10)));r=a(s,q),i[s]||(i[s]=[]),i[s].push(r)}for(k=0;k<b.length;k++)j[k]={},this.check_D(k,i,j),this.check_R(k,i,j),this.check_Q(k,i,j),this.check_N(k,i,j),this.check_K(k,i,j),this.check_E(k,i,j),this.check_HY(k,i,j),this.check_ACFILMVW(k,i,j),this.check_ST(k,i,j),this.check_PG(k,i,j);return j}}function e(e){function f(a,b,c,d,e,f,g,h){var i="#ffffff";h?(e>.1?i="#d7301f":e>.05?i="#fc8d59":e>.03&&(i="#fdcc8a"),a.fillStyle=i,a.fillRect(b,c+15,d,10),i="#ffffff",f>9?i="#d7301f":f>7?i="#fc8d59":f>4&&(i="#fdcc8a"),a.fillStyle=i,a.fillRect(b,c+30,d,10)):c+=30,i="#ffffff",.75>g?i="#2171b5":.85>g?i="#6baed6":.95>g&&(i="#bdd7e7"),a.fillStyle=i,a.fillRect(b,c,d,10)}function g(a,b,c){a.beginPath(),a.moveTo(0,b),a.lineTo(c,b),a.lineWidth=1,a.strokeStyle="#999999",a.stroke()}function h(a,b,c,d,e){e=e||"#999999",a.beginPath(),a.moveTo(b,c),a.lineTo(b,c+d),a.lineWidth=1,a.strokeStyle=e,a.stroke()}function i(a,b,c,d,e,f,g,h){a.font=e+"px Arial",a.fillStyle=g,a.fillRect(b,c-10,f,14),a.textAlign="center",a.fillStyle=h,a.fillText(d,b+f/2,c)}function j(a,b,c,d,e,f){var g=c-20,j="#ffffff",k="#555555";e>.1?(j="#d7301f",k="#ffffff"):e>.05?j="#fc8d59":e>.03&&(j="#fdcc8a"),i(a,b,g,e,f,d,j,k),e>.03&&h(a,b+d,c-30,-30-c,j)}function k(a,b,c,d,e,f){var g="#ffffff",h="#555555";e>9?(g="#d7301f",h="#ffffff"):e>7?g="#fc8d59":e>4&&(g="#fdcc8a"),i(a,b,c,e,f,d,g,h)}function l(a,b,c,d,e,f,g){var h=c-4,j="#ffffff",k="#555555";g&&(h=c-35),.75>e?(j="#2171b5",k="#ffffff"):.85>e?j="#6baed6":.95>e&&(j="#bdd7e7"),i(a,b,h,e,f,d,j,k)}function m(a,b,c,d,e,f,g){a.font=f+"px Arial",a.textAlign=g?"right":"center",a.fillStyle="#666666",a.fillText(e,b+d/2,c)}function n(c,d,e,f,g){var h=a(c).find("#canv_"+f);return h.length||(a(c).append('<canvas class="canvas_logo" id="canv_'+f+'"  height="'+d+'" width="'+e+'" style="left:'+g*f+'px"></canvas>'),h=a(c).find("#canv_"+f)),a(h).attr("width",e).attr("height",d),b()||(h[0]=G_vmlCanvasManager.initElement(h[0])),h[0]}e=e||{},this.column_width=e.column_width||34,this.height=e.height||300,this.data=e.data||null,this.debug=e.debug||null,this.scale_height_enabled=e.height_toggle||null,this.zoom_enabled=e.zoom_buttons&&"disabled"===e.zoom_buttons?null:!0,this.colorscheme=e.colorscheme||"default",this.display_ali_map=0,this.alphabet=e.data.alphabet||"dna",this.dom_element=e.dom_element||a("body"),this.called_on=e.called_on||null,this.start=e.start||1,this.end=e.end||this.data.height_arr.length,this.zoom=parseFloat(e.zoom)||.4,this.default_zoom=this.zoom,this.data.processing&&/^observed|weighted/.test(this.data.processing)?(this.show_inserts=0,this.info_content_height=286):(this.show_inserts=1,this.info_content_height=256),this.data.max_height=e.scaled_max?e.data.max_height_obs||this.data.max_height||2:e.data.max_height_theory||this.data.max_height||2,this.dna_colors={A:"#cbf751",C:"#5ec0cc",G:"#ffdf59",T:"#b51f16",U:"#b51f16"},this.aa_colors={A:"#FF9966",C:"#009999",D:"#FF0000",E:"#CC0033",F:"#00FF00",G:"#f2f20c",H:"#660033",I:"#CC9933",K:"#663300",L:"#FF9933",M:"#CC99CC",N:"#336666",P:"#0099FF",Q:"#6666CC",R:"#990000",S:"#0000FF",T:"#00FFFF",V:"#FFCC33",W:"#66CC66",Y:"#006600"},this.colors=this.dna_colors,"aa"===this.alphabet&&(this.colors=this.aa_colors),this.canvas_width=5e3;var o=null,p=null,q=null,r=null;"aa"===this.alphabet&&(p=this.data.probs_arr,p&&(r=new d,this.cmap=r.color_map(p))),this.letters={};for(o in this.colors)this.colors.hasOwnProperty(o)&&(q={color:this.colors[o]},this.letters[o]=new c(o,q));this.scrollme=null,this.previous_target=0,this.rendered=[],this.previous_zoom=0,this.render=function(c){if(this.data){c=c||{};var d=c.zoom||this.zoom,e=c.target||1,f=(c.scaled||null,a(this.dom_element).parent().width()),g=1,h=null,i=null,j=0;if(e!==this.previous_target){if(this.previous_target=e,c.start&&(this.start=c.start),c.end&&(this.end=c.end),.1>=d?d=.1:d>=1&&(d=1),this.zoom=d,h=this.end||this.data.height_arr.length,i=this.start||1,h=h>this.data.height_arr.length?this.data.height_arr.length:h,h=i>h?i:h,i=i>h?h:i,i=i>1?i:1,this.y=this.height-20,this.max_width=this.column_width*(h-i+1),f>this.max_width&&(d=1,this.zoom_enabled=!1),this.zoom=d,this.zoomed_column=this.column_width*d,this.total_width=this.zoomed_column*(h-i+1),1>d)for(;this.total_width<f&&(this.zoom+=.1,this.zoomed_column=this.column_width*this.zoom,this.total_width=this.zoomed_column*(h-i+1),this.zoom_enabled=!1,!(d>=1)););e>this.total_width&&(e=this.total_width),a(this.dom_element).attr({width:this.total_width+"px"}).css({width:this.total_width+"px"});var k=Math.ceil(this.total_width/this.canvas_width);for(this.columns_per_canvas=Math.ceil(this.canvas_width/this.zoomed_column),this.previous_zoom!==this.zoom&&(a(this.dom_element).find("canvas").remove(),this.previous_zoom=this.zoom,this.rendered=[]),this.canvases=[],this.contexts=[],j=0;k>j;j++){var l=this.columns_per_canvas*j+i,m=l+this.columns_per_canvas-1;m>h&&(m=h);var o=(m-l+1)*this.zoomed_column;o>g&&(g=o);var p=g*j,q=p+o;if(q+q/2>e&&e>p-p/2&&1!==this.rendered[j]){if(this.canvases[j]=n(this.dom_element,this.height,o,j,g),this.contexts[j]=this.canvases[j].getContext("2d"),this.contexts[j].setTransform(1,0,0,1,0,0),this.contexts[j].clearRect(0,0,o,this.height),this.contexts[j].fillStyle="#ffffff",this.contexts[j].fillRect(0,0,q,this.height),this.zoomed_column>12){var r=parseInt(10*d,10);r=r>10?10:r,this.debug&&this.render_with_rects(l,m,j,1),this.render_with_text(l,m,j,r)}else this.render_with_rects(l,m,j);this.rendered[j]=1}}this.scrollme||b()&&(this.scrollme=new EasyScroller(a(this.dom_element)[0],{scrollingX:1,scrollingY:0,eventTarget:this.called_on})),1!==e&&b()&&this.scrollme.reflow()}}},this.render_x_axis_label=function(){var b="Model Position";this.display_ali_map&&(b="Alignment Column"),a(this.called_on).find(".logo_xaxis").remove(),a(this.called_on).prepend('<div class="logo_xaxis" class="centered" style="margin-left:40px"><p class="xaxis_text" style="width:10em;margin:1em auto">'+b+"</p></div>")},this.render_y_axis_label=function(){a(this.dom_element).parent().before('<canvas class="logo_yaxis" height="300" width="55"></canvas>');var c=a(this.called_on).find(".logo_yaxis"),d=(Math.abs(this.data.max_height),isNaN(this.data.min_height_obs)?0:parseInt(this.data.min_height_obs,10),null),e="Information Content (bits)";b()||(c[0]=G_vmlCanvasManager.initElement(c[0])),d=c[0].getContext("2d"),d.beginPath(),d.moveTo(55,1),d.lineTo(40,1),d.moveTo(55,this.info_content_height),d.lineTo(40,this.info_content_height),d.moveTo(55,this.info_content_height/2),d.lineTo(40,this.info_content_height/2),d.lineWidth=1,d.strokeStyle="#666666",d.stroke(),d.fillStyle="#666666",d.textAlign="right",d.font="bold 10px Arial",d.textBaseline="top",d.fillText(parseFloat(this.data.max_height).toFixed(1),38,0),d.textBaseline="middle",d.fillText(parseFloat(this.data.max_height/2).toFixed(1),38,this.info_content_height/2),d.fillText("0",38,this.info_content_height),"score"===this.data.height_calc&&(e="Score (bits)"),d.save(),d.translate(5,this.height/2-20),d.rotate(-Math.PI/2),d.textAlign="center",d.font="normal 12px Arial",d.fillText(e,1,0),d.restore(),d.fillText("occupancy",55,this.info_content_height+7),this.show_inserts&&(d.fillText("ins. prob.",50,280),d.fillText("ins. len.",46,296))},this.render_x_axis_label(),this.render_y_axis_label(),this.render_with_text=function(a,c,d,e){{var f=0,i=a,m=null,n=0,o=Math.abs(this.data.max_height),p=isNaN(this.data.min_height_obs)?0:parseInt(this.data.min_height_obs,10),q=o+Math.abs(p),r=Math.round(100*Math.abs(this.data.max_height)/q),s=Math.round(this.info_content_height*r/100),t=this.info_content_height-s;s/this.info_content_height,t/this.info_content_height}for(c+3<=this.end&&(c+=3),n=a;c>=n;n++){if(this.data.mmline&&1===this.data.mmline[n-1])this.contexts[d].fillStyle="#cccccc",this.contexts[d].fillRect(f,10,this.zoomed_column,this.height-40);else{var u=this.data.height_arr[n-1],v=[];if(u){var w=0,x=u.length,y=0,z=null;for(y=0;x>y;y++){var A=u[y],B=A.split(":",2),C=f+this.zoomed_column/2,D=null;if(B[1]>.01){D=parseFloat(B[1])/this.data.max_height;var E=this.info_content_height-2-w,F=(this.info_content_height-2)*D;b()||(E+=F*(D/2)),v[y]=[F,this.zoomed_column,C,E],w+=F}}for(y=x;y>=0;y--)v[y]&&this.letters[u[y][0]]&&(z="consensus"===this.colorscheme?this.cmap[n-1][u[y][0]]||"#7a7a7a":null,this.letters[u[y][0]].draw(this.contexts[d],v[y][0],v[y][1],v[y][2],v[y][3],z))}}m=this.display_ali_map?this.data.ali_map[n-1]:i,this.zoom<.7?n%5===0&&this.draw_column_divider({context_num:d,x:f,fontsize:10,column_num:m,ralign:!0}):this.draw_column_divider({context_num:d,x:f,fontsize:e,column_num:m}),l(this.contexts[d],f,this.height,this.zoomed_column,this.data.delete_probs[n-1],e,this.show_inserts),h(this.contexts[d],f,this.height-15,5),this.show_inserts&&(j(this.contexts[d],f,this.height,this.zoomed_column,this.data.insert_probs[n-1],e),k(this.contexts[d],f,this.height-5,this.zoomed_column,this.data.insert_lengths[n-1],e),h(this.contexts[d],f,this.height-45,5),h(this.contexts[d],f,this.height-30,5)),f+=this.zoomed_column,i++}this.show_inserts&&(g(this.contexts[d],this.height-30,this.total_width),g(this.contexts[d],this.height-45,this.total_width)),g(this.contexts[d],this.height-15,this.total_width),g(this.contexts[d],0,this.total_width)},this.draw_column_divider=function(a){var b=a.ralign?a.x+this.zoomed_column:a.x,c=a.ralign?a.x+2:a.x;h(this.contexts[a.context_num],b,this.height-30,-30-this.height,"#dddddd"),h(this.contexts[a.context_num],b,0,5),m(this.contexts[a.context_num],c,10,this.zoomed_column,a.column_num,a.fontsize,a.ralign)},this.render_with_rects=function(a,b,c,d){var e=0,i=a,j=null,k=0,l=Math.abs(this.data.max_height),n=Math.abs(this.data.min_height_obs),o=l+n,p=Math.round(100*Math.abs(this.data.max_height)/o),q=Math.round(this.info_content_height*p/100),r=(this.info_content_height-q,10);for(k=a;b>=k;k++){if(this.data.mmline&&1===this.data.mmline[k-1])this.contexts[c].fillStyle="#cccccc",this.contexts[c].fillRect(e,10,this.zoomed_column,this.height-40);else{var s=this.data.height_arr[k-1],t=0,u=s.length,v=0;for(v=0;u>v;v++){var w=s[v],x=w.split(":",2);if(x[1]>.01){var y=parseFloat(x[1])/this.data.max_height,z=e,A=(this.info_content_height-2)*y,B=this.info_content_height-2-t-A,C=null;C="consensus"===this.colorscheme?this.cmap[k-1][x[0]]||"#7a7a7a":this.colors[x[0]],d?(this.contexts[c].strokeStyle=C,this.contexts[c].strokeRect(z,B,this.zoomed_column,A)):(this.contexts[c].fillStyle=C,this.contexts[c].fillRect(z,B,this.zoomed_column,A)),t+=A}}}this.zoom<.2?r=20:this.zoom<.3&&(r=10),k%r===0&&(h(this.contexts[c],e+this.zoomed_column,this.height-30,parseFloat(this.height),"#dddddd"),h(this.contexts[c],e+this.zoomed_column,0,5),j=this.display_ali_map?this.data.ali_map[k-1]:i,m(this.contexts[c],e-2,10,this.zoomed_column,j,10,!0)),f(this.contexts[c],e,this.height-42,this.zoomed_column,this.data.insert_probs[k-1],this.data.insert_lengths[k-1],this.data.delete_probs[k-1],this.show_inserts),this.show_inserts?g(this.contexts[c],this.height-45,this.total_width):g(this.contexts[c],this.height-15,this.total_width),g(this.contexts[c],0,this.total_width),e+=this.zoomed_column,i++}},this.toggle_colorscheme=function(a){var b=this.current_column();this.colorscheme=a?"default"===a?"default":"consensus":"default"===this.colorscheme?"consensus":"default",this.rendered=[],this.scrollme.reflow(),this.scrollToColumn(b+1),this.scrollToColumn(b)},this.toggle_scale=function(b){var c=this.current_column();this.data.max_height=b?"obs"===b?this.data.max_height_obs:this.data.max_height_theory:this.data.max_height===this.data.max_height_obs?this.data.max_height_theory:this.data.max_height_obs,this.rendered=[],a(this.called_on).find(".logo_yaxis").remove(),this.render_y_axis_label(),this.scrollme.reflow(),this.scrollToColumn(c+1),this.scrollToColumn(c)},this.toggle_ali_map=function(a){var b=this.current_column();this.display_ali_map=a?"model"===a?0:1:1===this.display_ali_map?0:1,this.render_x_axis_label(),this.rendered=[],this.scrollme.reflow(),this.scrollToColumn(b+1),this.scrollToColumn(b)},this.current_column=function(){var b=this.scrollme.scroller.getValues().left,c=this.column_width*this.zoom,d=b/c,e=a(this.called_on).find(".logo_container").width()/c/2,f=Math.ceil(d+e);return f},this.change_zoom=function(b){var c=.3,d=null;if(b.target?c=b.target:b.distance&&(c=(parseFloat(this.zoom)-parseFloat(b.distance)).toFixed(1),"+"===b.direction&&(c=(parseFloat(this.zoom)+parseFloat(b.distance)).toFixed(1))),c>1?c=1:.1>c&&(c=.1),d=a(this.called_on).find(".logo_graphic").width()*c/this.zoom,d>a(this.called_on).find(".logo_container").width())if(b.column){this.zoom=c,this.render({zoom:this.zoom}),this.scrollme.reflow();var e=this.coordinatesFromColumn(b.column);this.scrollme.scroller.scrollTo(e-b.offset)}else{var f=this.current_column();this.zoom=c,this.render({zoom:this.zoom}),this.scrollme.reflow(),this.scrollToColumn(f)}return this.zoom},this.columnFromCoordinates=function(a){var b=Math.ceil(a/(this.column_width*this.zoom));return b},this.coordinatesFromColumn=function(a){var b=a-1,c=b*this.column_width*this.zoom+this.column_width*this.zoom/2;return c},this.scrollToColumn=function(b,c){var d=a(this.called_on).find(".logo_container").width()/2,e=this.coordinatesFromColumn(b);this.scrollme.scroller.scrollTo(e-d,0,c)}}var f=null;a.fn.hmm_logo=function(c){var d=null,f=a('<div class="logo_graphic">');if(b()){if(c=c||{},a(this).append(a('<div class="logo_container">').append(f).append('<div class="logo_divider">')),c.data=a(this).data("logo"),null===c.data)return;c.dom_element=f,c.called_on=this;var g=c.zoom||.4,h=a('<form class="logo_form"><fieldset><label for="position">Column number</label><input type="text" name="position" class="logo_position"></input><button class="button logo_change">Go</button></fieldset></form>'),i=a('<div class="logo_controls">'),j=a('<div class="logo_settings">');if(j.append('<span class="close">x</span>'),d=new e(c),d.render(c),d.zoom_enabled&&i.append('<button class="logo_zoomout button">-</button><button class="logo_zoomin button">+</button>'),d.scale_height_enabled&&d.data.max_height_obs<d.data.max_height_theory){var k="",l="",m="",n="";d.data.max_height_obs===d.data.max_height?k="checked":l="checked",c.help&&(n='<a class="help" href="/help#scale_obs" title="Set the y-axis maximum to the maximum observed height."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>',m='<a class="help" href="/help#scale_theory" title="Set the y-axis maximum to the theoretical maximum height"><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>');var o='<fieldset><legend>Scale</legend><label><input type="radio" name="scale" class="logo_scale" value="obs" '+k+"/>Maximum Observed "+n+'</label></br><label><input type="radio" name="scale" class="logo_scale" value="theory" '+l+"/>Maximum Theoretical "+m+"</label></fieldset>";j.append(o)}if("score"!==d.data.height_calc&&"aa"===d.data.alphabet&&d.data.probs_arr){var p=null,q=null,r="",s="";"default"===d.colorscheme?p="checked":q="checked",c.help&&(r='<a class="help" href="/help#colors_default" title="Each letter receives its own color."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>',s='<a class="help" href="/help#colors_consensus" title="Letters are colored as in Clustalx and Jalview, with colors depending on composition of the column."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>');var t='<fieldset><legend>Color Scheme</legend><label><input type="radio" name="color" class="logo_color" value="default" '+p+"/>Default "+r+'</label></br><label><input type="radio" name="color" class="logo_color" value="consensus" '+q+"/>Consensus Colors "+s+"</label></fieldset>";j.append(t)}if(d.data.ali_map){var u=null,v=null,w="",x="";0===d.display_ali_map?u="checked":v="checked",c.help&&(w='<a class="help" href="/help#coords_model" title="The coordinates along the top of the plot show the model position."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>',x='<a class="help" href="/help#coords_ali" title="The coordinates along the top of the plot show the column in the alignment associated with the model"><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>');var y='<fieldset><legend>Coordinates</legend><label><input type="radio" name="coords" class="logo_ali_map" value="model" '+u+"/>Model "+w+'</label></br><label><input type="radio" name="coords" class="logo_ali_map" value="alignment" '+v+"/>Alignment "+x+"</label></fieldset>";j.append(y)}j.children().length>0&&(i.append('<button class="logo_settings_switch button">Settings</button>'),i.append(j)),h.append(i),a(this).append(h),a(this).find(".logo_settings_switch, .logo_settings .close").bind("click",function(b){b.preventDefault(),a(".logo_settings").toggle()}),a(this).find(".logo_reset").bind("click",function(a){a.preventDefault();var b=d;b.change_zoom({target:b.default_zoom})}),a(this).find(".logo_change").bind("click",function(a){a.preventDefault()}),a(this).find(".logo_zoomin").bind("click",function(a){a.preventDefault();var b=d;b.change_zoom({distance:.1,direction:"+"})}),a(this).find(".logo_zoomout").bind("click",function(a){a.preventDefault();var b=d;b.change_zoom({distance:.1,direction:"-"})}),a(this).find(".logo_scale").bind("change",function(){var a=d;a.toggle_scale(this.value)}),a(this).find(".logo_color").bind("change",function(){var a=d;a.toggle_colorscheme(this.value)}),a(this).find(".logo_ali_map").bind("change",function(){var a=d;a.toggle_ali_map(this.value)}),a(this).find(".logo_position").bind("change",function(){var a=d;this.value.match(/^\d+$/m)&&a.scrollToColumn(this.value,1)}),f.bind("dblclick",function(b){var c=d,e=a(this).offset(),f=parseInt(b.pageX-e.left,10),g=b.pageX-a(this).parent().offset().left,h=c.columnFromCoordinates(f),i=c.zoom;c.change_zoom(1>i?{target:1,offset:g,column:h}:{target:.3,offset:g,column:h})}),c.column_info&&f.bind("click",function(b){var e=d,f=a('<table class="logo_col_info"></table>'),g="<tr>",h="",i=a(this).offset(),j=parseInt(b.pageX-i.left,10),k=(b.pageX-a(this).parent().offset().left,e.columnFromCoordinates(j)),l=[],m=0,n=0,o=0,p="Probability";for(d.data.height_calc&&"score"===d.data.height_calc?(p="Score",l=d.data.height_arr[k-1].slice(0).reverse()):l=d.data.probs_arr[k-1].slice(0).reverse(),m=Math.ceil(l.length/5),n=0;m>n;n++)g+=m>1&&m-1>n?'<th>Residue</th><th class="odd">'+p+"</th>":"<th>Residue</th><th>"+p+"</th>";for(g+="</tr>",f.append(a(g)),n=0;5>n;n++){for(h+="<tr>",o=n;l[o];){var q=l[o].split(":",2),r="";"default"===d.colorscheme&&(r=d.alphabet+"_"+q[0]),h+=m>1&&15>o?'<td class="'+r+'"><div></div>'+q[0]+'</td><td class="odd">'+q[1]+"</td>":'<td class="'+r+'"><div></div>'+q[0]+"</td><td>"+q[1]+"</td>",o+=5}h+="</tr>"}f.append(a(h)),a(c.column_info).empty().append(a("<p> Column:"+k+"</p><div><p>Occupancy: "+d.data.delete_probs[k-1]+"</p><p>Insert Probability: "+d.data.insert_probs[k-1]+"</p><p>Insert Length: "+d.data.insert_lengths[k-1]+"</p></div>")).append(f).show()}),a(document).bind(this.attr("id")+".scrolledTo",function(a,b){var c=d;c.render({target:b})}),a(document).keydown(function(a){a.ctrlKey||((61===a.which||107===a.which)&&(g+=.1,d.change_zoom({distance:.1,direction:"+"})),(109===a.which||0===a.which)&&(g-=.1,d.change_zoom({distance:.1,direction:"-"})))})}else a("#logo").replaceWith(a("#no_canvas").html());return d}}(jQuery),/** @license
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 *
 * Inspired by: https://github.com/inexorabletash/raf-shim/blob/master/raf.js
 */
function(a){if(!a.requestAnimationFrame){var b=Date.now||function(){return+new Date},c=Object.keys||function(a){var b={};for(var c in a)b[c]=!0;return b},d=Object.empty||function(a){for(var b in a)return!1;return!0},e="RequestAnimationFrame",f=function(){for(var b="webkit,moz,o,ms".split(","),c=0;4>c;c++)if(null!=a[b[c]+e])return b[c]}();if(f)return a.requestAnimationFrame=a[f+e],void(a.cancelRequestAnimationFrame=a[f+"Cancel"+e]);var g=60,h={},i=1,j=null;a.requestAnimationFrame=function(a){var d=i++;return h[d]=a,null===j&&(j=setTimeout(function(){var a=b(),d=h,e=c(d);h={},j=null;for(var f=0,g=e.length;g>f;f++)d[e[f]](a)},1e3/g)),d},a.cancelRequestAnimationFrame=function(a){delete h[a],d(h)&&(clearTimeout(j),j=null)}}}(this),function(a){var b=Date.now||function(){return+new Date},c=60,d=1e3,e={},f=1;a.core?core.effect||(core.effect={}):a.core={effect:{}},core.effect.Animate={stop:function(a){var b=null!=e[a];return b&&(e[a]=null),b},isRunning:function(a){return null!=e[a]},start:function(a,g,h,i,j,k){var l=b(),m=l,n=0,o=0,p=f++;if(k||(k=document.body),p%20===0){var q={};for(var r in e)q[r]=!0;e=q}var s=function(f){var q=f!==!0,r=b();if(!e[p]||g&&!g(p))return e[p]=null,void(h&&h(c-o/((r-l)/d),p,!1));if(q)for(var t=Math.round((r-m)/(d/c))-1,u=0;u<Math.min(t,4);u++)s(!0),o++;i&&(n=(r-l)/i,n>1&&(n=1));var v=j?j(n):n;a(v,r,q)!==!1&&1!==n||!q?q&&(m=r,requestAnimationFrame(s,k)):(e[p]=null,h&&h(c-o/((r-l)/d),p,1===n||null==i))};return e[p]=!0,requestAnimationFrame(s,k),p}}}(this);var EasyScroller=function(a,b){this.content=a,this.container=a.parentNode,this.options=b||{};var c=this;this.scroller=new Scroller(function(a,b,d){c.render(a,b,d)},b),this.bindEvents(),this.content.style[EasyScroller.vendorPrefix+"TransformOrigin"]="left top",this.reflow()};EasyScroller.prototype.render=function(){var a,b=document.documentElement.style;window.opera&&"[object Opera]"===Object.prototype.toString.call(opera)?a="presto":"MozAppearance"in b?a="gecko":"WebkitAppearance"in b?a="webkit":"string"==typeof navigator.cpuClass&&(a="trident");var c,d=EasyScroller.vendorPrefix={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[a],e=document.createElement("div"),f=d+"Perspective",g=d+"Transform";return e.style[f]!==c?function(a,b,c){this.content.style[g]="translate3d("+-a+"px,"+-b+"px,0) scale("+c+")"}:e.style[g]!==c?function(a,b,c){this.content.style[g]="translate("+-a+"px,"+-b+"px) scale("+c+")"}:function(a,b,c){this.content.style.marginLeft=a?-a/c+"px":"",this.content.style.marginTop=b?-b/c+"px":"",this.content.style.zoom=c||""}}(),EasyScroller.prototype.reflow=function(){this.scroller.setDimensions(this.container.clientWidth,this.container.clientHeight,this.content.offsetWidth,this.content.offsetHeight);var a=this.container.getBoundingClientRect();this.scroller.setPosition(a.left+this.container.clientLeft,a.top+this.container.clientTop)},EasyScroller.prototype.bindEvents=function(){var a=this;if($(window).bind("resize",function(){a.reflow()}),$("#modelTab").bind("click",function(){a.reflow()}),"ontouchstart"in window)this.container.addEventListener("touchstart",function(b){b.touches[0]&&b.touches[0].target&&b.touches[0].target.tagName.match(/input|textarea|select/i)||(a.scroller.doTouchStart(b.touches,(new Date).getTime()),b.preventDefault())},!1),document.addEventListener("touchmove",function(b){a.scroller.doTouchMove(b.touches,(new Date).getTime(),b.scale)},!1),document.addEventListener("touchend",function(){a.scroller.doTouchEnd((new Date).getTime())},!1),document.addEventListener("touchcancel",function(){a.scroller.doTouchEnd((new Date).getTime())},!1);else{var b=!1;$(this.container).bind("mousedown",function(c){c.target.tagName.match(/input|textarea|select/i)||(a.scroller.doTouchStart([{pageX:c.pageX,pageY:c.pageY}],(new Date).getTime()),b=!0,c.preventDefault())}),$(document).bind("mousemove",function(c){b&&(a.scroller.doTouchMove([{pageX:c.pageX,pageY:c.pageY}],(new Date).getTime()),b=!0)}),$(document).bind("mouseup",function(){b&&(a.scroller.doTouchEnd((new Date).getTime()),b=!1)}),$(this.container).bind("mousewheel",function(b){a.options.zooming&&(a.scroller.doMouseZoom(b.wheelDelta,(new Date).getTime(),b.pageX,b.pageY),b.preventDefault())})}};var Scroller;!function(){Scroller=function(a,b){this.__callback=a,this.options={scrollingX:!0,scrollingY:!0,animating:!0,bouncing:!0,locking:!0,paging:!1,snapping:!1,zooming:!1,minZoom:.5,maxZoom:3,eventTarget:null};for(var c in b)this.options[c]=b[c]};var a=function(a){return Math.pow(a-1,3)+1},b=function(a){return(a/=.5)<1?.5*Math.pow(a,3):.5*(Math.pow(a-2,3)+2)},c={__isSingleTouch:!1,__isTracking:!1,__isGesturing:!1,__isDragging:!1,__isDecelerating:!1,__isAnimating:!1,__clientLeft:0,__clientTop:0,__clientWidth:0,__clientHeight:0,__contentWidth:0,__contentHeight:0,__snapWidth:100,__snapHeight:100,__refreshHeight:null,__refreshActive:!1,__refreshActivate:null,__refreshDeactivate:null,__refreshStart:null,__zoomLevel:1,__scrollLeft:0,__scrollTop:0,__maxScrollLeft:0,__maxScrollTop:0,__scheduledLeft:0,__scheduledTop:0,__scheduledZoom:0,__lastTouchLeft:null,__lastTouchTop:null,__lastTouchMove:null,__positions:null,__minDecelerationScrollLeft:null,__minDecelerationScrollTop:null,__maxDecelerationScrollLeft:null,__maxDecelerationScrollTop:null,__decelerationVelocityX:null,__decelerationVelocityY:null,setDimensions:function(a,b,c,d){var e=this;a&&(e.__clientWidth=a),b&&(e.__clientHeight=b),c&&(e.__contentWidth=c),d&&(e.__contentHeight=d),e.__computeScrollMax(),e.scrollTo(e.__scrollLeft,e.__scrollTop,!0)},setPosition:function(a,b){var c=this;c.__clientLeft=a||0,c.__clientTop=b||0},setSnapSize:function(a,b){var c=this;c.__snapWidth=a,c.__snapHeight=b},activatePullToRefresh:function(a,b,c,d){var e=this;e.__refreshHeight=a,e.__refreshActivate=b,e.__refreshDeactivate=c,e.__refreshStart=d},finishPullToRefresh:function(){var a=this;a.__refreshActive=!1,a.__refreshDeactivate&&a.__refreshDeactivate(),a.scrollTo(a.__scrollLeft,a.__scrollTop,!0)},getValues:function(){var a=this;return{left:a.__scrollLeft,top:a.__scrollTop,zoom:a.__zoomLevel}},getScrollMax:function(){var a=this;return{left:a.__maxScrollLeft,top:a.__maxScrollTop}},zoomTo:function(a,b,c,d){var e=this;if(!e.options.zooming)throw new Error("Zooming is not enabled!");e.__isDecelerating&&(core.effect.Animate.stop(e.__isDecelerating),e.__isDecelerating=!1);var f=e.__zoomLevel;null==c&&(c=e.__clientWidth/2),null==d&&(d=e.__clientHeight/2),a=Math.max(Math.min(a,e.options.maxZoom),e.options.minZoom),e.__computeScrollMax(a);var g=(c+e.__scrollLeft)*a/f-c,h=(d+e.__scrollTop)*a/f-d;g>e.__maxScrollLeft?g=e.__maxScrollLeft:0>g&&(g=0),h>e.__maxScrollTop?h=e.__maxScrollTop:0>h&&(h=0),e.__publish(g,h,a,b)},zoomBy:function(a,b,c,d){var e=this;e.zoomTo(e.__zoomLevel*a,b,c,d)},scrollTo:function(a,b,c,d){$(document).trigger(this.options.eventTarget.attr("id")+".scrolledTo",[a,b,d]);var e=this;if(e.__isDecelerating&&(core.effect.Animate.stop(e.__isDecelerating),e.__isDecelerating=!1),null!=d&&d!==e.__zoomLevel){if(!e.options.zooming)throw new Error("Zooming is not enabled!");a*=d,b*=d,e.__computeScrollMax(d)}else d=e.__zoomLevel;e.options.scrollingX?e.options.paging?a=Math.round(a/e.__clientWidth)*e.__clientWidth:e.options.snapping&&(a=Math.round(a/e.__snapWidth)*e.__snapWidth):a=e.__scrollLeft,e.options.scrollingY?e.options.paging?b=Math.round(b/e.__clientHeight)*e.__clientHeight:e.options.snapping&&(b=Math.round(b/e.__snapHeight)*e.__snapHeight):b=e.__scrollTop,a=Math.max(Math.min(e.__maxScrollLeft,a),0),b=Math.max(Math.min(e.__maxScrollTop,b),0),a===e.__scrollLeft&&b===e.__scrollTop&&(c=!1),e.__publish(a,b,d,c)},scrollBy:function(a,b,c){var d=this,e=d.__isAnimating?d.__scheduledLeft:d.__scrollLeft,f=d.__isAnimating?d.__scheduledTop:d.__scrollTop;d.scrollTo(e+(a||0),f+(b||0),c)},doMouseZoom:function(a,b,c,d){var e=this,f=a>0?.97:1.03;return e.zoomTo(e.__zoomLevel*f,!1,c-e.__clientLeft,d-e.__clientTop)},doTouchStart:function(a,b){if(null==a.length)throw new Error("Invalid touch list: "+a);if(b instanceof Date&&(b=b.valueOf()),"number"!=typeof b)throw new Error("Invalid timestamp value: "+b);var c=this;c.__isDecelerating&&(core.effect.Animate.stop(c.__isDecelerating),c.__isDecelerating=!1),c.__isAnimating&&(core.effect.Animate.stop(c.__isAnimating),c.__isAnimating=!1);var d,e,f=1===a.length;f?(d=a[0].pageX,e=a[0].pageY):(d=Math.abs(a[0].pageX+a[1].pageX)/2,e=Math.abs(a[0].pageY+a[1].pageY)/2),c.__initialTouchLeft=d,c.__initialTouchTop=e,c.__zoomLevelStart=c.__zoomLevel,c.__lastTouchLeft=d,c.__lastTouchTop=e,c.__lastTouchMove=b,c.__lastScale=1,c.__enableScrollX=!f&&c.options.scrollingX,c.__enableScrollY=!f&&c.options.scrollingY,c.__isTracking=!0,c.__isDragging=!f,c.__isSingleTouch=f,c.__positions=[]},doTouchMove:function(a,b,c){if(null==a.length)throw new Error("Invalid touch list: "+a);if(b instanceof Date&&(b=b.valueOf()),"number"!=typeof b)throw new Error("Invalid timestamp value: "+b);var d=this;if(d.__isTracking){var e,f;2===a.length?(e=Math.abs(a[0].pageX+a[1].pageX)/2,f=Math.abs(a[0].pageY+a[1].pageY)/2):(e=a[0].pageX,f=a[0].pageY);var g=d.__positions;if(d.__isDragging){var h=e-d.__lastTouchLeft,i=f-d.__lastTouchTop,j=d.__scrollLeft,k=d.__scrollTop,l=d.__zoomLevel;if(null!=c&&d.options.zooming){var m=l;if(l=l/d.__lastScale*c,l=Math.max(Math.min(l,d.options.maxZoom),d.options.minZoom),m!==l){var n=e-d.__clientLeft,o=f-d.__clientTop;j=(n+j)*l/m-n,k=(o+k)*l/m-o,d.__computeScrollMax(l)}}if(d.__enableScrollX){j-=h;var p=d.__maxScrollLeft;(j>p||0>j)&&(d.options.bouncing?j+=h/2:j=j>p?p:0)}if(d.__enableScrollY){k-=i;var q=d.__maxScrollTop;(k>q||0>k)&&(d.options.bouncing?(k+=i/2,d.__enableScrollX||null==d.__refreshHeight||(!d.__refreshActive&&k<=-d.__refreshHeight?(d.__refreshActive=!0,d.__refreshActivate&&d.__refreshActivate()):d.__refreshActive&&k>-d.__refreshHeight&&(d.__refreshActive=!1,d.__refreshDeactivate&&d.__refreshDeactivate()))):k=k>q?q:0)}g.length>60&&g.splice(0,30),g.push(j,k,b),d.__publish(j,k,l)}else{var r=d.options.locking?3:0,s=5,t=Math.abs(e-d.__initialTouchLeft),u=Math.abs(f-d.__initialTouchTop);d.__enableScrollX=d.options.scrollingX&&t>=r,d.__enableScrollY=d.options.scrollingY&&u>=r,g.push(d.__scrollLeft,d.__scrollTop,b),d.__isDragging=(d.__enableScrollX||d.__enableScrollY)&&(t>=s||u>=s)}d.__lastTouchLeft=e,d.__lastTouchTop=f,d.__lastTouchMove=b,d.__lastScale=c}},doTouchEnd:function(a){if(a instanceof Date&&(a=a.valueOf()),"number"!=typeof a)throw new Error("Invalid timestamp value: "+a);var b=this;if(b.__isTracking){if(b.__isTracking=!1,b.__isDragging&&(b.__isDragging=!1,b.__isSingleTouch&&b.options.animating&&a-b.__lastTouchMove<=100)){for(var c=b.__positions,d=c.length-1,e=d,f=d;f>0&&c[f]>b.__lastTouchMove-100;f-=3)e=f;if(e!==d){var g=c[d]-c[e],h=b.__scrollLeft-c[e-2],i=b.__scrollTop-c[e-1];b.__decelerationVelocityX=h/g*(1e3/60),b.__decelerationVelocityY=i/g*(1e3/60);var j=b.options.paging||b.options.snapping?4:1;(Math.abs(b.__decelerationVelocityX)>j||Math.abs(b.__decelerationVelocityY)>j)&&(b.__refreshActive||b.__startDeceleration(a))}}b.__isDecelerating||(b.__refreshActive&&b.__refreshStart?(b.__publish(b.__scrollLeft,-b.__refreshHeight,b.__zoomLevel,!0),b.__refreshStart&&b.__refreshStart()):(b.scrollTo(b.__scrollLeft,b.__scrollTop,!0,b.__zoomLevel),b.__refreshActive&&(b.__refreshActive=!1,b.__refreshDeactivate&&b.__refreshDeactivate()))),b.__positions.length=0}},__publish:function(c,d,e,f){var g=this,h=g.__isAnimating;if(h&&(core.effect.Animate.stop(h),g.__isAnimating=!1),f&&g.options.animating){g.__scheduledLeft=c,g.__scheduledTop=d,g.__scheduledZoom=e;var i=g.__scrollLeft,j=g.__scrollTop,k=g.__zoomLevel,l=c-i,m=d-j,n=e-k,o=function(a,b,c){c&&(g.__scrollLeft=i+l*a,g.__scrollTop=j+m*a,g.__zoomLevel=k+n*a,g.__callback&&g.__callback(g.__scrollLeft,g.__scrollTop,g.__zoomLevel))},p=function(a){return g.__isAnimating===a},q=function(a,b){b===g.__isAnimating&&(g.__isAnimating=!1),g.options.zooming&&g.__computeScrollMax()};g.__isAnimating=core.effect.Animate.start(o,p,q,250,h?a:b)}else g.__scheduledLeft=g.__scrollLeft=c,g.__scheduledTop=g.__scrollTop=d,g.__scheduledZoom=g.__zoomLevel=e,g.__callback&&g.__callback(c,d,e),g.options.zooming&&g.__computeScrollMax()},__computeScrollMax:function(a){var b=this;null==a&&(a=b.__zoomLevel),b.__maxScrollLeft=Math.max(b.__contentWidth*a-b.__clientWidth,0),b.__maxScrollTop=Math.max(b.__contentHeight*a-b.__clientHeight,0)},__startDeceleration:function(){var a=this;if(a.options.paging){var b=Math.max(Math.min(a.__scrollLeft,a.__maxScrollLeft),0),c=Math.max(Math.min(a.__scrollTop,a.__maxScrollTop),0),d=a.__clientWidth,e=a.__clientHeight;a.__minDecelerationScrollLeft=Math.floor(b/d)*d,a.__minDecelerationScrollTop=Math.floor(c/e)*e,a.__maxDecelerationScrollLeft=Math.ceil(b/d)*d,a.__maxDecelerationScrollTop=Math.ceil(c/e)*e}else a.__minDecelerationScrollLeft=0,a.__minDecelerationScrollTop=0,a.__maxDecelerationScrollLeft=a.__maxScrollLeft,a.__maxDecelerationScrollTop=a.__maxScrollTop;var f=function(b,c,d){a.__stepThroughDeceleration(d)},g=a.options.snapping?4:.1,h=function(){return Math.abs(a.__decelerationVelocityX)>=g||Math.abs(a.__decelerationVelocityY)>=g},i=function(){a.__isDecelerating=!1,a.scrollTo(a.__scrollLeft,a.__scrollTop,a.options.snapping)};a.__isDecelerating=core.effect.Animate.start(f,h,i)},__stepThroughDeceleration:function(a){var b=this,c=b.__scrollLeft+b.__decelerationVelocityX,d=b.__scrollTop+b.__decelerationVelocityY;if(!b.options.bouncing){var e=Math.max(Math.min(b.__maxScrollLeft,c),0);e!==c&&(c=e,b.__decelerationVelocityX=0);var f=Math.max(Math.min(b.__maxScrollTop,d),0);f!==d&&(d=f,b.__decelerationVelocityY=0)}if(a?b.__publish(c,d,b.__zoomLevel):(b.__scrollLeft=c,b.__scrollTop=d),!b.options.paging){var g=.95;b.__decelerationVelocityX*=g,b.__decelerationVelocityY*=g}if(b.options.bouncing){var h=0,i=0,j=.03,k=.08;c<b.__minDecelerationScrollLeft?h=b.__minDecelerationScrollLeft-c:c>b.__maxDecelerationScrollLeft&&(h=b.__maxDecelerationScrollLeft-c),d<b.__minDecelerationScrollTop?i=b.__minDecelerationScrollTop-d:d>b.__maxDecelerationScrollTop&&(i=b.__maxDecelerationScrollTop-d),0!==h&&(h*b.__decelerationVelocityX<=0?b.__decelerationVelocityX+=h*j:b.__decelerationVelocityX=h*k),0!==i&&(i*b.__decelerationVelocityY<=0?b.__decelerationVelocityY+=i*j:b.__decelerationVelocityY=i*k)}}};for(var d in c)Scroller.prototype[d]=c[d]}();/*
 * qTip2 - Pretty powerful tooltips - v2.1.1
 * http://qtip2.com
 *
 * Copyright (c) 2013 Craig Michael Thompson
 * Released under the MIT, GPL licenses
 * http://jquery.org/license
 *
 * Date: Mon Sep 23 2013 07:23 UTC+0000
 * Plugins: tips
 * Styles: css3
 */
/*global window: false, jQuery: false, console: false, define: false */

/* Cache window, document, undefined */
(function( window, document, undefined ) {

// Uses AMD or browser globals to create a jQuery plugin.
(function( factory ) {
	"use strict";
	if(typeof define === 'function' && define.amd) {
		define(['jquery', 'imagesloaded'], factory);
	}
	else if(jQuery && !jQuery.fn.qtip) {
		factory(jQuery);
	}
}
(function($) {
	/* This currently causes issues with Safari 6, so for it's disabled */
	//"use strict"; // (Dis)able ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

;// Munge the primitives - Paul Irish tip
var TRUE = true,
FALSE = false,
NULL = null,

// Common variables
X = 'x', Y = 'y',
WIDTH = 'width',
HEIGHT = 'height',

// Positioning sides
TOP = 'top',
LEFT = 'left',
BOTTOM = 'bottom',
RIGHT = 'right',
CENTER = 'center',

// Position adjustment types
FLIP = 'flip',
FLIPINVERT = 'flipinvert',
SHIFT = 'shift',

// Shortcut vars
QTIP, PROTOTYPE, CORNER, CHECKS,
PLUGINS = {},
NAMESPACE = 'qtip',
ATTR_HAS = 'data-hasqtip',
ATTR_ID = 'data-qtip-id',
WIDGET = ['ui-widget', 'ui-tooltip'],
SELECTOR = '.'+NAMESPACE,
INACTIVE_EVENTS = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '),

CLASS_FIXED = NAMESPACE+'-fixed',
CLASS_DEFAULT = NAMESPACE + '-default',
CLASS_FOCUS = NAMESPACE + '-focus',
CLASS_HOVER = NAMESPACE + '-hover',
CLASS_DISABLED = NAMESPACE+'-disabled',

replaceSuffix = '_replacedByqTip',
oldtitle = 'oldtitle',
trackingBound;

// Browser detection
BROWSER = {
	/*
	 * IE version detection
	 *
	 * Adapted from: http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
	 * Credit to James Padolsey for the original implemntation!
	 */
	ie: (function(){
		var v = 3, div = document.createElement('div');
		while ((div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->')) {
			if(!div.getElementsByTagName('i')[0]) { break; }
		}
		return v > 4 ? v : NaN;
	}()),
 
	/*
	 * iOS version detection
	 */
	iOS: parseFloat( 
		('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
		.replace('undefined', '3_2').replace('_', '.').replace('_', '')
	) || FALSE
};

;function QTip(target, options, id, attr) {
	// Elements and ID
	this.id = id;
	this.target = target;
	this.tooltip = NULL;
	this.elements = elements = { target: target };

	// Internal constructs
	this._id = NAMESPACE + '-' + id;
	this.timers = { img: {} };
	this.options = options;
	this.plugins = {};

	// Cache object
	this.cache = cache = {
		event: {},
		target: $(),
		disabled: FALSE,
		attr: attr,
		onTooltip: FALSE,
		lastClass: ''
	};

	// Set the initial flags
	this.rendered = this.destroyed = this.disabled = this.waiting = 
		this.hiddenDuringWait = this.positioning = this.triggering = FALSE;
}
PROTOTYPE = QTip.prototype;

PROTOTYPE.render = function(show) {
	if(this.rendered || this.destroyed) { return this; } // If tooltip has already been rendered, exit

	var self = this,
		options = this.options,
		cache = this.cache,
		elements = this.elements,
		text = options.content.text,
		title = options.content.title,
		button = options.content.button,
		posOptions = options.position,
		namespace = '.'+this._id+' ',
		deferreds = [];

	// Add ARIA attributes to target
	$.attr(this.target[0], 'aria-describedby', this._id);

	// Create tooltip element
	this.tooltip = elements.tooltip = tooltip = $('<div/>', {
		'id': this._id,
		'class': [ NAMESPACE, CLASS_DEFAULT, options.style.classes, NAMESPACE + '-pos-' + options.position.my.abbrev() ].join(' '),
		'width': options.style.width || '',
		'height': options.style.height || '',
		'tracking': posOptions.target === 'mouse' && posOptions.adjust.mouse,

		/* ARIA specific attributes */
		'role': 'alert',
		'aria-live': 'polite',
		'aria-atomic': FALSE,
		'aria-describedby': this._id + '-content',
		'aria-hidden': TRUE
	})
	.toggleClass(CLASS_DISABLED, this.disabled)
	.attr(ATTR_ID, this.id)
	.data(NAMESPACE, this)
	.appendTo(posOptions.container)
	.append(
		// Create content element
		elements.content = $('<div />', {
			'class': NAMESPACE + '-content',
			'id': this._id + '-content',
			'aria-atomic': TRUE
		})
	);

	// Set rendered flag and prevent redundant reposition calls for now
	this.rendered = -1;
	this.positioning = TRUE;

	// Create title...
	if(title) {
		this._createTitle();

		// Update title only if its not a callback (called in toggle if so)
		if(!$.isFunction(title)) {
			deferreds.push( this._updateTitle(title, FALSE) );
		}
	}

	// Create button
	if(button) { this._createButton(); }

	// Set proper rendered flag and update content if not a callback function (called in toggle)
	if(!$.isFunction(text)) {
		deferreds.push( this._updateContent(text, FALSE) );
	}
	this.rendered = TRUE;

	// Setup widget classes
	this._setWidget();

	// Assign passed event callbacks (before plugins!)
	$.each(options.events, function(name, callback) {
		$.isFunction(callback) && tooltip.bind(
			(name === 'toggle' ? ['tooltipshow','tooltiphide'] : ['tooltip'+name])
				.join(namespace)+namespace, callback
		);
	});

	// Initialize 'render' plugins
	$.each(PLUGINS, function(name) {
		var instance;
		if(this.initialize === 'render' && (instance = this(self))) {
			self.plugins[name] = instance;
		}
	});

	// Assign events
	this._assignEvents();

	// When deferreds have completed
	$.when.apply($, deferreds).then(function() {
		// tooltiprender event
		self._trigger('render');

		// Reset flags
		self.positioning = FALSE;

		// Show tooltip if not hidden during wait period
		if(!self.hiddenDuringWait && (options.show.ready || show)) {
			self.toggle(TRUE, cache.event, FALSE);
		}
		self.hiddenDuringWait = FALSE;
	});

	// Expose API
	QTIP.api[this.id] = this;

	return this;
};

PROTOTYPE.destroy = function(immediate) {
	// Set flag the signify destroy is taking place to plugins
	// and ensure it only gets destroyed once!
	if(this.destroyed) { return this.target; }

	function process() {
		if(this.destroyed) { return; }
		this.destroyed = TRUE;
		
		var target = this.target,
			title = target.attr(oldtitle);

		// Destroy tooltip if rendered
		if(this.rendered) {
			this.tooltip.stop(1,0).find('*').remove().end().remove();
		}

		// Destroy all plugins
		$.each(this.plugins, function(name) {
			this.destroy && this.destroy();
		});

		// Clear timers and remove bound events
		clearTimeout(this.timers.show);
		clearTimeout(this.timers.hide);
		this._unassignEvents();

		// Remove api object and ARIA attributes
		target.removeData(NAMESPACE).removeAttr(ATTR_ID)
			.removeAttr('aria-describedby');

		// Reset old title attribute if removed
		if(this.options.suppress && title) {
			target.attr('title', title).removeAttr(oldtitle);
		}

		// Remove qTip events associated with this API
		this._unbind(target);

		// Remove ID from used id objects, and delete object references
		// for better garbage collection and leak protection
		this.options = this.elements = this.cache = this.timers = 
			this.plugins = this.mouse = NULL;

		// Delete epoxsed API object
		delete QTIP.api[this.id];
	}

	// If an immediate destory is needed
	if(immediate !== TRUE && this.rendered) {
		tooltip.one('tooltiphidden', $.proxy(process, this));
		!this.triggering && this.hide();
	}

	// If we're not in the process of hiding... process
	else { process.call(this); }

	return this.target;
};

;function invalidOpt(a) {
	return a === NULL || $.type(a) !== 'object';
}

function invalidContent(c) {
	return !( $.isFunction(c) || (c && c.attr) || c.length || ($.type(c) === 'object' && (c.jquery || c.then) ));
}

// Option object sanitizer
function sanitizeOptions(opts) {
	var content, text, ajax, once;

	if(invalidOpt(opts)) { return FALSE; }

	if(invalidOpt(opts.metadata)) {
		opts.metadata = { type: opts.metadata };
	}

	if('content' in opts) {
		content = opts.content;

		if(invalidOpt(content) || content.jquery || content.done) {
			content = opts.content = {
				text: (text = invalidContent(content) ? FALSE : content)
			};
		}
		else { text = content.text; }

		// DEPRECATED - Old content.ajax plugin functionality
		// Converts it into the proper Deferred syntax
		if('ajax' in content) {
			ajax = content.ajax;
			once = ajax && ajax.once !== FALSE;
			delete content.ajax;

			content.text = function(event, api) {
				var loading = text || $(this).attr(api.options.content.attr) || 'Loading...',

				deferred = $.ajax(
					$.extend({}, ajax, { context: api })
				)
				.then(ajax.success, NULL, ajax.error)
				.then(function(content) {
					if(content && once) { api.set('content.text', content); }
					return content;
				},
				function(xhr, status, error) {
					if(api.destroyed || xhr.status === 0) { return; }
					api.set('content.text', status + ': ' + error);
				});

				return !once ? (api.set('content.text', loading), deferred) : loading;
			};
		}

		if('title' in content) {
			if(!invalidOpt(content.title)) {
				content.button = content.title.button;
				content.title = content.title.text;
			}

			if(invalidContent(content.title || FALSE)) {
				content.title = FALSE;
			}
		}
	}

	if('position' in opts && invalidOpt(opts.position)) {
		opts.position = { my: opts.position, at: opts.position };
	}

	if('show' in opts && invalidOpt(opts.show)) {
		opts.show = opts.show.jquery ? { target: opts.show } : 
			opts.show === TRUE ? { ready: TRUE } : { event: opts.show };
	}

	if('hide' in opts && invalidOpt(opts.hide)) {
		opts.hide = opts.hide.jquery ? { target: opts.hide } : { event: opts.hide };
	}

	if('style' in opts && invalidOpt(opts.style)) {
		opts.style = { classes: opts.style };
	}

	// Sanitize plugin options
	$.each(PLUGINS, function() {
		this.sanitize && this.sanitize(opts);
	});

	return opts;
}

// Setup builtin .set() option checks
CHECKS = PROTOTYPE.checks = {
	builtin: {
		// Core checks
		'^id$': function(obj, o, v, prev) {
			var id = v === TRUE ? QTIP.nextid : v,
				new_id = NAMESPACE + '-' + id;

			if(id !== FALSE && id.length > 0 && !$('#'+new_id).length) {
				this._id = new_id;

				if(this.rendered) {
					this.tooltip[0].id = this._id;
					this.elements.content[0].id = this._id + '-content';
					this.elements.title[0].id = this._id + '-title';
				}
			}
			else { obj[o] = prev; }
		},
		'^prerender': function(obj, o, v) {
			v && !this.rendered && this.render(this.options.show.ready);
		},

		// Content checks
		'^content.text$': function(obj, o, v) {
			this._updateContent(v);
		},
		'^content.attr$': function(obj, o, v, prev) {
			if(this.options.content.text === this.target.attr(prev)) {
				this._updateContent( this.target.attr(v) );
			}
		},
		'^content.title$': function(obj, o, v) {
			// Remove title if content is null
			if(!v) { return this._removeTitle(); }

			// If title isn't already created, create it now and update
			v && !this.elements.title && this._createTitle();
			this._updateTitle(v);
		},
		'^content.button$': function(obj, o, v) {
			this._updateButton(v);
		},
		'^content.title.(text|button)$': function(obj, o, v) {
			this.set('content.'+o, v); // Backwards title.text/button compat
		}, 

		// Position checks
		'^position.(my|at)$': function(obj, o, v){
			'string' === typeof v && (obj[o] = new CORNER(v, o === 'at'));
		},
		'^position.container$': function(obj, o, v){
			this.tooltip.appendTo(v);
		},

		// Show checks
		'^show.ready$': function(obj, o, v) {
			v && (!this.rendered && this.render(TRUE) || this.toggle(TRUE));
		},

		// Style checks
		'^style.classes$': function(obj, o, v, p) {
			this.tooltip.removeClass(p).addClass(v);
		},
		'^style.width|height': function(obj, o, v) {
			this.tooltip.css(o, v);
		},
		'^style.widget|content.title': function() {
			this._setWidget();
		},
		'^style.def': function(obj, o, v) {
			this.tooltip.toggleClass(CLASS_DEFAULT, !!v);
		},

		// Events check
		'^events.(render|show|move|hide|focus|blur)$': function(obj, o, v) {
			tooltip[($.isFunction(v) ? '' : 'un') + 'bind']('tooltip'+o, v);
		},

		// Properties which require event reassignment
		'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function() {
			var posOptions = this.options.position;

			// Set tracking flag
			tooltip.attr('tracking', posOptions.target === 'mouse' && posOptions.adjust.mouse);

			// Reassign events
			this._unassignEvents();
			this._assignEvents();
		}
	}
};

// Dot notation converter
function convertNotation(options, notation) {
	var i = 0, obj, option = options,

	// Split notation into array
	levels = notation.split('.');

	// Loop through
	while( option = option[ levels[i++] ] ) {
		if(i < levels.length) { obj = option; }
	}

	return [obj || options, levels.pop()];
}

PROTOTYPE.get = function(notation) {
	if(this.destroyed) { return this; }

	var o = convertNotation(this.options, notation.toLowerCase()),
		result = o[0][ o[1] ];

	return result.precedance ? result.string() : result;
};

function setCallback(notation, args) {
	var category, rule, match;

	for(category in this.checks) {
		for(rule in this.checks[category]) {
			if(match = (new RegExp(rule, 'i')).exec(notation)) {
				args.push(match);

				if(category === 'builtin' || this.plugins[category]) {
					this.checks[category][rule].apply(
						this.plugins[category] || this, args
					);
				}
			}
		}
	}
}

var rmove = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
	rrender = /^prerender|show\.ready/i;

PROTOTYPE.set = function(option, value) {
	if(this.destroyed) { return this; }

	var rendered = this.rendered,
		reposition = FALSE,
		options = this.options,
		checks = this.checks,
		name;

	// Convert singular option/value pair into object form
	if('string' === typeof option) {
		name = option; option = {}; option[name] = value;
	}
	else { option = $.extend({}, option); }

	// Set all of the defined options to their new values
	$.each(option, function(notation, value) {
		if(!rendered && !rrender.test(notation)) {
			delete option[notation]; return;
		}

		// Set new obj value
		var obj = convertNotation(options, notation.toLowerCase()), previous;
		previous = obj[0][ obj[1] ];
		obj[0][ obj[1] ] = value && value.nodeType ? $(value) : value;

		// Also check if we need to reposition
		reposition = rmove.test(notation) || reposition;

		// Set the new params for the callback
		option[notation] = [obj[0], obj[1], value, previous];
	});

	// Re-sanitize options
	sanitizeOptions(options);

	/*
	 * Execute any valid callbacks for the set options
	 * Also set positioning flag so we don't get loads of redundant repositioning calls.
	 */
	this.positioning = TRUE;
	$.each(option, $.proxy(setCallback, this));
	this.positioning = FALSE;

	// Update position if needed
	if(this.rendered && this.tooltip[0].offsetWidth > 0 && reposition) {
		this.reposition( options.position.target === 'mouse' ? NULL : this.cache.event );
	}

	return this;
};

;PROTOTYPE._update = function(content, element, reposition) {
	var self = this,
		cache = this.cache;

	// Make sure tooltip is rendered and content is defined. If not return
	if(!this.rendered || !content) { return FALSE; }

	// Use function to parse content
	if($.isFunction(content)) {
		content = content.call(this.elements.target, cache.event, this) || '';
	}

	// Handle deferred content
	if($.isFunction(content.then)) {
		cache.waiting = TRUE;
		return content.then(function(c) {
			cache.waiting = FALSE;
			return self._update(c, element);
		}, NULL, function(e) {
			return self._update(e, element);
		});
	}

	// If content is null... return false
	if(content === FALSE || (!content && content !== '')) { return FALSE; }

	// Append new content if its a DOM array and show it if hidden
	if(content.jquery && content.length > 0) {
		element.children().detach().end().append( content.css({ display: 'block' }) );
	}

	// Content is a regular string, insert the new content
	else { element.html(content); }

	// If imagesLoaded is included, ensure images have loaded and return promise
	cache.waiting = TRUE;

	return ( $.fn.imagesLoaded ? element.imagesLoaded() : $.Deferred().resolve($([])) )
		.done(function(images) {
			cache.waiting = FALSE;

			// Reposition if rendered
			if(images.length && self.rendered && self.tooltip[0].offsetWidth > 0) {
				self.reposition(cache.event, !images.length);
			}
		})
		.promise();
};

PROTOTYPE._updateContent = function(content, reposition) {
	this._update(content, this.elements.content, reposition);
};

PROTOTYPE._updateTitle = function(content, reposition) {
	if(this._update(content, this.elements.title, reposition) === FALSE) {
		this._removeTitle(FALSE);
	}
};

PROTOTYPE._createTitle = function()
{
	var elements = this.elements,
		id = this._id+'-title';

	// Destroy previous title element, if present
	if(elements.titlebar) { this._removeTitle(); }

	// Create title bar and title elements
	elements.titlebar = $('<div />', {
		'class': NAMESPACE + '-titlebar ' + (this.options.style.widget ? createWidgetClass('header') : '')
	})
	.append(
		elements.title = $('<div />', {
			'id': id,
			'class': NAMESPACE + '-title',
			'aria-atomic': TRUE
		})
	)
	.insertBefore(elements.content)

	// Button-specific events
	.delegate('.qtip-close', 'mousedown keydown mouseup keyup mouseout', function(event) {
		$(this).toggleClass('ui-state-active ui-state-focus', event.type.substr(-4) === 'down');
	})
	.delegate('.qtip-close', 'mouseover mouseout', function(event){
		$(this).toggleClass('ui-state-hover', event.type === 'mouseover');
	});

	// Create button if enabled
	if(this.options.content.button) { this._createButton(); }
};

PROTOTYPE._removeTitle = function(reposition)
{
	var elements = this.elements;

	if(elements.title) {
		elements.titlebar.remove();
		elements.titlebar = elements.title = elements.button = NULL;

		// Reposition if enabled
		if(reposition !== FALSE) { this.reposition(); }
	}
};

;PROTOTYPE.reposition = function(event, effect) {
	if(!this.rendered || this.positioning || this.destroyed) { return this; }

	// Set positioning flag
	this.positioning = TRUE;

	var cache = this.cache,
		tooltip = this.tooltip,
		posOptions = this.options.position,
		target = posOptions.target,
		my = posOptions.my,
		at = posOptions.at,
		viewport = posOptions.viewport,
		container = posOptions.container,
		adjust = posOptions.adjust,
		method = adjust.method.split(' '),
		elemWidth = tooltip.outerWidth(FALSE),
		elemHeight = tooltip.outerHeight(FALSE),
		targetWidth = 0,
		targetHeight = 0,
		type = tooltip.css('position'),
		position = { left: 0, top: 0 },
		visible = tooltip[0].offsetWidth > 0,
		isScroll = event && event.type === 'scroll',
		win = $(window),
		doc = container[0].ownerDocument,
		mouse = this.mouse,
		pluginCalculations, offset;

	// Check if absolute position was passed
	if($.isArray(target) && target.length === 2) {
		// Force left top and set position
		at = { x: LEFT, y: TOP };
		position = { left: target[0], top: target[1] };
	}

	// Check if mouse was the target
	else if(target === 'mouse' && ((event && event.pageX) || cache.event.pageX)) {
		// Force left top to allow flipping
		at = { x: LEFT, y: TOP };

		// Use cached event if one isn't available for positioning
		event = mouse && mouse.pageX && (adjust.mouse || !event || !event.pageX) ? mouse :
			(event && (event.type === 'resize' || event.type === 'scroll') ? cache.event :
			event && event.pageX && event.type === 'mousemove' ? event :
			(!adjust.mouse || this.options.show.distance) && cache.origin && cache.origin.pageX ? cache.origin :
			event) || event || cache.event || mouse || {};

		// Calculate body and container offset and take them into account below
		if(type !== 'static') { position = container.offset(); }
		if(doc.body.offsetWidth !== (window.innerWidth || doc.documentElement.clientWidth)) { offset = $(doc.body).offset(); }

		// Use event coordinates for position
		position = {
			left: event.pageX - position.left + (offset && offset.left || 0),
			top: event.pageY - position.top + (offset && offset.top || 0)
		};

		// Scroll events are a pain, some browsers
		if(adjust.mouse && isScroll) {
			position.left -= mouse.scrollX - win.scrollLeft();
			position.top -= mouse.scrollY - win.scrollTop();
		}
	}

	// Target wasn't mouse or absolute...
	else {
		// Check if event targetting is being used
		if(target === 'event' && event && event.target && event.type !== 'scroll' && event.type !== 'resize') {
			cache.target = $(event.target);
		}
		else if(target !== 'event'){
			cache.target = $(target.jquery ? target : elements.target);
		}
		target = cache.target;

		// Parse the target into a jQuery object and make sure there's an element present
		target = $(target).eq(0);
		if(target.length === 0) { return this; }

		// Check if window or document is the target
		else if(target[0] === document || target[0] === window) {
			targetWidth = BROWSER.iOS ? window.innerWidth : target.width();
			targetHeight = BROWSER.iOS ? window.innerHeight : target.height();

			if(target[0] === window) {
				position = {
					top: (viewport || target).scrollTop(),
					left: (viewport || target).scrollLeft()
				};
			}
		}

		// Check if the target is an <AREA> element
		else if(PLUGINS.imagemap && target.is('area')) {
			pluginCalculations = PLUGINS.imagemap(this, target, at, PLUGINS.viewport ? method : FALSE);
		}

		// Check if the target is an SVG element
		else if(PLUGINS.svg && target[0].ownerSVGElement) {
			pluginCalculations = PLUGINS.svg(this, target, at, PLUGINS.viewport ? method : FALSE);
		}

		// Otherwise use regular jQuery methods
		else {
			targetWidth = target.outerWidth(FALSE);
			targetHeight = target.outerHeight(FALSE);
			position = target.offset();
		}

		// Parse returned plugin values into proper variables
		if(pluginCalculations) {
			targetWidth = pluginCalculations.width;
			targetHeight = pluginCalculations.height;
			offset = pluginCalculations.offset;
			position = pluginCalculations.position;
		}

		// Adjust position to take into account offset parents
		position = this.reposition.offset(target, position, container);

		// Adjust for position.fixed tooltips (and also iOS scroll bug in v3.2-4.0 & v4.3-4.3.2)
		if((BROWSER.iOS > 3.1 && BROWSER.iOS < 4.1) || 
			(BROWSER.iOS >= 4.3 && BROWSER.iOS < 4.33) || 
			(!BROWSER.iOS && type === 'fixed')
		){
			position.left -= win.scrollLeft();
			position.top -= win.scrollTop();
		}

		// Adjust position relative to target
		if(!pluginCalculations || (pluginCalculations && pluginCalculations.adjustable !== FALSE)) {
			position.left += at.x === RIGHT ? targetWidth : at.x === CENTER ? targetWidth / 2 : 0;
			position.top += at.y === BOTTOM ? targetHeight : at.y === CENTER ? targetHeight / 2 : 0;
		}
	}

	// Adjust position relative to tooltip
	position.left += adjust.x + (my.x === RIGHT ? -elemWidth : my.x === CENTER ? -elemWidth / 2 : 0);
	position.top += adjust.y + (my.y === BOTTOM ? -elemHeight : my.y === CENTER ? -elemHeight / 2 : 0);

	// Use viewport adjustment plugin if enabled
	if(PLUGINS.viewport) {
		position.adjusted = PLUGINS.viewport(
			this, position, posOptions, targetWidth, targetHeight, elemWidth, elemHeight
		);

		// Apply offsets supplied by positioning plugin (if used)
		if(offset && position.adjusted.left) { position.left += offset.left; }
		if(offset && position.adjusted.top) {  position.top += offset.top; }
	}

	// Viewport adjustment is disabled, set values to zero
	else { position.adjusted = { left: 0, top: 0 }; }

	// tooltipmove event
	if(!this._trigger('move', [position, viewport.elem || viewport], event)) { return this; }
	delete position.adjusted;

	// If effect is disabled, target it mouse, no animation is defined or positioning gives NaN out, set CSS directly
	if(effect === FALSE || !visible || isNaN(position.left) || isNaN(position.top) || target === 'mouse' || !$.isFunction(posOptions.effect)) {
		tooltip.css(position);
	}

	// Use custom function if provided
	else if($.isFunction(posOptions.effect)) {
		posOptions.effect.call(tooltip, this, $.extend({}, position));
		tooltip.queue(function(next) {
			// Reset attributes to avoid cross-browser rendering bugs
			$(this).css({ opacity: '', height: '' });
			if(BROWSER.ie) { this.style.removeAttribute('filter'); }

			next();
		});
	}

	// Set positioning flag
	this.positioning = FALSE;

	return this;
};

// Custom (more correct for qTip!) offset calculator
PROTOTYPE.reposition.offset = function(elem, pos, container) {
	if(!container[0]) { return pos; }

	var ownerDocument = $(elem[0].ownerDocument),
		quirks = !!BROWSER.ie && document.compatMode !== 'CSS1Compat',
		parent = container[0],
		scrolled, position, parentOffset, overflow;

	function scroll(e, i) {
		pos.left += i * e.scrollLeft();
		pos.top += i * e.scrollTop();
	}

	// Compensate for non-static containers offset
	do {
		if((position = $.css(parent, 'position')) !== 'static') {
			if(position === 'fixed') {
				parentOffset = parent.getBoundingClientRect();
				scroll(ownerDocument, -1);
			}
			else {
				parentOffset = $(parent).position();
				parentOffset.left += (parseFloat($.css(parent, 'borderLeftWidth')) || 0);
				parentOffset.top += (parseFloat($.css(parent, 'borderTopWidth')) || 0);
			}

			pos.left -= parentOffset.left + (parseFloat($.css(parent, 'marginLeft')) || 0);
			pos.top -= parentOffset.top + (parseFloat($.css(parent, 'marginTop')) || 0);

			// If this is the first parent element with an overflow of "scroll" or "auto", store it
			if(!scrolled && (overflow = $.css(parent, 'overflow')) !== 'hidden' && overflow !== 'visible') { scrolled = $(parent); }
		}
	}
	while((parent = parent.offsetParent));

	// Compensate for containers scroll if it also has an offsetParent (or in IE quirks mode)
	if(scrolled && (scrolled[0] !== ownerDocument[0] || quirks)) {
		scroll(scrolled, 1);
	}

	return pos;
};

// Corner class
var C = (CORNER = PROTOTYPE.reposition.Corner = function(corner, forceY) {
	corner = ('' + corner).replace(/([A-Z])/, ' $1').replace(/middle/gi, CENTER).toLowerCase();
	this.x = (corner.match(/left|right/i) || corner.match(/center/) || ['inherit'])[0].toLowerCase();
	this.y = (corner.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase();
	this.forceY = !!forceY;

	var f = corner.charAt(0);
	this.precedance = (f === 't' || f === 'b' ? Y : X);
}).prototype;

C.invert = function(z, center) {
	this[z] = this[z] === LEFT ? RIGHT : this[z] === RIGHT ? LEFT : center || this[z];	
};

C.string = function() {
	var x = this.x, y = this.y;
	return x === y ? x : this.precedance === Y || (this.forceY && y !== 'center') ? y+' '+x : x+' '+y;
};

C.abbrev = function() {
	var result = this.string().split(' ');
	return result[0].charAt(0) + (result[1] && result[1].charAt(0) || '');
};

C.clone = function() {
	return new CORNER( this.string(), this.forceY );
};;
PROTOTYPE.toggle = function(state, event) {
	var cache = this.cache,
		options = this.options,
		tooltip = this.tooltip;

	// Try to prevent flickering when tooltip overlaps show element
	if(event) {
		if((/over|enter/).test(event.type) && (/out|leave/).test(cache.event.type) &&
			options.show.target.add(event.target).length === options.show.target.length &&
			tooltip.has(event.relatedTarget).length) {
			return this;
		}

		// Cache event
		cache.event = $.extend({}, event);
	}
		
	// If we're currently waiting and we've just hidden... stop it
	this.waiting && !state && (this.hiddenDuringWait = TRUE);

	// Render the tooltip if showing and it isn't already
	if(!this.rendered) { return state ? this.render(1) : this; }
	else if(this.destroyed || this.disabled) { return this; }

	var type = state ? 'show' : 'hide',
		opts = this.options[type],
		otherOpts = this.options[ !state ? 'show' : 'hide' ],
		posOptions = this.options.position,
		contentOptions = this.options.content,
		width = this.tooltip.css('width'),
		visible = this.tooltip[0].offsetWidth > 0,
		animate = state || opts.target.length === 1,
		sameTarget = !event || opts.target.length < 2 || cache.target[0] === event.target,
		identicalState, allow, showEvent, delay;

	// Detect state if valid one isn't provided
	if((typeof state).search('boolean|number')) { state = !visible; }

	// Check if the tooltip is in an identical state to the new would-be state
	identicalState = !tooltip.is(':animated') && visible === state && sameTarget;

	// Fire tooltip(show/hide) event and check if destroyed
	allow = !identicalState ? !!this._trigger(type, [90]) : NULL;

	// If the user didn't stop the method prematurely and we're showing the tooltip, focus it
	if(allow !== FALSE && state) { this.focus(event); }

	// If the state hasn't changed or the user stopped it, return early
	if(!allow || identicalState) { return this; }

	// Set ARIA hidden attribute
	$.attr(tooltip[0], 'aria-hidden', !!!state);

	// Execute state specific properties
	if(state) {
		// Store show origin coordinates
		cache.origin = $.extend({}, this.mouse);

		// Update tooltip content & title if it's a dynamic function
		if($.isFunction(contentOptions.text)) { this._updateContent(contentOptions.text, FALSE); }
		if($.isFunction(contentOptions.title)) { this._updateTitle(contentOptions.title, FALSE); }

		// Cache mousemove events for positioning purposes (if not already tracking)
		if(!trackingBound && posOptions.target === 'mouse' && posOptions.adjust.mouse) {
			$(document).bind('mousemove.'+NAMESPACE, this._storeMouse);
			trackingBound = TRUE;
		}

		// Update the tooltip position (set width first to prevent viewport/max-width issues)
		if(!width) { tooltip.css('width', tooltip.outerWidth(FALSE)); }
		this.reposition(event, arguments[2]);
		if(!width) { tooltip.css('width', ''); }

		// Hide other tooltips if tooltip is solo
		if(!!opts.solo) {
			(typeof opts.solo === 'string' ? $(opts.solo) : $(SELECTOR, opts.solo))
				.not(tooltip).not(opts.target).qtip('hide', $.Event('tooltipsolo'));
		}
	}
	else {
		// Clear show timer if we're hiding
		clearTimeout(this.timers.show);

		// Remove cached origin on hide
		delete cache.origin;

		// Remove mouse tracking event if not needed (all tracking qTips are hidden)
		if(trackingBound && !$(SELECTOR+'[tracking="true"]:visible', opts.solo).not(tooltip).length) {
			$(document).unbind('mousemove.'+NAMESPACE);
			trackingBound = FALSE;
		}

		// Blur the tooltip
		this.blur(event);
	}

	// Define post-animation, state specific properties
	after = $.proxy(function() {
		if(state) {
			// Prevent antialias from disappearing in IE by removing filter
			if(BROWSER.ie) { tooltip[0].style.removeAttribute('filter'); }

			// Remove overflow setting to prevent tip bugs
			tooltip.css('overflow', '');

			// Autofocus elements if enabled
			if('string' === typeof opts.autofocus) {
				$(this.options.show.autofocus, tooltip).focus();
			}

			// If set, hide tooltip when inactive for delay period
			this.options.show.target.trigger('qtip-'+this.id+'-inactive');
		}
		else {
			// Reset CSS states
			tooltip.css({
				display: '',
				visibility: '',
				opacity: '',
				left: '',
				top: ''
			});
		}

		// tooltipvisible/tooltiphidden events
		this._trigger(state ? 'visible' : 'hidden');
	}, this);

	// If no effect type is supplied, use a simple toggle
	if(opts.effect === FALSE || animate === FALSE) {
		tooltip[ type ]();
		after();
	}

	// Use custom function if provided
	else if($.isFunction(opts.effect)) {
		tooltip.stop(1, 1);
		opts.effect.call(tooltip, this);
		tooltip.queue('fx', function(n) {
			after(); n();
		});
	}

	// Use basic fade function by default
	else { tooltip.fadeTo(90, state ? 1 : 0, after); }

	// If inactive hide method is set, active it
	if(state) { opts.target.trigger('qtip-'+this.id+'-inactive'); }

	return this;
};

PROTOTYPE.show = function(event) { return this.toggle(TRUE, event); };

PROTOTYPE.hide = function(event) { return this.toggle(FALSE, event); };

;PROTOTYPE.focus = function(event) {
	if(!this.rendered || this.destroyed) { return this; }

	var qtips = $(SELECTOR),
		tooltip = this.tooltip,
		curIndex = parseInt(tooltip[0].style.zIndex, 10),
		newIndex = QTIP.zindex + qtips.length,
		focusedElem;

	// Only update the z-index if it has changed and tooltip is not already focused
	if(!tooltip.hasClass(CLASS_FOCUS)) {
		// tooltipfocus event
		if(this._trigger('focus', [newIndex], event)) {
			// Only update z-index's if they've changed
			if(curIndex !== newIndex) {
				// Reduce our z-index's and keep them properly ordered
				qtips.each(function() {
					if(this.style.zIndex > curIndex) {
						this.style.zIndex = this.style.zIndex - 1;
					}
				});

				// Fire blur event for focused tooltip
				qtips.filter('.' + CLASS_FOCUS).qtip('blur', event);
			}

			// Set the new z-index
			tooltip.addClass(CLASS_FOCUS)[0].style.zIndex = newIndex;
		}
	}

	return this;
};

PROTOTYPE.blur = function(event) {
	if(!this.rendered || this.destroyed) { return this; }

	// Set focused status to FALSE
	this.tooltip.removeClass(CLASS_FOCUS);

	// tooltipblur event
	this._trigger('blur', [ this.tooltip.css('zIndex') ], event);

	return this;
};

;PROTOTYPE.disable = function(state) {
	if(this.destroyed) { return this; }

	if('boolean' !== typeof state) {
		state = !(this.tooltip.hasClass(CLASS_DISABLED) || this.disabled);
	}

	if(this.rendered) {
		this.tooltip.toggleClass(CLASS_DISABLED, state)
			.attr('aria-disabled', state);
	}

	this.disabled = !!state;

	return this;
};

PROTOTYPE.enable = function() { return this.disable(FALSE); };

;PROTOTYPE._createButton = function()
{
	var self = this,
		elements = this.elements,
		tooltip = elements.tooltip,
		button = this.options.content.button,
		isString = typeof button === 'string',
		close = isString ? button : 'Close tooltip';

	if(elements.button) { elements.button.remove(); }

	// Use custom button if one was supplied by user, else use default
	if(button.jquery) {
		elements.button = button;
	}
	else {
		elements.button = $('<a />', {
			'class': 'qtip-close ' + (this.options.style.widget ? '' : NAMESPACE+'-icon'),
			'title': close,
			'aria-label': close
		})
		.prepend(
			$('<span />', {
				'class': 'ui-icon ui-icon-close',
				'html': '&times;'
			})
		);
	}

	// Create button and setup attributes
	elements.button.appendTo(elements.titlebar || tooltip)
		.attr('role', 'button')
		.click(function(event) {
			if(!tooltip.hasClass(CLASS_DISABLED)) { self.hide(event); }
			return FALSE;
		});
};

PROTOTYPE._updateButton = function(button)
{
	// Make sure tooltip is rendered and if not, return
	if(!this.rendered) { return FALSE; }

	var elem = this.elements.button;
	if(button) { this._createButton(); }
	else { elem.remove(); }
};

;// Widget class creator
function createWidgetClass(cls) {
	return WIDGET.concat('').join(cls ? '-'+cls+' ' : ' ');
}

// Widget class setter method
PROTOTYPE._setWidget = function()
{
	var on = this.options.style.widget,
		elements = this.elements,
		tooltip = elements.tooltip,
		disabled = tooltip.hasClass(CLASS_DISABLED);

	tooltip.removeClass(CLASS_DISABLED);
	CLASS_DISABLED = on ? 'ui-state-disabled' : 'qtip-disabled';
	tooltip.toggleClass(CLASS_DISABLED, disabled);

	tooltip.toggleClass('ui-helper-reset '+createWidgetClass(), on).toggleClass(CLASS_DEFAULT, this.options.style.def && !on);
	
	if(elements.content) {
		elements.content.toggleClass( createWidgetClass('content'), on);
	}
	if(elements.titlebar) {
		elements.titlebar.toggleClass( createWidgetClass('header'), on);
	}
	if(elements.button) {
		elements.button.toggleClass(NAMESPACE+'-icon', !on);
	}
};;function showMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED)) { return FALSE; }

	// Clear hide timers
	clearTimeout(this.timers.show);
	clearTimeout(this.timers.hide);

	// Start show timer
	var callback = $.proxy(function(){ this.toggle(TRUE, event); }, this);
	if(this.options.show.delay > 0) {
		this.timers.show = setTimeout(callback, this.options.show.delay);
	}
	else{ callback(); }
}

function hideMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED)) { return FALSE; }

	// Check if new target was actually the tooltip element
	var relatedTarget = $(event.relatedTarget),
		ontoTooltip = relatedTarget.closest(SELECTOR)[0] === this.tooltip[0],
		ontoTarget = relatedTarget[0] === this.options.show.target[0];

	// Clear timers and stop animation queue
	clearTimeout(this.timers.show);
	clearTimeout(this.timers.hide);

	// Prevent hiding if tooltip is fixed and event target is the tooltip.
	// Or if mouse positioning is enabled and cursor momentarily overlaps
	if(this !== relatedTarget[0] && 
		(this.options.position.target === 'mouse' && ontoTooltip) || 
		(this.options.hide.fixed && (
			(/mouse(out|leave|move)/).test(event.type) && (ontoTooltip || ontoTarget))
		))
	{
		try {
			event.preventDefault();
			event.stopImmediatePropagation();
		} catch(e) {}

		return;
	}

	// If tooltip has displayed, start hide timer
	var callback = $.proxy(function(){ this.toggle(FALSE, event); }, this);
	if(this.options.hide.delay > 0) {
		this.timers.hide = setTimeout(callback, this.options.hide.delay);
	}
	else{ callback(); }
}

function inactiveMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED) || !this.options.hide.inactive) { return FALSE; }

	// Clear timer
	clearTimeout(this.timers.inactive);
	this.timers.inactive = setTimeout(
		$.proxy(function(){ this.hide(event); }, this), this.options.hide.inactive
	);
}

function repositionMethod(event) {
	if(this.rendered && this.tooltip[0].offsetWidth > 0) { this.reposition(event); }
}

// Store mouse coordinates
PROTOTYPE._storeMouse = function(event) {
	this.mouse = {
		pageX: event.pageX,
		pageY: event.pageY,
		type: 'mousemove',
		scrollX: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
		scrollY: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
	};
};

// Bind events
PROTOTYPE._bind = function(targets, events, method, suffix, context) {
	var ns = '.' + this._id + (suffix ? '-'+suffix : '');
	events.length && $(targets).bind(
		(events.split ? events : events.join(ns + ' ')) + ns,
		$.proxy(method, context || this)
	);
};
PROTOTYPE._unbind = function(targets, suffix) {
	$(targets).unbind('.' + this._id + (suffix ? '-'+suffix : ''));
};

// Apply common event handlers using delegate (avoids excessive .bind calls!)
var ns = '.'+NAMESPACE;
function delegate(selector, events, method) {	
	$(document.body).delegate(selector,
		(events.split ? events : events.join(ns + ' ')) + ns,
		function() {
			var api = QTIP.api[ $.attr(this, ATTR_ID) ];
			api && !api.disabled && method.apply(api, arguments);
		}
	);
}

$(function() {
	delegate(SELECTOR, ['mouseenter', 'mouseleave'], function(event) {
		var state = event.type === 'mouseenter',
			tooltip = $(event.currentTarget),
			target = $(event.relatedTarget || event.target),
			options = this.options;

		// On mouseenter...
		if(state) {
			// Focus the tooltip on mouseenter (z-index stacking)
			this.focus(event);

			// Clear hide timer on tooltip hover to prevent it from closing
			tooltip.hasClass(CLASS_FIXED) && !tooltip.hasClass(CLASS_DISABLED) && clearTimeout(this.timers.hide);
		}

		// On mouseleave...
		else {
			// Hide when we leave the tooltip and not onto the show target (if a hide event is set)
			if(options.position.target === 'mouse' && options.hide.event && 
				options.show.target && !target.closest(options.show.target[0]).length) {
				this.hide(event);
			}
		}

		// Add hover class
		tooltip.toggleClass(CLASS_HOVER, state);
	});

	// Define events which reset the 'inactive' event handler
	delegate('['+ATTR_ID+']', INACTIVE_EVENTS, inactiveMethod);
});

// Event trigger
PROTOTYPE._trigger = function(type, args, event) {
	var callback = $.Event('tooltip'+type);
	callback.originalEvent = (event && $.extend({}, event)) || this.cache.event || NULL;

	this.triggering = TRUE;
	this.tooltip.trigger(callback, [this].concat(args || []));
	this.triggering = FALSE;

	return !callback.isDefaultPrevented();
};

// Event assignment method
PROTOTYPE._assignEvents = function() {
	var options = this.options,
		posOptions = options.position,

		tooltip = this.tooltip,
		showTarget = options.show.target,
		hideTarget = options.hide.target,
		containerTarget = posOptions.container,
		viewportTarget = posOptions.viewport,
		documentTarget = $(document),
		bodyTarget = $(document.body),
		windowTarget = $(window),

		showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
		hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [],
		toggleEvents = [];

	// Hide tooltips when leaving current window/frame (but not select/option elements)
	if(/mouse(out|leave)/i.test(options.hide.event) && options.hide.leave === 'window') {
		this._bind(documentTarget, ['mouseout', 'blur'], function(event) {
			if(!/select|option/.test(event.target.nodeName) && !event.relatedTarget) {
				this.hide(event);
			}
		});
	}

	// Enable hide.fixed by adding appropriate class
	if(options.hide.fixed) {
		hideTarget = hideTarget.add( tooltip.addClass(CLASS_FIXED) );
	}

	/*
	 * Make sure hoverIntent functions properly by using mouseleave to clear show timer if
	 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
	 */
	else if(/mouse(over|enter)/i.test(options.show.event)) {
		this._bind(hideTarget, 'mouseleave', function() {
			clearTimeout(this.timers.show);
		});
	}

	// Hide tooltip on document mousedown if unfocus events are enabled
	if(('' + options.hide.event).indexOf('unfocus') > -1) {
		this._bind(containerTarget.closest('html'), ['mousedown', 'touchstart'], function(event) {
			var elem = $(event.target),
				enabled = this.rendered && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0,
				isAncestor = elem.parents(SELECTOR).filter(this.tooltip[0]).length > 0;

			if(elem[0] !== this.target[0] && elem[0] !== this.tooltip[0] && !isAncestor &&
				!this.target.has(elem[0]).length && enabled
			) {
				this.hide(event);
			}
		});
	}

	// Check if the tooltip hides when inactive
	if('number' === typeof options.hide.inactive) {
		// Bind inactive method to show target(s) as a custom event
		this._bind(showTarget, 'qtip-'+this.id+'-inactive', inactiveMethod);

		// Define events which reset the 'inactive' event handler
		this._bind(hideTarget.add(tooltip), QTIP.inactiveEvents, inactiveMethod, '-inactive');
	}

	// Apply hide events (and filter identical show events)
	hideEvents = $.map(hideEvents, function(type) {
		var showIndex = $.inArray(type, showEvents);

		// Both events and targets are identical, apply events using a toggle
		if((showIndex > -1 && hideTarget.add(showTarget).length === hideTarget.length)) {
			toggleEvents.push( showEvents.splice( showIndex, 1 )[0] ); return;
		}

		return type;
	});

	// Apply show/hide/toggle events
	this._bind(showTarget, showEvents, showMethod);
	this._bind(hideTarget, hideEvents, hideMethod);
	this._bind(showTarget, toggleEvents, function(event) {
		(this.tooltip[0].offsetWidth > 0 ? hideMethod : showMethod).call(this, event);
	});


	// Mouse movement bindings
	this._bind(showTarget.add(tooltip), 'mousemove', function(event) {
		// Check if the tooltip hides when mouse is moved a certain distance
		if('number' === typeof options.hide.distance) {
			var origin = this.cache.origin || {},
				limit = this.options.hide.distance,
				abs = Math.abs;

			// Check if the movement has gone beyond the limit, and hide it if so
			if(abs(event.pageX - origin.pageX) >= limit || abs(event.pageY - origin.pageY) >= limit) {
				this.hide(event);
			}
		}

		// Cache mousemove coords on show targets
		this._storeMouse(event);
	});

	// Mouse positioning events
	if(posOptions.target === 'mouse') {
		// If mouse adjustment is on...
		if(posOptions.adjust.mouse) {
			// Apply a mouseleave event so we don't get problems with overlapping
			if(options.hide.event) {
				// Track if we're on the target or not
				this._bind(showTarget, ['mouseenter', 'mouseleave'], function(event) {
					this.cache.onTarget = event.type === 'mouseenter';
				});
			}

			// Update tooltip position on mousemove
			this._bind(documentTarget, 'mousemove', function(event) {
				// Update the tooltip position only if the tooltip is visible and adjustment is enabled
				if(this.rendered && this.cache.onTarget && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0) {
					this.reposition(event);
				}
			});
		}
	}

	// Adjust positions of the tooltip on window resize if enabled
	if(posOptions.adjust.resize || viewportTarget.length) {
		this._bind( $.event.special.resize ? viewportTarget : windowTarget, 'resize', repositionMethod );
	}

	// Adjust tooltip position on scroll of the window or viewport element if present
	if(posOptions.adjust.scroll) {
		this._bind( windowTarget.add(posOptions.container), 'scroll', repositionMethod );
	}
};

// Un-assignment method
PROTOTYPE._unassignEvents = function() {
	var targets = [
		this.options.show.target[0],
		this.options.hide.target[0],
		this.rendered && this.tooltip[0],
		this.options.position.container[0],
		this.options.position.viewport[0],
		this.options.position.container.closest('html')[0], // unfocus
		window,
		document
	];

	// Check if tooltip is rendered
	if(this.rendered) {
		this._unbind($([]).pushStack( $.grep(targets, function(i) {
			return typeof i === 'object';
		})));
	}

	// Tooltip isn't yet rendered, remove render event
	else { $(targets[0]).unbind('.'+this._id+'-create'); }
};

;// Initialization method
function init(elem, id, opts)
{
	var obj, posOptions, attr, config, title,

	// Setup element references
	docBody = $(document.body),

	// Use document body instead of document element if needed
	newTarget = elem[0] === document ? docBody : elem,

	// Grab metadata from element if plugin is present
	metadata = (elem.metadata) ? elem.metadata(opts.metadata) : NULL,

	// If metadata type if HTML5, grab 'name' from the object instead, or use the regular data object otherwise
	metadata5 = opts.metadata.type === 'html5' && metadata ? metadata[opts.metadata.name] : NULL,

	// Grab data from metadata.name (or data-qtipopts as fallback) using .data() method,
	html5 = elem.data(opts.metadata.name || 'qtipopts');

	// If we don't get an object returned attempt to parse it manualyl without parseJSON
	try { html5 = typeof html5 === 'string' ? $.parseJSON(html5) : html5; } catch(e) {}

	// Merge in and sanitize metadata
	config = $.extend(TRUE, {}, QTIP.defaults, opts,
		typeof html5 === 'object' ? sanitizeOptions(html5) : NULL,
		sanitizeOptions(metadata5 || metadata));

	// Re-grab our positioning options now we've merged our metadata and set id to passed value
	posOptions = config.position;
	config.id = id;

	// Setup missing content if none is detected
	if('boolean' === typeof config.content.text) {
		attr = elem.attr(config.content.attr);

		// Grab from supplied attribute if available
		if(config.content.attr !== FALSE && attr) { config.content.text = attr; }

		// No valid content was found, abort render
		else { return FALSE; }
	}

	// Setup target options
	if(!posOptions.container.length) { posOptions.container = docBody; }
	if(posOptions.target === FALSE) { posOptions.target = newTarget; }
	if(config.show.target === FALSE) { config.show.target = newTarget; }
	if(config.show.solo === TRUE) { config.show.solo = posOptions.container.closest('body'); }
	if(config.hide.target === FALSE) { config.hide.target = newTarget; }
	if(config.position.viewport === TRUE) { config.position.viewport = posOptions.container; }

	// Ensure we only use a single container
	posOptions.container = posOptions.container.eq(0);

	// Convert position corner values into x and y strings
	posOptions.at = new CORNER(posOptions.at, TRUE);
	posOptions.my = new CORNER(posOptions.my);

	// Destroy previous tooltip if overwrite is enabled, or skip element if not
	if(elem.data(NAMESPACE)) {
		if(config.overwrite) {
			elem.qtip('destroy');
		}
		else if(config.overwrite === FALSE) {
			return FALSE;
		}
	}

	// Add has-qtip attribute
	elem.attr(ATTR_HAS, id);

	// Remove title attribute and store it if present
	if(config.suppress && (title = elem.attr('title'))) {
		// Final attr call fixes event delegatiom and IE default tooltip showing problem
		elem.removeAttr('title').attr(oldtitle, title).attr('title', '');
	}

	// Initialize the tooltip and add API reference
	obj = new QTip(elem, config, id, !!attr);
	elem.data(NAMESPACE, obj);

	// Catch remove/removeqtip events on target element to destroy redundant tooltip
	elem.one('remove.qtip-'+id+' removeqtip.qtip-'+id, function() { 
		var api; if((api = $(this).data(NAMESPACE))) { api.destroy(); }
	});

	return obj;
}

// jQuery $.fn extension method
QTIP = $.fn.qtip = function(options, notation, newValue)
{
	var command = ('' + options).toLowerCase(), // Parse command
		returned = NULL,
		args = $.makeArray(arguments).slice(1),
		event = args[args.length - 1],
		opts = this[0] ? $.data(this[0], NAMESPACE) : NULL;

	// Check for API request
	if((!arguments.length && opts) || command === 'api') {
		return opts;
	}

	// Execute API command if present
	else if('string' === typeof options)
	{
		this.each(function()
		{
			var api = $.data(this, NAMESPACE);
			if(!api) { return TRUE; }

			// Cache the event if possible
			if(event && event.timeStamp) { api.cache.event = event; }

			// Check for specific API commands
			if(notation && (command === 'option' || command === 'options')) {
				if(newValue !== undefined || $.isPlainObject(notation)) {
					api.set(notation, newValue);
				}
				else {
					returned = api.get(notation);
					return FALSE;
				}
			}

			// Execute API command
			else if(api[command]) {
				api[command].apply(api, args);
			}
		});

		return returned !== NULL ? returned : this;
	}

	// No API commands. validate provided options and setup qTips
	else if('object' === typeof options || !arguments.length)
	{
		opts = sanitizeOptions($.extend(TRUE, {}, options));

		// Bind the qTips
		return QTIP.bind.call(this, opts, event);
	}
};

// $.fn.qtip Bind method
QTIP.bind = function(opts, event)
{
	return this.each(function(i) {
		var options, targets, events, namespace, api, id;

		// Find next available ID, or use custom ID if provided
		id = $.isArray(opts.id) ? opts.id[i] : opts.id;
		id = !id || id === FALSE || id.length < 1 || QTIP.api[id] ? QTIP.nextid++ : id;

		// Setup events namespace
		namespace = '.qtip-'+id+'-create';

		// Initialize the qTip and re-grab newly sanitized options
		api = init($(this), id, opts);
		if(api === FALSE) { return TRUE; }
		else { QTIP.api[id] = api; }
		options = api.options;

		// Initialize plugins
		$.each(PLUGINS, function() {
			if(this.initialize === 'initialize') { this(api); }
		});

		// Determine hide and show targets
		targets = { show: options.show.target, hide: options.hide.target };
		events = {
			show: $.trim('' + options.show.event).replace(/ /g, namespace+' ') + namespace,
			hide: $.trim('' + options.hide.event).replace(/ /g, namespace+' ') + namespace
		};

		/*
		 * Make sure hoverIntent functions properly by using mouseleave as a hide event if
		 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
		 */
		if(/mouse(over|enter)/i.test(events.show) && !/mouse(out|leave)/i.test(events.hide)) {
			events.hide += ' mouseleave' + namespace;
		}

		/*
		 * Also make sure initial mouse targetting works correctly by caching mousemove coords
		 * on show targets before the tooltip has rendered.
		 *
		 * Also set onTarget when triggered to keep mouse tracking working
		 */
		targets.show.bind('mousemove'+namespace, function(event) {
			api._storeMouse(event);
			api.cache.onTarget = TRUE;
		});

		// Define hoverIntent function
		function hoverIntent(event) {
			function render() {
				// Cache mouse coords,render and render the tooltip
				api.render(typeof event === 'object' || options.show.ready);

				// Unbind show and hide events
				targets.show.add(targets.hide).unbind(namespace);
			}

			// Only continue if tooltip isn't disabled
			if(api.disabled) { return FALSE; }

			// Cache the event data
			api.cache.event = $.extend({}, event);
			api.cache.target = event ? $(event.target) : [undefined];

			// Start the event sequence
			if(options.show.delay > 0) {
				clearTimeout(api.timers.show);
				api.timers.show = setTimeout(render, options.show.delay);
				if(events.show !== events.hide) {
					targets.hide.bind(events.hide, function() { clearTimeout(api.timers.show); });
				}
			}
			else { render(); }
		}

		// Bind show events to target
		targets.show.bind(events.show, hoverIntent);

		// Prerendering is enabled, create tooltip now
		if(options.show.ready || options.prerender) { hoverIntent(event); }
	});
};

// Populated in render method
QTIP.api = {};
;$.each({
	/* Allow other plugins to successfully retrieve the title of an element with a qTip applied */
	attr: function(attr, val) {
		if(this.length) {
			var self = this[0],
				title = 'title',
				api = $.data(self, 'qtip');

			if(attr === title && api && 'object' === typeof api && api.options.suppress) {
				if(arguments.length < 2) {
					return $.attr(self, oldtitle);
				}

				// If qTip is rendered and title was originally used as content, update it
				if(api && api.options.content.attr === title && api.cache.attr) {
					api.set('content.text', val);
				}

				// Use the regular attr method to set, then cache the result
				return this.attr(oldtitle, val);
			}
		}

		return $.fn['attr'+replaceSuffix].apply(this, arguments);
	},

	/* Allow clone to correctly retrieve cached title attributes */
	clone: function(keepData) {
		var titles = $([]), title = 'title',

		// Clone our element using the real clone method
		elems = $.fn['clone'+replaceSuffix].apply(this, arguments);

		// Grab all elements with an oldtitle set, and change it to regular title attribute, if keepData is false
		if(!keepData) {
			elems.filter('['+oldtitle+']').attr('title', function() {
				return $.attr(this, oldtitle);
			})
			.removeAttr(oldtitle);
		}

		return elems;
	}
}, function(name, func) {
	if(!func || $.fn[name+replaceSuffix]) { return TRUE; }

	var old = $.fn[name+replaceSuffix] = $.fn[name];
	$.fn[name] = function() {
		return func.apply(this, arguments) || old.apply(this, arguments);
	};
});

/* Fire off 'removeqtip' handler in $.cleanData if jQuery UI not present (it already does similar).
 * This snippet is taken directly from jQuery UI source code found here:
 *     http://code.jquery.com/ui/jquery-ui-git.js
 */
if(!$.ui) {
	$['cleanData'+replaceSuffix] = $.cleanData;
	$.cleanData = function( elems ) {
		for(var i = 0, elem; (elem = $( elems[i] )).length; i++) {
			if(elem.attr(ATTR_HAS)) {
				try { elem.triggerHandler('removeqtip'); } 
				catch( e ) {}
			}
		}
		$['cleanData'+replaceSuffix].apply(this, arguments);
	};
}

;// qTip version
QTIP.version = '2.1.1';

// Base ID for all qTips
QTIP.nextid = 0;

// Inactive events array
QTIP.inactiveEvents = INACTIVE_EVENTS;

// Base z-index for all qTips
QTIP.zindex = 15000;

// Define configuration defaults
QTIP.defaults = {
	prerender: FALSE,
	id: FALSE,
	overwrite: TRUE,
	suppress: TRUE,
	content: {
		text: TRUE,
		attr: 'title',
		title: FALSE,
		button: FALSE
	},
	position: {
		my: 'top left',
		at: 'bottom right',
		target: FALSE,
		container: FALSE,
		viewport: FALSE,
		adjust: {
			x: 0, y: 0,
			mouse: TRUE,
			scroll: TRUE,
			resize: TRUE,
			method: 'flipinvert flipinvert'
		},
		effect: function(api, pos, viewport) {
			$(this).animate(pos, {
				duration: 200,
				queue: FALSE
			});
		}
	},
	show: {
		target: FALSE,
		event: 'mouseenter',
		effect: TRUE,
		delay: 90,
		solo: FALSE,
		ready: FALSE,
		autofocus: FALSE
	},
	hide: {
		target: FALSE,
		event: 'mouseleave',
		effect: TRUE,
		delay: 0,
		fixed: FALSE,
		inactive: FALSE,
		leave: 'window',
		distance: FALSE
	},
	style: {
		classes: '',
		widget: FALSE,
		width: FALSE,
		height: FALSE,
		def: TRUE
	},
	events: {
		render: NULL,
		move: NULL,
		show: NULL,
		hide: NULL,
		toggle: NULL,
		visible: NULL,
		hidden: NULL,
		focus: NULL,
		blur: NULL
	}
};

;var TIP,

// .bind()/.on() namespace
TIPNS = '.qtip-tip',

// Common CSS strings
MARGIN = 'margin',
BORDER = 'border',
COLOR = 'color',
BG_COLOR = 'background-color',
TRANSPARENT = 'transparent',
IMPORTANT = ' !important',

// Check if the browser supports <canvas/> elements
HASCANVAS = !!document.createElement('canvas').getContext,

// Invalid colour values used in parseColours()
INVALID = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

// Camel-case method, taken from jQuery source
// http://code.jquery.com/jquery-1.8.0.js
function camel(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/*
 * Modified from Modernizr's testPropsAll()
 * http://modernizr.com/downloads/modernizr-latest.js
 */
var cssProps = {}, cssPrefixes = ["Webkit", "O", "Moz", "ms"];
function vendorCss(elem, prop) {
	var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		props = (prop + ' ' + cssPrefixes.join(ucProp + ' ') + ucProp).split(' '),
		cur, val, i = 0;

	// If the property has already been mapped...
	if(cssProps[prop]) { return elem.css(cssProps[prop]); }

	while((cur = props[i++])) {
		if((val = elem.css(cur)) !== undefined) {
			return cssProps[prop] = cur, val;
		}
	}
}

// Parse a given elements CSS property into an int
function intCss(elem, prop) {
	return parseInt(vendorCss(elem, prop), 10);
}


// VML creation (for IE only)
if(!HASCANVAS) {
	createVML = function(tag, props, style) {
		return '<qtipvml:'+tag+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(props||'')+
			' style="behavior: url(#default#VML); '+(style||'')+ '" />';
	};
}



function Tip(qtip, options) {
	this._ns = 'tip';
	this.options = options;
	this.offset = options.offset;
	this.size = [ options.width, options.height ];

	// Initialize
	this.init( (this.qtip = qtip) );
}

$.extend(Tip.prototype, {
	init: function(qtip) {
		var context, tip;

		// Create tip element and prepend to the tooltip
		tip = this.element = qtip.elements.tip = $('<div />', { 'class': NAMESPACE+'-tip' }).prependTo(qtip.tooltip);

		// Create tip drawing element(s)
		if(HASCANVAS) {
			// save() as soon as we create the canvas element so FF2 doesn't bork on our first restore()!
			context = $('<canvas />').appendTo(this.element)[0].getContext('2d');

			// Setup constant parameters
			context.lineJoin = 'miter';
			context.miterLimit = 100;
			context.save();
		}
		else {
			context = createVML('shape', 'coordorigin="0,0"', 'position:absolute;');
			this.element.html(context + context);

			// Prevent mousing down on the tip since it causes problems with .live() handling in IE due to VML
			qtip._bind( $('*', tip).add(tip), ['click', 'mousedown'], function(event) { event.stopPropagation(); }, this._ns);
		}

		// Bind update events
		qtip._bind(qtip.tooltip, 'tooltipmove', this.reposition, this._ns, this);

		// Create it
		this.create();
	},

	_swapDimensions: function() {
		this.size[0] = this.options.height;
		this.size[1] = this.options.width;
	},
	_resetDimensions: function() {
		this.size[0] = this.options.width;
		this.size[1] = this.options.height;
	},

	_useTitle: function(corner) {
		var titlebar = this.qtip.elements.titlebar;
		return titlebar && (
			corner.y === TOP || (corner.y === CENTER && this.element.position().top + (this.size[1] / 2) + this.options.offset < titlebar.outerHeight(TRUE))
		);
	},

	_parseCorner: function(corner) {
		var my = this.qtip.options.position.my;

		// Detect corner and mimic properties
		if(corner === FALSE || my === FALSE) {
			corner = FALSE;
		}
		else if(corner === TRUE) {
			corner = new CORNER( my.string() );
		}
		else if(!corner.string) {
			corner = new CORNER(corner);
			corner.fixed = TRUE;
		}

		return corner;
	},

	_parseWidth: function(corner, side, use) {
		var elements = this.qtip.elements,
			prop = BORDER + camel(side) + 'Width';

		return (use ? intCss(use, prop) : (
			intCss(elements.content, prop) ||
			intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) ||
			intCss(tooltip, prop)
		)) || 0;
	},

	_parseRadius: function(corner) {
		var elements = this.qtip.elements,
			prop = BORDER + camel(corner.y) + camel(corner.x) + 'Radius';

		return BROWSER.ie < 9 ? 0 :
			intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) || 
			intCss(elements.tooltip, prop) || 0;
	},

	_invalidColour: function(elem, prop, compare) {
		var val = elem.css(prop);
		return !val || (compare && val === elem.css(compare)) || INVALID.test(val) ? FALSE : val;
	},

	_parseColours: function(corner) {
		var elements = this.qtip.elements,
			tip = this.element.css('cssText', ''),
			borderSide = BORDER + camel(corner[ corner.precedance ]) + camel(COLOR),
			colorElem = this._useTitle(corner) && elements.titlebar || elements.content,
			css = this._invalidColour, color = [];

		// Attempt to detect the background colour from various elements, left-to-right precedance
		color[0] = css(tip, BG_COLOR) || css(colorElem, BG_COLOR) || css(elements.content, BG_COLOR) || 
			css(tooltip, BG_COLOR) || tip.css(BG_COLOR);

		// Attempt to detect the correct border side colour from various elements, left-to-right precedance
		color[1] = css(tip, borderSide, COLOR) || css(colorElem, borderSide, COLOR) || 
			css(elements.content, borderSide, COLOR) || css(tooltip, borderSide, COLOR) || tooltip.css(borderSide);

		// Reset background and border colours
		$('*', tip).add(tip).css('cssText', BG_COLOR+':'+TRANSPARENT+IMPORTANT+';'+BORDER+':0'+IMPORTANT+';');

		return color;
	},

	_calculateSize: function(corner) {
		var y = corner.precedance === Y,
			width = this.options[ y ? 'height' : 'width' ],
			height = this.options[ y ? 'width' : 'height' ],
			isCenter = corner.abbrev() === 'c',
			base = width * (isCenter ? 0.5 : 1),
			pow = Math.pow,
			round = Math.round,
			bigHyp, ratio, result,

		smallHyp = Math.sqrt( pow(base, 2) + pow(height, 2) ),
		hyp = [ (this.border / base) * smallHyp, (this.border / height) * smallHyp ];

		hyp[2] = Math.sqrt( pow(hyp[0], 2) - pow(this.border, 2) );
		hyp[3] = Math.sqrt( pow(hyp[1], 2) - pow(this.border, 2) );

		bigHyp = smallHyp + hyp[2] + hyp[3] + (isCenter ? 0 : hyp[0]);
		ratio = bigHyp / smallHyp;

		result = [ round(ratio * width), round(ratio * height) ];

		return y ? result : result.reverse();
	},

	// Tip coordinates calculator
	_calculateTip: function(corner) {	
		var width = this.size[0], height = this.size[1],
			width2 = Math.ceil(width / 2), height2 = Math.ceil(height / 2),

		// Define tip coordinates in terms of height and width values
		tips = {
			br:	[0,0,		width,height,	width,0],
			bl:	[0,0,		width,0,		0,height],
			tr:	[0,height,	width,0,		width,height],
			tl:	[0,0,		0,height,		width,height],
			tc:	[0,height,	width2,0,		width,height],
			bc:	[0,0,		width,0,		width2,height],
			rc:	[0,0,		width,height2,	0,height],
			lc:	[width,0,	width,height,	0,height2]
		};

		// Set common side shapes
		tips.lt = tips.br; tips.rt = tips.bl;
		tips.lb = tips.tr; tips.rb = tips.tl;

		return tips[ corner.abbrev() ];
	},

	create: function() {
		// Determine tip corner
		var c = this.corner = (HASCANVAS || BROWSER.ie) && this._parseCorner(this.options.corner);
		
		// If we have a tip corner...
		if( (this.enabled = !!this.corner && this.corner.abbrev() !== 'c') ) {
			// Cache it
			this.qtip.cache.corner = c.clone();

			// Create it
			this.update();
		}

		// Toggle tip element
		this.element.toggle(this.enabled);

		return this.corner;
	},

	update: function(corner, position) {
		if(!this.enabled) { return this; }

		var elements = this.qtip.elements,
			tip = this.element,
			inner = tip.children(),
			options = this.options,
			size = this.size,
			mimic = options.mimic,
			round = Math.round,
			color, precedance, context,
			coords, translate, newSize, border;

		// Re-determine tip if not already set
		if(!corner) { corner = this.qtip.cache.corner || this.corner; }

		// Use corner property if we detect an invalid mimic value
		if(mimic === FALSE) { mimic = corner; }

		// Otherwise inherit mimic properties from the corner object as necessary
		else {
			mimic = new CORNER(mimic);
			mimic.precedance = corner.precedance;

			if(mimic.x === 'inherit') { mimic.x = corner.x; }
			else if(mimic.y === 'inherit') { mimic.y = corner.y; }
			else if(mimic.x === mimic.y) {
				mimic[ corner.precedance ] = corner[ corner.precedance ];
			}
		}
		precedance = mimic.precedance;

		// Ensure the tip width.height are relative to the tip position
		if(corner.precedance === X) { this._swapDimensions(); }
		else { this._resetDimensions(); }

		// Update our colours
		color = this.color = this._parseColours(corner);

		// Detect border width, taking into account colours
		if(color[1] !== TRANSPARENT) {
			// Grab border width
			border = this.border = this._parseWidth(corner, corner[corner.precedance]);

			// If border width isn't zero, use border color as fill (1.0 style tips)
			if(options.border && border < 1) { color[0] = color[1]; }

			// Set border width (use detected border width if options.border is true)
			this.border = border = options.border !== TRUE ? options.border : border;
		}

		// Border colour was invalid, set border to zero
		else { this.border = border = 0; }

		// Calculate coordinates
		coords = this._calculateTip(mimic);

		// Determine tip size
		newSize = this.size = this._calculateSize(corner);
		tip.css({
			width: newSize[0],
			height: newSize[1],
			lineHeight: newSize[1]+'px'
		});

		// Calculate tip translation
		if(corner.precedance === Y) {
			translate = [
				round(mimic.x === LEFT ? border : mimic.x === RIGHT ? newSize[0] - size[0] - border : (newSize[0] - size[0]) / 2),
				round(mimic.y === TOP ? newSize[1] - size[1] : 0)
			];
		}
		else {
			translate = [
				round(mimic.x === LEFT ? newSize[0] - size[0] : 0),
				round(mimic.y === TOP ? border : mimic.y === BOTTOM ? newSize[1] - size[1] - border : (newSize[1] - size[1]) / 2)
			];
		}

		// Canvas drawing implementation
		if(HASCANVAS) {
			// Set the canvas size using calculated size
			inner.attr(WIDTH, newSize[0]).attr(HEIGHT, newSize[1]);

			// Grab canvas context and clear/save it
			context = inner[0].getContext('2d');
			context.restore(); context.save();
			context.clearRect(0,0,3000,3000);

			// Set properties
			context.fillStyle = color[0];
			context.strokeStyle = color[1];
			context.lineWidth = border * 2;

			// Draw the tip
			context.translate(translate[0], translate[1]);
			context.beginPath();
			context.moveTo(coords[0], coords[1]);
			context.lineTo(coords[2], coords[3]);
			context.lineTo(coords[4], coords[5]);
			context.closePath();

			// Apply fill and border
			if(border) {
				// Make sure transparent borders are supported by doing a stroke
				// of the background colour before the stroke colour
				if(tooltip.css('background-clip') === 'border-box') {
					context.strokeStyle = color[0];
					context.stroke();
				}
				context.strokeStyle = color[1];
				context.stroke();
			}
			context.fill();
		}

		// VML (IE Proprietary implementation)
		else {
			// Setup coordinates string
			coords = 'm' + coords[0] + ',' + coords[1] + ' l' + coords[2] +
				',' + coords[3] + ' ' + coords[4] + ',' + coords[5] + ' xe';

			// Setup VML-specific offset for pixel-perfection
			translate[2] = border && /^(r|b)/i.test(corner.string()) ? 
				BROWSER.ie === 8 ? 2 : 1 : 0;

			// Set initial CSS
			inner.css({
				coordsize: (size[0]+border) + ' ' + (size[1]+border),
				antialias: ''+(mimic.string().indexOf(CENTER) > -1),
				left: translate[0] - (translate[2] * Number(precedance === X)),
				top: translate[1] - (translate[2] * Number(precedance === Y)),
				width: size[0] + border,
				height: size[1] + border
			})
			.each(function(i) {
				var $this = $(this);

				// Set shape specific attributes
				$this[ $this.prop ? 'prop' : 'attr' ]({
					coordsize: (size[0]+border) + ' ' + (size[1]+border),
					path: coords,
					fillcolor: color[0],
					filled: !!i,
					stroked: !i
				})
				.toggle(!!(border || i));

				// Check if border is enabled and add stroke element
				!i && $this.html( createVML(
					'stroke', 'weight="'+(border*2)+'px" color="'+color[1]+'" miterlimit="1000" joinstyle="miter"'
				) );
			});
		}

		// Position if needed
		if(position !== FALSE) { this.calculate(corner); }
	},

	calculate: function(corner) {
		if(!this.enabled) { return FALSE; }

		var self = this,
			elements = this.qtip.elements,
			tip = this.element,
			userOffset = this.options.offset,
			isWidget = this.qtip.tooltip.hasClass('ui-widget'),
			position = {  },
			precedance, size, corners;

		// Inherit corner if not provided
		corner = corner || this.corner;
		precedance = corner.precedance;

		// Determine which tip dimension to use for adjustment
		size = this._calculateSize(corner);

		// Setup corners and offset array
		corners = [ corner.x, corner.y ];
		if(precedance === X) { corners.reverse(); }

		// Calculate tip position
		$.each(corners, function(i, side) {
			var b, bc, br;

			if(side === CENTER) {
				b = precedance === Y ? LEFT : TOP;
				position[ b ] = '50%';
				position[MARGIN+'-' + b] = -Math.round(size[ precedance === Y ? 0 : 1 ] / 2) + userOffset;
			}
			else {
				b = self._parseWidth(corner, side, elements.tooltip);
				bc = self._parseWidth(corner, side, elements.content);
				br = self._parseRadius(corner);

				position[ side ] = Math.max(-self.border, i ? bc : (userOffset + (br > b ? br : -b)));
			}
		});

		// Adjust for tip size
		position[ corner[precedance] ] -= size[ precedance === X ? 0 : 1 ];

		// Set and return new position
		tip.css({ margin: '', top: '', bottom: '', left: '', right: '' }).css(position);
		return position;
	},

	reposition: function(event, api, pos, viewport) {
		if(!this.enabled) { return; }

		var cache = api.cache,
			newCorner = this.corner.clone(),
			adjust = pos.adjusted,
			method = api.options.position.adjust.method.split(' '),
			horizontal = method[0],
			vertical = method[1] || method[0],
			shift = { left: FALSE, top: FALSE, x: 0, y: 0 },
			offset, css = {}, props;

		// If our tip position isn't fixed e.g. doesn't adjust with viewport...
		if(this.corner.fixed !== TRUE) {
			// Horizontal - Shift or flip method
			if(horizontal === SHIFT && newCorner.precedance === X && adjust.left && newCorner.y !== CENTER) {
				newCorner.precedance = newCorner.precedance === X ? Y : X;
			}
			else if(horizontal !== SHIFT && adjust.left){
				newCorner.x = newCorner.x === CENTER ? (adjust.left > 0 ? LEFT : RIGHT) : (newCorner.x === LEFT ? RIGHT : LEFT);
			}

			// Vertical - Shift or flip method
			if(vertical === SHIFT && newCorner.precedance === Y && adjust.top && newCorner.x !== CENTER) {
				newCorner.precedance = newCorner.precedance === Y ? X : Y;
			}
			else if(vertical !== SHIFT && adjust.top) {
				newCorner.y = newCorner.y === CENTER ? (adjust.top > 0 ? TOP : BOTTOM) : (newCorner.y === TOP ? BOTTOM : TOP);
			}

			// Update and redraw the tip if needed (check cached details of last drawn tip)
			if(newCorner.string() !== cache.corner.string() && (cache.cornerTop !== adjust.top || cache.cornerLeft !== adjust.left)) {
				this.update(newCorner, FALSE);
			}
		}

		// Setup tip offset properties
		offset = this.calculate(newCorner, adjust);

		// Readjust offset object to make it left/top
		if(offset.right !== undefined) { offset.left = -offset.right; }
		if(offset.bottom !== undefined) { offset.top = -offset.bottom; }
		offset.user = this.offset;

		// Viewport "shift" specific adjustments
		if(shift.left = (horizontal === SHIFT && !!adjust.left)) {
			if(newCorner.x === CENTER) {
				css[MARGIN+'-left'] = shift.x = offset[MARGIN+'-left'] - adjust.left;
			}
			else {
				props = offset.right !== undefined ?
					[ adjust.left, -offset.left ] : [ -adjust.left, offset.left ];

				if( (shift.x = Math.max(props[0], props[1])) > props[0] ) {
					pos.left -= adjust.left;
					shift.left = FALSE;
				}
				
				css[ offset.right !== undefined ? RIGHT : LEFT ] = shift.x;
			}
		}
		if(shift.top = (vertical === SHIFT && !!adjust.top)) {
			if(newCorner.y === CENTER) {
				css[MARGIN+'-top'] = shift.y = offset[MARGIN+'-top'] - adjust.top;
			}
			else {
				props = offset.bottom !== undefined ?
					[ adjust.top, -offset.top ] : [ -adjust.top, offset.top ];

				if( (shift.y = Math.max(props[0], props[1])) > props[0] ) {
					pos.top -= adjust.top;
					shift.top = FALSE;
				}

				css[ offset.bottom !== undefined ? BOTTOM : TOP ] = shift.y;
			}
		}

		/*
		* If the tip is adjusted in both dimensions, or in a
		* direction that would cause it to be anywhere but the
		* outer border, hide it!
		*/
		this.element.css(css).toggle(
			!((shift.x && shift.y) || (newCorner.x === CENTER && shift.y) || (newCorner.y === CENTER && shift.x))
		);

		// Adjust position to accomodate tip dimensions
		pos.left -= offset.left.charAt ? offset.user : horizontal !== SHIFT || shift.top || !shift.left && !shift.top ? offset.left : 0;
		pos.top -= offset.top.charAt ? offset.user : vertical !== SHIFT || shift.left || !shift.left && !shift.top ? offset.top : 0;

		// Cache details
		cache.cornerLeft = adjust.left; cache.cornerTop = adjust.top;
		cache.corner = newCorner.clone();
	},

	destroy: function() {
		// Unbind events
		this.qtip._unbind(this.qtip.tooltip, this._ns);

		// Remove the tip element(s)
		if(this.qtip.elements.tip) {
			this.qtip.elements.tip.find('*')
				.remove().end().remove();
		}
	}
});

TIP = PLUGINS.tip = function(api) {
	return new Tip(api, api.options.style.tip);
};

// Initialize tip on render
TIP.initialize = 'render';

// Setup plugin sanitization options
TIP.sanitize = function(options) {
	if(options.style && 'tip' in options.style) {
		opts = options.style.tip;
		if(typeof opts !== 'object') { opts = options.style.tip = { corner: opts }; }
		if(!(/string|boolean/i).test(typeof opts.corner)) { opts.corner = TRUE; }
	}
};

// Add new option checks for the plugin
CHECKS.tip = {
	'^position.my|style.tip.(corner|mimic|border)$': function() {
		// Make sure a tip can be drawn
		this.create();
		
		// Reposition the tooltip
		this.qtip.reposition();
	},
	'^style.tip.(height|width)$': function(obj) {
		// Re-set dimensions and redraw the tip
		this.size = size = [ obj.width, obj.height ];
		this.update();

		// Reposition the tooltip
		this.qtip.reposition();
	},
	'^content.title|style.(classes|widget)$': function() {
		this.update();
	}
};

// Extend original qTip defaults
$.extend(TRUE, QTIP.defaults, {
	style: {
		tip: {
			corner: TRUE,
			mimic: FALSE,
			width: 6,
			height: 6,
			border: TRUE,
			offset: 0
		}
	}
});

;}));
}( window, document ));


