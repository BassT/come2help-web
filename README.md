# come2help Web-App

<a href="http://come2.help">come2.help</a> is a project for recruiting and coordinating volunteer people.
Possible scenarios are flooding or coordinating support for political refugees.

## Content and Usage

This is only a Web-App. The REST API is not part of this repository. For usage please care about the
LICENSE file.

## Setup

1. Fork the repository for development. Implementations can be submitted by a Pull-Request.

2. Clone the repository to a local directory.

3. Import it to a IDE (e.g. IntelliJ) of your choice (or use vim).

4. If you want to use the backend, also install come2help-server. See the tutorial in come2help-server.

5. Use bower to install the dependencies:
<pre>bower install</pre>

6. Run the index.html in a browser of your choice.
  Be careful about cross-site script detection, since the server is not running at the same domain as your client.
  Maybe you have to use a proxy server like nginx.
  
7. Start a python Webserver with:
  <pre>python -m SimpleHTTPServer</pre>