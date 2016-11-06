Formbot
============

A chrome extension which fills in any input in a page. In the options page, the extension could be configured and the actual input text could be customised.

_Note: Please note that the customised text is currently being stored in the browser's local storage and therefore could not be considered secure._

Installation
------------

1. Locate the extension file in the repository found at [extension -> chrome-extension.crx]
2. Drag and drop the file on chrome's extenstion page.

How to use it
-------------

- To use the extension with the default options just click on the extension icon and the inputs of the current open tab will be filled up.
- To customise the input text, right click on the extension icon and click on the [options] option.
- Edit the input text and the changes will be saved automatically. Next time the extension is used, the new configuration should be used.

For Developers
--------------

- In order to build the extension, Grunt is required, the installation guide could be found [here](http://gruntjs.com/installing-grunt). 
- Code modifications should be made in the [src] folder of the repository.
- In order to test the new changes, run the [build] grunt task which will build the source files and refresh the [dist] folder.
- To manually test the extension, click on the [Load Unpacked extension] and select the [dist] folder of the repository in chrome's extnsions page. (Developer mode has to be selected in order to be able to use the extension)

How to contribute
-----------------

Contributions could be made: 
- Opening issues of bugs which you find while using the extension. (Please provide adequate replication steps of how to reproduce the bug described)
- Submitting pull requests which fix bugs/issues or provide a new feature. Before submitting a pull requuest please open an issue describing how the bug/feature will be tackled so that the solution could be discussed before hand.
