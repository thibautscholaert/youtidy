import { createClient } from "../supabase/client";

export async function getLikedVideos() {
    const supabase = createClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    console.log("Session", session);

    if (error || !session?.access_token) {
        console.error("No Google access token available");
        return null;
    }

    const googleAccessToken = session.access_token;


    const res = await fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&maxResults=10",
        {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`,
            },
        }
    );

    if (!res.ok) {
        console.error("Failed to fetch liked videos:", await res.text());
        return null;
    }

    const data = await res.json();
    return data.items; // tableau de vidéos likées
}