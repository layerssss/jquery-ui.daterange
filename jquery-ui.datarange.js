// Generated by CoffeeScript 1.6.3
(function() {
  var bind, getDayDate;

  getDayDate = function(ele) {
    return Number(new Date(ele.dataset.year, ele.dataset.month, $(ele).text()));
  };

  bind = function(ele) {
    return setTimeout((function() {
      var $days;
      $days = $(ele).find('[data-handler="selectDay"]');
      $days.mousedown(function(ev) {
        ev.preventDefault();
        return ele.datarange_start = getDayDate(this);
      });
      $days.mousemove(function(ev) {
        var d, day, _i, _len;
        if (!ele.datarange_start) {
          return;
        }
        ele.datarange_end = getDayDate(this);
        for (_i = 0, _len = $days.length; _i < _len; _i++) {
          day = $days[_i];
          d = getDayDate(day);
          if ((ele.datarange_end - d) * (d - ele.datarange_start) >= 0) {
            $(day).find('.ui-state-default').addClass('ui-state-active');
          } else {
            $(day).find('.ui-state-default').removeClass('ui-state-active');
          }
        }
        return $(ele).trigger('datarange:selecting', [ele.datarange_start, ele.datarange_end]);
      });
      return $days.mouseup(function(ev) {
        ev.preventDefault();
        if (ele.datarange_start) {
          $(ele).trigger('datarange:select', [ele.datarange_start, ele.datarange_end]);
        }
        return ele.datarange_start = null;
      });
    }), 0);
  };

  $.widget('micyin.datarange', {
    _create: function() {
      var ele, opt;
      ele = this.element;
      opt = this.options;
      ele.datarange_start = null;
      ele.datarange_end = null;
      $(ele).datepicker($.extend({}, this.options, {
        onSelect: function() {
          var _ref;
          bind(this);
          if (((_ref = opt.onSelect) != null ? _ref.constructor : void 0) === Function) {
            return opt.onSelect.apply(this, arguments);
          }
        },
        onChangeMonthYear: function() {
          var _ref;
          bind(this);
          if (((_ref = opt.onChangeMonthYear) != null ? _ref.constructor : void 0) === Function) {
            return opt.onChangeMonthYear.apply(this, arguments);
          }
        }
      }));
      return bind(ele);
    }
  });

}).call(this);
