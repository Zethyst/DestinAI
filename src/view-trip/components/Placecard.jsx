import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Target } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Placecard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    setLoading(true);
    const result = await GetPlaceDetails(data.textQuery)
      .then((resp) => {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{PHOTO_REF}",
          resp.data.results[0].photos[0].photo_reference
        );
        setPhotoUrl(PhotoUrl);
      })
      .catch((error) => {
        console.log("Error fetching photo details:", error);
      });

    setLoading(false);
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName
      )}`}
      target="_blank"
      className="block"
    >
      {loading ? (
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      ) : (
        <div className="shadow-md border rounded-sm p-4 mt-3 flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-300">
          <img
            src={
              photoUrl
                ? photoUrl
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740"
            }
            alt={place.placeName || "Place name not available"}
            className="w-full h-48 md:w-48 md:h-36 object-cover rounded-lg"
          />
          <div className="mt-3 md:mt-0 flex flex-col justify-between">
            <h2 className="font-bold text-xl md:text-lg">
              {place.placeName || "Unknown Place"}
            </h2>
            <p className="font-medium text-sm md:text-base">
              {place.placeDetails || "Details not available for this place."}
            </p>
            <p className="font-medium text-sm md:text-base">
              <span className="text-orange-400">Travel Hours :</span>{" "}
              {place.timeToTravel || "Not specified"}
            </p>
            <p className="font-medium text-green-500 text-sm md:text-base">
              {place.ticketsPricing
                ? place.ticketsPricing
                : "Pricing information unavailable"}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}

export default Placecard;
