// EX - Dashboard della città
// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query),
//  che accetta una città come input e recupera simultaneamente:

// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).

// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).

// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

// Attenzione:
// le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).

// Note del docente

// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

// Esempio di utilizzo
// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));

// Esempio di output atteso
// // Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// ​
// // Output in console
// London is in United Kingdom.
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.

// async function fetchJson(url) {
//   const response = await fetch(url);
//   const obj = await response.json();
//   return obj;
// }

// async function getDashboardData(query) {
//   try {
//     const destinations = await fetchJson(
//       `http://localhost:3333/destinations?search=${[query]}`
//     );
//     console.log(destinations);

//     const weathers = await fetchJson(
//       `http://localhost:3333/weathers?search=${query}`
//     );
//     console.log(weathers);

//     const airports = await fetchJson(
//       `http://localhost:3333/airports?search=${query}`
//     );
//     console.log(airports);

//     const promises = [destinations, weathers, airports];

//     const results = await Promise.all(promises);

//     const destinationsResult = results[0];
//     const weathersResult = results[1];
//     const airportsResult = results[2];
//     const data = {
//       city: destinationsResult[0].name,
//       country: destinationsResult[0].country,
//       temperature: weathersResult[0].temperature,
//       weather: weathersResult[0].weather_description,
//       airport: airportsResult[0].name,
//     };

//     return data;
//   } catch (error) {
//     throw new Error("Errrore nel recupero dei dati", error.messagge);
//   }
// }

// getDashboardData("london")
//   .then((data) => {
//     console.log("Dasboard data:", data);
//     console.log(
//       `${data.city} is in ${data.country}.\n` +
//         `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//         `The main airport is ${data.airport}.\n`
//     );
//   })
//   .catch((error) => console.error(error));

// 🎯 Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione,
//  semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata.
//  Testa la funzione con la query “vienna” (non trova il meteo).

// // Risposta API
// {
//   city: "Vienna",
//   country: "Austria",
//   temperature: null,
// 	weather: null,
//   airport: "Vienna International Airport"
// }

// // Output in console
// Vienna is in Austria.
// The main airport is Vienna International Airport.

// async function fetchJson(url) {
//   const response = await fetch(url);
//   const obj = await response.json();
//   return obj;
// }

// async function getDashboardData(query) {
//   const destinations = await fetchJson(
//     `http://localhost:3333/destinations?search=${[query]}`
//   );
//   console.log(destinations);

//   const weathers = await fetchJson(
//     `http://localhost:3333/weathers?search=${query}`
//   );
//   console.log(weathers);

//   const airports = await fetchJson(
//     `http://localhost:3333/airports?search=${query}`
//   );
//   console.log(airports);

//   const promises = [destinations, weathers, airports];
//   console.log("Le promesse", promises);
//   const results = await Promise.all(promises);
//   console.log("I risultati", promises);

//   const destinationsResult = results[0][0];
//   const weathersResult = results[1][0];
//   const airportsResult = results[2][0];

//   const data = {
//     city: destinationsResult ? destinationsResult.name : null,
//     country: destinationsResult ? destinationsResult.country : null,
//     temperature: weathersResult ? weathersResult.temperature : null,
//     weather: weathersResult ? weathersResult.weather_description : null,
//     airport: airportsResult ? airportsResult.name : null,
//   };

//   console.log(data);

//   return data;
// }

// (async () => {
//   getDashboardData("vienna")
//     .then((data) => {
//       console.log("Dasboard data:", data);
//       let text = "";

//       if (data.city !== null && data.country !== null) {
//         text = `${data.city} is in ${data.country}.\n`;
//       }
//       if (data.temperature !== null && data.weather !== null) {
//         text += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
//       }
//       if (data.airport !== null) {
//         text += `The main airport is ${data.airport}.\n`;
//       }
//       console.log(text);
//     })
//     .catch((error) => console.error(error));
// })();

// 🎯 Bonus 2 - Chiamate fallite

// Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

// Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:

// Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
// Stampa in console un messaggio di errore per ogni richiesta fallita.
// Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  try {
    const destinations = await fetchJson(
      `http://localhost:3333/mdestinations?search=${[query]}`
    );
    console.log(destinations);
    const weathers = await fetchJson(
      `http://localhost:3333/weathers?search=${query}`
    );
    console.log(weathers);

    const airports = await fetchJson(
      `http://localhost:3333/airports?search=${query}`
    );
    console.log(airports);

    const promises = [destinations, weathers, airports];
    console.log("Le promesse", promises);

    const [destinationsResult, weathersResult, airportsResult] =
      await Promise.allSettled(promises);
    console.log("I risultati", promises);

    console.log(
      "Risultati:",
      destinationsResult,

      weathersResult,

      airportsResult
    );

    const data = {};

    if (destinationsResult.status === "fulfilled") {
      const destination = destinationsResult.value[0];
      data.city = destination ? destination.name : null;
      data.country = destination ? destination.country : null;
    } else {
      console.error("Presente errore in destinazioni:", error.reason);
      data.city = null;
      data.country = null;
    }
    if (weathersResult.status === "fulfilled") {
      const weather = weathersResult.value[0];
      data.temperature = weather ? weather.temperature : null;
      data.weather = weather ? weather.weather_description : null;
    } else {
      console.error("Presente errore in meteo:", error.reason);
      data.temperature = null;
      data.weather = null;
    }
    if (airportsResult.status === "fulfilled") {
      const airport = airportsResult.value[0];
      data.airport = airport ? airport.name : null;
    } else {
      console.error("Presente errore in aereoporti:", error.reason);
      data.airport = null;
    }
    console.log("Il dato finale è ", data);

    return data;
  } catch (error) {
    throw new Error("Errore!", error.reason);
  }
}

(async () => {
  getDashboardData("london")
    .then((data) => {
      console.log("Dasboard data:", data);
      let text = "";

      if (data.city !== null && data.country !== null) {
        text = `${data.city} is in ${data.country}.\n`;
      }
      if (data.temperature !== null && data.weather !== null) {
        text += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
      }
      if (data.airport !== null) {
        text += `The main airport is ${data.airport}.\n`;
      }
      console.log(text);
    })
    .catch((error) => console.error(error));
})();
