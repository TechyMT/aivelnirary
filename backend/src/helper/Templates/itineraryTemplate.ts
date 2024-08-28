import { Itinerary } from "@interfaces/itinerary.interface";

export function generateItineraryHtml(itinerary: Itinerary, clientName: string, bannerImageUrl: string): string {
    const dayWiseHtml = Object.entries(itinerary.day_wise_data).map(([day, places]) => {
        if (!Array.isArray(places)) {
            console.error(`Places data for ${day} is invalid or not an array.`);
            return `<div class="day"><h2>${day}</h2><p>No data available</p></div>`;
        }

        const placesHtml = places.map(place => {
            const { arrival_time, description, place_details, type } = place;
            const { address, name, position } = place_details;
            const gmapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}&marker=${position.lat},${position.lng}(${encodeURIComponent(name)})`;

            return `
                <div class="place">
                    <h3>${name}</h3>
                    <p class="description">${description}</p>
                    <p><strong>Arrival Time:</strong> ${new Date(arrival_time).toLocaleString()}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><a href="${gmapsUrl}" target="_blank">View on Google Maps</a></p>
                </div>
            `;
        }).join('');

        return `
            <div class="day">
                <h2>${day}</h2>
                ${placesHtml}
            </div>
        `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Travel Itinerary</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: #333;
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
              }
              .container {
                  flex: 1;
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 20px;
                  page-break-inside: avoid;
              }
              .banner {
                  width: 100%;
                  height: 300px;
                  background-image: url('${bannerImageUrl}');
                  background-size: cover;
                  background-position: center;
                  border-radius: 10px;
                  margin-bottom: 20px;
                  page-break-after: avoid;
              }
              h1 {
                  font-size: 2em;
                  margin-bottom: 10px;
              }
              .itinerary-info {
                  background: #f9f9f9;
                  padding: 15px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  page-break-inside: avoid;
              }
              .day {
                  margin-bottom: 20px;
                  page-break-inside: avoid;
              }
              .day h2 {
                  font-size: 1.5em;
                  margin-bottom: 10px;
              }
              .place {
                  background: #fff;
                  padding: 10px;
                  margin-bottom: 10px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  page-break-inside: avoid;
              }
              .place h3 {
                  margin-top: 0;
              }
              .place p {
                  margin: 5px 0;
              }
              .place .description {
                  font-style: italic;
              }
              .precautions {
                  background: #e8f4f8;
                  padding: 15px;
                  border-radius: 8px;
                  margin-top: 20px;
                  page-break-inside: avoid;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  background: #333;
                  color: #fff;
                  margin-top: auto;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="banner"></div>
              <div class="itinerary-info">
                  <h1>Travel Itinerary</h1>
                  <h2><strong>Specially Curated for:</strong> ${clientName}</h2>
                  <p><strong>Source:</strong> ${itinerary.source}</p>
                  <p><strong>Destination:</strong> ${itinerary.destination}</p>
                  <p><strong>Duration:</strong> ${itinerary.duration} days</p>
                  <p><strong>Budget:</strong> ${itinerary.budget}</p>
                  <p><strong>Cost:</strong> ${itinerary.cost}</p>
                  <div class="precautions">
                      <h2>Precautions</h2>
                      <p>${itinerary.precautions}</p>
                  </div>
                  ${dayWiseHtml}
              </div>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Mustafa Trunkwala. All rights reserved.
          </div>
      </body>
      </html>
  `;
}
