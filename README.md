# Lunchador (frontend)

I wrote this app as my final project at the Flatiron School. This is a mobile app, written in React Native and targetted towards Android users, with the purpose of consolidating as many NYC food truck locations into one, easily manageable place for convenient viewing. I do so by tracking the tweets of a curated list of active food Twitter accounts. Through OAuth, I pull relevant data from these tweets (content, usernames, profile images). I then employ the Google Natural Language API's capabilities of breaking a block of text into chunks, or "entities". If an entity is identified as a location, this means that the tweet has passed the test, and will be saved for storage in the backend, to be displayed. In the meantime, those locations will be combined into one search term and thrown into the Google Geocoder API, with the purpose of getting back a longitude and latitude. The longitude and latitude will be necessary for what we want, which is to throw a pin onto a Google Maps view representing that tweeted location.

Demo

https://share.getcloudapp.com/WnuNwdb9

Want To Try This App?

This app makes use of my personal external API keys for Twitter and various Google API usage. I've removed them to limit any API calls I'm not aware of, so I don't get billed. If you'd like to try this app for yourself, please contact me and I might be able to get you some keys.

This app will require either an Android phone or emulator to run. If you'd like to use your phone, this will require downloading Expo and following their instructions to get up and running. I've used Android Studio's emulator during my development process.

You will also need to pull the code from my backend in order to get any meaningful data. Otherwise, no pins will show up on the map, and the Twitter feed on the lower half of the Home page will be blank.

Pull down the code, npm install, and you're ready to go.
