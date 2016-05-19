function makeJNLP(applet) {
   var tag = applet.tagName;
   if (tag == "APPLET" || tag == "OBJECT") {
     if (applet.code === undefined || applet.codebase === undefined) {
     for (i = 0; i < applet.attributes.length; i++) {
        applet[applet.attributes[i].name]=applet.attributes[i].value;
     }}
   } else {
     return undefined;
   }

   var temp = "<?xml\ version=\"1.0\" encoding=\"utf-8\"?>\n<jnlp spec=\"1.0\" codebase=\"";
   if (applet.codebase === undefined || tag == "OBJECT") {
      temp += location.href.substring(0,location.href.lastIndexOf('/'));
   } else if (applet.codebase.substring(1,1) == "/") {
      temp += location.origin+applet.codebase;
   } else if (applet.codebase.indexOf('://') > -1) {
      temp += applet.codebase;
   } else {
      temp += location.href.substring(0,location.href.lastIndexOf('/')+1)+applet.codebase;
   }
   temp += "\">\n	<information>\n		<title>MakeJNLP</title>\n		<vendor>Cameron Cawley</vendor>\n		<description>Java Plugin to Web Start converter</description>\n	</information>\n";

   temp += "	<resources>\n";
   var jreversion = "1.2+"
   if (tag != "APPLET" && applet.type.search(";version=") > -1) {
      jreversion = applet.type.substring(applet.type.indexOf(';version=')+9,applet.type.length)
   }
   temp += "		<j2se version=\""+jreversion+"\"";
   if (tag != "APPLET" && applet.codebase != "" && applet.codebase !== undefined) {
      if (applet.codebase.indexOf("#") > -1) {
         temp += " href=\""+applet.codebase.substring(0,applet.codebase.indexOf("#"))+"\"";
      } else {
         temp += " href=\""+applet.codebase+"\"";
      }
   }
   if (tag == "OBJECT" && getparam(applet,"java_arguments") != "") {
      temp += " java-vm-args=\""+getparam(applet,"java_arguments")+"\"";
   }
   temp += "/>\n";
   if ((applet.archive != "" && applet.archive !== undefined) || (tag == "OBJECT" && getparam(applet,'archive') != "")) {
      if (tag == "OBJECT") {
         var archives = getparam(applet,"archive")
      } else {
         var archives = applet.archive;
      }
      while (archives.indexOf(',') > -1) {
         temp += "		<jar href=\""+archives.substring(0,archives.indexOf(','))+"\"/>\n";
         archives = archives.substring(archives.indexOf(',')+1, archives.length);
      } 
      temp += "		<jar href=\""+archives+"\"/>\n";
   }
   temp += "	</resources>\n";

   temp += "	<applet-desc";
   temp += " width=\""+applet.width+"\"";
   temp += " height=\""+applet.height+"\"";
   if (applet.name != "" && applet.name !== undefined) {
      temp += " name=\""+applet.name+"\"";
   } else if (tag == "OBJECT" && getparam(applet,"id") != "") {
      temp += " name=\""+getparam(applet,"id")+"\"";
   } else {
      temp += " name=\"MakeJNLP\"";
   }
   if (tag == "OBJECT") {
      var mainclass = getparam(applet,"code");
   } else {
      var mainclass = applet.code;
   }
   if (mainclass.substring(mainclass.length-6,mainclass.length)) { mainclass = mainclass.substring(0, mainclass.length-6); }
   while (mainclass.indexOf("/") > -1) {
      mainclass=mainclass.replace("/", ".");
   }
   temp += " main-class=\""+mainclass+"\"";
   if (applet.getElementsByTagName("param").length > 0 && tag == "APPLET") {
      temp += ">\n";
      var i;
      for (i = 0; i < applet.getElementsByTagName("param").length; i++) {
         temp += "		<param name=\""+applet.getElementsByTagName("param")[i].name+"\" ";
         temp += "value=\""+applet.getElementsByTagName("param")[i].value+"\"/>\n";
      }
      temp += "	</applet-desc>\n";
   } else {
      temp += "/>\n";
   }
   temp += "</jnlp>";
   return "data:application/x-java-jnlp-file;ascii,"+encodeURIComponent(temp);
}

function catchapplet() {
   var x = document.getElementsByTagName("applet");
   for (i = 0; i < x.length;) {
      for (r = 0; r < x[i].attributes.length; r++) {
         x[i][x[i].attributes[r].name]=x[i].attributes[r].value;
      }
      makeJWStag(x[i]);
   }
   var x = document.getElementsByTagName("object");
   for (i = 0; i < x.length;) {
      for (r = 0; r < x[i].attributes.length; r++) {
         x[i][x[i].attributes[r].name]=x[i].attributes[r].value;
      }
      if (x[i].type.substring(0,25) == "application/x-java-applet" || x[i].classid == "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" || x[i].classid.substring(0,14) == "clsid:CAFEEFAC") {
         makeJWStag(x[i]);
      } else {
         i++;
      }
   }
}

function makeJWStag(tag) {
   var elmnt = document.createElement("div");
   elmnt.style.width=tag.width;
   elmnt.style.height=tag.height;
   if (parseInt(elmnt.style.height,10) <= 165) {
      elmnt.style.fontSize=parseInt(elmnt.style.height,10)-15;
   } else {
      elmnt.style.fontSize="150";
   }
   elmnt.style.border="2px solid black";
   elmnt.style.backgroundColor="#ffffff";
   elmnt.style.textAlign = "center";
   elmnt.innerHTML = "<a href='"+makeJNLP(tag)+"'><b>Start</b></a>";
   tag.parentNode.replaceChild(elmnt, tag);
}

function getparam(tag,param) {
   var params = tag.getElementsByTagName("param");
   var value = '';
   for (count = 0; count < params.length; count++) {
      if (params[count].name == param){
         value = params[count].value;
         break;
      }
   }
   return value;
}