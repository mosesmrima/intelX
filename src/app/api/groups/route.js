require("../../../lib/connectDB");
const GroupModel = require("@/models/group");


export async function GET() {
    try {
        let groups = await GroupModel.find({});
        return Response.json(groups);
    } catch (err) {
        console.error('Database query error:', err);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
