

// reference css
require('bootstrapcss');

require('indexcss');



var pageDatas = {
    params: {}, // params
    defaultRoute: 'task1' // default Route
};

function initMenu() {
    /// <summary>
    /// init menu
    /// </summary>

    var modName = window.location.href.split('#')[1];

    modName = modName || pageDatas.defaultRoute;


    $("ul[class=sub-menu] li a").each(function (e) {
        if ('#' + modName === $(this).attr('href')) {
            $(this).addClass("active");
            $(this).parent().parent().show(300);
        }
    })

    loadHtml(modName);
}

function bindMenu() {
    /// <summary>
    /// bind menu
    /// </summary>

    $(document).on('click', '.sidebar .nav .has-sub', function (e) {
        e.stopPropagation();

        $(this).children(".sub-menu").toggle(300);
    })


    $("ul[class=sub-menu] li a").on('click', function (e) {
        e.stopPropagation();

        if ($(this).hasClass("active")) { return false; }

        $("ul[class=sub-menu] li a").removeClass("active");
        $(this).addClass("active");

        var modName = $(this).attr('href');
        modName = modName.split('#')[1];

        loadHtml(modName);
    });

}

function loadHtml(modName) {
    /// <summary>
    /// load html
    /// </summary>
    /// <param name="modName" type="type">modName</param>

    pageDatas.params = null;



    var htmlPath = './html/'+modName+'.html';
    var jsPath = './'+modName;

    $.get(htmlPath, [], function (html) {
        $("#container").html(html);
        loadJs(jsPath);
    });
}


function loadJs(jsPath) {
    /// <summary>
    /// load js mod
    /// </summary>
    /// <param name="jsPath" type="type">js path</param>

    var currentMod;
    if (jsPath === './task1') {
        require.ensure([], function (require) {
            currentMod = require('./task1');
            currentMod.init();
        }, 'task1');
    }
    else if (jsPath === './task2') {
        require.ensure([], function (require) {
            currentMod = require('./task2');
            currentMod.init(pageDatas.params);
        }, 'task2');
    }
    else if (jsPath === './task3') {
        require.ensure([], function (require) {
            currentMod = require('./task3');
            currentMod.init(pageDatas.params);
        }, 'task3');
    }
    else if (jsPath === './task4') {
        require.ensure([], function (require) {
            currentMod = require('./task4');
            currentMod.init(pageDatas.params);
        }, 'task4');
    } 
    else if (jsPath === './task5') {
        require.ensure([], function (require) {
            currentMod = require('./task5');
            currentMod.init(pageDatas.params);
        }, 'task5');
    }
    else {
        if (__DEV__) {
            console.log('no request mod');
        }
    }
}

function initialize() {
    initMenu();

    bindMenu(); 
}

$(function () {
    initialize();
})

