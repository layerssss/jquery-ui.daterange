getDayDate = (ele)->
	return Number new Date ele.dataset.year, ele.dataset.month, $(ele).text()

bind = (ele)->
	setTimeout (->
		$days = $(ele).find('[data-handler="selectDay"]')
		$days.mousedown (ev)->
			ev.preventDefault()
			ele.datarange_start = getDayDate(this)
		$days.mousemove (ev)->
			return unless ele.datarange_start
			ele.datarange_end = getDayDate(this)
			for day in $days
				d = getDayDate day
				if (ele.datarange_end - d) * (d - ele.datarange_start) >= 0
					$(day).find('.ui-state-default').addClass 'ui-state-active'
				else
					$(day).find('.ui-state-default').removeClass 'ui-state-active'
			$(ele).trigger 'datarange:selecting', [ele.datarange_start, ele.datarange_end]
		$days.mouseup (ev)->
			ev.preventDefault()
			if ele.datarange_start
				$(ele).trigger 'datarange:select', [ele.datarange_start, ele.datarange_end]
			ele.datarange_start = null
		), 0
$.widget 'micyin.datarange',
	_create: ->
		ele = this.element
		opt = this.options
		ele.datarange_start = null
		ele.datarange_end = null
		$(ele).datepicker $.extend {}, this.options,
			onSelect: ->
				bind this
				opt.onSelect.apply this, arguments if opt.onSelect?.constructor is Function
			onChangeMonthYear: ->
				bind this
				opt.onChangeMonthYear.apply this, arguments if opt.onChangeMonthYear?.constructor is Function
		bind ele







		
