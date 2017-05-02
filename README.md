### GA WDI London - Project 4, Housing Bubble

Housing Bubble is a property finding application that is built with D3.js, AngularJS and Ruby on Rails.

Houses are represented as SVG bubbles of different sizes and colours relative to the their listed value on Zoopla.

#### [View it here!][url_id]
[url_id]: https://housingbubble.herokuapp.com

![](src/images/housingbubblescreen.png "Screen Shot")

### Functionality:

Users can search for any location in England by Street name, Post code, Town, City or Area.

The user can log in, add and remove houses to and from their housing portfolio and then view the house listed on Zoopla by clicking on the houses grey info box.

Users can also sort houses by the number of Bedrooms and Bathrooms.

There is a colour key that pops up when the footer is hovered over.

### The Build

D3.js, AngularJS, HTML, SCSS, Ruby on Rails, Gulp.js, Git, Bower, NPM, PostgreSQL

- The D3.js code is placed inside of an AngularJS directive.
- The AngularJS $watch function is used to bind the D3.js directive to the house price data retrieved from Zoopla. D3.js then interacts and manipulates the DOM based when this data is updated..
- The Zoopla API is called initially through an AngularJS service, and then from the Rails back-end via HTTParty.
- The Zoopla API is called on every state change, to retrieve the data for the houses in the users portfolio. It is also obviously called when a new location is searched.
- The front-end interacts with the PostgreSQL database through API calls through AngularJS factories to Rails the back-end.
- In Rails, there is a one-to-many relationship between Users and Houses.

### To Use this Angular Gulp Setup

If you have cloned this code, to setup this application, you first need to run:

```sh
$ bower install && gulp install
```

If you have cloned the back end code, to get setup, you first need to:

Run a PostgreSQL database.

And then:

```sh
$ npm install
$ rails db:create, db:migrate
$ rails s
```
