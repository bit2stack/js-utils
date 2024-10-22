(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return (root.BitSnackbar = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = root.BitSnackbar = factory();
    } else {
        root.BitSnackbar = factory();
    }
})(this, function() {
    var BitSnackbar = {};

    BitSnackbar.current = null;
    var $defaults = 
    {
        bgColor:            '#323232',
        position:           'top-center',
        opacity:            1,
        margin:             '10px',
        width:              'auto',
        duration:           3500,
        showHeader:         false,
        showAction:         true,
        autoHide:           true,
        customClass:        null,
        headerBgColor:      null,
        headerLabel:        null,
        headerLabelColor:   '#FFFFFF',
        headerLabelBgColor: null,
        headerIcon:         null,
        title:              null,
        titleFontColor:     '#FFFFFF',
        titleFontSize:      '17px',
        titleAlign:         'left',
        message:            'No Message',
        messageFontColor:   '#FFFFFF',
        messageFontSize:    '14px',
        messageAlign:       'left',
        actions:            null,
        onClose:            null
    };

    BitSnackbar.show = function($options) 
    {
        var options = Extend(true, $defaults, $options);
        fire(options);
    };

    BitSnackbar.tiny = function($options)
    {
        $options.showAction = false;
        $options.messageAlign = 'center';
        BitSnackbar.show($options);
    };

    BitSnackbar.info = function($options)
    {
        $options.showHeader = true;
        $options.headerColor = 'info';
        $options.headerIcon = 'info';
        BitSnackbar.show($options);
    };

    BitSnackbar.success = function($options)
    {
        $options.showHeader = true;
        $options.headerColor = 'success';
        $options.headerIcon = 'success';
        BitSnackbar.show($options);
    };

    BitSnackbar.warning = function($options)
    {
        $options.showHeader = true;
        $options.headerColor = 'warn';
        $options.headerIcon = 'warn';
        BitSnackbar.show($options);
    };

    BitSnackbar.danger = function($options)
    {
        $options.showHeader = true;
        $options.headerColor = 'danger';
        $options.headerIcon = 'danger';
        BitSnackbar.show($options);
    };

    function fire(o)
    {
        if (BitSnackbar.current) 
        {
            BitSnackbar.current.style.opacity = 0;
            setTimeout(
                function() 
                {   // possible null if too many/fast BitSnackbars
                    var $parent = this.parentElement;
                    if ($parent) $parent.removeChild(this);
                    if (typeof(o.onClose) == 'function') o.onClose();
                }.bind(BitSnackbar.current),500);
        }

        var nest      = document.body;
        var container = getContainer(o);
        var message   = getMessage(o);
        
        if(o.showHeader)
        {
            var header = getHeader(o); 
            container.appendChild(header);
        }
        container.appendChild(message);

        if(o.showAction)
        {
            var action = getAction(o); 
            container.appendChild(action);
        }
        nest.appendChild(container);

        var $bottom = getComputedStyle(container).bottom;
        var $top    = getComputedStyle(container).top;
        container.style.opacity = o.opacity;
        container.classList.add("bit-snackbar-pos", o.position);
        
        var $height = getComputedStyle(container).height;
        container.style.height = $height;

        BitSnackbar.current = container;
    };
    
    function getContainer(o) 
    {
        var container = document.createElement('div');
            container.style.width       = o.width;
            container.style.margin      = o.margin;
            container.style.background  = o.bgColor;
            container.classList.add("bit-snackbar-container");
        if(typeof(o.customClass) === "string") container.classList.add(o.customClass);

        if(o.autoHide)
        {
            setTimeout(
                function() 
                {
                    console.log("aaa");
                    if (BitSnackbar.current === this) 
                    {   // When natural remove event occurs let's move the snackbar to its origins
                        BitSnackbar.current.style.opacity = 0;
                        BitSnackbar.current.style.top     = '-100px';
                        BitSnackbar.current.style.bottom  = '-100px';
                    }
                }.bind(container),o.duration);

            container.addEventListener(
                'transitionend',
                function(event, elapsed) 
                {
                    if (event.propertyName === 'opacity' && this.style.opacity === '0') 
                    {
                        if (typeof(o.onClose) === 'function') o.onClose(this);
                        if (BitSnackbar.current === this)        BitSnackbar.current = null;
                        this.parentElement.removeChild(this);
                    }
                }.bind(container));
        }
    
        return container;
    };

    function getHeader(o) 
    {
        var colorSet = "info"+"success"+"warning"+"danger";

        var wrapper = document.createElement('div');
            wrapper.classList.add('snack-header');

        if(colorSet.includes(o.headerColor))
        {
            wrapper.classList.add('bg-'+o.headerColor); 
            wrapper.style.borderRadius = '4px 0px 0px 4px';
        }
        else if(o.headerColor != null)
        {
            wrapper.style.background   = o.headerColor; 
            wrapper.style.borderRadius = '4px 0px 0px 4px';
        }

        if(colorSet.includes(o.headerLabelColor))
        {
            wrapper.classList.add('text-'+o.headerLabelColor);
        }
        else if(o.headerLabelColor != null)
        {
            wrapper.style.color = o.headerLabelColor;
        }
        
        if(typeof(o.headerLabel) === "string")
        {
            var label = document.createElement('p');
                label.innerHTML = o.headerLabel;

            if(colorSet.includes(o.headerLabelBgColor)) 
            {
                label.style.padding = '0px 7px';
                label.style.borderRadius = '2px';
                label.classList.add('text-bg-'+o.headerLabelBgColor);
            }
            else if(o.headerLabelBgColor != null)
            {
                label.style.padding = '0px 7px';
                label.style.borderRadius = '2px';
                label.style.backgroundColor = o.headerLabelBgColor;
            }
            wrapper.appendChild(label);
        }

        if(o.headerIcon != null)
        {
            var icons = 
            {
                info:           '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',
                info_colored:   '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',
                success:        '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',
                success_colored:'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',
                warn:           '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',
                warn_colored:   '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',
                danger:         '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',
                danger_colored: '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',
                question:       'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAAD9FJREFUeF7tXQuS3DYO7T5J1ifJ5iRJTrL2STY5ydonWeckyqCXTLiqVjcBPoAAia5yTXtGokjgPfwISfdbflICG0vgvvHac+kpgVsSIEGwtQSSAFurPxefBEgMbC2BJMDW6s/FJwESA1tLIAmwtfpz8UmAxMDWEkgCbK3+XHwSIDGwtQSSAFurPxefBEgMbC2BJMDW6s/FJwESA1tLIAmwtfpz8UkAMAaO4/jH7Xajfz+Woek7fa5+0t++N9Oo39vffSvHfL/f7+3vwbPfb7gkgFDnJ6BX0P9TOBzntEqAr+Wkb/f7/TfOAHns3xJIAjDQUED/8+12I6BbgJ0xu4cXIVIkIRhSSwK8EJZzwL9Sc+slfr/f79VbMKCxx6FJgJOeA4P+HSEoTCIyZA7RSCoJUITRAP/zwrYvw6STcrcmwCagv+IzkWF7r7AlATYH/pkQWxNhKwIk8F8GdzU8+rJTnrAFARL4rKxmKyIsT4DjOP71of6VE1sWuhkHP0Kj+/3+hXFOuEOXJUCx+v92uGEVDSRLE2E5AjgId9pNqPqdennq5/G7Ns4uc65/rz1D9P9zT9HM3WfaTPt1tfxgKQIcx/HL7XYjq2/1ITC3tXX1HdemB6mSg9Zs9VnOGyxDgOM4/mMQ7lSw00/quVEHfA+yCynIO1AHqgUhaP0/reANwhOgKJ/A34YOPbjhHEMbRiGazBoPQU17mmRYwhuEJoByhSe8go08w+fIlaKQBFCu8FDJdLmmMeXiQNiQKBwBiiL/y4lfOo4Nb+071vg4pCEChUfIsJFkSFUiF3lRrzxCEeA4Dkr0KN5HfbYB/llgSkQIJ88wBFAAP+1y/opiUtRxFEKjUCQIQQBwfT+kq9YmmEJeFSI5dk8AcKUnhFK0wf5q/GJsqH8KkR+4l7drAhzHQbu6iFr21/v9/tNMYEW6Njgsch1quiUA0PK7t0JeyQHUgVsSuCQAKObPWB/ALOBOu0tD5I4AoGpPhjwA8NchgCGROxK4IgAI/G7dLRCTU4YChETuSqRuCAACvzsLMwWpihcFkcDNjrELAoDaG0io+YxMRfA3IdHofRdueoe8EGC0l59600P1oBjgVPUSAKNFT7r+pDrJjsGnEwDgUhP8HYrWOARQIZqer00lACDuT/BrIJsxJsATTA1dpxEAILhw4D/dz/tDgzNqO6C4+I/yu3rjfIiwbtCQTc0HZhJgJO6fajV6DSTgSdPmN933ru1Je/VIYjwtH5hCgMG433WpU6nPvuLN9XM8I+rVnACDoc/0pOnKQpZ1URclonnvnSF2+/jCARJMCYVmEEAa+rhsbwC2CbwD/bO/u9tZpUkOdPGa69iUAAPJ0rQYsaN33vJBXFfTMQfOG7lQUi99VI1pccOaAHQzu+RGC1Oh9JjiASvXM7zkmCkhxJuQUPLwAlNjZ0aAgdjQVdKrcOugBOxX53gjgbQyZJbrmRBgIPH16NolVg0J8ndjeSOB5K4+s3s5rAggEQIp+pOX508OkPgdYDX+bhpGKOUDJl5AnQADwHGz2eU87LnCnwmAetgrvMPPxAtYEEBi/b2FPtLSbYuPdleXfk/vDCBL/b15PwAVCOpjz+nn6PsA3BQPhE/vViexBQGOHitxOsaT4kZfsSSu1QM219wYEmEkoO4FVAkgLBWqs76XkAP7FnQJMfCf9NmEqau/yQckxkQVD9oEYFv/j0dtq86pF/xlR1Ma+sAt78COM3wuHBm2xwrvH1CtaqmBTWj9PSW+0hq2KuAE+yluKkLFqEjkquYFNAnA3vV1Zv3Z8/9IWlXBXwBE4RC36c5TTiUJ59RIrEIAYdnLzY6vcP7q4K/hhCChVLOgknBIKF8VEmsRQBI7e9r0Ylt/a+/FBJGaBRUSgLwAd0ddxcBoEYCb/HqzULUGTy+a66nFm+cuXC9gTdB3xBDkiCrJMJwATMtU5eTG+l+UIOsbF591sk6zrszNJVcy5hK46AUeJmsQgBs+uLL+HX0t5wRUJTZ9Z0FLQsypq0+b59VamAR+7K2gnyUEJYBw48g8fOgBVwcRHi+mnvmaJaa39UgAyTvfoOtAE4Dd9+MtNh0lh+X5TIPjztB4CIPQBFg2/LEEdu+1ohNAuNsOrQahCcCt/kDdWS9wVjmOGQK5SoKbPQ1uGATNA2AEYCrjsf4Mf8aoyCwleiWAZE8AZjiRBODG/2GqP2Mw1TubQwDPxkZQDYKVQ5EE4Mb/7pIyPajqjHwcR6/MoWEDejWC6AG2HiQBuPG/S5eMVq7WeEzQuPa2kmoQyqNBCMBURsb/AFYwwwb33pbhzar0IHkAigCcHUlagGuLBMCn6hBcg4OylpqLYhKapgLJA1AE4CbA7i2SprJHx2aCJYSxEdzoA9kPQBGgNxmrus/4X8gCJvjpKpBQQTjd7tOYm3o0LiQRRhEgE+BuVcsPFIAkzF6LIBGOS4AIMakcpjpnSsAfxfo3u8LmhnTYA3ATMov7ZnUgOG9UgXUMWWiYEd7NIECIpGwe3P//ykLwQ8IDaxkICDBcTEEQgFsBgpSvrJUz43rCsCdM4nuWqaASNIylGQQYZu0MMFpfcwD8w6CwXmuTA3CfGTQcTcwgQIiy3CwQ0HUHwA+pjc9au2Ddw+tFEID7CJQkwAuECUBQRxu2hrOA33gA7r0BSYDZSkNef2fwCz2fCwLkLjCABbuDvxCAe3PMcLULEQIlAQYJkOD/nwAFJd8kwCD2pp8+AP7lqmlRCcDavs42iL85NwD+ZQsJH3sBpnhChECmE55usoETEOx8ht3k6hVbRAJkDtCr3eY4zg3tzWnLWv6mFGpqUBEeIAnAJIAw9NkB/FkFYmIp3OGCRI/WuFzC+0xxAtm4qALlTjCDhoLQZ3izhzG9qYcKPOOwbBAhUBKAARvrJI8xtemHJgGmq0B3AoJ23/D9PRyJCggwLB+EB+DeD7BFPHsR42bB4AUjBHcXuiAA95lAYfvVOdbsggCcEt+wckfna33+DA+J8ADcmxiGExdrxSCuN8O6IeZtOYagQDAcTSAIwO3hHi5dWSoFda0ZykXN3WqcGY9HRBDAfPPCSiHI6wgIsN3Dw7gVstvtNiyjYQIQSGZMHAlOi7G41m3HpkEujhAyQhEg9wLesIip3O3CREGOBMklZxFgu0oQkwAQ5Vp4NtQ1BASAVMlQBOCWQrdSsKDHZSv5lDCau58EMaIoAmQl6PUGD7dQALFuKOtsMQ43R0I1CKIIwFUwyXT59t4KnOIByEj0figH+Np7cPTjBC0QsKdeQwhQXBg3EYa4sOjKz/k/qojczVSYh0QSIPOARLNIAoI9EpjxRBIg8wCR+vMkZoUMGj4jCZB5QGKZLQFB+AOL/2myMAII84Dtyn1shCx+giD8gcX/GgTg5gHb7Xgujmf28gThz3AHaDtJtAeQhEHQBbE1kCdMk4Ak/EE0wKkRIMOgaVgKeWHBg8Gg4Q88BCoE4NZ0oVl9SCRsOGlBewhJCR4tQEOgQgBJGARn9oaYCrVkQfILrf5UYcEJUEjAbWz6Xti9zfZ/KLQqTFaQ/KoYSS0CcDfFSMQqC1TQXQ45KAGJ9dfqHVMhgDAZJi9ADXL0Mz8LS0Bg/VXCH5UkuOpNWOLaxgs0HaI/fIR/f9xuty06QAWPPlFJflVzgIFkeHkvUIBPOdKz9mhaPxmBL6s6AE/WX9UDDJREl22PYHjFJQ2BoO5PMIJ1fj4zKmo5wIAXoFOXu1lGcNPHUm0igvU/8Ip48sMrb6pKgAEvsJTyhUUBdetnGWZ5tP7qIdCgF1gmIWaEPmdMLmEIhImvuvU3IUAhAXdjjE5bZnNMCoDChuGnn1la+vO1hC0PNIyJAVQPgRovQPcMU5sE57OKBZQYgCqn0PmQMPQxsf5mHmAgFzCzBBxWco+VgqBcB94Axp2/9PgBz2e2ZhMPUAU4AAQzgUiV/eq8ASDQsCFDIGnV52N/xLQMbk0ASadozQfCtkkMgMEsFEASfyDup2mYhnymBCihEPe2yaqbsPnAm93fV9hT3QRCgr4da8DTmyS+7VxnEIC8gCQhDp0PCKyiaSiAIsMA+Kd4O3MCDCbE0UnQ6/1CloAHcx3T0KcSfgoBBkMhOj1kaFDW/c4DhlzbwGYfiWWat5tJAALCVVdkj0cOCZSGBPSVOkJ/LJt+36I+EHckyS9t4J96FK5xzDQCNECgd+dKP2FJIF2wt/MGwW9e9TnLbyoBAPnA8v3z3gB/qvZIbn1th5huwKYToJBgpFUgdE7gGeCv5gaw/NPi/nZdXgjwLjHswcl0a9IzyRWOGUx4SQRu9nRcEKCzOtKDnSRBj5QGjhksddYrTyl5Plu2GwKAkmIaxnw3cQBPoU4VPs7kvEY34KeJuSIAkARL3lM7iy0DrRyuwe+SAIDKUBV6VogAjAEku3UWLjt63XmAKi1QrJkVogES7KADtwQonqC3d+admjMkeieh5u/AkMd9TuaaAAokWPqhUwyMXx4KtPohvK97AgBzgjY3+HK/339DAGaVMcBWn8TiMuY/6ysEAYDVoXb9RAAiwtYP4y3A//lDMJ+BZHZV6ny1rjAEaEggvZnmmRwelaKP+25/340ISsAnGYcBv9sy6CvGFsUhSUCX24YIisAPeRNPKA/QlEipdwjttisR6C015BGWeluNIvBJbi4a2yQhXEgCNERAlUmvwqPQyXIDejIY9PJCjU/o/qvQBFDKC84gIddO3oDu2ApROVK29m01jSo9oT1leAI0JNAIiS7J4OmNLg3gab7Ias6Vxwgb8oQtg/b47tKnTmER9xmkPcNfhUl/eYhCCtWyagE7zYUIT3dkPXvTjHQ9PeeFDnmWJoCxN7gCSyVADQ2+lSpTGzrQM3D+IkoDajqmJS99p3eI0U/6Zw32do3LWP12UUuEQM+QqLCz2WMdVzwmZHmzVxHLEuBUKaIKiFVY1Cv7CMctFe48E/jyBHASFkUAeztHSqS32B3fggCNN9DaQIsG8Kv5bgP8KoCtCJBEuOTp8qHO1cq3JMATIuyYI+Qtox5vip8VS5SqEe0haLUMzFra+boE/NAtHkhBbu0BXpRPqd5eN5qQ8p41Vlr7C8knAV5AsniFqGTYpsV7xKokATqlV8hAVSR6nPmMFoR3M62AD/uY9XcL1Ph7EkAo1YYQlRRWrQptqwV9T8ALdUinJQEGhPcih6i9O+Qt6qfuRJ97fejvbQPd+Xv9fwIdrKskgIJAc8hYEkgPEEtfOVuwBJIAYIHmcLEkkASIpa+cLVgCSQCwQHO4WBJIAsTSV84WLIEkAFigOVwsCSQBYukrZwuWQBIALNAcLpYEkgCx9JWzBUsgCQAWaA4XSwJJgFj6ytmCJZAEAAs0h4slgSRALH3lbMESSAKABZrDxZJAEiCWvnK2YAn8CUQUAjmnUTomAAAAAElFTkSuQmCC'
            };

            var icon = document.createElement('img');
                icon.src = 'data:image/png;base64,'+ icons[o.headerIcon];
                icon.style.width = typeof(o.title) == "string"? '35px':'24px';
                wrapper.appendChild(icon);
        }

             if(o.headerIcon  == null && o.headerLabel == null)         wrapper.style.paddingLeft = '5px';
        else if(o.headerIcon  != null && o.headerColor == null)         wrapper.style.paddingLeft = '10px';
        else if(o.headerLabel != null && o.headerLabelBgColor != null)  wrapper.style.paddingLeft = '10px';
        else if(o.headerLabel != null && o.headerColor == null)         wrapper.style.paddingLeft = '15px';
        else wrapper.style.padding = '0 10px';

        return wrapper;
    };

    function getMessage(o) 
    {
        var alignSet = 'left'+'center'+'right';

        var wrapper = document.createElement('div');
            wrapper.classList.add('snack-message');
        
        if(typeof(o.title) === "string")
        {
            var title = document.createElement('p');
                title.classList.add('title');
                title.style.fontSize = o.titleFontSize;
                title.style.color    = o.titleFontColor;
                title.innerHTML      = o.title;

                if(alignSet.includes(o.titleAlign)) 
                {
                    var align;
                         if(o.titleAlign == 'left')   align = 'flex-start';
                    else if(o.titleAlign == 'right')  align = 'flex-end';
                    else align = o.titleAlign;
                    title.style.alignSelf = align;
                }
            wrapper.appendChild(title);
        }

        var message = document.createElement('p');
            message.style.fontSize = o.messageFontSize;
            message.style.color    = o.messageFontColor;
            message.innerHTML      = o.message;

            if(alignSet.includes(o.messageAlign)) 
            {
                var align;
                     if(o.messageAlign == 'left')   align = 'flex-start';
                else if(o.messageAlign == 'right')  align = 'flex-end';
                else align = o.messageAlign;
            message.style.alignSelf = align;
            }
            wrapper.appendChild(message);

        return wrapper;
    };

    function getAction(o){
        var wrapper = document.createElement('div');
            wrapper.classList.add('snack-action');

        var icons = 
        {
            close:      'iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAydJREFUeF7tnOFtwyAQhY9N2k2aTZpJqk6SUZpN2k1SIRkpsuKAMcd7F7386Q+7uuP7fAQDIZk+UAIJGl3BTQLAD4EESACYADi8KkACwATA4VUBEgAmAA6vCpAAMAFweFWABIAJgMOrAiQATAAcXhUgAWAC4PCqAAkAEwCHVwW8uoDb7fZmZl9m9p1S+gO3tyn8kvOPmZ28c3atgKUhFzP7MLMM371BTYSf3LTk/Lvc4p6zm4AV/NJk9wYdEbCCPyVnFwEb8Kc0qFfABnz3nIcLqMB3b1CPgAp815w9BOQ+/7MBBEV31Ai/NOeaUjo1tK35Fg8BedSTRxD5b+0DlbATfs71nFK61hq15/pwATn43TCOVgID/MzKRQC7BBb4rgJYJTDBdxfAJoEN/hQBLBIY4U8TgJbACn+qAJQEZvjTBcyWwA4fImCWhAjwYQK8JUSBDxXgJSESfLiA0RKiwacQMEpCRPg0Ao5KiAqfSkCvhGXqt6zh1maCXaaUa0GfXXebDe1NqmMqu2XKO6dDB5+uAoq0nRJaXFPCpxXQ0R09k0ALn1rAIAnU8OkFHJRADz+EgE4JIeBHE9A61CwjHvptkCEE7HzJuv8yhm55aRma0Qs4AL+0n14C3YvY6l1gT7ez9dBRS6AUMODJX8uglUAnYCf88oOPlukISglUAjrgn5c5nhB7UR/1kTQCeuCXjbI7546oKoFCwBH4nRN4NBLgAkbAjywBKmAk/KgSYAI84EeUABHgCT+ahOkCZsCPJGGqgJnwo0iYJgABP4KEKQKQ8NkluAtggM8swVUAE3xWCW4CGOEzSnARwAyfTcJwARHgM0nwEJCXEVsXSIafvdC6GN4p4WUO66Dat9O4nvCXUnrfK7h2//AKaNhIRQW/sRJc4LtuS9l4qijhVyS4wXcV8KASqOFvSHCF7y7gTkI+RSsfWzn0sKNa/9p7faney+jTsagX5XthRf8/ly/h6FBm5i8BM2k/iCUBEgAmAA6vCpAAMAFweFWABIAJgMOrAiQATAAcXhUgAWAC4PCqAAkAEwCHVwVIAJgAOLwqQALABMDhVQFgAf82cUh/OHrpNwAAAABJRU5ErkJggg==',
            arrow_down: 'iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAnlJREFUeF7tmu1t20AQBe86cSlWJ0klgStxKVYnSScyLiABgYDCD4k7u8jojyCbwNub0aPIk3rzgRLoaLrhTQHwm0ABCoAJwPE2QAEwATjeBigAJgDH2wAFwATgeBugAJgAHG8DFAATgONtgAJgAnC8DVAATACOtwEKgAnA8TZAATABON4GKAAmAMfbAAXABOB4G6AAmAAcbwMUABOA423A/ybgdru9tdZ+tdY+eu9/4PX/jZ9m+mqtXaJnCm3AtNDP1tp7a23AD1/wUvg00+/p7+EzhQlYwJ85hC/4XsACPjJTiIAH8JEFz6EP4IfPdLqAFfjhC74758+nnUcfQyHtjBAwzvk/NnzYhix45Z2/HPPae79smP3wIRECxlXPuMIYz2uPUyXshD9m+dl7v64N/cz/TxewuMzDJGSEP9iECKAlZIUfKoCSkBl+uIBoCdnhIwKiJFSAjwk4W0IV+KiAsyRUgo8LeLWEavBTCHiVhIrw0wh4VkJV+KkEHJUwbQOsbazNuwUh2wt7tibC7oS3DnX37dTWbYstx434dPDTNWCWtFPCFrcp4acVcOB09C8JaeGnFvAiCanhpxfwpIT08EsIOCihBPwyAnZKKAO/lICNEkrBLydgRUI5+CUFPJBQEn5ZAQsJ4+Xpv17Ycrd35Jh0WxF7FjHdMb+d/dORPTPtPba0gL2LzXi8AmArClAATACOtwEKgAnA8TZAATABON4GKAAmAMfbAAXABOB4G6AAmAAcbwMUABOA422AAmACcLwNUABMAI63AQqACcDxNkABMAE43gYoACYAx9sABcAE4HgboACYABxvAxQAE4DjbYACYAJw/DcxchdwZ+I0xgAAAABJRU5ErkJggg=='
        };

        o.actions = o.actions == null?{icon: 'close', function:()=>BitSnackbar.close()}:o.actions; 
        o.actions = Array.isArray(o.actions)?o.actions:[o.actions];

        o.actions.forEach(el => 
        {
            var action;
            if(el.hasOwnProperty('icon') && el.icon != null && el.icon != '')
            {
                action = document.createElement('img');
                action.src = 'data:image/png;base64,'+ icons[el.icon];
                action.style.width = '20px';
            }
            else
            {
                action = document.createElement('button');
                action.innerHTML = el.label;
                action.style.padding = '2px 4px';
                el.hasOwnProperty('color')   ?action.style.color    = el.color:'';
                el.hasOwnProperty('fontSize')?action.style.fontSize = el.fontSize:'';
            }
            action.classList.add('action');
            action.addEventListener('click', el.function);

            wrapper.appendChild(action);
        });

        return wrapper;
    };
        
    BitSnackbar.close = function() {
        if (BitSnackbar.current) {
            BitSnackbar.current.style.opacity = 0;
        }
    };

    // Pure JS Extend
    // http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
    var Extend = function() {
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        var merge = function(obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = Extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    return BitSnackbar;
});