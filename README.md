# traffic-incident-app
A simple traffic incident app created for an internship assignment.
In order for this app to work, [anwb-proxy](https://github.com/TJM-HZ/anwb-proxy) must also be set up.

##Installation
After cloning the repository, make sure to install dependencies using `npm install`

##Usage
Before continuing, make sure you've also set up [anwb-proxy](https://github.com/TJM-HZ/anwb-proxy).
In script.js, make sure to change incidentUrl to the Url [anwb-proxy](https://github.com/TJM-HZ/anwb-proxy) is hosted at (by default localhost:3000).
Afterwards, simply host the webpage. A simple method of doing this in Microsoft Visual Studio Code is via the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
A table containing the incidents provided by ANWB's incident API should appear.
Columns include the name of the road, the type of incident, the location (e.g., start-end), and the expected duration (if provided).
