import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
     const data = await req.json(
        
     );
    }catch(error){
        return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
    }
}