var refresher = {
    norefresh: false,
    info: {
        pullDownLable: "下拉刷新",
        pullingDownLable: "释放立即刷新",
        pullUpLable: "上拉加载更多",
        pullingUpLable: "释放加载更多",
        loadingLable: "加载中..."
    },
    init: function(t) {
        if(t.norefresh) {refresher.norefresh = t.norefresh}
        var l = document.getElementById(t.id),
            e = document.createElement("div");
        e.className = "scroller", l.appendChild(e);
        var a = l.querySelector(".scroller"),
            r = l.querySelector("#" + t.id + " ul");
        a.insertBefore(r, a.childNodes[0]);
        var n = document.createElement("div");
        n.className = "pullDown";
        var o = document.createElement("div");
        o.className = "pullDownIcon", n.appendChild(o);
        var s = document.createElement("div");
        s.className = "pullDownLabel", n.appendChild(s), a.insertBefore(n, a.childNodes[0]);
        var c = document.createElement("div");
        c.className = "pullUp";
        var o = document.createElement("div");
        o.className = "pullUpIcon", c.appendChild(o);
        var i = document.createElement("div");
        i.className = "pullUpLabel";
        var p = document.createTextNode(refresher.info.pullUpLable);
        i.appendChild(p), c.appendChild(i), a.appendChild(c);
        var u = l.querySelector(".pullDown"),
            d = u.offsetHeight,
            m = l.querySelector(".pullUp"),
            f = m.offsetHeight;
        this.scrollIt(t, u, d, m, f)
    },
    scrollIt: function(parameter, pullDownEle, pullDownOffset, pullUpEle, pullUpOffset) {
        eval(parameter.id + "= new iScroll(\t\t\t\t\t\t\t\t\tparameter.id,\t\t\t\t\t\t\t\t\t {\t\t\t\t\t\t\t\t\t\t useTransition: true,\t\t\t\t\t\t\t\t\t\t vScrollbar: false,\t\t\t\t\t\t\t\t\t\t topOffset: pullDownOffset,\t\t\t\t\t\t\t\t\t\t onRefresh: function () {\t\t\t\t\t\t\t\t\t\t\t\t\t\t  refresher.onRelease(pullDownEle,pullUpEle);\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t },\t\t\t\t\t\t\t\t\t\tonScrollMove: function () {\t\t\t\t\t\t\t\t\t\t\t\t\t\t     refresher.onScrolling(this,pullDownEle,pullUpEle,pullUpOffset);\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\t\t\t\t\t\t\t\t\t\tonScrollEnd: function () {\t\t\t\t\t\t\t\t\t\t\t\t\t       refresher.onScrollEnd(pullDownEle,parameter.pullDownAction,pullUpEle,parameter.pullUpAction);\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\t\t\t\t\t\t\t\t\t\t})")
    },
    onScrolling: function(t, l, e, a) {
        if(refresher.norefresh) {
            t.y > -a && !l.className.match("loading")
            &&
            // (l.classList.remove("flip"),
            // l.querySelector(".pullDownLabel").innerHTML = refresher.info.pullDownLable,
            // l.querySelector(".pullDownIcon").style.display = "block", t.minScrollY = -a),
            (t.scrollerH < t.wrapperH && t.y > t.maxScrollY - a && e.className.match("flip") || t.scrollerH > t.wrapperH && t.y > t.maxScrollY - a && e.className.match("flip"))
            && (e.classList.remove("flip"), e.querySelector(".pullUpLabel").innerHTML = refresher.info.pullUpLable),
            // t.y > 0 && !e.className.match("loading") &&
            // !l.className.match("loading") &&
            // (l.classList.add("flip"), l.querySelector(".pullDownLabel").innerHTML = refresher.info.pullingDownLable, t.minScrollY = 0),
            (t.scrollerH < t.wrapperH && t.y < t.minScrollY - a && !l.className.match("loading") && !e.className.match("loading") || t.scrollerH > t.wrapperH && t.y < t.maxScrollY - a && !l.className.match("loading") && !e.className.match("loading"))
            && (e.classList.add("flip"),
            e.querySelector(".pullUpLabel").innerHTML = refresher.info.pullingUpLable)
        }
        else {
            t.y > -a && !l.className.match("loading")
            &&
            (l.classList.remove("flip"),
            l.querySelector(".pullDownLabel").innerHTML = refresher.info.pullDownLable,
            l.querySelector(".pullDownIcon").style.display = "block", t.minScrollY = -a),
            (t.scrollerH < t.wrapperH && t.y > t.maxScrollY - a && e.className.match("flip") || t.scrollerH > t.wrapperH && t.y > t.maxScrollY - a && e.className.match("flip"))
            && (e.classList.remove("flip"), e.querySelector(".pullUpLabel").innerHTML = refresher.info.pullUpLable),
            t.y > 0 && !e.className.match("loading") && !l.className.match("loading") && (l.classList.add("flip"),
            l.querySelector(".pullDownLabel").innerHTML = refresher.info.pullingDownLable, t.minScrollY = 0),
            (t.scrollerH < t.wrapperH && t.y < t.minScrollY - a && !l.className.match("loading") && !e.className.match("loading") || t.scrollerH > t.wrapperH && t.y < t.maxScrollY - a && !l.className.match("loading") && !e.className.match("loading"))
            && (e.classList.add("flip"),
            e.querySelector(".pullUpLabel").innerHTML = refresher.info.pullingUpLable)
        }
    },
    onRelease: function(t, l) {
        if(refresher.norefresh) {
            // t.className.match("loading")
            // && (t.classList.toggle("loading"), t.querySelector(".pullDownLabel").innerHTML = refresher.info.pullDownLable),
            l.className.match("loading") && (l.classList.toggle("loading"), l.querySelector(".pullUpLabel").innerHTML = refresher.info.pullUpLable)
        }
        else {
            t.className.match("loading") && (t.classList.toggle("loading"), t.querySelector(".pullDownLabel").innerHTML = refresher.info.pullDownLable), l.className.match("loading") && (l.classList.toggle("loading"), l.querySelector(".pullUpLabel").innerHTML = refresher.info.pullUpLable)
        }
    },
    onScrollEnd: function(t, l, e, a) {
        if(refresher.norefresh) {
            // t.className.match("flip")
            // && !t.className.match("loading")
            // && (t.classList.add("loading"), t.classList.remove("flip"),
            //     t.querySelector(".pullDownLabel").innerHTML = refresher.info.loadingLable, l
            // && l()),
            e.className.match("flip")
            && !e.className.match("loading")
            && (e.classList.add("loading"), e.classList.remove("flip"), e.querySelector(".pullUpLabel").innerHTML = refresher.info.loadingLable, a
            && a())
        }
        else {
            t.className.match("flip")
            && !t.className.match("loading")
            && (t.classList.add("loading"), t.classList.remove("flip"), t.querySelector(".pullDownLabel").innerHTML = refresher.info.loadingLable, l
            && l()), e.className.match("flip")
            && !e.className.match("loading")
            && (e.classList.add("loading"), e.classList.remove("flip"), e.querySelector(".pullUpLabel").innerHTML = refresher.info.loadingLable, a
            && a())
        }
    }
};