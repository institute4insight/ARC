$( document ).ready(function() {
    var host = window.location.host;
    $("article a.serverip").each(function(i, e){$(e).data("proto")+"XXX:"+$(e).data("port")
        var proto = $(e).data("proto") ? $(e).data("proto") : "http"
        var port  = $(e).data("port") ? $(e).data("port") : "80"
        var path  = $(e).data("path") ? $(e).data("path") : ""
        var href = proto+"://"+host+":"+port+"/"+path
        $(e).attr("href", href)
        $(e).html(href)
        $(e).attr("target", "_blank")
    })
    $("section").each(function(i, e) {
        $(e).wrap("<div class=\"container page\" id=\"section"+i+"\">")
        $(e).prepend("<h1>"+$(e).attr("title")+"</h1>")
        $(e).find("article").each(function (i2, e2) {
            $(e2).wrap("<div class=\"jumbotron\" id=\""+$(e2).attr("title")+"\">")
            $(e2).prepend("<h2>"+$(e2).attr("title")+"</h2>")
        })
        $("#dyn-navbar").append("<li><a data-n=\""+i+"\" href=\"##\">"+$(e).attr("title")+"</a></li>")
	$("#dyn-navbar a").on("click", function () {
		var n = $(this).data("n")
		console.log("show #section"+n)
		$(".page").hide()
		$("#section"+n).show()
	})
	;
    })

    $(".page").hide()
    $("#section0").show()

    console.log( "ready!" );
});
