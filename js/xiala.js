var xiala = (function () {
    return {
        init: function () {
            // 标题
            this.$title = $('.title>span');
            // 一级菜单集合
            this.$click_dropAll = $('.click_drop');
            // 二级菜单集合
            this.$hide_dropAll = $('.drop_seconds');
          
           
            this.getData()
            this.hide_moreTwo()
            this.event()

            
        },
        event: function () {
            var _this = this;

            // 点击一级菜单  该块的隐藏块展示
            this.$click_dropAll.click(function() {
                $(this).find('i').toggleClass('shop-arrow-down');
                // 防止多次点击  动画重叠
                $(this).next().stop().slideToggle('slow')

                // 点击后 其他一级菜单块的隐藏块icon变化  再  隐藏
                $(this).parent().siblings().find('em>i').attr('class','shop shop-arrow-up')
                $(this).parent().siblings().find('.drop_seconds').slideUp('slow')
            })


            // 按钮的点击事件
            this.$hide_dropAll.on('click','button',function() {
                // 弹窗显示，并渲染值
                $('.hide_box').show()
                $('.hide_box h3').html($(this).parents('.drop_out').index()-1 + ' - '+ $(this).parent().index())
            })
            
            // 弹窗的点击事件
            $('.hide_box').click(function() {
                $(this).hide()
            })

            // 隐藏块按钮显示
            $('.hide_two').click(function() {
                $(this).hide()
                $('.box').removeClass('hide')

            })

        },

        // 获取数据
        getData: function () {
            var _this = this;
            $.get("menu.json",function (data) {
                    _this.data = data;
                    _this.xuanran();
                });
        },

        // 渲染页面数据
        xuanran:function() {
            var _this = this;
            // 标题
            _this.$title.html(_this.data[0].name)  
            for(var i = 0; i < _this.data[0].child.length; i++) {
                // 渲染一级菜单标题
                var drop = _this.data[0].child[i].name + '  '+ _this.data[0].child[i].content
                this.$click_dropAll.eq(i).children('span').html(drop)

                // 渲染二级菜单标题
                for(var j = 0; j <  _this.data[0].child[i].child.length; j++) {
                    // 循环找到对应一级标题下的 对应 隐藏二级块(通过j 循环)
                    // 二级菜单标题
                    var hide_dropName = _this.data[0].child[i].child[j].name 
                    // 二级菜单说明
                    var hide_dropsec = _this.data[0].child[i].child[j].content

                    this.$hide_dropAll.eq(i).find('.seconds_left').eq(j).find('.seconds_title').html(hide_dropName);
                    this.$hide_dropAll.eq(i).find('.seconds_left').eq(j).find('.seconds_sec').html(hide_dropsec);

                }
                
            }
        },

        // 多出两个  就隐藏的功能
        hide_moreTwo:function(ele) {
            var _this = this;
            if($('.box>ul').children().length > 3) {
                $('.box').addClass('hide')
                $('.hide_two').show()
            }
        }
    }
}())