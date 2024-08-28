from openai import OpenAI
from flask import Blueprint, request, jsonify
from pydantic import BaseModel, ValidationError
from datetime import datetime
from typing import List, Dict, Optional
from langchain.output_parsers import PydanticOutputParser
import os

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

client = OpenAI(
    api_key=TOGETHER_API_KEY,
    base_url="https://api.together.xyz/v1",
)


def askLLM(prompt):
    completion = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        n=1,
        max_tokens=4000,
        temperature=0.1,
        top_p=0.9,
    )
    return completion.choices[0].message.content


class Position(BaseModel):
    lat: str | float | int
    lon: str | float | int


class PlaceDetails(BaseModel):
    name: str
    address: str
    position: Position


class PlaceData(BaseModel):
    placeDetails: PlaceDetails
    arrivalTime: str
    description: str
    type: str


class TravelPlan(BaseModel):
    startDate: str
    duration: str | int
    source: str
    destination: str
    budget: str | int
    cost: str | int
    precautions: Optional[str] = None
    dayWiseData: Dict[str, List[PlaceData]]


parser = PydanticOutputParser(pydantic_object=TravelPlan)


def generate_prompt(trip_data, persona_data):
    startDate = trip_data.get("startDate", "")
    source = trip_data.get("source", "")
    destination = trip_data.get("destination", "")
    budget = trip_data.get("budget", "")
    places_data = trip_data.get("places_data", [])
    duration = trip_data.get("duration", "")

    # Process persona data
    preferredActivities = persona_data.get("preferredActivities", {})
    foodPreferences = persona_data.get("foodPreferences", {})
    tripstyle = persona_data.get("tripstyle", "")

    # Convert persona preferences to string format
    activityPreferences = ", ".join(
        [
            activity.replace("_", " ").title()
            for activity, preferred in preferredActivities.items()
            if preferred
        ]
    )
    foodPreferences_str = ", ".join(
        [
            food.replace("_", " ").title()
            for food, preferred in foodPreferences.items()
            if preferred
        ]
    )

    # Generate header
    prompt = (
        f"You are a smart AI model responsible for generating a customized itinerary based on the following location details, "
        f"user persona, and duration.\n\n"
        f"Location: {destination}\n"
        f"Persona: {activityPreferences} Enthusiast, {foodPreferences_str} Lover\n"
        f"Trip Style: {tripstyle.capitalize()}\n"
        f"Duration: {duration} Days\n\n"
        f"User's Journey:\n"
        f"- Start Date: {startDate}\n"
        f"- Budget: ₹{budget}\n"
        f"- Source: {source}\n"
        f"- Destination: {destination}\n\n"
        f"Places to visit:\n"
    )

    # Append places details
    for place in places_data:
        place_name = place["place_details"].get("name", "")
        place_type = place.get("type", "")
        address = place["place_details"].get("address", "")
        lat = place["place_details"]["position"].get("lat", "")
        lon = place["place_details"]["position"].get("lon", "")

        prompt += (
            f"{places_data.index(place) + 1}. **{place_name}**\n"
            f"   - Type: {place_type.capitalize()}\n"
            f"   - Address: {address}\n"
            f"   - Coordinates: {lat}° N, {lon}° E\n\n"
        )

        prompt += """
        \n\n
The Output should be strictly in the following json format:

```json
{
  "startDate": "The start date and time of the journey in ISO 8601 format",
  "duration": "The total number of days the user plans to spend on the trip",
  "source": "The starting location of the journey",
  "destination": "The final destination of the journey",
  "budget": "The total amount (in local currency) that the user is willing to spend on the trip (type string)",
  "cost": "The estimated or actual cost (in local currency) of the trip (type string)",
  "precautions": "Important safety or comfort-related advice for the traveler",
  "dayWiseData": { " make sure the days you plan is equal to the duration of the visit
    "Day 1": "List of activities in the day: "[
      {
        "placeDetails": {
          "name": "Name of the location or attraction",
          "address": "Full address of the location",
          "position": {
            "lat": "Latitude of the location (type: float)",
            "lon": "Longitude of the location(type: float)"
          }
        },
        "arrivalTime": "Expected arrival time at the location in ISO 8601 format",
        "description": "Detailed description of the location",
        "type": "Category or type of the location/activity (e.g., beach, restaurant, museum)"
      }
    ]
  }
}
"""

    return prompt.strip()


def parse_with_retry(parser, res, prompt, askLLM, max_attempts):
    attempt = 0
    while attempt < max_attempts:
        try:
            parsedRes = parser.parse(res)
            print("true", parsedRes)
            return parsedRes
        except Exception as e:
            print(e)
            attempt += 1
            # print(f"Attempt {attempt} failed: {e}")
            if attempt < max_attempts:
                prompt += f" Error encountered in the previous response: {str(e)}. Please regenerate a valid response in json format."
                res = askLLM(prompt)
    raise Exception("Failed to get a valid response after 5 attempts.")


main = Blueprint("__main__", __name__)


class TravelRequest(BaseModel):
    trip_data: Dict
    persona_data: Dict


@main.route("/generate_itinerary", methods=["POST"])
def generate_itinerary():
    try:
        data = request.get_json()

        trip_data = data.get("trip_data")
        persona_data = data.get("user_persona")
        print(trip_data)
        print(persona_data)
        prompt = generate_prompt(trip_data, persona_data)
        res = askLLM(prompt)
        output = parse_with_retry(parser, res, prompt, askLLM, 10)
        return jsonify(output.model_dump()), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@main.route("/", methods=["GET"])
def index():
    return "Hello World"
