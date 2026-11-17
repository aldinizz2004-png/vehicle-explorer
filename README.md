# Vehicle Explorer

An interactive web page for browsing, searching, filtering and inspecting showroom vehicles. Built for the ProGineer Technologies Frontend Training Program (Week 2).

## Features

- Vehicle listing generated dynamically from a local JSON file loaded with `fetch()`
- Search by brand or model, with multi-word support
- Filters for brand, availability and a minimum and maximum price, combinable and resettable
- Vehicle details panel opened from the card or its button
- Loading indicator, error message with retry, and empty results message
- Responsive layout built with Bootstrap 5

## Tech Stack

HTML5, CSS3, Bootstrap 5 and vanilla JavaScript (ES modules).

## Project Structure

```
index.html          Page markup
css/style.css       Custom styles
data/vehicles.json  Local vehicle data (15 vehicles)
js/api.js           Fetches the vehicle data
js/vehicles.js      Filtering and data processing
js/ui.js            DOM rendering
js/main.js          App initialization and event handling
```

## Running Locally

ES modules and `fetch()` need a web server, so opening `index.html` directly will not load the data. Start a local server from the project folder:

```
python -m http.server 8000
```

Then open `http://localhost:8000`. The VS Code Live Server extension works as well.
