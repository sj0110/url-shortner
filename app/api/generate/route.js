import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db("urlShortener");
        const collection = db.collection("links");

        // Fetch all documents from the collection
        const data = await collection.find({}).toArray();

        // Return the retrieved data
        return new Response(JSON.stringify({
            success: true,
            error: false,
            message: "Data fetched successfully",
            data: data,
        }), { status: 200 });

    } catch (error) {
        console.error("Error fetching data:", error); // Log error for debugging
        return new Response(JSON.stringify({
            success: false,
            error: true,
            message: error.message,
        }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON body
        const client = await clientPromise;
        const db = client.db("urlShortener");
        const collection = db.collection("links");

        const doc = await collection.findOne({ urlText: body.urlText });
        if (doc) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "Shortened URL already exists",
                data: doc,
            }), { status: 409 });
        }

        // Insert data into MongoDB with UUID
        const uuid = uuidv4(); // Generate UUID
        const result = await collection.insertOne({
            uuid: uuid, // Add UUID to document
            url: body.url,
            urlText: body.urlText,
            generated: `${process.env.NEXT_PUBLIC_NEXT_HOST}${body.urlText}`, // Ensure the response contains the generated URL
        });

        // Return response
        return new Response(JSON.stringify({
            success: true,
            error: false,
            message: "Finished",
            data: result,
        }), { status: 200 });

    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        return new Response(JSON.stringify({
            success: false,
            error: true,
            message: error.message,
        }), { status: 500 });
    }
}

// DELETE API: To delete an existing shortened URL by UUID
export async function DELETE(req) {
    try {
        // Parse the UUID from the request URL
        const { searchParams } = new URL(req.url);
        const uuid = searchParams.get('uuid');
        console.log(uuid);

        if (!uuid) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "UUID is required to delete the URL.",
            }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("urlShortener");
        const collection = db.collection("links");

        // Delete the document with the matching UUID
        const result = await collection.deleteOne({ uuid: uuid });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "No URL found with the provided UUID.",
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            error: false,
            message: "URL deleted successfully.",
        }), { status: 200 });

    } catch (error) {
        console.error("Error deleting URL:", error); // Log error for debugging
        return new Response(JSON.stringify({
            success: false,
            error: true,
            message: error.message,
        }), { status: 500 });
    }
}


