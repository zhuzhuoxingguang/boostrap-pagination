$.fn.pagination = (function ($) {
  var options = {
    pageSize: 9,
    current: 1,
    pages: 20
  }
  var type = null;

  // 继承合并传递进来的options
  function extendOptions (opts) {
    $.extend(options, opts);
  }
  // 创建分页
  function createPages (page) {
    setPage(page)
    $(this).empty();
    if (page > 1) {
      createAssist.call(this)
    }
    if (options.pages <= options.pageSize || (options.pageSize < options.pages && page <= options.pageSize)) {
      options.pageSize = Math.min(options.pages, options.pageSize)
      for (var i = 1; i <= options.pageSize; i++) {
        var $pageLi = $("<li></li>").data("page", i).append($("<a href ='javascript:;'></a>").text(i))
        if (i === page) {
          $pageLi.addClass("active")
        }
        $pageLi.appendTo($(this))
      }
    } else if (options.pageSize < options.pages) {
      var front = Math.ceil(options.pageSize / 2)
      for (var i = 1; i < front + 1; i++) {
        var $pageLi = $("<li></li>").data("page", i).append($("<a href ='javascript:;'></a>").text(i))
        if (i === front) {
          $pageLi.data("page", Math.ceil(options.current / 2)).children("a").html("...")
        }
        $pageLi.appendTo($(this))
      }
      if (options.current > options.pages - 2) {
        var num = front % 2 === 1 ? front - 2 : front - 1
        for (var i = options.pages - num; i <= options.pages; i++) {
          var $pageLi = $("<li></li>").data("page", i).append($("<a href ='javascript:;'></a>").text(i))
          if (i === options.current) $pageLi.addClass("active")
          $pageLi.appendTo($(this))
        }
      } else {
        for (var i = options.current - Math.floor(front / 2) + 1; i <= options.current + Math.floor(front / 2); i++) {
          var $pageLi = $("<li></li>").data("page", i).append($("<a href ='javascript:;'></a>").text(i))
          if (i === options.current) $pageLi.addClass("active")
          $pageLi.appendTo($(this))
        }
      }
    }
    if (page < options.pages)
      createAssistLast.call(this)
  }

  // 创建首页和向前
  function createAssist () {
    if ($(this).children("li").first().text() == '首页') return;
    var $pageFirst = $("<li></li>").append($("<a href ='javascript:;'></a>").attr(
      "aria-label", "first").text("首页"))
    var $pagePrev = $("<li></li>").append($("<a href ='javascript:;'></a>").attr(
      "aria-label", "prev").html("&laquo;"))

    $(this).prepend($pagePrev).prepend($pageFirst)
  }

  // 创建尾页和向后
  function createAssistLast () {
    if ($(this).children("li").last().text() == '尾页') return;
    var $pageLast = $("<li></li>").append($("<a href ='javascript:;'></a>").attr(
      "aria-label", "last").text("尾页"))
    var $pageNext = $("<li></li>").append($("<a href ='javascript:;'></a>").attr(
      "aria-label", "next").html("&raquo;"))
    $(this).append($pageNext).append($pageLast)
  }

  // 设置当前页
  function setPage (val) {
    options.current = val
  }

  // 事件绑定
  function bindEvent (fn) {
    var _this = this;
    $(this).on("click", "li a", function (e) {
      e.preventDefault()
      type = $(this).attr("aria-label")
    }).on("click", "li", function () {
      var page = $(this).data("page")
      if (page) {
        setPage(page)
        $(this).addClass("active").siblings().removeClass("active")
        type = null;
        if (page === 1) {
          for (var i = 0; i < 2; i++) {
            $(this).children("li").first().remove()
          }
        } else {
          createAssist.call(this)
        }
        if (page == options.pages) {
          for (var i = 0; i < 2; i++) {
            $(this).children("li").last().remove()
          }
        } else {
          createAssistLast.call(_this)
        }
      } else {
        extraOption(type)
      }
      createPages.call(_this, options.current)
      if (fn) fn(options.current, options.pages)
    })
  }
  // 操作 首页 上一页  尾页  下一页 时  修改当前页码
  function extraOption (val) {
    switch (val) {
      case "first":
        options.current = 1;
        break;
      case "prev":
        options.current--
        break;
      case "next":
        if (options.current < options.pages) options.current++
        break;
      case "last":
        options.current = options.pages
        break;
    }
  }
  // 初始化
  function init (opts) {
    extendOptions(opts)
    createPages.call(this, options.current)
    bindEvent.call(this, options.callback)
  }
  return function (opts) {
    init.call(this, opts)
  }
})($)