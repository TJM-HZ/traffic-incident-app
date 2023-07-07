const options = { method: 'GET' }
const incidentUrl = 'http://127.0.0.1:3000/incidents'

table = document.getElementById('incidentTable') // The HTML table
tableBody = table.getElementsByTagName('tbody')[0] // The body of the table

const jamString = 'Traffic Jam' // String used for jam incident type
const roadworksString = 'Roadworks' // String used for roadworks incident type

const unknownDurationString = 'Unknown' // String used when the delay or duration is unknown

/**
 * Inserts an incident row at the end of the table.
 * @param {*} roadName Name of the road
 * @param {*} incidentType The type of incident (e.g., Traffic Jam, Roadworks)
 * @param {*} location Location of the incident
 * @param {*} duration Duration or expected delay of the incident in seconds (will be converted to minutes)
 */
function insertIncident (roadName, incidentType, location, duration) {
  const newRow = tableBody.insertRow(-1)
  const cell1 = newRow.insertCell(0)
  const cell2 = newRow.insertCell(1)
  const cell3 = newRow.insertCell(2)
  const cell4 = newRow.insertCell(3)

  // Filling in the data for the cells
  cell1.innerHTML = roadName.replace('/', ' - ')
  cell2.innerHTML = incidentType
  cell3.innerHTML = location
  cell4.innerHTML = (duration / 60 || unknownDurationString)
}

/**
 * Fetches the incident data, then calls insertIncident for each incident, adding a new row to the table with the appropriate information.
 * Incidents are shown in the order they are provided by the ANWB incident API. On a given road, traffic jams are shown first, followed by roadworks.
 */
async function fillTable () {
  response = await fetch(incidentUrl, options)
  data = await response.json()
  data.roads.forEach(road => {
    road.segments.forEach(segment => {
      // Formatting location
      let loc
      if (road.type !== 'other') {
        loc = segment.start + ' - ' + segment.end
      } else loc = segment.location

      // Traffic jams
      if (segment.jams) {
        segment.jams.forEach(jam => {
          insertIncident(road.road, jamString, loc, jam.delay)
        })
      }

      // Roadworks
      if (segment.roadworks) {
        segment.roadworks.forEach(roadwork => {
          insertIncident(road.road, roadworksString, loc, roadwork.delay)
        })
      }
    })
  })
}

fillTable()
