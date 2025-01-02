import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    
    const urlText = (await params).urlText  // slug changed to urlText
    const client = await clientPromise;
    const db = client.db("urlShortener");
    const collection = db.collection("links");

    const doc = await collection.findOne({ urlText: urlText });
    if (doc) {
        redirect(doc.url);
    }
    else{
        redirect(`${process.env.NEXT_PUBLIC_NEXT_HOST}`)
    }
    return <div>My Post: {url}</div>
    // I want to redirect to the page if there's some corresponding redirect path available.
}