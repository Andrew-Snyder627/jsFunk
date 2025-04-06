const { weather } = require('../datasets/weather');

// To run the code you've written in this file, use node prototypes/problem-sets/weather.js

console.log('Running weather.js')

/* Weather Prompts*/

/*
Level 1

Code: 
  Write a function called "getAverageTemps"
   that returns an array 
   of all the average temperatures.

Invoke: 
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(getAverageTemps())
    should print -->  [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

Annotate:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/

function getAverageTemps() {
  temps = []

  weather.forEach((w) => {
    temps.push(w.temperature)
  })

  avgTemps = temps.map((temp) => {
    return (temp.high + temp.low) / 2
  })
  
  return avgTemps
}

console.log(getAverageTemps())

// I started with a forEach loop to pull out the temperatures from the original weather array. Once those temps were separated in their own array, I was able to run a .map to take each high and low, add them together, and divide the total by two.
// The final result is an array with average temps for each weather object in the array.
/*
Level 2

Code: 
  Write a function called "findSunnySpots" 
  that returns an array of sentences 
  of the locations that are sunny and mostly sunny. 
  Include the location and weather type.

Invoke:
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(findSunnySpots())
    should print -->   
      [ 'Atlanta, Georgia is sunny.',
        'New Orleans, Louisiana is sunny.',
        'Raleigh, North Carolina is mostly sunny.' 
      ]

Annotation:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/
// const weather = [
//   {
//       location: 'Denver, Colorado',
//       type: 'clear',
//       humidity: 59,
//       temperature: {
//           high: 47,
//           low: 33
//       }
//   }

  // First I need to filter the array for all .type with sunny or mostly sunny
  // Next, I need to take each of those and concatenate their locations and weather types into singluar strings possibly a .map
  // Finally, I need to return the result.

function findSunnySpots() {
  sunnyWeather = weather.filter((w) => {
    return w.type === "sunny" || w.type === "mostly sunny"
  })

  sunnySpots = sunnyWeather.map((sunnyw) => {
    return sunnyw.location + " is " + sunnyw.type + "."
  })

  return sunnySpots
}

console.log(findSunnySpots())

// When running the final tests, I had to adjust the middle space in the string to include "is".



/*
Level 3

Code: 
  Write a function called "findHighestHumidity" that returns the location with the highest humidity.

Invoke: 
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(findHighestHumidity())
    should print -->      
    {
      location: 'Portland, Oregon',
      type: 'cloudy',
      humidity: 84,
      temperature: { high: 49, low: 38 }
    }

Annotation:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/

// filter or sort the array for the object with the highest humidity
// I could sort and then pull the first element if I sort highest to lowest

function findHighestHumidity() {
  let sortedHumidity = [...weather]
  sortedHumidity.sort((a,b) => {
    return b.humidity - a.humidity
  })

  return sortedHumidity[0]
}

console.log(findHighestHumidity())

/*
Level 4

Code: 
  Write a function called "findByType" 
  that takes in two arguments - the array of weather data and a specified weather type ("sunny", "cloudy", etc).  
  The function should return an array with a sentence for each spot that has any degree of the specified weather type. 
  (Note: "sunny" should return locations that are sunny and mostly sunny)

Invoke: 
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(findByType(weather, "sunny"))
    should print --> 
      [ 
        'Atlanta, Georgia is sunny.',
        'New Orleans, Louisiana is sunny.',
        'Raleigh, North Carolina is mostly sunny.' 
      ]

e.g.
  console.log(findByType(weather, "cloudy"))
    should print --> 
      [
        'New York, New York is cloudy',
        'Portland, Oregon is cloudy',
        'Boston, Massachusetts is cloudy',
        'Miami, Florida is partly cloudy',
        'Phoenix, Arizona is cloudy',
        'Anchorage, Alaska is cloudy'
      ]

Annotate:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/

function findByType(array, typeOfWeather) {
  let resultWeather = []

  array.forEach((obj) => {
    if (obj.type.includes(typeOfWeather)) {
      resultWeather.push(obj)
    }
  })

  let finalResult = resultWeather.map((result) => {
    return result.location + " is " + result.type
  })

  return finalResult
}

console.log(findByType(weather, 'cloudy'))

// Had to add in the period at the end of the string to pass the test. "."
// Had to remove the period for the 2nd test testing this same function.




/*
Level 5

Code: 
  Write a function called "getAverageTempByType"
   that takes in 2 arguments - a specified weather type ("sunny", "cloudy", etc) 
   and a specific temp type ("high" or "low").  
   The function should return the average temperature (either average high temp or average low temp
    depending on what is passed through as an argument) 
    across all locations of the specific weather type. 
    (Note: This time, the function should return only locations that are exact matches to the weather type.  
    For example, "sunny" should not return "mostly sunny" locations)

Invoke: 
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(getAverageTempByType("sunny", "high"))
    should print --> 58

e.g.
  console.log(getAverageTempByType("sunny", "low"))
    should print --> 43.5

e.g.
  console.log(getAverageTempByType("cloudy", "low"))
    should print --> 33.4

Annotate:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/

function getAverageTempByType(weatherType, tempType) {
  const filteredArray = []
  weather.forEach((w) => {
    if (w.type === weatherType) {
      filteredArray.push(w)
    }
  })

  let totalTemp = filteredArray.reduce((acc, w) => {
    if (tempType === "high") {
      return acc + w.temperature.high
    } else {
      return acc + w.temperature.low
    }
  }, 0)

  let average = 0

  if (filteredArray.length > 0) {
    average = totalTemp / filteredArray.length
  }

  let averageString = `The average ${tempType} for ${weatherType} locations is ${average} degrees.`

  return averageString
}

console.log(getAverageTempByType("cloudy", "low"))

/*
Level 6

Code: 
  Refactor your "getAverageTempByType" function so that instead of returning the average as a number, it returns a string with more information.

Invoke: 
  To print the value your function returns and confirm it is correct, invoke your function within a console.log().
e.g.
  console.log(getAverageTempByType("sunny", "high"))
    should print --> 
      "The average high for sunny locations is 58 degrees."

e.g.
  console.log(getAverageTempByType("sunny", "low"))
    should print --> 
      "The average low for sunny locations is 43.5 degrees."


e.g.
  console.log(getAverageTempByType("cloudy", "low"))
    should print --> 
      "The average low for cloudy locations is 33.4 degrees."


Annotate:
  After you find a solution, write out the steps of that solution.  Break them down as much as possible. 
*/

// Level 6 complete above :)
// Just refactored to return a string rather than the average value.

/*
Level 7

Test:
  * Uncomment the module.exports below.
  * Unskip the Weather Prompts tests in your prototype-test.js file.
  * Run `npm test` to confirm that all your functions are passing their tests.
  * Refactor as needed until all Weather tests are passing

Annotation:
  If your tests did not immediately pass, take notes on what details you missed while building and checking your solutions. 
  Take notes on the error messages that led you to fixing those details. 
*/

// All tests that initally failed were due to string punctuation. Two tests required me to add and remove periods from the string return.
// One test failed initially because I had to add "is" to the string sentence.
// All logic passes!



module.exports = {
  getAverageTemps,
  findSunnySpots,
  findHighestHumidity,
  findByType,
  getAverageTempByType
};
