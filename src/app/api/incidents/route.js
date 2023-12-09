require("../../../lib/connectDB");
const IncidentModel = require("@/models/incident");


export async function GET() {
    try {
        let incidents = await IncidentModel.find({});
        return Response.json(incidents);
    } catch (err) {
        console.error('Database query error:', err);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
