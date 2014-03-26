jquery-xblock
=============

jQuery plugin to load XBlocks remotely

### Setup

This plugin will allow you to load an XBlock remotely, from another website, using jQuery.

You will need to:

* Host both the application using this plugin, and the OpenEdX LMS on a common base URL. For example, you could have your website on http://example.com and the LMS on http://lms.example.com. This is needed to allow to share the authentication cookies
* Configure the LMS to allow CORS requests from the other domain

#### Configuring CORS on the LMS

Assuming the website on which you will use the current plugin is a http://example.com, you will need to set the following in the LMS configuration:

```python
FEATURES['ENABLE_CORS_HEADERS'] = True
CORS_ORIGIN_WHITELIST = ('example.com',)
```

### Instantiating the XBlock

On your website, load the plugin and its dependencies (jQuery & jQuery cookie) in the header:

```html
<html>
  <head>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.min.js"></script>
    <script src="/static/js/vendor/jquery.xblock.js"></script>
  </head>
  <body>
    <div>
      <h1>My amazing XBlock</h2>
      <div class="content"></div>
    </div>
  </body>
</html>
```

Then, to load an XBlock in the `div.content` element for example:

```js
$('.content .courseware-vertical').xblock({
    usageId: 'i4x:;_;_TestX;_TST-BRGT;_vertical;_0c4f0ca3c3f54a1b8ad5d9830c1d16b0',
    sessionId: '89e5dd96180debc33b582969b88ec9ce',
    baseDomain: 'example.com',
    lmsSubDomain: 'lms',
});
```

Note that you need to provide the usage id of the XBlock you want to load, and a valid user session id from the LMS.
