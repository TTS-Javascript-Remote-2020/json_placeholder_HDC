Used other free APIs since jsonplaceholder would work for me.
https://reqres.in for user login
https://cat-fact.herokuapp.com for list of facts
https://picsum.photos for a picture



http://jsonplaceholder.typicode.com/

Login page - Display a login form asking user for a username.
  On Submit, look up the username entered by the user.
  If no user is found, display a detailed error message.
  If the user is found, store user object and render User's homepage

User email's available:

            "email": "michael.lawson@reqres.in",

            "email": "lindsay.ferguson@reqres.in",

            "email": "tobias.funke@reqres.in",

            "email": "byron.fields@reqres.in",

            "email": "george.edwards@reqres.in",

            "email": "rachel.howell@reqres.in",


User's homepage displays:
  User's name
  User's post titles
  User's albums
Post View - Clicking on a post renders a post view, including:
     - Post title
     - Post text
     - A list of comments on the post
     - A back link to the user homepage
Album View - Clicking on an album renders the album page, including:
     - Thumbnails of all the photos and the photo's title
     - A search box that filters the photos by title as the user types
     - A back link to the user homepage
