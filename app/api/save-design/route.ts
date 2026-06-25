import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, address, sqft, notes, blend, category, room, chipSize } = body;

    // In production: save to Supabase + trigger Twilio WhatsApp + HubSpot CRM
    // For now: return success confirmation
    const leadId = `FVP-${Date.now().toString(36).toUpperCase()}`;
    
    console.log("[FloorVision] New lead:", { leadId, name, email, phone, blend, category });

    return NextResponse.json({
      success: true,
      leadId,
      message: `Your digital bid request #${leadId} has been received. We'll send your visualization and pricing within 24 hours.`,
      nextSteps: [
        "Check your email for account creation link",
        "Watch WhatsApp for bid notification",
        "Your assigned sales rep will contact you within 2 hours during business hours"
      ]
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}
