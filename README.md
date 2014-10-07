Stimpy Polymer with Login
=========================

[Stimpy](https://github.com/semateos/stimpy) is a simple yet inventive fellow.  This is a boilerplate for a Hapi.js backed Polymer app that works on the web or as a nativized mobile app.  It's a build of the [Polymer Tutorial](https://www.polymer-project.org/docs/start/tutorial/intro.html) demonstrating api backing and a basic Cordova build process.

To install Stimpy:
```bash
$ npm install -g stimpy supervisor bower gulp cordova
```
To start a new Stimpy Polymer-Login project
```bash
$ stimpy create polymer-login my_new_project
$ cd my_new_project
```
Start the local testing server by running the command:
```bash
$ stimpy start
```
To test the ios build:
```bash
$ stimpy emulate ios
```
You'll need to have the local server running at the same time that you run the iOS emulation so that it can make api calls and retreive the data.

####Device Testing
To test on an actual device you'll need a live server.  We've provided a simple method to test deploy your project to heroku (which has a free tier).  You'll need a [heroku login](https://signup.heroku.com/dc) and the [heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

To build a live test server:
```bash
$ stimpy deploy heroku
```

Edit `server/config/index.js` and replace the cordova endpoint `config.api = 'http://localhost:3000'` with the new heroku server e.g. `config.api = 'http://sleepy-inlet-8224.herokuapp.com'`

Open `cordova/platforms/ios/Stimpy Polymer.xcodeproj` in Xcode.

Run the project on the attached device following the Apple Developer proceedure for setting up a testing device.

## The Stack:
**Node.js** - Because it's fast, easy to get started, and Javscript is awesome.
[http://nodejs.org/](http://nodejs.org/)

**Supervisor** - To watch for file changes and restart the server during development [https://github.com/isaacs/node-supervisor](https://github.com/isaacs/node-supervisor).

**Hapi** - A very well designed server framework that is easy to understand, easy to create your own plugins, scales very well, cache options built in, and more.
[http://spumko.github.io/](http://spumko.github.io/)

**Swig** - It looks like HTML, it's very fast, great for template inheritance, and allows you to use HTML syntax with the server and with front-end client Javascript includes.
[http://paularmstrong.github.io/swig/](http://paularmstrong.github.io/swig/docs/#browser)

**Bower** - Package management for the front end.  Bower uses a flat dependency tree, requiring only one version for each package, reducing page load to a minimum. [http://bower.io/](http://bower.io/)

**Polymer** - Google's [Polymer Project](https://www.polymer-project.org/) is a polyfill for the upcoming Web Components standard allowing for encapsulation and sharing of custom web elements.  We beleive that Web Components are the future of web development (and possibly app development).

**Gulp** - A task runner for your assets, and can do a lot more. The performance is amazing and it is easy to get started. [http://gulpjs.com/](http://gulpjs.com/)  The main files of bower pacakges are automagically included in `server/config/assets.js`

## Hapi Plugins
The Hapi plugins that are being used.

#### Dogwater
Dogwater makes [Waterline ORM](https://github.com/balderdashy/waterline) available as a Hapi plugin.  Models exist in `server/models` and connection/adapter configurations live in `server/config/dogwater.js`. [https://github.com/devinivy/dogwater](https://github.com/devinivy/dogwater)

#### Hapi-Named-Routes
Added names to the routes. This allows you to have access to the path in the templates just by using the `path.nameofroute` variable. [https://github.com/poeticninja/hapi-named-routes](https://github.com/poeticninja/hapi-named-routes)

#### Hapi-Assets
Assets are in the `./server/config/assets.js` file, and your view layer has access based on the node environment. If you are in `development` (default) you might want to have individual files (js,css). If you are in `production` you would want the assets combined for user performance. [https://github.com/poeticninja/hapi-assets](https://github.com/poeticninja/hapi-assets)

#### Hapi-Cache Buster
Client/browser reloads new assets based on package.json version of your application. [https://github.com/poeticninja/hapi-cache-buster](https://github.com/poeticninja/hapi-cache-buster)

#### Folder Structure
There are two main folders in the stack. The "**public**" folder for front-end (client side) code, and "**server**" folder for server side code.  `index.js` defines the hapi plugin, `server.js` is a sample server using the plugin.

## Contributers

[Sam Mateosian](https://github.com/semateos)

Based on [polymer-tutorial](https://github.com/Polymer/polymer-tutorial) and in part on hapi-ninja from [Saul Maddox](https://github.com/poeticninja)
and, [sample-hapi-rest-api](https://github.com/agendor/sample-hapi-rest-api)


## Credits
Credit goes to all of the open source code that people have made available.

#### License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
