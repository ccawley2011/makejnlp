# makejnlp

MakeJNLP allows you to launch Java Applets using [Java Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html).

## Download
Download the file below, then drag that file to your Bookmarks bar. To use it, you need to click the bookmarklet you created *twice*.

**[Download Link](https://github.com/ccawley2011/makejnlp/raw/master/makejnlp.url)**

MakeJNLP has been tested with:
- [Mozilla Firefox](https://www.mozilla.org/en-GB/firefox/new/) 44+
- [Opera](http://www.opera.com/) 10.63+
- [SeaMonkey](http://www.seamonkey-project.org/) 1.1.19+
- [Google Chrome](https://www.google.co.uk/chrome) 49+

## Limitations
- [Incompatible with Internet Explorer and Edge.](http://caniuse.com/#feat=datauri)
- Recent versions of Chrome (sometimes) discard the created JNLP file after saving.
- No support for &lt;embed&gt; tags.
- Fix horizontal overflow.
- Can't load unpacked .class files (JWS limitation?).
- &lt;object&gt; parameters
- &lt;object&gt; get required JRE version from classid and/or codebase.

## Links

### Applets and Web Start
- [Download Java](https://java.com/en/download/manual.jsp)
- [Java and Chrome](https://java.com/en/download/faq/chrome.xml)
- [Oracle Blogs - Moving to a Plugin-Free Web](https://blogs.oracle.com/java-platform-group/entry/moving_to_a_plugin_free)
- [Security level settings in the Java Control Panel](https://java.com/en/download/help/jcp_security.xml)
- [JNLP file specifications](https://docs.oracle.com/javase/7/docs/technotes/guides/javaws/developersguide/syntax.html)
- [Embedding applets using tags](https://docs.oracle.com/javase/8/docs/technotes/guides/jweb/applet/using_tags.html)

### Sites which still use Java
- [Java Tester](http://javatester.org/version.html)
- [Applet Development Examples](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html)
- [Music and Computers](http://music.columbia.edu/cmc/MusicAndComputers/)
- [Double Pendulum](http://www.dickimaw-books.com/software/doublependulum/index.html)
- [Cortado streaming applet](http://theora.org/cortado/)
- [Batik SVG Toolkit](http://xmlgraphics.apache.org/batik/demo-static.html)
- [JavaPC](http://jpc.sourceforge.net/)
- [Jake2](https://en.wikipedia.org/wiki/Jake2)

Not all of the sites listed are guaranteed to work with makejnlp, though.
